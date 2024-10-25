import React, { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Box, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

import {
  BiMessageCheck,
  BiPlusMedical,
  BiQuestionMark,
  BiUserPlus,
} from "react-icons/bi";

import { DashboardContext } from "app/context/admin/dashboard";
import useSafeDispatch from "app/hooks/useSafeDispatch";
import ShowCaseCard from "./ShowCaseCard";
import SignUpUserAnalysis from "./SignUpUserAnalysis";
import InviteEmailAnalysis from "./InviteEmailAnalysis";
import { getQuestions } from "app/store/question/actions";

const useStyles = makeStyles({
  root: {
    padding: "1.5rem",
  },
  showCases: {
    padding: "1rem 0",
  },
  showCaseItem: {
    padding: "0.5rem",
  },
});

const Dashboard = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const safeDispatch = useSafeDispatch(dispatch);

  useEffect(() => {
    fetchUserData();
    fetchUserCommonData();
    fetchInviteEmailData();
    safeDispatch(getQuestions({}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const {
    fetchUserData,
    fetchUserCommonData,
    fetchInviteEmailData,
    state: { user, common, email: inviteEmail },
  } = useContext(DashboardContext);

  return (
    <Box className={classes.root}>
      <Box className={classes.titleHeader}>
        <Typography component="h2" variant="h6">
          Welcome Admin
        </Typography>
        <Typography>Dashboard</Typography>
      </Box>
      <Grid container component="section" className={classes.showCases}>
        <Grid item xs={12} md={3} className={classes.showCaseItem}>
          <ShowCaseCard
            icon={<BiUserPlus fontSize="2rem" color="#00D0F1" />}
            number={`${common.users || 0}`}
            title="users"
            color="#00D0F1"
          />
        </Grid>
        <Grid item xs={12} md={3} className={classes.showCaseItem}>
          <ShowCaseCard
            icon={<BiQuestionMark fontSize="2rem" color="#e84646" />}
            number={`${common.quizs || 0}`}
            title="questions"
            color="#e84646"
          />
        </Grid>
        <Grid item xs={12} md={3} className={classes.showCaseItem}>
          <ShowCaseCard
            icon={<BiMessageCheck fontSize="2rem" color="#699834" />}
            number={`${common.wikis || 0}`}
            title="Wikis"
            color="#699834"
          />
        </Grid>
        <Grid item xs={12} md={3} className={classes.showCaseItem}>
          <ShowCaseCard
            icon={<BiPlusMedical fontSize="2rem" color="#09e5ab" />}
            number={`${common.emails || 0}`}
            title="Invite Emails"
            color="#09e5ab"
          />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12} md={6}>
          <InviteEmailAnalysis
            labels={inviteEmail?.labels || []}
            data={inviteEmail?.data || []}
            loading={inviteEmail?.loading}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <SignUpUserAnalysis
            labels={user.labels || []}
            data={user.data || []}
            loading={user.loading}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
