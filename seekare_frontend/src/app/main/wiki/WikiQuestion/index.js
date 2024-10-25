import React, { useState, useEffect, useRef, useCallback } from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  Box,
  Grid,
  IconButton,
  makeStyles,
  Typography,
  TextareaAutosize,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@material-ui/core";
import {
  RiEdit2Line,
  RiThumbUpLine,
  RiThumbDownLine,
  RiThumbDownFill,
  RiThumbUpFill,
  RiDeleteBin7Line,
} from "react-icons/ri";
import { BiHide, BiShow } from "react-icons/bi";
// import { SRLWrapper } from "simple-react-lightbox";
import {
  setBannedQuestion,
  deleteQuestion,
  voteQuestions,
} from "app/store/question/actions";
import {
  deleteAnswer, updateAnswer
} from "app/store/answer/actions";
import {
  changeResponsive,
  closeModal,
  openModal,
  pushSnackbar,
} from "app/store/ui/actions";
import { emailService, userService } from "app/services/api";
import {
  getAnswers,
  postAnswer,
  postReference,
} from "app/store/answer/actions";
import { getTextFromHtml } from "app/util/helper";
// import { isImage } from "app/util/file";
import { postedTimeFormat } from "app/util/date";
import { agreements, ANSWERING, LIKING } from "app/constants";
import { updateActionData, updateRedirectUrl } from "app/store/auth/actions";
import questionService from "app/services/api/question.service";
import CustomButton from "app/main/shared-components/Button";
import AnswersList from "app/main/questions/components/AnswersList";
// import ErrorComponent from "app/main/_error/ErrorComponent";
import useAuth from "app/hooks/useAuth";
import useSafeDispatch from "app/hooks/useSafeDispatch";
// import Editor from "app/main/shared-components/Editor";
import AvatarComponent from "app/main/shared-components/AvatarComponent";
import Loader from "app/main/layouts/ClientLayout/Loader";
import TransferList from "./CategoryList";
import { useWikiContext } from "../wikiContext";
import { FaLongArrowAltLeft } from "react-icons/fa";

const useStyles = makeStyles((theme) => ({
  rootContainer: {
    [theme.breakpoints.up("sm")]: {
      display: "block !important",
    },
  },
  main: {
    height: "87vh",
    overflow: "hidden scroll",
    "&::-webkit-scrollbar": {
      width: "0",
    },
    "&::-webkit-scrollbar-thumb": {
      display: "none",
    },
    margin: "auto 20px",

    display: "flex",
    flexDirection: "column",
  },
  commentsSection: {
    overflow: "hidden auto",
    margin: "10px 0",
    "&::-webkit-scrollbar": {
      width: "0",
    },
    "&::-webkit-scrollbar-thumb": {
      display: "none",
    },
    [theme.breakpoints.down("sm")]: {
      overflow: "visible",
    },
  },
  box: {
    background: ({ activeContent }) =>
      activeContent === "question" ? theme.palette.primary.active : "white",
    border: ({ activeContent }) =>
      activeContent === "question"
        ? `1px solid ${theme.palette.primary.light}`
        : "none",
    borderRadius: "8px",
    [theme.breakpoints.down("sm")]: {
      marginTop: "40px",
    },
  },
  boxBody: {
    padding: "16px",
  },
  boxFooter: {
    display: "flex",
    alignItems: "center",
    padding: "16px",
    borderTop: `1px solid ${theme.palette.border.main}`,
  },
  questionHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  username: {
    marginLeft: "10px",
    color: theme.palette.text.primary,
    fontWeight: "600",
  },
  dateTime: {
    marginLeft: "10px",
    fontSize: "0.8rem",
    color: theme.palette.text.secondary,
    [theme.breakpoints.down("sm")]: {
      display: "none",
      marginLeft: "0",
      width: "100%",
    },
  },
  questionContent: {
    marginBottom: "10px",
    fontSize: "1rem",
    lineHeight: "22px",
    wordSpacing: "3px",
    overflow: "hidden",
    paddingRight: "80px",

    // maxHeight: ({ showMore }) => (showMore ? "unset" : "110px"),
  },
  questionTitle: {
    margin: "8px 0",
    color: theme.palette.text.primary,
  },
  answersList: {
    marginTop: "32px",
  },
  answersListHeader: {
    fontSize: "18px",
    color: theme.palette.text.primary,
    fontWeight: "600",
  },
  similarQuestionsList: {
    padding: "0 1rem",
    height: "87vh",
    overflow: "hidden auto",
    "& a": {
      fontWeight: 500,
      fontSize: "1rem",
      color: theme.palette.text.primary,
      textDecoration: "underline",
      "&:hover": {
        fontWeight: 600,
        color: theme.palette.secondary.main,
      },
    },
  },
  mdResponseBox: {
    position: "relative",
    backgroundColor: "white",
    border: `2px solid ${theme.palette.secondary.main}`,
    borderRadius: "0.5rem",
    padding: "0.5rem",
    marginBottom: "10px",
    "&.no-login": {
      color: theme.palette.primary.main,
      fontWeight: 600,
    },
  },
  mdResponseTitle: {
    display: "flex",
    alignItems: "center",
    fontWeight: "bold",
    color: theme.palette.secondary.main,
    fontSize: "16px",
  },
  mdResponseDetail: {
    padding: "0px 20px 5px 20px",
    position: "relative",
    background: theme.palette.background.default,
    borderRadius: "8px",
    fontSize: "16px",
    lineHeight: "24px",
    overflow: "hidden",
    // maxHeight: ({ mdResponseShowMore }) =>
    //   mdResponseShowMore ? "unset" : "170px",
  },
  mdResponseGradient: {
    position: "absolute",
    width: "100%",
    height: "30px",
    backgroundImage: "linear-gradient(to top, #f1e1e1, transparent)",
    bottom: "0",
  },
  filesWrapper: {
    display: "flex",
    alignItems: "center",
    padding: "5px",
    background: theme.palette.background.default,
    border: "1px dotted gray",
    marginTop: "10px",
    borderRadius: "8px",
  },
  imageFile: {
    width: "100%",
  },
  questionActionBtn: {
    cursor: "pointer",
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "scale(1.1)",
    },
    "& .likes": {
      color: theme.palette.secondary.main,
      fontSize: "1.1rem",
      fontWeight: "600",
    },
    "& .dislikes": {
      color: theme.palette.primary.main,
      fontSize: "1.1rem",
      fontWeight: "600",
    },
  },
  cancelButton: {
    color: theme.palette.primary.main,
  },
  questionActionButtons: {
    display: "flex",
    alignItems: "center",
  },
  editIcon: {
    color: theme.palette.secondary.main,
  },
  questionBody: {
    position: "relative",
  },
  deleteIcon: {
    color: "#EB5757",
  },
  backButton: {
    cursor: "pointer",
  },
  backButtonIcon: {
    color: theme.palette.secondary.main,
  },
  relatedIcon: {
    color: theme.palette.secondary.main,
    fontSize: "1.1rem",
  },
  agreements: {
    border: `1px dotted ${theme.palette.primary.main}`,
    borderRadius: "4px",
    background: theme.palette.background.default,
    fontSize: "0.9rem",
    fontWeight: 600,
  },
  // showMoreBtn: {
  //   display: "flex",
  //   justifyContent: "flex-end",
  //   cursor: "pointer",
  //   color: theme.palette.secondary.main,
  //   fontSize: "0.8rem",
  //   paddingTop: "5px"
  // },
  likeButton: {
    fontSize: "1.2rem",
    color: "#33a761",
  },
  dislikeButton: {
    fontSize: "1.2rem",
  },
  commentBox: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  avatarBox: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  commentInputBox: {
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      marginLeft: "0",
    },
  },
  commentInput: {
    width: "100%",
    background: "#F5F7FF",
    border: `1px solid #9589F3`,
    padding: "8px 14px",
    borderRadius: 6,
    fontSize: 15,

    "&:hover, &:active, &:focus, &:focus-within": {
      border: `1px solid ${theme.palette.secondary.light}`,
      outline: "none",
    },
  },
  questionImageIcon: {
    position: "absolute",
    width: "60px",
    height: "80px",
    right: "0",
    bottom: "0",
    cursor: "pointer",
    filter: "blur(5px)",
    [theme.breakpoints.down("sm")]: {
      width: "45px",
      height: "60px",
      top: "33%",
    },
  },
  closeButton: {
    position: "absolute",
    left: "43x",
    top: "20px",
    [theme.breakpoints.up(960)]: {
      display: "none",
    },
  },
  mdAlert: {
    color:'gray',
    fontSize:'12px',
    padding:'5px',
    paddingTop:'15px'
  }
}));

export const WikiQuestionContent = () => {
  const history = useHistory();
  const redirectUrl = useSelector((state) => state.auth.auth.redirect_url);

  const {
    params: { questionID },
  } = useRouteMatch();

  const dispatch = useDispatch();
  const safeDispatch = useSafeDispatch(dispatch);
  const activeContent = useSelector((state) => state.ui.content.activeContent);
  const classes = useStyles({
    activeContent,
  });
  const responsive =
    useSelector((state) => state.ui.responsive.responsiveType) ||
    "kareBookItem";
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState("");
  const [errors, setErrors] = useState(null);
  const [, setImageClicked] = useState(false);

  const { questions: currentQuestions } = useWikiContext();

  const [mdAssigned, setMdAssigned] = useState(null);
  const [myBooks, setMyBooks] = useState([]);
  const userData = useSelector((state) => state.auth.auth.user_data);

  // Action Data before Login
  const actionData = useSelector((state) => state.auth.auth.actionData);

  // Toggle question management
  const [isQuestionBanned, setQuestionBaneed] = useState(true);
  const showFlag = useRef(false);
  const { questions } = useSelector((state) => state.question);
  // mdResponseShow management
  const mdResponseDetailRef = useRef();
  // const [isResponseBtnShow, setResponseBtnShow]= useState(false)

  useEffect(() => {
    dispatch(changeResponsive("karePostItem"));
    if (actionData && actionData.state === ANSWERING) {
      setAnswer(actionData.state_data.answer);
    }
  }, [actionData, dispatch]);

  const answers = useSelector((state) => state.answer.answers);

  const books = useSelector((state) => state.wiki.wikis);

  const [mds, setMds] = useState([]);

  const [referenceOpen, setReferenceOpen] = useState(false);

  useEffect(() => {
    const fetchMDs = async () => {
      const { mds } = await userService.getMDs();
      setMds(mds);
    };

    fetchMDs();
  }, []);

  useEffect(() => {
    if (question) {
      setMdResponseDetail(
        () =>
          answers.filter((ansItem) => ansItem._id === question.mdResponse)[0]
      );
    }
  }, [question, answers]);

  const { currentUser, isMd, isAdmin, isAuthenticated } = useAuth();
  useEffect(() => {
    const getQuestion = async () => {
      try {
        const { question } = await questionService.getSingleQuestion(
          questionID
        );
        if (question.referencedBooks !== undefined) {
          let myBookTemp = Object.values(question.referencedBooks);
          let temp = [];
          for (let i = 0; i < books?.length; i++) {
            for (let j = 0; j < myBookTemp[0].length; j++) {
              if (books[i]._id === myBookTemp[0][j]) {
                temp.push(books[i]);
              }
            }
          }
          setMyBooks([...temp]);
        }

        if (question.banned && !isAdmin) {
          history.push(redirectUrl);
          return;
        }
        setQuestion(question);

        setQuestionBaneed(question.banned);

        const mdAssigned = mds.filter(
          (mdItem) => question.mdAssigned && mdItem._id === question.mdAssigned
        )[0];

        setMdAssigned(mdAssigned);

        safeDispatch(getAnswers(questionID));
        // if(mdResponseDetailRef.current?.scrollHeight > 170)
        // setResponseBtnShow(true)
        //      else
        // setResponseBtnShow(false)
      } catch (error) {
        console.log(error);
      }
    };

    getQuestion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [safeDispatch, mds, questionID, isAdmin, history, redirectUrl]);

  useEffect(() => {
    const checkQuestion = async () => {
      const { question: question2 } = await questionService.getSingleQuestion(
        questionID
      );

      if (
        !question ||
        question2.likes !== question.likes ||
        question2.dislikes !== question.dislikes
      ) {
        setQuestion(question2);
      }
    };
    checkQuestion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questions]);

  useEffect(() => {
    if ((isMd || isAdmin) && showFlag.current) {
      safeDispatch(setBannedQuestion(questionID, isQuestionBanned));
      showFlag.current = false;
    }
  }, [isMd, isAdmin, questionID, safeDispatch, isQuestionBanned]);

  const onClickPostAnswer = async () => {
    if (!isAuthenticated) {
      safeDispatch(
        openModal("LOGIN_MODAL", {
          state: ANSWERING,
          state_data: {
            question,
            answer,
          },
        })
      );
      // Save State Data
      safeDispatch(
        updateActionData({
          state: ANSWERING,
          state_data: {
            question,
            answer,
          },
        })
      );
    } else {
      if (answer === "") {
        setErrors("Required a comment");
      } else {
        const isMdAssigned =
          mdAssigned && question.mdAssigned === currentUser.userID;
        safeDispatch(
          postAnswer(questionID, userData.userID, answer, isMdAssigned, false)
        );

        dispatch(updateActionData(null));
        dispatch(updateRedirectUrl(""));

        setAnswer("");
        setErrors("");
      }
    }
  };
  const handleImageClick = () => {
    setImageClicked(true);
    dispatch(openModal("QUESTION_IMAGE_MODAL", { url: question.imageUrl }));
  };
  const handleReferenceOpen = () => {
    setReferenceOpen(true);
  };
  const handleReferenceClose = () => {
    setReferenceOpen(false);
  };

  const onClickVote = async (vote) => {
    if (!isAuthenticated) {
      safeDispatch(
        openModal("LOGIN_MODAL", {
          state: LIKING,
          state_data: {
            question,
          },
        })
      );
      return;
    }

    // dispatch(voteOn(questionID, userData.userID, vote));
    try {
      const { question: question2 } = await questionService.vote(
        questionID,
        userData.userID,
        vote
      );
      // console.log("QuESTION=", question2);
      safeDispatch(voteQuestions(question2, currentQuestions));

      setQuestion({ ...question, ...question2 });
      // setQuestion({
      //   ...question,
      // });
    } catch (error) {
      const { message } = error;
      safeDispatch(pushSnackbar(message, "error"));
    }
  };

  const onEditQuestion = () => {
    safeDispatch(
      openModal("EDIT_QUESTION_MODAL", {
        question,
        updateQuestion: async (updated_question) => {
          try {
            const res = await questionService.update(
              questionID,
              updated_question
            );

            safeDispatch(pushSnackbar("Updated Question", "success"));
            setQuestion({ ...question, ...res.updated_question });
          } catch (error) {
            safeDispatch(pushSnackbar("Can not update", "error"));
          }

          dispatch(closeModal());
        },
      })
    );
  };

  const onToggleShow = useCallback(async () => {
    setQuestionBaneed(!isQuestionBanned);
    if (!showFlag.current) showFlag.current = true;
  }, [isQuestionBanned, setQuestionBaneed]);

  const onDeleteQuestion = () => {
    safeDispatch(
      openModal("CONFIRM_MODAL", {
        title: "Confirm Delete Question",
        description: `Are you sure delete "${question.title}" question`,
        buttons: [
          {
            title: "Yes",
            type: "secondary",
            onClick: () => {
              safeDispatch(deleteQuestion(questionID));
              safeDispatch(closeModal());
              safeDispatch(changeResponsive(""));
              history.push("/");
            },
          },
          {
            title: "Cancel",
            type: "primary",
            onClick: () => {
              safeDispatch(closeModal());
            },
          },
        ],
      })
    );
  };

  const handleSaveBooks = (questionId, userID, books) => {
    dispatch(
      postReference(
        questionId,
        userID,
        books.map((c) => c._id)
      )
    );
    setReferenceOpen(false);
  };

  const [mdResponseDetail, setMdResponseDetail] = useState();
  const [mdJustResponsed, setMdJustResponsed] = useState(false);
  useEffect(() => {
    if (question) {
      setMdResponseDetail(
        () =>
          answers.filter((ansItem) => ansItem._id === question.mdResponse)[0]
      );
    }
  }, [answers, question, mdJustResponsed]);

  const onClickMDResponse = () => {
    safeDispatch(
      openModal("MD_RESPONSE_MODAL", {
        questionTitle: question.title,
        onPostAnswer: (response) => {
          submitResponse(response);
          setMdJustResponsed(true);
          window.location.reload()
          safeDispatch(closeModal());
        },
      })
    );
  };

  const submitResponse = async (mdResponse) => {
    if (mdResponse === "") {
      return;
    }
    const {
      user: { _id: userID, username },
      _id: questionID,
      title,
    } = question;
    const { username: mdname, userID: mdID } = currentUser;

    try {
      safeDispatch(postAnswer(questionID, mdID, mdResponse, true, true));
      await emailService.sendMdAnswer(
        userID,
        username,
        questionID,
        title,
        mdID,
        mdname,
        questionID,
        getTextFromHtml(answer)
      );
      safeDispatch(pushSnackbar("Your MD Answer Emailed to User", "success"));
    } catch (error) {
      safeDispatch(pushSnackbar("Unknown Error", "error"));
    }
  };

  const submitEditResponse = async (id, response) => {
    if (response === "") {
      return;
    }
    try {
      safeDispatch(updateAnswer(id, response, true));
    } catch (error) {
      safeDispatch(pushSnackbar("Unknown Error", "error"));
    }
  }

  const onEditMDResponse = () => {
    safeDispatch(
      openModal("MD_RESPONSE_MODAL", {
        mdResponse: mdResponseDetail.content,
        questionTitle: question.title,
        onPostAnswer: (response) => {
          submitEditResponse(mdResponseDetail._id, response);
          safeDispatch(closeModal());
        },
      })
    );
  };


  if (!question) {
    return <Loader />;
  }
  return (
    <Grid
      container
      className={classes.rootContainer}
      style={{
        display: responsive === "karePostItem" ? "block" : "none",
      }}
    >
      <Grid item xs={12} className={classes.main}>
        <Box className={classes.box}>
          <Box className={classes.boxBody}>
            {responsive === "karePostItem" && (
              <FaLongArrowAltLeft
                size="22px"
                className={classes.closeButton}
                onClick={() => dispatch(changeResponsive("karePost"))}
              />
            )}
            <Box className={classes.questionHeader}>
              <Box display="flex" alignItems="center">
                <AvatarComponent user={question.user} />
                <Box className={classes.username}>{question.user.username}</Box>
                <Box className={classes.dateTime}>
                  &middot;{postedTimeFormat(question.date)}
                </Box>
              </Box>

              {isMd && (
                <Box className={classes.questionActionButtons}>
                  <Box onClick={onEditQuestion}>
                    <IconButton>
                      <RiEdit2Line className={classes.editIcon} />
                    </IconButton>
                  </Box>
                  <Box onClick={onToggleShow}>
                    <IconButton className={classes.cancelButton}>
                      {isQuestionBanned ? <BiHide /> : <BiShow />}
                    </IconButton>
                  </Box>
                  <Box onClick={onDeleteQuestion}>
                    <IconButton>
                      <RiDeleteBin7Line className={classes.deleteIcon} />
                    </IconButton>
                  </Box>
                </Box>
              )}
            </Box>
            <Box className={classes.questionBody}>
              <Typography
                className={classes.questionTitle}
                variant="h6"
                component="h2"
              >
                {question.title}
              </Typography>
              <Box>
                <Box
                  className={classes.questionContent}
                  dangerouslySetInnerHTML={{ __html: question?.content }}
                />
                {question?.imageUrl && (
                  <img
                    className={classes.questionImageIcon}
                    src={question?.imageUrl}
                    alt="here"
                    onClick={handleImageClick}
                  />
                )}
              </Box>
            </Box>
          </Box>
          <Box className={classes.boxFooter}>
            <Box
              display="flex"
              alignItems="center"
              className={classes.questionActionBtn}
              onClick={() => onClickVote(1)}
            >
              {/* <img src="/images/icons/Heart.png" alt="likes" /> */}
              <IconButton className={classes.likeButton} size="small">
                {Array.isArray(question.likes) ? (
                  question.likes.indexOf(currentUser.userID) === -1 ? (
                    <RiThumbUpLine />
                  ) : (
                    <RiThumbUpFill />
                  )
                ) : (
                  <RiThumbUpLine />
                )}
              </IconButton>
              <Box ml={1} className="likes">
                {Array.isArray(question.likes) ? question.likes.length : 0}
              </Box>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              ml={2}
              className={classes.questionActionBtn}
              onClick={() => onClickVote(-1)}
            >
              {/* <img src="/images/icons/broken_heart.png" alt="dislikes" /> */}
              <IconButton className={classes.dislikeButton} size="small">
                {Array.isArray(question.dislikes) ? (
                  question.dislikes.indexOf(currentUser.userID) === -1 ? (
                    <RiThumbDownLine />
                  ) : (
                    <RiThumbDownFill />
                  )
                ) : (
                  <RiThumbDownLine />
                )}
              </IconButton>
              <Box ml={1} className="dislikes">
                {Array.isArray(question.dislikes)
                  ? question.dislikes.length
                  : 0}
              </Box>
            </Box>
            {isAuthenticated && (isMd || isAdmin) && (
              <CustomButton
                variant="contained"
                size="md"
                color="secondary"
                onClick={handleReferenceOpen}
                style={{ marginLeft: "auto" }}
              >
                Reference
              </CustomButton>
            )}
          </Box>
          <Box>
            <Dialog
              onClose={handleReferenceClose}
              aria-labelledby="customized-dialog-title"
              open={referenceOpen}
            >
              <DialogTitle
                id="customized-dialog-title"
                onClose={handleReferenceClose}
              >
                Reference to Book
              </DialogTitle>
              <DialogContent dividers>
                <TransferList
                  questionId={questionID}
                  userID={userData.username}
                  categories={books || []}
                  myCategories={myBooks || []}
                  onSaveCategories={handleSaveBooks}
                />
              </DialogContent>
            </Dialog>
          </Box>
        </Box>
        <Box p={2} pt={3}>
          <Box>
            <Box className={classes.commentBox}>
              <Box className={classes.avatarBox}>
                <Avatar alt="Comment Avatar">
                  {currentUser.username?.charAt(0)}
                </Avatar>
              </Box>
              <Box className={classes.commentInputBox} mx={2}>
                <TextareaAutosize
                  variant="outlined"
                  size="small"
                  name="title"
                  type="text"
                  onChange={(e) => setAnswer(e.target.value)}
                  value={answer}
                  placeholder="Add a comment"
                  className={classes.commentInput}
                  autoComplete="off"
                  required
                />
                {errors && <Box color="red">{errors}</Box>}
              </Box>
              <Box className={classes.commentButtonBox}>
                <CustomButton
                  variant="contained"
                  size="md"
                  color="secondary"
                  onClick={onClickPostAnswer}
                >
                  Submit
                </CustomButton>
              </Box>
            </Box>

            {answer && getTextFromHtml(answer) !== "" && (
              <Box component="ul" py={1} px={3} className={classes.agreements}>
                {agreements.map((item) => (
                  <Box
                    key={item}
                    component="li"
                    mt={1}
                    display="flex"
                    alignItems="center"
                  >
                    <Box
                      component="span"
                      width={4}
                      height={4}
                      borderRadius={2}
                      bgcolor="black"
                      className={classes.dot}
                    ></Box>
                    <Box display="flex" ml={1}>
                      {item}
                    </Box>
                  </Box>
                ))}
              </Box>
            )}
          </Box>
          {/* <Box
              mt={2}
              display="flex"
              alignItems="center"
              justifyContent="flex-end"
            >
              <CustomButton
                variant="contained"
                size="md"
                color="secondary"
                onClick={onClickPostAnswer}
              >
                {isAuthenticated
                  ? "Leave a comment"
                  : "Log in or sign up to leave a comment"}
              </CustomButton>
            </Box> */}
        </Box>
        <Box className={classes.commentsSection}>
          <Box mt={2}>
            {mdResponseDetail ? (
              <Box className={classes.mdResponseBox}>
                <Box
                  className={classes.mdResponseTitle}
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Box>
                    <img src="/images/icons/Star.png" alt="best answer icon" />
                    <Box component="span" pl={1}>
                      {isAuthenticated
                        ? "MD Response"
                        : "Log in to see MD response"}
                    </Box>
                  </Box>
                  {isMd && (
                    <Box>
                      <IconButton
                        size="small"
                        className={[classes.editIcon].join(" ")}
                        onClick={onEditMDResponse}
                      >
                        <RiEdit2Line />
                      </IconButton>
                    </Box>
                  )}
                </Box>
                {isAuthenticated && (
                  <Box position="relative">
                    <Box
                      className={classes.mdResponseDetail}
                      dangerouslySetInnerHTML={{
                        __html: mdResponseDetail.content,
                      }}
                      ref={mdResponseDetailRef}
                    ></Box>
                    <p className={classes.mdAlert}>This response is intended for general educational purposes only and does not represent individual medical advice. For specific medical questions, please consult a healthcare professional.</p>
                    {/* {<Box className={classes.mdResponseGradient}/>} */}
                  </Box>
                )}
                {/* {isResponseBtnShow?<Box
                    className={classes.showMoreBtn}
                    onClick={onClickMDResponseShowMore}
                  >
                    {mdResponseShowMore ? "Show Less" : "Show More..."}
                  </Box>
                  : null
                }        */}
              </Box>
            ) : (
              <>
                {isMd && !mdJustResponsed ? (
                  <>
                    <Box className={classes.mdResponseBox}>
                      <Box
                        className={classes.mdResponseTitle}
                        display="flex"
                        alignItems="center"
                      >
                        <img
                          src="/images/icons/Star.png"
                          alt="best answer icon"
                        />
                        <Box component="span" pl={2}>
                          No MD Response Yet
                        </Box>
                      </Box>
                      <Box>
                        {/* {mdAssigned && mdAssigned._id === currentUser.userID ? ( */}
                        <Box
                          display="flex"
                          flexDirection="column"
                          justifyContent="center"
                          className={classes.mdResponseTitle}
                        >
                          <Box my={2} textAlign="center" fontWeight="bold">
                            As you are MD Helper, you can answer to this
                            question!
                          </Box>
                          <Box>
                            <CustomButton
                              variant="contained"
                              size="md"
                              onClick={onClickMDResponse}
                            >
                              Answer
                            </CustomButton>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </>
                ) : (
                  <>
                    {/* {mdResponseDetail ? (
                      <Box
                        textAlign="center"
                        className={[classes.mdResponseBox, "no-login"].join(
                          " "
                        )}
                      >
                        Please login for MD response
                      </Box>
                    ) : null} */}
                  </>
                )}
              </>
            )}
          </Box>
          {answers && answers.length > 0 && (
            <Box className={classes.answersList}>
              {/* <Typography className={classes.answersListHeader}>
                  Comments
                </Typography> */}
              <AnswersList answers={answers} question={question} my />
            </Box>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};
