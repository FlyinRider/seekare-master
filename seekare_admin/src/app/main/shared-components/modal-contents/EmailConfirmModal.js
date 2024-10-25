import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  makeStyles,
  OutlinedInput,
  Typography,
} from "@material-ui/core";
import { useFormik } from "formik";
import * as Yup from "yup";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

import { openModal } from "app/store/ui/actions";
import * as AuthActions from "app/store/auth/actions";
import { GOOGLE_RECAPTCHA_KEY } from "app/constants/index";
import useAuth from "app/hooks/useAuth";
import useScript from "app/hooks/useScript";
import useRecaptcha from "app/hooks/useRecaptcha";
import { authService } from "app/services/api";
import PinInputCom from "./EmailConfirmPin";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "white",
    padding: "1rem",
    textAlign: "center",
    outline: "none",
    minWidth: "30rem",
    borderRadius: "8px",
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
  const dispatch = useDispatch();
  // Google Recaptcha v3
  const { status } = useScript(
    `https://www.google.com/recaptcha/api.js?render=${GOOGLE_RECAPTCHA_KEY}`
  );
  const { validate } = useRecaptcha();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfrimPwd, setShowConfrimPwd] = useState(false);
  const { isAuthenticated, gotoLandingPage, code, emailConfirming } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      gotoLandingPage();
    }
  }, [gotoLandingPage, isAuthenticated]);

  const signUpUser = useCallback(
    ({ username, email, password }) => {
      return dispatch(AuthActions.signUp(username, email, password));
    },
    [dispatch]
  );
  return (
    <div className={classes.root}>
      <Typography component="h3" variant="h5">
        You're almost done! <br />
        We sent a launch code to <span className="email-confirm">{email}</span>
      </Typography>
      <PinInputCom username={username} password={password} email={email} />
    </div>
  );
};

export default EmailConfirmModal;
