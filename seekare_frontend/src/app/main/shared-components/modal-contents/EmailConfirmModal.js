import React, { useEffect } from "react";

import { makeStyles, Typography } from "@material-ui/core";

import useAuth from "app/hooks/useAuth";
import PinInputCom from "./EmailConfirmPin";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "white",
    padding: "1rem",
    textAlign: "center",
    outline: "none",
    minWidth: "30rem",
    borderRadius: "8px",
    [theme.breakpoints.down("sm")]: {
      minWidth: "20rem",
    },
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  formControl: {
    width: "100%",
    margin: "0 0 1rem",
  },
  submitbutton: {
    backgroundColor: theme.palette.secondary.main,
    color: "white",
    width: "100%",
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
    },
  },
  socialLogins: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  googleButton: {
    backgroundColor: "#dd4b39",
    color: "white",
    fontWeight: "bold",
    width: "100%",
    "&:hover": {
      backgroundColor: "#dd4b39",
    },
    "& span": {
      marginLeft: "1rem",
    },
  },
  facebookButton: {
    backgroundColor: "#3a559f",
    color: "white",
    fontWeight: "bold",
    width: "100%",
    marginRight: "1rem",
    "&:hover": {
      backgroundColor: "#3a559f",
    },
    "& span": {
      marginLeft: "1rem",
    },
  },
  divider: {
    textAlign: "center",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "1rem 0",
    "&::before": {
      content: '""',
      display: "block",
      width: "100%",
      height: "1px",
      backgroundColor: "#d4d4d4",
      position: "absolute",
      top: "50%",
      left: 0,
    },
    "& span": {
      display: "flex",
      padding: "0.5rem",
      backgroundColor: "white",
      zIndex: 1,
      lineHeight: "100%",
    },
  },
  forgotPassword: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    margin: "1rem 0",
    "& span": {
      fontSize: "1rem",
      fontWeight: 400,
      color: "#3d3d3d",
      transition: "all 0.4s ease",
      cursor: "pointer",
      "&:hover": {
        color: theme.palette.secondary.main,
      },
    },
  },
  donthave: {
    margin: "1rem 0",
    "& a": {
      color: theme.palette.secondary.main,
    },
  },
  title: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "16px",
    },
  },
  terms: {
    display: "flex",
    alignItems: "center",
    lineHeight: "100%",
    width: "100%",
    "& a": {
      cursor: "pointer",
      color: "#3d3d3d",
      "&:hover": {
        color: theme.palette.secondary.main,
      },
    },
  },
  helperText: {
    display: "flex",
    width: "100%",
    padding: "0 1rem",
    justifyContent: "flex-start",
  },
}));

const EmailConfirmModal = ({ username, email, password }) => {
  const classes = useStyles();
  const { isAuthenticated, gotoLandingPage } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      gotoLandingPage();
    }
  }, [gotoLandingPage, isAuthenticated]);

  return (
    <div className={classes.root}>
      <Typography component="h3" variant="h5" className={classes.title}>
        You're almost done! <br />
        We sent a launch code to <span className="email-confirm">{email}</span>
      </Typography>
      <PinInputCom username={username} password={password} email={email} />
    </div>
  );
};

export default EmailConfirmModal;
