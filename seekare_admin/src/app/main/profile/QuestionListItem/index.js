import React from "react";
import { Box, makeStyles } from "@material-ui/core";
import { RiQuestionAnswerFill } from "react-icons/ri";

import { getDateTime } from "app/util/date";
import AvatarComponent from "app/main/shared-components/AvatarComponent";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    borderRadius: "8px",
    backgroundColor: theme.palette.secondary.lightest,
    padding: "0.5rem 1rem",
  },
  questionItem: {
    color: theme.palette.text.secondary,
    lineHeight: "100%",
    fontWeight: "bold",
    padding: "5px 0",
  },
  icon: {
    color: theme.palette.secondary.main,
    padding: "0 10px",
  },
  dateTime: {
    color: theme.palette.text.primary,
    fontSize: "0.8rem",
  },
}));

const QuestionListItem = ({ question }) => {
  const classes = useStyles();
  return (
    <Box key={question._id} className={classes.root}>
      <Box className={classes.icon}>
        <RiQuestionAnswerFill />
      </Box>
      <Box display="flex" flexDirection="column" alignItems="flex-start">
        <Box display="flex" alignItems="center">
          {/* <AvatarComponent user={question.user} size="small" /> */}
          {/* <Box className={classes.username}>{question.user.username}</Box> */}
          <Box className={classes.dateTime} display="flex" alignItems="center">
            <img
              width={16}
              height={16}
              src="/images/icons/calendar.svg"
              alt="calendar"
              style={{
                marginRight: 5,
              }}
            />
            {getDateTime(question.date).date}
          </Box>
          <Box
            ml={1}
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
        </Box>
        <Box
          component="a"
          href={`/questions/${question._id}/show`}
          className={classes.questionItem}
        >
          {question.title}
        </Box>
      </Box>
    </Box>
  );
};

export default QuestionListItem;
