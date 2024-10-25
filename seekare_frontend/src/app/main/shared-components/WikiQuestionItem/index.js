import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { BiPlus } from "react-icons/bi";
import { useDispatch } from "react-redux";
import Highlighter from "react-highlight-words";
import { RiShieldCrossLine, RiThumbUpLine } from "react-icons/ri";

import {
  Box,
  makeStyles,
  IconButton,
  Typography,
  Menu,
  MenuItem,
} from "@material-ui/core";

import { reloadCurrentWiki, updateWiki } from "app/store/wiki/actions";
import { useSelectWiki } from "app/hooks/useSelectWiki";
import { getTextFromHtml } from "app/util/helper";
import { postedTimeFormat } from "app/util/date";

import HightLightTag from "../HighLightTag";
import AvatarComponent from "../AvatarComponent";
import { wikiCategories } from "./wikiCategories";

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
      "& $addWiki": {
        display: "block",
      },
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
    overflow: "hidden",
    height: "2.3rem",
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
}));

const WikiQuestionItem = ({ question, queries, size }) => {
  const classes = useStyles();
  const history = useHistory();

  const dispatch = useDispatch();
  const wikiSel = useSelectWiki();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const [selectedCategory, setSelectedCategory] = useState(null);

  const selectCategory = (_key) => {
    setSelectedCategory(_key);
    setAnchorEl(null);

    if (!wikiSel || !question) return false;

    if (wikiSel.questions) {
      if (wikiSel.questions.findIndex((q) => q._id === question._id) >= 0)
        return;

      dispatch(
        updateWiki(wikiSel._id, {
          ...wikiSel,
          questions: [
            ...wikiSel.questions,
            { _id: question._id, category: _key.name },
          ],
        })
      );
      dispatch(reloadCurrentWiki());
    }
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
            {question.mdReviewed && <RiShieldCrossLine />}
          </Box>
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
              <IconButton className={classes.likeButton} size="small">
                <RiThumbUpLine />
              </IconButton>
              {/* <img src="/images/icons/helpful.svg" alt="helpful" />{" "} */}
              {question.likes} Helpfuls
            </Box>
          </Box>
        </Box>

        <Box className={classes.qSetting} display="flex" alignItems="center">
          {selectedCategory && (
            <Box marginRight="0.5rem" className={classes.qSettingText}>
              Added to {selectedCategory?.displayName}
            </Box>
          )}
          <Box className={classes.addWiki}>
            <IconButton size="small" onClick={handleClick}>
              <BiPlus />
            </IconButton>
            Add To Wiki
          </Box>

          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            onClose={() => setAnchorEl(null)}
          >
            {wikiCategories.map((_key) => (
              <MenuItem key={_key.name} onClick={() => selectCategory(_key)}>
                {_key.displayName}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Box>
    </Box>
  );
};

export default WikiQuestionItem;
