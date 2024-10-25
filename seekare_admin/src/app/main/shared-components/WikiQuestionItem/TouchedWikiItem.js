import React, { forwardRef } from "react";
import Highlighter from "react-highlight-words";
// import { useRouteMatch } from "react-router-dom";
import { useState } from "react";
import {
  RiShieldCrossLine,
  RiThumbUpLine,
  RiThumbDownLine,
} from "react-icons/ri";
// import Tooltip from '@mui/material/Tooltip';
import { useSelector } from "react-redux";
import {
  Box,
  makeStyles,
  Typography,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import { getTextFromHtml } from "app/util/helper";
import { getDateTime } from "app/util/date";
import HightLightTag from "../HighLightTag";
import AvatarComponent from "../AvatarComponent";
import CustomButton from "../Button";
import { useDispatch } from "react-redux";
import useSafeDispatch from "app/hooks/useSafeDispatch";
import { pushSnackbar } from "app/store/ui/actions";
import useAuth from "app/hooks/useAuth";

import { openModal } from "app/store/ui/actions";
import questionService from "app/services/api/question.service";
import { LIKING } from "app/constants";
import { voteQuestions, deleteReference } from "app/store/question/actions";
import { deleteAnswerReference } from "app/store/answer/actions";

import {
  CollectionsOutlined,
  ContactSupportOutlined,
} from "@material-ui/icons";
import DeleteIcon from "@material-ui/icons/Delete";

import { useEffect } from "react";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    padding: "0",
    margin: "16px 0",
    backgroundColor: theme.palette.secondary.lighter,
    borderRadius: "0.5rem",
    transition: "all 0.3s ease",
    border: `2px solid transparent`,
    "&:hover": {
      boxShadow: "0px 2px 12px -3px #0202028a",
      borderColor: theme.palette.secondary.main,
      "& $addWiki": {
        display: "block",
      },
    },
    "&:first-child": {
      marginTop: 0,
    },
  },
  //2020.02.16 Modified by. New style is applied to first Question if mdReviewed
  firstRootMDReviewed: {
    position: "relative",
    padding: "0",
    margin: "16px 0",
    marginTop: "16px",
    backgroundColor: theme.palette.secondary.lighter,
    borderRadius: "0.5rem",
    transition: "all 0.3s ease",
    border: `2px solid transparent`,
    "&:hover": {
      boxShadow: "0px 2px 12px -3px #0202028a",
      borderColor: theme.palette.secondary.main,
      "& $addWiki": {
        display: "block",
      },
    },
  },

  main: {
    padding: "0.8rem 1rem",
  },

  title: {
    color: theme.palette.text.secondary,
    fontWeight: "bold",
    fontSize: "1.1rem",
    lineHeight: "1.5rem",
    margin: "0.5rem 0",
    display: "block",
    cursor: "pointer",
    position: "relative",
  },

  titleText: {
    "& span": {
      overflow: "hidden",
      textOverflow: "ellipsis",
      display: "-webkit-box",
      "-webkit-line-clamp": 2 /* number of lines to show */,
      "-webkit-box-orient": "vertical",
    },
  },

  content: {
    fontSize: "0.8rem",
    lineHeight: "1.2rem",
    color: theme.palette.text.primary,
    overflow: "hidden",
    height: "2.3rem",
  },
  contentWrapper: {
    cursor: "pointer",
    position: "relative",
  },
  user: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "0.5rem",
    "& .username": {
      fontWeight: "bold",
      color: theme.palette.text.primary,
      margin: "0 0.5rem",
      fontSize: "0.8rem",
    },
    "& .time": {
      fontSize: "0.8rem",
      color: theme.palette.text.secondary,
    },
  },
  status: {
    marginRight: "0.5rem",
    display: "flex",
    alignItems: "center",
    fontSize: "0.9rem",
    cursor: "pointer",
    color: theme.palette.secondary.main,
    "&:hover": {
      color: theme.palette.secondary.main,
    },
  },
  thumbs: {
    display: "flex",
    alignItems: "center",
    padding: "16px",
  },
  questionActionBtn: {
    cursor: "pointer",
    transition: "all 0.3s ease",
    // "&:hover": {
    //   transform: "scale(1.1)",
    // },
    "& .likes": {
      color: theme.palette.secondary.main,
      fontSize: "1rem",
      fontWeight: "600",
    },
    "& .dislikes": {
      color: theme.palette.primary.main,
      fontSize: "1rem",
      fontWeight: "600",
    },
  },
  iconButton: {
    backgroundColor: theme.palette.secondary.lightest,
    marginRight: 10,
    borderRadius: 4,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  likeButton: {
    fontSize: "1rem",
    marginLeft: "20px",
    color: "#33a761",
  },
  dislikeButton: {
    fontSize: "1rem",
    padding: "3px",
  },
  tags: {
    display: "flex",
    alignItems: "center",
    "& span": {
      display: "block",
      padding: "0.5rem",
      borderRadius: "0.5rem",
      fontSize: "0.9rem",
      background: theme.palette.background.default,
      marginLeft: "0.5rem",
    },
  },
  bestAnswer: {
    backgroundColor: theme.palette.background.default,
    borderRadius: "0.5rem",
    padding: "0.5rem 1rem 1rem",

    "& p": {
      fontSize: "0.9rem",
      color: theme.palette.text.secondary,
      "& span": {
        cursor: "pointer",
        color: theme.palette.secondary.main,
      },
    },
  },
  bestAnswerTitle: {
    display: "flex",
    alignItems: "center",
    "& span": {
      margin: "0 0.5rem",
      fontWeight: "bold",
      fontSize: "0.9rem",
      color: theme.palette.text.primary,
    },
  },
  mdresponded: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 30,
    height: 30,
    borderRadius: "50%",
    background: theme.palette.secondary.main,
    color: "white",
    boxShadow: `0 0 10px ${theme.palette.secondary.light}`,
    marginTop: -40,
  },
  tagItem: {
    background: theme.palette.secondary.main,
    padding: "2px 5px",
    borderRadius: "3px",
    border: `1px solid ${theme.palette.secondary.main}`,
    textTransform: "uppercase",
    color: "white",
    fontSize: "0.8rem",
    cursor: "pointer",
    transition: "all 0.3s ease",
    "&:hover": {
      opacity: "0.8",
    },
  },
  addWiki: {
    display: "none",
    color: theme.palette.secondary.main,
    cursor: "pointer",
    fontSize: "0.9rem",
    "&:hover": {
      fontWeight: "bolder",
    },
  },
  qSettingText: {
    fontSize: "0.8rem",
    fontWeight: "bold",
    color: "#FFFFFF",
    background: theme.palette.secondary.main,
    padding: "5px",
  },
  cardCopyOverlay: {
    position: "absolute",
    top: 2,
    bottom: 0,
    left: 0,
    right: 20,
    height: "100%",
    width: "100%",
    opacity: 0,
    transition: "0.5s ease",
    "&:hover": {
      opacity: 1,
    },
  },
  delete: {
    position: "absolute",
    bottom: "2px",
    right: "0",
    color: "#FFCCCB",
    cursor: "pointer",
    "&:hover": {
      color: "red",
    },
  },
  cardCopyContentButton: {
    marginRight: "0px",
  },
  username: {
    color: theme.palette.text.secondary,
    padding: "0 10px",
    fontWeight: "bold",
  },
  dateTime: {
    color: theme.palette.text.primary,
    fontSize: "0.8rem",
  },
  mdReviewedTooltip: {
    backgroundColor: "rgb(76, 111, 255)",
    color: "white",
    fontSize: "0.8rem",
  },
}));

const TouchedWikiItem = forwardRef(
  (
    {
      item_question,
      queries,
      index,
      onClick,
      onClickAlt,
      searchTerm,
      referencedPosts,
      handleDeleteFilteredItem,
    },
    ref
  ) => {
    const [question, setQuestion] = useState(() => item_question);
    const [referenced, setReferenced] = useState("");
    const classes = useStyles();
    const dispatch = useDispatch();
    const safeDispatch = useSafeDispatch(dispatch);
    const { isMd: isMdUser, isAuthenticated, isAdmin } = useAuth();
    const handleCopyText = (e, text) => {
      navigator.clipboard.writeText(text);
      dispatch(pushSnackbar("Copied the text successfully!", "info"));
      e.stopPropagation();
    };
    const userData = useSelector((state) => state.auth.auth.user_data);
    const { id: activeWikiId } = useSelector((state) => state.wiki.activeWiki);

    const location = useLocation();
    const pathname = location.pathname;

    useEffect(() => {
      setQuestion(item_question);
      if (question.referencedBooks !== undefined) {
        let temp = question.referencedBooks;
        setReferenced(Object.keys(temp)[0]);
      }
    }, [item_question]);

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

      try {
        const res = await questionService.vote(
          question._id,
          userData.userID,
          vote
        );
        // console.log("ClickOnVote, res", res);
        safeDispatch(voteQuestions(res.question));

        setQuestion({ ...question, ...res.question });
      } catch (error) {
        const { message } = error;
        console.log("Question:error", error);
        safeDispatch(pushSnackbar(message, "error"));
      }
    };

    const conditionalClick = () => {
      if (
        !pathname.includes("/show") &&
        (isMdUser || isAdmin) &&
        activeWikiId !== undefined &&
        !referencedPosts
      ) {
        return () => onClickAlt(question);
      } else return () => onClick(question);
    };

    const handleDeleteReference = () => {
      if (question.questionID !== undefined) {
        return () => handleDeleteAnswerReference();
      } else return () => handleDeleteQuestionReference();
    };

    const handleDeleteQuestionReference = () => {
      handleDeleteFilteredItem(item_question);
      dispatch(deleteReference(question._id, userData.userID, activeWikiId));
    };
    const handleDeleteAnswerReference = () => {
      handleDeleteFilteredItem(item_question);
      dispatch(
        deleteAnswerReference(question._id, userData.userID, activeWikiId)
      );
    };
    return (
      <>
        {isAdmin || !question.banned ? (
          <Box
            className={
              index === 0 && question.mdReviewed
                ? classes.firstRootMDReviewed
                : classes.root
            }
          >
            {/* <Tooltip
            title={`${referenced !== '' ? `Referenced by ${referenced}`:''}`}
            placement="left-start"
            classes={{ tooltip: classes.mdReviewedTooltip }}
          > */}

            <Box
              className={classes.main}
              style={{ cursor: "pointer" }}
              onClick={conditionalClick()}
            >
              <Box
                className={classes.user}
                display="flex"
                width="100%"
                justifyContent="space-between"
              >
                <Box display="flex" alignItems="center">
                  <AvatarComponent user={question.user} size="small" />
                  <Box className={classes.username}>
                    {question.user.username}
                  </Box>
                  <Box
                    className={classes.dateTime}
                    display="flex"
                    alignItems="center"
                  >
                    <img
                      width={16}
                      height={16}
                      src="/images/icons/calendar.svg"
                      alt="calendar"
                      style={{
                        marginRight: 5,
                      }}
                    />
                    {activeWikiId == undefined
                      ? getDateTime(question.date).date
                      : ""}
                  </Box>
                  <Box
                    ml={0.5}
                    className={classes.dateTime}
                    display="flex"
                    alignItems="center"
                  >
                    <img
                      width={16}
                      height={16}
                      src="/images/icons/clock.svg"
                      alt="clock"
                      style={{
                        marginRight: 5,
                      }}
                    />
                    {getDateTime(question.date).time}
                  </Box>
                  <Box
                    display="flex"
                    alignItems="center"
                    className={classes.questionActionBtn}
                    // onClick={() => onClickVote(1)}
                  >
                    {/* <img src="/images/icons/Heart.png" alt="likes" /> */}
                    <IconButton className={classes.likeButton} size="small">
                      <RiThumbUpLine />
                    </IconButton>
                    <Box ml={0.5} className="likes">
                      {Array.isArray(question.likes)
                        ? question.likes.length
                        : 0}
                    </Box>
                  </Box>
                  <Box
                    display="flex"
                    alignItems="center"
                    ml={2}
                    className={classes.questionActionBtn}
                    // onClick={() => onClickVote(-1)}
                  >
                    {/* <img src="/images/icons/broken_heart.png" alt="dislikes" /> */}
                    <IconButton className={classes.dislikeButton} size="small">
                      <RiThumbDownLine />
                    </IconButton>
                    <Box ml={1} className="dislikes">
                      {Array.isArray(question.dislikes)
                        ? question.dislikes.length
                        : 0}
                    </Box>
                  </Box>
                </Box>

                {question.mdReviewed && (
                  <Tooltip
                    title="MD responded!"
                    placement="left-start"
                    classes={{ tooltip: classes.mdReviewedTooltip }}
                  >
                    <Box className={classes.mdresponded}>
                      <RiShieldCrossLine />
                    </Box>
                  </Tooltip>
                )}
              </Box>
              <Box className={classes.title}>
                <Highlighter
                  highlightClassName="high-lighted"
                  searchWords={queries ? queries : []}
                  autoEscape={true}
                  textToHighlight={question.title}
                  className={classes.titleText}
                  highlightTag={({ children }) => (
                    <HightLightTag>{children}</HightLightTag>
                  )}
                />
                <Box className={classes.cardCopyOverlay}>
                  <Box
                    display="flex"
                    justifyContent="flex-end"
                    alignItems="center"
                  >
                    {/* {isMdUser && (
                    <CustomButton
                      type="button"
                      size="sm"
                      variant="contained"
                      color="secondary"
                      onClick={(e) =>
                        handleCopyText(e, getTextFromHtml(question.title))
                      }
                      className={classes.cardCopyContentButton}
                    >
                      Copy
                    </CustomButton>
                  )} */}
                  </Box>
                </Box>
              </Box>
              {activeWikiId != undefined &&
              searchTerm.length <= 1 &&
              !pathname.includes("/show") &&
              !referencedPosts &&
              (isMdUser || isAdmin) ? (
                <Box className={classes.contentWrapper}>
                  <Typography className={classes.content}>
                    <Highlighter
                      highlightClassName="high-lighted"
                      searchWords={queries ? queries : []}
                      autoEscape={true}
                      textToHighlight={getTextFromHtml(question.content)}
                      highlightTag={({ children }) => (
                        <HightLightTag>{children}</HightLightTag>
                      )}
                    />
                  </Typography>
                  <Box className={classes.cardCopyOverlay}>
                    <Box
                      display="flex"
                      justifyContent="flex-end"
                      alignItems="center"
                    ></Box>
                  </Box>
                </Box>
              ) : (
                <></>
              )}
            </Box>
            {/* </Tooltip> */}
            {/* <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              padding="0.5rem 1rem"
              borderTop="1px solid #e5e5e5"
            >
              <Box display="flex" justifyContent="space-between">
                <Box display="flex">
                  <Box className={classes.status}>
                    <Box className={classes.thumbs}></Box>
                  </Box>
                </Box>
              </Box>
            </Box> */}
            {activeWikiId != undefined &&
            searchTerm.length <= 1 &&
            !pathname.includes("/show") &&
            !referencedPosts &&
            (isMdUser || isAdmin) ? (
              <Box>
                <DeleteIcon
                  className={classes.delete}
                  onClick={handleDeleteReference()}
                />
              </Box>
            ) : (
              <></>
            )}
          </Box>
        ) : (
          <></>
        )}
      </>
    );
  }
);

export default TouchedWikiItem;
