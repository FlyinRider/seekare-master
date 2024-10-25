import React from "react";
import { makeStyles, Grid, Typography, Box } from "@material-ui/core";
import { useDispatch } from "react-redux";

import CustomButton from "app/main/shared-components/Button";
import { openModal } from "app/store/ui/actions";
import useAuth from "app/hooks/useAuth";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    minHeight: "300px",
    borderRadius: "1rem",
    position: "relative",
    backgroundImage:
      "linear-gradient(90.18deg, #c5c5c59e -1.25%, rgba(88, 101, 134, 0) 99.88%)",
    boxShadow: "3px 9px 17px 0px #e1e1e1",
    [theme.breakpoints.down("sm")]: {
      minHeight: "215px",
    },
    "&>img": {
      width: "100%",
      height: "100%",
      borderRadius: "1rem",

    }
  },
  content: {
    zIndex: "1",
    display: "flex",
    alignItems: "center",
    width: "100%",
    height: "100%",
    position: "absolute",
    top: "0",
    [theme.breakpoints.down("sm")]: {
      top: "85%",
      textAlign: "center"
    },
  },
  text: {
    fontSize: "1.4rem",
    color: theme.palette.text.secondary,
  },
  desc: {
    fontSize: "1.2rem",
    color: "#353C48",
    padding: "10px 0",
  },
  joinButton: {
    padding: "0.5rem 1.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background:
      "linear-gradient(304.29deg, rgba(1, 68, 241, 0.45) 16.08%, rgba(0, 163, 255, 0.45) 85.75%), linear-gradient(270deg, #8743FF 0%, #4136F1 100%), #3F8CFF",
    boxShadow: "0px 6px 12px rgba(63, 140, 255, 0.263686)",
    borderRadius: "0.8rem",
    margin: "auto",
    "& img": {
      width: "1.2rem",
      marginRight: 10,
    },
  },
}));

const Banner = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { isAuthenticated } = useAuth();
  const onClickJoin = () => {
    dispatch(openModal("LOGIN_MODAL"));
  };
  return (
    <div className={classes.root}>
      <img src="/images/lp.jpg" alt="banner" />
      <Grid container className={classes.content}>
        <Grid item xs={12} md={4}></Grid>
        <Grid item xs={12} md={8} >
          <Typography className={classes.text}>
            <strong>Join now, connect to the community,</strong>
          </Typography>
          <Typography className={classes.desc}>
            Contribute to the discussions, ask questions, get answers
          </Typography>
          {!isAuthenticated ? (
            <CustomButton
              variant="contained"
              color="secondary"
              className={classes.joinButton}
              onClick={onClickJoin}
            >
              <img src="/images/icons/support.svg" alt="support" />
              Join Now
            </CustomButton>
          ) : null}
        </Grid>
      </Grid>
    </div>

  );
};

export default Banner;
