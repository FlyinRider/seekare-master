import React from "react";
import { makeStyles, Grid, Typography, Box } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

import CustomButton from "app/main/shared-components/Button";
import { changeResponsive, openModal, setIsRunTour } from "app/store/ui/actions";
import useAuth from "app/hooks/useAuth";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    minHeight: "200px",
    borderRadius: "1rem",
    position: "relative",
    backgroundImage:
      "linear-gradient(90.18deg, #c5c5c59e -1.25%, rgba(88, 101, 134, 0) 99.88%)",
    boxShadow: "3px 9px 17px 0px #e1e1e1",
    [theme.breakpoints.down("sm")]: {
      minHeight: "170px",
    },
    [theme.breakpoints.up(959)]: {
      display: "block !important",
    },
    "&>img": {
      width: "100%",
      height: "100%",
      borderRadius: "1rem",
    },
  },
  banner: {
    marginTop:'100px',
    [theme.breakpoints.down("sm")]: {
      margin: "auto",
      marginTop: "80px",
    },
  },
  content: {
    zIndex: "1",
    display: "flex",
    alignItems: "center",
    width: "100%",
    height: "100%",
    position: "absolute",
    top: "0",
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      // top: "85%",
      textAlign: "center",
    },
  },
  text: {
    fontSize: "1.8rem",
    color: theme.palette.text.secondary,
    [theme.breakpoints.down("xl")]: {
      fontSize: "1.7rem",
    },
    [theme.breakpoints.down(512)]: {
      fontSize: "1.1rem",
    },
  },
  desc: {
    fontSize: "1.4rem",
    color: "#353C48",
    padding: "10px 0",
    [theme.breakpoints.down("xl")]: {
      fontSize: "1.3rem",
    },
    [theme.breakpoints.down(512)]: {
      fontSize: "0.9rem",
    },
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
    [theme.breakpoints.down("sm")]: {
      padding: "0.3rem 1.2rem",
      fontSize: "0.9rem",
      "& img": {
        width: "1rem",
      },
    },
  },
  launchButton: {
    display: "none",
    padding: "0.5rem 1.5rem",
    alignItems: "center",
    justifyContent: "center",
    background:
      "linear-gradient(304.29deg, rgba(1, 68, 241, 0.45) 16.08%, rgba(0, 163, 255, 0.45) 85.75%), linear-gradient(270deg, #8743FF 0%, #4136F1 100%), #3F8CFF",
    boxShadow: "0px 6px 12px rgba(63, 140, 255, 0.263686)",
    borderRadius: "0.8rem",
    fontSize: "1.3rem",
    margin: "auto",
    "& img": {
      width: "1.2rem",
      marginRight: 10,
    },
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      padding: "0.3rem 1.2rem",
      fontSize: "0.9rem",
      "& img": {
        width: "1rem",
      },
    },
  },
  buttons: {
    display: "flex",
  },
  tabButton: {
    display: "none",
    [theme.breakpoints.down(960)]: {
      display: "block",
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
  const onClickRegister = () => {
    dispatch(openModal("REGISTER_MODAL"));
  };
  const responsive =
    useSelector((state) => state.ui.responsive.responsiveType) || "landing";
  const handleKareBook = () => {
      dispatch(changeResponsive("kareBook"));
  };
  const handleKarePost = () => {
      dispatch(changeResponsive("karePost"));
  };
  return (
    <div
      className={classes.root}
      style={{
        display: responsive === "landing" ? "block" : "none",
      }}
    >
      <img src="./images/lp.jpg" alt="banner" style={{
        height:'326px'
      }}/>
      <Grid container className={classes.content}>
        <Grid item xs={12} md={2}></Grid>
        <Grid item xs={12} md={8} className={classes.banner}>
          <Typography className={classes.text}>
            <strong>Join now, connect to the community,</strong>
          </Typography>
          <Typography className={classes.desc}>
            Contribute to the discussions, ask questions, get answers
          </Typography>
          {/* {!isAuthenticated ? (
            <Box className={classes.buttons}>
              <CustomButton
                variant="contained"
                color="secondary"
                className={classes.joinButton}
                onClick={onClickJoin}
              >
                <img src="/images/icons/support.svg" alt="support" />
                Login
              </CustomButton>
              <CustomButton
                variant="contained"
                color="secondary"
                className={classes.launchButton}
                onClick={onClickRegister}
                size="lg"
              >
                <img src="/images/icons/users.png" alt="support" />
                Sign up
              </CustomButton>
            </Box>
          ) : null} */}
          <Box className={classes.tabButton}>
            <Box className={classes.gettingStartedButton} mt={3}>
              <CustomButton
                variant="contained"
                color="secondary"
                onClick={handleKareBook}
                size="lg"
                className=""
                style={{
                  marginRight: "60px",
                  fontSize: "1.3rem",
                }}
              >
                KareBook
              </CustomButton>
              <CustomButton
                variant="contained"
                color="secondary"
                className=""
                onClick={handleKarePost}
                size="lg"
                style={{
                  fontSize: "1.3rem",
                }}
              >
                KarePost
              </CustomButton>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default Banner;
