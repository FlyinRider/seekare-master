import React from "react";
import { makeStyles, Box, Typography, List, ListItem } from "@material-ui/core";

import ReferButton from "app/main/shared-components/ReferButton";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { Bookmarks } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    overflow: "hidden auto",
    height: "calc(100vh - 90px)",
    padding: 3,
    position: "relative",
    display: "flex",
    flexDirection: "column",
  },
  tagSearch: {
    border: "none",
    borderRadius: "0.5rem",
    boxShadow: "1px 1px 7px -6px black",
    padding: "0.7rem 0",
    paddingLeft: "2rem",
    width: "100%",
    fontSize: "1.2rem",
    outline: "none",
    color: theme.palette.primary.secondary,
  },
  menuIcon: {
    fontSize: 25,
    cursor: "pointer",
    marginLeft: 10,
  },
  searchInputWrapper: {
    padding: "10px 5px",
  },
  mainContent: {
    padding: "1rem",
    flex: 1,
    overflow: "hidden auto",
  },
  title: {
    color: theme.palette.text.primary,
  },
  candidate: {
    marginTop: 10,
  },
  candidateTitle: {
    textAlign: "center",
    color: theme.palette.secondary.main,
    display: "flex",
    alignItems: "center",
  },
  wikiActions: {
    marginTop: 0,
    display: "flex",
    justifyContent: "flex-start",
    marginBottom: "50px",
  },
  items: {
    padding: 0,
    margin: 0,
    marginTop: "10px",
    listStyle: "none",
  },
  item: {
    textTransform: "capitalize",
    fontSize: "1rem",
    fontWeight: "700",
    marginBottom: "0.5rem",
    cursor: "pointer",

    "&:hover": {
      color: theme.palette.secondary.main,
      fontWeight: 700,
    },
    "&.selected": {
      color: theme.palette.secondary.main,
      fontWeight: "bold",
    },
  },
  leftBottom: {
    position: "relative",
    marginTop: 10,
  },
  copywrite: {
    color: theme.palette.text.secondary,
  },
  libaryIcon: {
    color: theme.palette.secondary.main,
  },
}));

const AskQuestionLeft = () => {
  const classes = useStyles();
  const { candidates } = useSelector((state) => state.question.similars);
  const history = useHistory();

  const onClickQuizItem = (id) => {
    history.push(`/wiki/question/${id}/show`);
  };

  return (
    <Box className={classes.root}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        px={2}
      >
        <Typography
          variant="h6"
          component="h4"
          className={classes.candidateTitle}
        >
          <Bookmarks />
          Similar KarePosts
        </Typography>
      </Box>
      <Box className={classes.mainContent}>
        <Box className={classes.candidate}>
          {candidates && candidates.length > 0 ? (
            <List component="ul" className={classes.items}>
              {candidates.map((candidate) => (
                <ListItem
                  button
                  divider
                  width="100%"
                  maxHeight="10rem"
                  overflow="hidden"
                  disableGutters
                  key={candidate._id}
                  onClick={() => onClickQuizItem(candidate._id)}
                >
                  <Box component="li" className={classes.item}>
                    <Box component="span" mr={1}>
                      {candidate.title}
                    </Box>
                  </Box>
                </ListItem>
              ))}
            </List>
          ) : (
            <Box></Box>
          )}
        </Box>
      </Box>
      <Box className={classes.leftBottom}>{/* <ReferButton /> */}</Box>
    </Box>
  );
};

export default AskQuestionLeft;
