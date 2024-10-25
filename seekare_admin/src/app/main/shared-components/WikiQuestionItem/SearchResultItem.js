import React from "react";
import { useDispatch } from "react-redux";
import Highlighter from "react-highlight-words";
import { Box, Divider, makeStyles, Typography } from "@material-ui/core";

import { getTextFromHtml } from "app/util/helper";
import HightLightTag from "../HighLightTag";
import { fetchWikiByID, showWikiListWindow } from "app/store/wiki/actions";
import { useHistory } from "react-router-dom";

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
    height: 40,
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
}));

const WikiSearchResultItem = ({ wiki, keyword, size }) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const handleCloseDialog = () => {
    dispatch(showWikiListWindow(false));
  };
  const handleClickItem = async (wiki) => {
    await dispatch(fetchWikiByID(wiki?._id));
    handleCloseDialog();
    history.push("/wiki");
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.main} onClick={() => handleClickItem(wiki)}>
        <Typography variant="h6" component="h2" className={classes.title}>
          Title:
          <Highlighter
            highlightClassName="high-lighted"
            searchWords={keyword ? [keyword] : []}
            autoEscape={true}
            textToHighlight={wiki.title}
            highlightTag={({ children }) => (
              <HightLightTag>{children}</HightLightTag>
            )}
          />
        </Typography>
        <Divider />
        <Typography className={classes.content}>
          <Highlighter
            highlightClassName="high-lighted"
            searchWords={keyword ? [keyword] : []}
            autoEscape={true}
            textToHighlight={getTextFromHtml(wiki.content)}
            highlightTag={({ children }) => (
              <HightLightTag>{children}</HightLightTag>
            )}
          />
        </Typography>
      </Box>
    </Box>
  );
};

export { WikiSearchResultItem };
