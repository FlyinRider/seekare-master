import React, { useCallback, useEffect } from 'react';
import {
  makeStyles,
  Container,
  Grid,
  Box,
  Paper,
  Typography,
  Chip,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import useSafeDispatch from 'app/hooks/useSafeDispatch';
import {
  getPopularKeywords,
  getUsagesByKeyword,
} from 'app/store/keywords/actions';
import RatioTableByKeyword from './RatioTableByKeyword';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  tagChip: {
    display: 'flex',
    justifyContent: 'flex-start',
    maxWidth: '100%',
    width: 'fit-content',
    margin: '5px',
  },
}));

const AdminSearchKeywordPage = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const safeDispatch = useSafeDispatch(dispatch);

  const keywords = useSelector((selector) => selector.keywords.keywords);
  const userUsagesByKey = useSelector(
    (selector) => selector.keywords.usageByKey
  );

  useEffect(() => {
    safeDispatch(getPopularKeywords());
  }, [safeDispatch]);

  const handleSelectKeyword = useCallback(
    (key) => {
      safeDispatch(getUsagesByKeyword(key));
    },
    [safeDispatch]
  );
  const handleUserSelect = (userId) => {
    console.log(userId);
  };

  return (
    <Container maxWidth='lg' className={classes.container}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography
              component='h2'
              variant='h6'
              color='secondary'
              gutterBottom
            >
              Popular Keywords ({keywords.length})
            </Typography>
            <Box display='flex' flexWrap='wrap'>
              {keywords &&
                keywords.map(({ name, count }) => (
                  <Chip
                    key={name}
                    className={classes.tagChip}
                    label={`${name} ${count}`}
                    onClick={() => handleSelectKeyword(name)}
                  />
                ))}
            </Box>
          </Paper>
        </Grid>
        {userUsagesByKey && (
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Typography
                component='h2'
                variant='h6'
                color='secondary'
                gutterBottom
              >
                Search : {userUsagesByKey.keyword} (
                {userUsagesByKey.users.length})
              </Typography>
              {userUsagesByKey.users && (
                <RatioTableByKeyword
                  users={userUsagesByKey.users}
                  onUserSelect={handleUserSelect}
                />
              )}
            </Paper>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default AdminSearchKeywordPage;
