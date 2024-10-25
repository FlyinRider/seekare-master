import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  Avatar,
  Box,
  Grid,
  Paper,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { BiDislike, BiLike } from "react-icons/bi";

import TitleHeader from "app/main/admin/TitleHeader";
import * as API from "app/services/api";
import { postedTimeFormat } from "app/util/date";
import AvatarComponent from "app/main/shared-components/AvatarComponent";
import useSafeDispatch from "app/hooks/useSafeDispatch";
import { deleteAnswer, getAnswers } from "app/store/answer/actions";
import QuestionComponent from "./QuestionComponent";
import AnswerComponent from "./AnswerComponent";

const useStyles = makeStyles({
  root: { padding: "1rem" },
  content: {
    marginTop: "1rem",
  },
  questionPaper: {
    padding: "1rem",
    position: "relative",
  },
  tagItem: {
    margin: "0 0.5rem",
  },
  sectionTitle: {
    fontSize: "0.9rem",
    fontWeight: "bold",
  },
});

const QuestionDetail = () => {
  const classes = useStyles();
  const { questionID } = useParams();
  const dispatch = useDispatch();
  const safeDispatch = useSafeDispatch(dispatch);

  const [question, setQuestion] = useState(null);
  const answers = useSelector((state) => state.answer.answers);

  useEffect(() => {
    const fetchQuestion = async () => {
      const { question } = await API.questionService.getSingleQuestion(
        questionID
      );
      setQuestion(question);

      safeDispatch(getAnswers(questionID));
    };

    fetchQuestion();
  }, [questionID, safeDispatch]);

  const onUpdateQuestionHandler = (updated_question) => {
    setQuestion({ ...question, ...updated_question });
  };

  const onDeleteHander = (answerID) => {
    safeDispatch(deleteAnswer(answerID));
  };

  const mdResponse = useMemo(() => {
    if (question) {
      return answers.find((answer) => answer._id === question.mdResponse);
    } else {
      return null;
    }
  }, [answers, question]);

  if (!question) {
    return <Box>Loading</Box>;
  }

  return (
    <Box className={classes.root}>
      <TitleHeader title="Question Detail" breadcrumb="Questions / Detail" />

      <Grid
        container
        component={Box}
        mt={2}
        className={classes.content}
        spacing={2}
      >
        <Grid component={Box} item xs={12} md={9}>
          <QuestionComponent
            question={question}
            onUpdateQuestion={onUpdateQuestionHandler}
          />

          <Box mt={2}>
            <Typography variant="h6">MD Response</Typography>
            {mdResponse ? (
              <AnswerComponent
                answer={mdResponse}
                onClickDeleteAnswer={() => onDeleteHander(mdResponse._id)}
              />
            ) : (
              <Box>No MD Response</Box>
            )}
          </Box>

          <Box marginTop="1rem">
            <Typography variant="h6">Answers</Typography>

            {answers && (
              <Typography>{`${answers.length} Answers Found`}</Typography>
            )}

            {answers ? (
              answers.map(
                (answer_item) =>
                  answer_item._id !== question.mdResponse && (
                    <AnswerComponent
                      answer={answer_item}
                      key={answer_item._id}
                      onClickDeleteAnswer={() =>
                        onDeleteHander(answer_item._id)
                      }
                    />
                  )
              )
            ) : (
              <Typography>No Answers</Typography>
            )}
          </Box>
        </Grid>
        <Grid item xs={12} md={3}>
          <Box component={Paper} padding="1rem" variant="outlined" square>
            <Box>
              <Typography className={classes.sectionTitle}>Asked By</Typography>
              {question ? (
                <Box
                  marginRight="1rem"
                  marginBottom="1rem"
                  display="flex"
                  alignItems="center"
                >
                  <AvatarComponent
                    user={{ username: question.user.username }}
                  />
                  <Typography>{question.user.username}</Typography>
                </Box>
              ) : (
                <Skeleton>
                  <Avatar />
                </Skeleton>
              )}
            </Box>
            <Box>
              <Typography className={classes.sectionTitle}>Asked On</Typography>
              <Typography>{postedTimeFormat(question.date)}</Typography>
            </Box>
            <Box>
              <Typography className={classes.sectionTitle}>
                Responded MD
              </Typography>
              <Box display="flex" alignItems="center">
                <AvatarComponent user={question.mdResponded} />
                <Typography>{question.mdResponded?.username}</Typography>
              </Box>
            </Box>
            <Box>
              <Box
                display="flex"
                alignItems="center"
                fontSize="1rem"
                fontWeight="bold"
              >
                <BiLike />
                Likes
              </Box>
              <Typography>{question.likes ? question.likes : 0}</Typography>
            </Box>
            <Box>
              <Box
                display="flex"
                alignItems="center"
                fontSize="1rem"
                fontWeight="bold"
              >
                <BiDislike />
                Dislikes
              </Box>
              <Typography>
                {question.dislikes ? question.dislikes : 0}
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default QuestionDetail;
