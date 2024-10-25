import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

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
import Loader from "app/main/layouts/ClientLayout/Loader";

import { openModal, pushSnackbar } from "app/store/ui/actions";
import { signIn, updateRedirectUrl } from "app/store/auth/actions";
import useAuth from "app/hooks/useAuth";
import useScript from "app/hooks/useScript";
import {
  ANSWERING,
  ASKING,
  GOOGLE_RECAPTCHA_KEY,
  LIKING,
} from "app/constants/index";
import useRecaptcha from "app/hooks/useRecaptcha";
import { authService } from "app/services/api";
import { getTextFromHtml } from "app/util/helper";

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
    fontWeight: "bold",
    width: "100%",
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
    margin: "0 0 1rem",
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    "& span": {
      color: "#3d3d3d",
      fontSize: "1rem",
      fontWeight: 400,
      transition: "all 0.4s ease",
      cursor: "pointer",

      "&:hover": {
        color: theme.palette.secondary.main,
      },
    },
  },
  donthave: {
    margin: "1rem 0",
    cursor: "pointer",
  },
  link: {
    color: theme.palette.secondary.main,
  },

  messageBox: {
    textAlign: "left",
    border: `1px solid #F7F7F7`,
    fontSize: "14px",
    color: "#828282",
    borderRadius: "4px",
    background: `#F7F7F7`,
  },
  messageTitle: {
    color: "black",
  },
}));

const MessageBox = ({ children, ...restProps }) => {
  const classes = useStyles();

  return (
    <Box {...restProps} px={2} py={2} className={classes.messageBox}>
      {children}
    </Box>
  );
};

const LoginModalContent = ({ state = null, state_data }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { status } = useScript(
    `https://www.google.com/recaptcha/api.js?render=${GOOGLE_RECAPTCHA_KEY}`
  );

  const { validate } = useRecaptcha();

  const { isAuthenticated, isMd, isAdmin, gotoLandingPage } = useAuth();
  useEffect(() => {
    gotoLandingPage();
  }, [gotoLandingPage]);

  const { handleSubmit, values, handleChange, errors, touched } = useFormik({
    initialValues: {
      emailOrName: "",
      password: "",
    },

    validationSchema: Yup.object().shape({
      emailOrName: Yup.string().required("Email or Name is required"),
      password: Yup.string()
        .required("Password is required")
        .min(8, "Password should be more than 8 letters"),
    }),
    onSubmit: async (values, actions) => {
      if (isSubmitting) return;
      setIsSubmitting(true);
      await dispatch(signIn(values.emailOrName.toLowerCase(), values.password));

      if (status) {
        const token = await validate();
        try {
          const response = await authService.verifyRecaptcha(token);
          if (response.status === "success") {
          }
        } catch (error) {
          dispatch(pushSnackbar("Sign In Failed", "error"));
        }
      }
      setIsSubmitting(false);
      actions.setFieldValue("email", values.emailOrName);
      actions.setFieldValue("password", "");
    },
  });

  const openRegisterModal = useCallback(
    () => dispatch(openModal("REGISTER_MODAL")),
    [dispatch]
  );

  const openForgotPasswordModal = useCallback(
    () => dispatch(openModal("FORGOT_MODAL")),
    [dispatch]
  );

  useEffect(() => {
    console.log(state);
    switch (state) {
      case ANSWERING:
        dispatch(
          updateRedirectUrl(`/wiki/question/${state_data?.question._id}/show`)
        );
        break;
      case ASKING:
        dispatch(updateRedirectUrl(`/wiki/question/ask`));
        break;
      case LIKING:
        dispatch(
          updateRedirectUrl(`/wiki/question/${state_data?.question._id}/show`)
        );
        break;
      default:
        break;
    }
  }, [dispatch, state, state_data]);

  // const onSuccessHandler = (response) => {
  //   const { tokenId } = response;
  //   dispatch(signInWithGoogle(tokenId));
  // };

  // const onFailureHandler = (response) => {
  //   console.log(response);
  //    dispatch(pushSnackbar("Failed Authentication with Google", "error"));
  // };

  const renderState = () => {
    switch (state) {
      case ASKING:
        return (
          <MessageBox mb={2}>
            You need to login to ask your question!
          </MessageBox>
        );
      case ANSWERING:
        return (
          <>
            <Typography component="h6" variant="h6" align="left">
              Just One More Step!
            </Typography>
            <MessageBox mb={2}>
              <Typography
                component="h3"
                variant="h6"
                className={classes.messageTitle}
              >
                Now you are sharing an answer:
              </Typography>

              {/* <Box fontSize="1rem" fontWeight="bold" mb={1}>
              {state_data.question?.title}
            </Box> */}
              <Box
                overflow="hidden"
                whiteSpace="nowrap"
                textOverflow="ellipsis"
                maxWidth="400px"
                maxHeight="3rem"
              >
                {getTextFromHtml(state_data?.answer)}
              </Box>
            </MessageBox>
          </>
        );
      case LIKING:
        return (
          <MessageBox mb={2}>
            You are going to like the Question
            <Box fontSize="0.8rem" fontWeight="bold">
              {state_data.question?.title}
            </Box>
          </MessageBox>
        );

      default:
        return null;
    }
  };

  return (
    <Box className={classes.root}>
      <Box>{renderState()}</Box>
      <Box component="h2" mb={2}>
        {state ? "Sign In to finish" : "Sign In"}
      </Box>
      <form onSubmit={handleSubmit} className={classes.form}>
        <FormControl
          variant="outlined"
          className={classes.formControl}
          size="small"
        >
          <InputLabel htmlFor="email">Email or Username</InputLabel>
          <OutlinedInput
            id="email"
            type="text"
            name="emailOrName"
            value={values.emailOrName}
            onChange={handleChange}
            label="Email"
          />
          {errors && errors.emailOrName && touched.emailOrName && (
            <FormHelperText error={true}>{errors.emailOrName}</FormHelperText>
          )}
        </FormControl>
        <FormControl
          variant="outlined"
          className={classes.formControl}
          size="small"
        >
          <InputLabel htmlFor="password">Password</InputLabel>
          <OutlinedInput
            type={`${showPassword ? "text" : "password"}`}
            id="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            label="Password"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <MdVisibility /> : <MdVisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
          {errors && errors.password && touched.password && (
            <FormHelperText error={true}>{errors.password}</FormHelperText>
          )}
        </FormControl>
        <div className={classes.forgotPassword}>
          <span onClick={openForgotPasswordModal}>Forgot Password?</span>
        </div>
        <Button
          variant="contained"
          type="submit"
          className={`${classes.submitbutton}`}
        >
          Login
        </Button>
      </form>

      {/* <Box mt={2} className={classes.socialLogins}> */}
      {/* <Button
          type="button"
          variant="contained"
          className={classes.facebookButton}
        >
          <FaFacebookF />
          <span>FaceBook</span>
        </Button> */}
      {/* <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID}
          style={{
            justifyContent: "center",
            width: "100%",
          }}
          render={(renderProps) => (
            <Button
              type="button"
              variant="contained"
              onClick={renderProps.onClick}
              className={classes.googleButton}
            >
              <FaGoogle />
              <span>Google</span>
            </Button>
          )}
          onSuccess={onSuccessHandler}
          onFailure={onFailureHandler}
          cookiePolicy={"single_host_origin"}
        /> */}
      {/* </Box> */}
      {isSubmitting && <Loader />}
    </Box>
  );
};

LoginModalContent.propTypes = {
  state: PropTypes.oneOf([null, ASKING, ANSWERING, LIKING]),
  state_data: PropTypes.object,
};

LoginModalContent.defaultProps = {
  state: null,
  state_data: {},
};

export default LoginModalContent;
