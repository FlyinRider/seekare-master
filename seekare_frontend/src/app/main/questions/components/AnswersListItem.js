import React, { useState, useEffect, useRef, useCallback } from "react";
import { useRouteMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import {
  Box,
  makeStyles,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@material-ui/core";
// import { BsArrowsExpand } from "react-icons/bs";
import {
  RiCheckboxCircleFill,
  // RiDeleteBack2Fill,
  RiDeleteBin7Line,
  RiEdit2Line,
  RiThumbUpLine,
  RiThumbUpFill,
  RiThumbDownFill,
  RiThumbDownLine,
} from "react-icons/ri";
import { MdCancel } from "react-icons/md";
import { BiHide, BiShow } from "react-icons/bi";

import useSafeDispatch from "app/hooks/useSafeDispatch";
import {
  deleteAnswer,
  updateAnswer,
  voteAnswer,
  postReferenceAnswer,
} from "app/store/answer/actions";
import { getAnswers } from "app/store/answer/actions";

import useAuth from "app/hooks/useAuth";
import Editor from "app/main/shared-components/Editor";
import { openModal, closeModal } from "app/store/ui/actions";
import AvatarComponent from "app/main/shared-components/AvatarComponent";
import { postedTimeFormat } from "app/util/date";
// import { getTextFromHtml, trimmedText } from "app/util/helper";
import TransferList from "./CategoryList";
import CustomButton from "app/main/shared-components/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    border: (props) => (props.isMdAnswer ? "3px solid #019877" : "none"),
    margin: "0.2rem 0",
    boxShadow: "0px 0px 5px -3px black",
  },
  box: {
    background: "white",
    borderRadius: "8px",
    marginBottom: "20px",
  },
  boxBody: {
    padding: "16px",
  },
  main: {
    fontSize: "0.9rem",
    "&.expanded": {
      height: "auto",
    },
  },
  boxFooter: {
    display: "flex",
    alignItems: "center",
    padding: "16px",
    borderTop: `1px solid ${theme.palette.border.main}`,
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
  answerAction: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
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
  rank: {
    fontSize: "1.2rem",
    fontWeight: "600",
    color: (props) =>
      props.answer.rank >= 0
        ? theme.palette.secondary.main
        : theme.palette.primary.main,
  },
  expandIcon: {
    color: theme.palette.secondary.main,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    cursor: "pointer",
  },
  editbutton: {
    color: theme.palette.secondary.main,
    paddingLeft: "8px",
    paddingRight: "8px",
  },
  saveButton: {
    color: theme.palette.secondary.main,
    paddingLeft: "8px",
    paddingRight: "8px",
  },
  deleteIcon: {
    color: "#EB5757",
    paddingLeft: "8px",
    paddingRight: "8px",
  },
  cancelButton: {
    color: theme.palette.primary.main,
    paddingLeft: "8px",
    paddingRight: "8px",
  },
  likeButton: {
    fontSize: "1.2rem",
    color: "#33a761",
  },
  dislikeButton: {
    fontSize: "1.2rem",
  },
}));

const AnswersListItem = ({ answer, isMdAnswer }) => {
  const classes = useStyles({ isMdAnswer, answer });
  const dispatch = useDispatch();
  const safeDispatch = useSafeDispatch(dispatch);
  const {
    params: { questionID },
  } = useRouteMatch();
  const { currentUser, isAuthenticated, isMd, isAdmin } = useAuth();
  const [referenceOpen, setReferenceOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [content, setContent] = useState(() => {
    return answer.content;
  });
  const [myBooks, setMyBooks] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(answer?.isShow ?? false);
  const showFlag = useRef(false);
  const books = useSelector((state) => state.wiki.wikis);
  const userData = useSelector((state) => state.auth.auth.user_data);

  useEffect(() => {
    if ((isMd || isAdmin) && showFlag.current) {
      safeDispatch(updateAnswer(answer._id, content, isSubmitting));
      safeDispatch(getAnswers(questionID));
      showFlag.current = false;
    }
    if (answer.referencedBooks !== undefined) {
      let myBookTemp = Object.values(answer.referencedBooks);
      let temp = [];
      for (let i = 0; i < books.length; i++) {
        for (let j = 0; j < myBookTemp[0].length; j++) {
          if (books[i]._id == myBookTemp[0][j]) {
            temp.push(books[i]);
          }
        }
      }
      setMyBooks([...temp]);
    }
  }, [
    safeDispatch,
    setIsSubmitting,
    questionID,
    answer,
    content,
    isSubmitting,
    isMd,
    isAdmin,
    showFlag,
  ]);

  const onClickVote = (vote) => {
    if (!isAuthenticated) {
      safeDispatch(openModal("LOGIN_MODAL"));
      return;
    }

    safeDispatch(voteAnswer(answer._id, currentUser.userID, vote));
  };

  const handleReferenceOpen = () => {
    setReferenceOpen(true);
  };
  const handleReferenceClose = () => {
    setReferenceOpen(false);
  };

  const onChangeContent = (value) => {
    setContent(value);
  };

  const onClickCancelEdit = () => {
    setContent(answer.content);
    setIsEdit(false);
  };

  const onClickSaveEdit = () => {
    if (content && answer.content !== content)
      safeDispatch(updateAnswer(answer._id, content));

    setIsEdit(false);
  };

  const handleSaveBooks = (answerId, userID, books) => {
    console.log(books, myBooks);
    dispatch(
      postReferenceAnswer(
        answerId,
        userID,
        books.map((c) => c._id)
      )
    );
    setReferenceOpen(false);
  };
  // const [showFullAnswer, setShowFullAnswer] = useState(false);
  // const onClickExpand = () => {
  //   setShowFullAnswer(!showFullAnswer);
  // };

  const onClickHide = useCallback(() => {
    setIsSubmitting(!isSubmitting);
    if (!showFlag.current) showFlag.current = true;
  }, [isSubmitting, setIsSubmitting]);

  const onClickDelete = () => {
    if (isMd || isAdmin) {
      safeDispatch(
        openModal("CONFIRM_MODAL", {
          title: `Confirm Delete`,
          description: `Are you sure to delete this comment`,
          buttons: [
            {
              title: "Yes",
              type: "secondary",
              onClick: () => {
                safeDispatch(deleteAnswer(answer._id));
                safeDispatch(closeModal());
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
    }
  };

  return (
    <>
      {answer?.isShow !== undefined && !answer.isShow && !isAdmin ? (
        <></>
      ) : (
        <Box className={classes.box}>
          <Box className={classes.boxBody}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box display="flex" alignItems="center">
                <AvatarComponent user={answer.user} />
                <Box className={classes.username}>{answer.user.username}</Box>
                <Box className={classes.dateTime}>
                  &middot;{postedTimeFormat(answer.date)}
                </Box>
              </Box>
              <Box>
                {isAuthenticated && isMd && (
                  <>
                    {!isEdit ? (
                      <Box>
                        <IconButton
                          className={classes.editbutton}
                          size="small"
                          onClick={() => setIsEdit(true)}
                        >
                          <RiEdit2Line />
                        </IconButton>
                        <IconButton
                          className={classes.cancelButton}
                          size="small"
                          onClick={onClickHide}
                        >
                          {isSubmitting ? <BiShow /> : <BiHide />}
                        </IconButton>
                        <IconButton
                          className={classes.deleteIcon}
                          onClick={onClickDelete}
                          size="small"
                        >
                          <RiDeleteBin7Line />
                        </IconButton>
                      </Box>
                    ) : (
                      <Box display="flex" alignItems="center">
                        <IconButton
                          className={classes.saveButton}
                          size="small"
                          onClick={onClickSaveEdit}
                        >
                          <RiCheckboxCircleFill />
                        </IconButton>
                        <IconButton
                          className={classes.cancelButton}
                          size="small"
                          onClick={onClickCancelEdit}
                        >
                          <MdCancel />
                        </IconButton>
                      </Box>
                    )}
                  </>
                )}
              </Box>
            </Box>
            {!isEdit ? (
              <Box py={1} className={classes.main}>
                <Box
                  className={classes.content}
                  dangerouslySetInnerHTML={{ __html: answer.content }}
                />
              </Box>
            ) : (
              <Box>
                <Editor
                  content={content}
                  onlyText={!isMd || !isAdmin}
                  onChangeContent={onChangeContent}
                />
              </Box>
            )}
          </Box>
          {currentUser.username !== answer.user.username || isAdmin ? (
            <Box className={classes.boxFooter}>
              <Box display="flex" alignItems="center">
                <Box
                  className={classes.answerAction}
                  onClick={() => onClickVote(1)}
                >
                  <IconButton className={classes.likeButton} size="small">
                    {Array.isArray(answer.likes) ? (
                      answer.likes.indexOf(currentUser.userID) == -1 ? (
                        <RiThumbUpLine />
                      ) : (
                        <RiThumbUpFill />
                      )
                    ) : (
                      <RiThumbUpLine />
                    )}
                  </IconButton>
                  {/* <img src="/images/icons/Heart.png" alt="likes" /> */}
                  <Box mx={1} className="likes">
                    {Array.isArray(answer.likes) ? answer.likes.length : 0}
                  </Box>
                </Box>

                <Box
                  className={classes.answerAction}
                  onClick={() => onClickVote(-1)}
                >
                  <IconButton className={classes.dislikeButton} size="small">
                    {Array.isArray(answer.dislikes) ? (
                      answer.dislikes.indexOf(currentUser.userID) == -1 ? (
                        <RiThumbDownLine />
                      ) : (
                        <RiThumbDownFill />
                      )
                    ) : (
                      <RiThumbDownLine />
                    )}
                  </IconButton>
                  {/* <img src="/images/icons/broken_heart.png" alt="dislikes" /> */}
                  <Box ml={1} className="dislikes">
                    {Array.isArray(answer.dislikes)
                      ? answer.dislikes.length
                      : 0}
                  </Box>
                </Box>
              </Box>
              {isAuthenticated && (isMd || isAdmin) && (
                <CustomButton
                  variant="contained"
                  size="md"
                  onClick={handleReferenceOpen}
                  style={{ marginLeft: "auto" }}
                >
                  Reference
                </CustomButton>
              )}
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
                    answerId={answer._id}
                    userID={userData.username}
                    categories={books || []}
                    myCategories={myBooks || []}
                    onSaveCategories={handleSaveBooks}
                  />
                </DialogContent>
              </Dialog>
            </Box>
          ) : null}
        </Box>
      )}
    </>
  );
};

AnswersListItem.propTypes = {
  answer: PropTypes.object.isRequired,
};

export default AnswersListItem;
