import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Grid, Typography } from '@material-ui/core';

import { getSortedQuestions } from 'app/store/question/actions';
import QuestionItem from 'app/main/shared-components/QuestionItem';
import useAuth from 'app/hooks/useAuth';
import MDSwitch from 'app/main/shared-components/MDSwitch';
import useStyles from '../useStyles';

const HomeContent = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [currentTab, setCurrentTab] = useState();
  const [onlyMDReponded, setOnlyMDReponded] = useState(false);

  const { questions } = useSelector((state) => state.question);
  const { isAuthenticated, currentUser } = useAuth();

  useEffect(() => {
    const fetchQuestions = async (searchQuery, qSetting) => {
      return dispatch(
        getSortedQuestions({
          q: searchQuery,
          qSetting,
        })
      );
    };

    fetchQuestions();
  }, [dispatch]);

  const onChangeTabHandler = useCallback(
    (tab) => {
      setCurrentTab(tab);
      switch (tab) {
        case 'recents':
          dispatch(getSortedQuestions({ tab: 'recents' }));
          break;
        case 'asked':
          dispatch(
            getSortedQuestions({ tab: 'asked', userID: currentUser.userID })
          );
          break;
        case 'answered':
          dispatch(
            getSortedQuestions({ tab: 'answered', userID: currentUser.userID })
          );
          break;
        default:
          dispatch(getSortedQuestions({ tab: 'recents' }));
          break;
      }
    },

    [currentUser.userID, dispatch]
  );

  const filteredQuestions = useMemo(() => {
    return onlyMDReponded
      ? questions.filter((item) => item.mdReviewed)
      : questions;
  }, [onlyMDReponded, questions]);

  return (
    <Box>
      {isAuthenticated && (
        <Box className={classes.tabs} position='relative'>
          <Box
            className={[
              classes.tabsItem,
              currentTab === 'recents' && 'active',
            ].join(' ')}
            onClick={() => onChangeTabHandler('recents')}
          >
            New Questions
          </Box>

          <Box
            className={[
              classes.tabsItem,
              currentTab === 'asked' && 'active',
            ].join(' ')}
            onClick={() => onChangeTabHandler('asked')}
          >
            Your Questions
          </Box>
          <Box
            className={[
              classes.tabsItem,
              currentTab === 'answered' && 'active',
            ].join(' ')}
            onClick={() => onChangeTabHandler('answered')}
          >
            Your Answers
          </Box>

          <Box position='absolute' right='0'>
            <Typography component='div'>
              <Grid component='label' container alignItems='center' spacing={1}>
                <Grid item>{onlyMDReponded ? 'MD Responded' : 'All'}</Grid>
                <Grid item>
                  <MDSwitch
                    checked={onlyMDReponded}
                    onChange={(e) => setOnlyMDReponded(e.target.checked)}
                    name='onlyMDResponded'
                  />
                </Grid>
              </Grid>
            </Typography>
          </Box>
        </Box>
      )}

      <Box py={2} className={classes.questions}>
        {filteredQuestions?.map((item) => (
          <QuestionItem key={item._id} question={item} />
        ))}
      </Box>
    </Box>
  );
};

export default HomeContent;
