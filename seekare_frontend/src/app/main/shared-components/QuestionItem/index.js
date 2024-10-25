import React, { useMemo } from "react";
import { RiShieldCrossLine, RiThumbUpLine } from "react-icons/ri";
import { Link, useHistory } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import Highlighter from "react-highlight-words";
import { Box, makeStyles, Typography, IconButton } from "@material-ui/core";

import { postedTimeFormat } from "app/util/date";
import { getSortedQuestions } from "app/store/question/actions";
import { getTextFromHtml } from "app/util/helper";
import AvatarComponent from "../AvatarComponent";
import HightLightTag from "../HighLightTag";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "0",
    margin: "16px 0",
    backgroundColor: "white",
    borderRadius: "0.5rem",
    transition: "all 0.3s ease",
    border: `2px solid transparent`,
    "&:hover": {
      boxShadow: "0px 2px 12px -3px #0202028a",
      borderColor: theme.palette.secondary.main,
    },
  },
  main: {
    padding: "0.8rem 1rem",
    cursor: "pointer",
  },
  title: {
    color: theme.palette.text.primary,
    fontWeight: "bold",
    fontSize: "1.1rem",
    lineHeight: "1.5rem",
    margin: "0.5rem 0",
    display: "block",
  },

  content: {
    fontSize: "0.8rem",
    lineHeight: "1.2rem",
    color: theme.palette.text.primary,
    height: 60,
    overflow: "hidden",
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
    color: theme.palette.text.primary,
    "&:hover": {
      color: theme.palette.secondary.main,
    },
  },
  likeButton: {
    fontSize: "1.2rem",
    color: "#33a761",
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
    color: theme.palette.secondary.main,
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

    maxWidth: "100px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",

    "&:hover": {
      opacity: "0.8",
    },
  },
}));

const QuestionItem = ({ question, queries, size }) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  console.log(question);
  console.log(queries);
  const tags = useSelector((state) => state.tag.tags);

  const questionTags = useMemo(() => {
    const tagItems = [];
    question.mapTags.forEach((item) => {
      const idx = tags.findIndex((tagItem) => tagItem._id === item.tagID);
      if (idx > -1) {
        tagItems.push(tags[idx]);
      }
    });

    return tagItems;
  }, [question.mapTags, tags]);

  const tagClickHandler = (tagTitle) => {
    dispatch(
      getSortedQuestions({
        tags: [tagTitle],
      })
    );
  };

  const onClickStatus = () => {
    history.push(`/questions/${question._id}/show`);
  };

  return (
    <Box className={classes.root}>
      <Box
        className={classes.main}
        onClick={() => history.push(`/questions/${question._id}/show`)}
      >
        <Box
          className={classes.user}
          display="flex"
          width="100%"
          justifyContent="space-between"
        >
          <Box display="flex" alignItems="center">
            <AvatarComponent user={question.user} size="small" />
            <Box className="username">{question.user.username}</Box>
            <Box className="time">
              &middot;{postedTimeFormat(question.date)}
            </Box>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            ml={2}
            className={classes.mdresponded}
          >
            {question.mdReviewed && (
              <>
                <RiShieldCrossLine />
                <Box fontSize="0.8rem" fontWeight="bold">
                  MD Responded
                </Box>
              </>
            )}
          </Box>
          {/* in {question.category} */}
        </Box>
        <Link to={`/questions/${question._id}/show`} className={classes.title}>
          <Highlighter
            highlightClassName="high-lighted"
            searchWords={queries ? queries : []}
            autoEscape={true}
            textToHighlight={question.title}
            highlightTag={({ children }) => (
              <HightLightTag>{children}</HightLightTag>
            )}
          />
        </Link>
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
      </Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        padding="0.5rem 1rem"
        borderTop="1px solid #e5e5e5"
      >
        <Box
          display="flex"
          justifyContent="space-between"
          onClick={onClickStatus}
        >
          <Box display="flex">
            <Box className={classes.status}>
              {/* <img src="/images/icons/helpful.svg" alt="helpful" /> */}
              <IconButton className={classes.likeButton} size="small">
                <RiThumbUpLine />
              </IconButton>
              {question.likes} Helpfuls
            </Box>
            <Box className={classes.status}>
              <img src="/images/icons/Chat.png" alt="answers" />
              {question.answers && question.answers.length > 0 ? (
                <Box ml={1}>{question.answers.length} answers</Box>
              ) : (
                <Box ml={1}>No Answer</Box>
              )}
            </Box>
          </Box>
        </Box>

        <Box className={classes.tags}>
          {questionTags.map((item) => (
            <Box
              key={item}
              className={classes.tagItem}
              ml={1}
              onClick={() => tagClickHandler(item.title)}
            >
              {item.title}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default QuestionItem;
