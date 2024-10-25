import React, { useCallback, useEffect, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useDispatch, useSelector } from "react-redux";

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
import useAuth from "app/hooks/useAuth";
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
    [theme.breakpoints.down("sm")]: {
      fontSize: "1rem",
    },
  },
  helperText: {
    display: "flex",
    width: "100%",
    padding: "0 1rem",
    justifyContent: "flex-start",
  },
}));

const RegisterModalContent = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const captchRef = useRef();
  const userRef = useRef();
  // Google Recaptcha v3
  const [recaptcha, setRecaptcha] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfrimPwd, setShowConfrimPwd] = useState(false);
  const { isAuthenticated, gotoLandingPage } = useAuth();
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPwd, setConfirmPwd] = useState('')
  const [issuMessage, setIssuMessage] = useState('')
  const message = useSelector(state => state?.ui?.snackbar?.message);
  
  useEffect(() => {
    if (isAuthenticated) {
      gotoLandingPage();
    }
    const userN = window.sessionStorage.getItem('userN')
    const emailA = window.sessionStorage.getItem('emailA')
    const passW = window.sessionStorage.getItem('passW')
    if(userN || emailA || passW) {
      setUsername(userN)
      setEmail(emailA)
      setPassword(passW)
      setConfirmPwd(passW)
    }
  }, [gotoLandingPage, isAuthenticated, message]);

  useEffect(() => {
    setIssuMessage(message)
  }, [message])
  const emailConfirm = ({ username, email, password }) => {
    return dispatch(AuthActions.emailConfirm(username, email, password));
  };

  const { handleSubmit, handleChange, values, errors, touched } = useFormik({
    
    initialValues: {
      userName: window.sessionStorage.getItem('userN') ?? username,
      email: window.sessionStorage.getItem('emailA') ?? email,
      password: window.sessionStorage.getItem('passW') ?? password,
      confirmPwd: window.sessionStorage.getItem('passW') ?? confirmPwd,
      recaptcha: "",
      age: 20,
    },
    validationSchema: Yup.object().shape({
      userName: Yup.string().required("Username is required"),
      email: Yup.string()
        .required("Email is required")
        .email("Email is not valid"),
      confirmPwd: Yup.string().when("password", {
        is: (val) => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref("password")],
          "Confirm Password does not match"
        ),
      }),
      password: Yup.string()
        .required("Password is required")
        .min(8, "Password should be more than 8 letters"),
    }),
    enableReinitialize: false,
    onSubmit: async (values) => {
      const token = captchRef.current.getValue();
      window.sessionStorage.setItem('userN', values.userName)
      window.sessionStorage.setItem('emailA', values.email)
      window.sessionStorage.setItem('passW', values.password)
      if (token) {
        try {
          // TODO
          // const response = await authService.verifyRecaptcha(token);
          captchRef.current.reset();
          // if (response.status === "success") {
          const res = await emailConfirm({
            username: values.userName,
            email: values.email.toLowerCase(),
            password: values.password,
          });
          // }
        } catch (error) {}
      } else {
        setRecaptcha(false);
      }
    },
  });
  useEffect(() => {
    setUsername(values.userName)
    setEmail(values.email)
    setPassword(values.password)
    setConfirmPwd(values.confirmPwd)
  },[values])
  const openLoginModal = useCallback(
    () => dispatch(openModal("LOGIN_MODAL")),
    [dispatch]
  );

  const onClickTerms = () => {
    dispatch(openModal("TERMS_MODAL"));
  };

  return (
    <div className={classes.root}>
      <Typography component="h2" variant="h5">
        Sign Up
      </Typography>

              
      <form onSubmit={handleSubmit} className={classes.form} ref={userRef}>
        <Box maxWidth="30rem" mt={2}>
          <FormControl
            variant="outlined"
            className={classes.formControl}
            size="small"
          >
            <InputLabel htmlFor="userName">Username</InputLabel>
            <OutlinedInput
              id="userName"
              name="userName"
              className={classes.registInput}
              value={values.userName}
              style={{
                color: issuMessage ? 'red' : ''
              }}
              onChange={(e) =>{ handleChange(e); setIssuMessage('')}}
              label="Username"
            />
            {(errors && errors.userName) ?<FormHelperText error={true}>{errors.userName}</FormHelperText> : issuMessage ? (
              <FormHelperText error={true}>{issuMessage}</FormHelperText>
            ) : ''}
          </FormControl>
          <FormControl
            variant="outlined"
            className={classes.formControl}
            size="small"
          >
            <InputLabel htmlFor="email">Email</InputLabel>
            <OutlinedInput
              id="email"
              name="email"
              value={values.email}
              className={classes.registInput}
              onChange={handleChange}
              style={{
                color: issuMessage ? 'red' : ''
              }}
              label="Email"
            />
            {(errors && errors.email) ?<FormHelperText error={true}>{errors.email}</FormHelperText> : issuMessage ? (
              <FormHelperText error={true}>{issuMessage}</FormHelperText>
            ) : ''}
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
          <FormControl
            variant="outlined"
            className={classes.formControl}
            size="small"
          >
            <InputLabel htmlFor="password">Confirm Password</InputLabel>
            <OutlinedInput
              type={`${showConfrimPwd ? "text" : "password"}`}
              id="confirmPwd"
              name="confirmPwd"
              value={values.confirmPwd}
              onChange={handleChange}
              label="Confirm Password"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowConfrimPwd(!showConfrimPwd)}
                  >
                    {showConfrimPwd ? <MdVisibility /> : <MdVisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
            {errors && errors.confirmPwd && touched.confirmPwd && (
              <FormHelperText error={true}>{errors.confirmPwd}</FormHelperText>
            )}
          </FormControl>
          <Box className={classes.terms} my={2}>
            By continuing, you agree to our &nbsp;
            <Box onClick={onClickTerms} component="a" fontWeight="bold">
              Terms and Conditions
            </Box>
          </Box>
          <ReCAPTCHA
            sitekey="6LfuOQEoAAAAAP3H672RFR1z5foC9lyDKKtygZaJ"
            id="recaptcha"
            ref={captchRef}
            style={{ padding: "10px" }}
          />
          {!recaptcha && (
            <FormHelperText error={true} style={{ padding: "3px 7px" }}>
              Verify you are a person
            </FormHelperText>
          )}
          <Button
            type="submit"
            variant="contained"
            className={classes.submitbutton}
          >
            Sign Up
          </Button>
          <div className={classes.divider}>
            <span>or</span>
          </div>
          <Box className={classes.forgotPassword} my={2}>
            <span onClick={openLoginModal}>Already a user? Log-in</span>
          </Box>
        </Box>
      </form>
      {/* 
      <Box mt={2} className={classes.socialLogins}>
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID}
          style={{
            justifyContent: "center",
            width: "100%",
          }}
          render={(renderProps) => (
            <Button
              type="button"
              variant="contained"
              className={classes.googleButton}
              onClick={renderProps.onClick}
            >
              <FaGoogle />
              <span>Google</span>
            </Button>
          )}
          buttonText="Register With Google"
          onSuccess={onSuccessHandler}
          onFailure={onFailureHandler}
          cookiePolicy={"single_host_origin"}
        />
      </Box> */}
    </div>
  );
};

export default RegisterModalContent;
