import React from 'react';
import { Grid, Hidden, makeStyles, Typography } from '@material-ui/core';

import MemberShipCard from 'app/main/shared-components/MemberShipCard';
import TagList from 'app/main/shared-components/TagList';
import RightSidebar from 'app/main/layouts/ClientLayout/RightSidebar';

const useStyles = makeStyles((theme) => ({
  root: {},
  planTitle: {
    marginBottom: '20px',
    fontWeight: '700',
    color: theme.palette.text.primary,
  },
}));

const Plan = () => {
  const classes = useStyles();
  return (
    <Grid container className={classes.root}>
      <Hidden mdDown>
        <Grid item md={3}>
          <TagList />
        </Grid>
      </Hidden>
      <Grid item md={6}>
        <Typography component='h5' variant='h5' className={classes.planTitle}>
          Our Plan
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <MemberShipCard />
          </Grid>
          <Grid item xs={6}>
            <MemberShipCard type='premium' />
          </Grid>
        </Grid>
      </Grid>
      <Hidden>
        <Grid item md={3}>
          <RightSidebar />
        </Grid>
      </Hidden>
    </Grid>
  );
};

export default Plan;
