import React from "react";
import { Box, makeStyles, Typography } from "@material-ui/core";

import useAuth from "app/hooks/useAuth";
import AnswersListItem from "./AnswersListItem";

const useStyles = makeStyles({
  root: {},
});

const AnswersList = ({ answers, question }) => {
  const classes = useStyles();
  const { currentUser } = useAuth();

  return (
    <Box className={classes.root}>
      {answers && answers.length > 0 ? (
        <>
          {answers.map(
            (_answer) =>
              question.mdResponse !== _answer._id && (
                <AnswersListItem
                  key={_answer._id}
                  answer={_answer}
                  isAssignedMd={question.mdAssigned === currentUser.userID}
                  isMdAnswer={question.mdResponse === _answer._id}
                />
              )
          )}
        </>
      ) : (
        <Typography></Typography>
      )}
    </Box>
  );
};

export default AnswersList;
