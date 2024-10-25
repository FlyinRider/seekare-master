import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Box, Grid, makeStyles, Paper, Typography } from '@material-ui/core';

import * as API from 'app/services/api';
import useAuth from 'app/hooks/useAuth';
import useSafeDispatch from 'app/hooks/useSafeDispatch';
import { pushSnackbar } from 'app/store/ui/actions';
import QuestionTirageItem from './QuestionTriageItem';

export const useStyles = makeStyles({
  root: {
    padding: '2rem',
  },
  triaged: {
    padding: '1rem',
  },
});

const QuestionsTriage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const safeDispatch = useSafeDispatch(dispatch);
  const [questionsTriage, setQuestionsTriage] = useState([]);
  const { isTriage } = useAuth();

  const fetch = async () => {
    const { questions_untagged } =
      await API.questionService.getUntaggedQuestions();

    setQuestionsTriage(questions_untagged);
  };

  useEffect(() => {
    fetch();
  }, []);

  const onSubmitTagsHandler = () => {
    fetch();
  };

  if (!isTriage) {
    safeDispatch(
      pushSnackbar('Only Triage Can access to this Page', 'warning')
    );

    return <Redirect to='/questions' />;
  }

  return (
    <Box className={classes.root}>
      <Grid container>
        <Grid item xs={12} sm={3} md={2}>
          <Paper className={classes.triaged}>
            <Typography>Recent Questions Triaged By You</Typography>
            {questionsTriage.length > 0 ? (
              <>
                {questionsTriage.map((_qItem) => (
                  <Box
                    key={_qItem._id}
                    fontSize='1rem'
                    padding='0.3rem 0'
                    overflow='hidden'
                  >
                    <Link to={`/questions/${_qItem._id}/show`}>
                      {_qItem.title}
                    </Link>
                  </Box>
                ))}
              </>
            ) : (
              <Box>No Questions To Triage</Box>
            )}
          </Paper>
        </Grid>
        <Grid item xs={12} sm={9} md={10} component={Box} padding='0 1rem'>
          <Typography variant='h6' component='h1'>
            Questions To Triage
          </Typography>
          {questionsTriage.length > 0 ? (
            <>
              <Typography variant='body1'>
                {questionsTriage.length} Questions
              </Typography>
              {questionsTriage.map((_qItem) => (
                <QuestionTirageItem
                  key={_qItem._id}
                  question={_qItem}
                  onSubmitTags={onSubmitTagsHandler}
                />
              ))}
            </>
          ) : (
            <Box>No Questions To Triage</Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default QuestionsTriage;
