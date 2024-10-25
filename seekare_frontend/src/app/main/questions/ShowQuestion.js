import React, { useState, useEffect } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  Box,
  Grid,
  Hidden,
  IconButton,
  makeStyles,
  Typography,
  InputBase,
  Avatar,
  Dialog,
  DialogContent,
  DialogTitle
} from "@material-ui/core";
import {
  RiEdit2Line,
  RiThumbUpLine,
  RiThumbDownLine,
  RiMessage2Line,
} from "react-icons/ri";
import { SRLWrapper } from "simple-react-lightbox";
import { AiOutlineDeploymentUnit } from "react-icons/ai";

import { closeModal, openModal, pushSnackbar } from "app/store/ui/actions";
import { emailService, userService } from "app/services/api";
import { getAnswers, postAnswer } from "app/store/answer/actions";
import { getTextFromHtml } from "app/util/helper";
import { isImage } from "app/util/file";
import { postedTimeFormat } from "app/util/date";
import { agreements, ANSWERING, LIKING } from "app/constants";
import { updateActionData, updateRedirectUrl } from "app/store/auth/actions";
import questionService from "app/services/api/question.service";
import CustomButton from "app/main/shared-components/Button";
import AnswersList from "app/main/questions/components/AnswersList";
// import ErrorComponent from "app/main/_error/ErrorComponent";
import useAuth from "app/hooks/useAuth";
import useSafeDispatch from "app/hooks/useSafeDispatch";
import Editor from "app/main/shared-components/Editor";
import RightSidebar from "app/main/layouts/ClientLayout/RightSidebar";
import AvatarComponent from "app/main/shared-components/AvatarComponent";
import BreadCrumb from "app/main/shared-components/BreadCrumb";
import Loader from "../layouts/ClientLayout/Loader";

const useStyles = makeStyles((theme) => ({
  root: {},
  main: {
    height: "87vh",
    overflow: "hidden scroll",
    "&::-webkit-scrollbar": {
      width: "0",
    },
    "&::-webkit-scrollbar-thumb": {
      display: "none",
    },
  },
  box: {
    background: "white",
    borderRadius: "8px",
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
  },
  questionContent: {
    marginBottom: "10px",
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
  },
  mdResponseDetail: {
    padding: "5px 20px",
    marginTop: "10px",
    background: theme.palette.background.default,
    borderRadius: "8px",
    maxHeight: "20rem",
    overflow: "hidden auto",
    fontSize: "15px",
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
  editIcon: {
    color: theme.palette.secondary.main,
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
  likeButton: {
    fontSize: "1.2rem",
    color: "#33a761",
  },
  dislikeButton: {
    fontSize: "1.2rem",
    color: "#646464",
  },
  commentBox: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  commentInputBox: {
    width: "100%",
  },
  commentInput: {
    width: "100%",
    background: "#F5F7FF",
    border: `1px solid #9589F3`,
    padding: "5px 14px",
    borderRadius: 6,
    fontSize: 15,

    "&:hover, &:active, &:focus, &:focus-within": {
      border: `1px solid ${theme.palette.secondary.light}`,
      outline: "none",
    },
  },
}));

const ShowQuestion = () => {
  const {
    params: { questionID },
  } = useRouteMatch();

  const dispatch = useDispatch();
  const safeDispatch = useSafeDispatch(dispatch);
  const classes = useStyles();

  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState("");
  const { isAdmin, isMd, currentUser, isAuthenticated } = useAuth();

  const [mdAssigned, setMdAssigned] = useState(null);
  const [mdResponseDetail, setMdResponseDetail] = useState(null);
  const [similarQuestions, setSimilarQuestions] = useState([]);
  const [errors, setErrors] = useState(null);

  const [referenceOpen, setReferenceOpen] = useState(false);

  const userData = useSelector((state) => state.auth.auth.user_data);

  // Action Data before Login
  const actionData = useSelector((state) => state.auth.auth.actionData);

  useEffect(() => {
    console.log(actionData);
    if (actionData && actionData.state === ANSWERING) {
      setAnswer(actionData.state_data.answer);
    }
  }, [actionData, dispatch]);

  const answers = useSelector((state) => state.answer.answers);
  const [mds, setMds] = useState([]);

  useEffect(() => {
    const fetchMDs = async () => {
      const { mds } = await userService.getMDs();
      setMds(mds);
    };

    fetchMDs();
  }, []);

  useEffect(() => {
    const getQuestion = async () => {
      try {
        const { question } = await questionService.getSingleQuestion(
          questionID
        );

        const { result: similarQuestions } =
          await questionService.getSimilarQuesitons({
            questionID,
          });

        setQuestion(question);
        setSimilarQuestions(similarQuestions);

        const mdAssigned = mds.filter(
          (mdItem) => question.mdAssigned && mdItem._id === question.mdAssigned
        )[0];

        setMdAssigned(mdAssigned);

        safeDispatch(getAnswers(questionID));
      } catch (error) {
        console.log(error);
      }
    };

    getQuestion();
  }, [safeDispatch, mds, questionID]);

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
      }
    }
  };

  /**
   * Vote Question
   *
   * @param {} vote 1: Like, -1: Dislike
   * @return
   */
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
    const res = await questionService.vote(questionID, userData.userID, vote);

    setQuestion({
      ...question,
      likes: res.question.likes,
      dislikes: res.question.dislikes,
    });
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

  const onClickMDResponse = () => {
    safeDispatch(
      openModal("MD_RESPONSE_MODAL", {
        questionTitle: question.title,
        onPostAnswer: (response) => {
          submitResponse(response);
          safeDispatch(closeModal());
        },
      })
    );
  };

  const handleReferenceOpen = () => {
    setReferenceOpen(true);
  }
  const handleReferenceClose = () => {
    setReferenceOpen(false);
  }
  
  const submitResponse = async (mdResponse) => {
    if (mdResponse === "") {
      return;
    }
    // const isMdAssigned =
    //   mdAssigned && question.mdAssigned === currentUser.userID;
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

  useEffect(() => {
    if (question) {
      setMdResponseDetail(
        () =>
          answers.filter((ansItem) => ansItem._id === question.mdResponse)[0]
      );
    }
  }, [answers, question]);

  const onEditMDResponse = () => {
    safeDispatch(
      openModal("MD_RESPONSE_MODAL", {
        mdResponse: mdResponseDetail.content,
        questionTitle: question.title,
        onPostAnswer: (response) => {
          submitResponse(response);
          safeDispatch(closeModal());
        },
      })
    );
  };

  const paths = [
    {
      pathname: "Home",
      to: "/",
    },
    {
      pathname: "Questions",
      to: "/questions",
    },
    {
      pathname: question?.title.slice(0, 8) + "...",
    },
  ];

  if (!question) {
    return <Loader />;
  }

  return (
    <Grid container>
      <Hidden mdDown>
        <Grid
          item
          md={3}
          className={`${classes.similarQuestionsList} hidden-track`}
        >
          <Box mb={2}>
            <BreadCrumb paths={paths} />
          </Box>

          <Box>
            {isAuthenticated && mdResponseDetail ? (
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
                      MD Response
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
                <Box
                  className={classes.mdResponseDetail}
                  dangerouslySetInnerHTML={{ __html: mdResponseDetail.content }}
                ></Box>
              </Box>
            ) : (
              <>
                {isMd ? (
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
                        No MD Answer Yet
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
                          As you are MD Helper, you can answer to this question!
                        </Box>
                        <Box display="flex">
                          <CustomButton
                            variant="contained"
                            size="md"
                            onClick={onClickMDResponse}
                          >
                            Answer
                          </CustomButton>
                          <CustomButton
                            variant="contained"
                            size="md"
                            onClick={handleReferenceOpen}
                          >
                            Reference
                          </CustomButton>
                        </Box>
                          <Dialog 
                            onClose={handleReferenceClose}
                            aria-labelledby="customized-dialog-title"
                            open={referenceOpen}
                          >
                            <DialogTitle id="customized-dialog-title" onClose={handleReferenceClose}>
                                Reference to Book
                            </DialogTitle>
                            <DialogContent dividers>
                              content
                            </DialogContent>
                          </Dialog>
                        
                      </Box>
                    </Box>
                  </Box>
                ) : (
                  <>
                    {mdResponseDetail ? (
                      <Box
                        textAlign="center"
                        className={[classes.mdResponseBox, "no-login"].join(
                          " "
                        )}
                      >
                        There is a MD Response. <br />
                        Please login to see it!
                      </Box>
                    ) : null}
                  </>
                )}
              </>
            )}
          </Box>
          <Box pl={2} mt={2}>
            <Box display="flex" alignItems="center">
              <AiOutlineDeploymentUnit className={classes.relatedIcon} />
              &nbsp;
              <Box component="h6" fontSize="1rem" fontWeight="bold" margin="0">
                Related Questions
              </Box>
            </Box>
            <Box maxHeight="200px" paddingBottom="20px" overflow="hidden auto">
              {similarQuestions?.map((question) => (
                <Box
                  key={question._id}
                  className={classes.similarQItem}
                  padding="10px 0"
                >
                  <Link to={`/questions/${question._id}/show`}>
                    {question.title}
                  </Link>
                </Box>
              ))}
            </Box>
          </Box>
        </Grid>
      </Hidden>
      <Grid item md={6} className={classes.main}>
        <Box className={classes.box}>
          <Box className={classes.boxBody}>
            <Box className={classes.questionHeader}>
              <Box display="flex" alignItems="center">
                <AvatarComponent user={question.user} />
                <Box className={classes.username}>{question.user.username}</Box>

                <Box className={classes.dateTime}>
                  &middot;{postedTimeFormat(question.date)}
                </Box>
              </Box>

              {isMd && (
                <Box onClick={onEditQuestion}>
                  <IconButton>
                    <RiEdit2Line className={classes.editIcon} />
                  </IconButton>
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
              <Box
                maxHeight="250px"
                overflow="hidden auto"
                dangerouslySetInnerHTML={{ __html: question?.content }}
              />
              {question.files && question.files.length > 0 && (
                <Box className={classes.filesWrapper}>
                  <SRLWrapper>
                    <Box display="flex" alignItems="center">
                      {question.files.map((file) =>
                        isImage(file) ? (
                          <Box
                            width="4rem"
                            height="4rem"
                            marginRight="0.5rem"
                            overflow="hidden"
                            border="1px solid gray"
                            borderRadius="0.2rem"
                          >
                            <a key={file} href={file} target="blank" download>
                              <img
                                className={classes.imageFile}
                                src={file}
                                alt="download"
                              />
                            </a>
                          </Box>
                        ) : (
                          <Box width="2.5rem" height="2.5rem" mr={2}>
                            <a key={file} href={file} target="blank" download>
                              <img
                                src="/images/icons/file-checked-svgrepo-com.svg"
                                alt="download"
                              />
                              {file.fileName}
                            </a>
                          </Box>
                        )
                      )}
                    </Box>
                  </SRLWrapper>
                </Box>
              )}
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
                <RiThumbUpLine />
              </IconButton>
              <Box ml={1} className="likes">
                {question.likes}
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
                <RiThumbDownLine />
              </IconButton>
              <Box ml={1} className="dislikes">
                {question.dislikes}
              </Box>
            </Box>
          </Box>
        </Box>

        <Box className={classes.answersList}>
          <Typography className={classes.answersListHeader}>Answers</Typography>
          <AnswersList answers={answers} question={question} />
        </Box>

        <Box my={2}>
          {/* <Typography className={classes.answersListHeader}>
            Leave your Comment
          </Typography> */}
          <Box className={classes.box} p={2}>
            {/* <Editor
              content={answer}
              onlyText={!isAdmin || !isMd}
              onChangeContent={(value) => {
                setAnswer(value);
              }}
            /> */}
            <Box className={classes.commentBox}>
              <Box className={classes.avatarBox}>
                <Avatar alt="Comment Avatar">
                  {currentUser.username?.charAt(0)}
                </Avatar>
              </Box>
              <Box className={classes.commentInputBox} mx={2}>
                <InputBase
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
      </Grid>
      <Hidden>
        <Grid item md={3}>
          <RightSidebar />
        </Grid>
      </Hidden>
    </Grid>
  );
};

export default ShowQuestion;
