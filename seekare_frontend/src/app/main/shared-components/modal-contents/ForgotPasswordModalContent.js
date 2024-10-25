import React from "react";

import {
  Button,
  FormControl,
  InputLabel,
  makeStyles,
  OutlinedInput,
} from "@material-ui/core";
import { useFormik } from "formik";
import * as Yup from "yup";

import { GOOGLE_RECAPTCHA_KEY } from "app/constants";
import { authService } from "app/services/api";
import { useDispatch } from "react-redux";
import useSafeDispatch from "app/hooks/useSafeDispatch";
import { closeModal, pushSnackbar } from "app/store/ui/actions";
import useScript from "app/hooks/useScript";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "white",
    padding: "1rem",
    textAlign: "center",
    outline: "none",
    minWidth: "30rem",
    [theme.breakpoints.down("sm")]: {
      minWidth: "20rem",
    },
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "10px",
  },
  formControl: {
    width: "100%",
    margin: "0 0 1rem",
  },
  submitbutton: {
    backgroundColor: "#09e5ab",
    color: "white",
    fontWeight: "bold",
    width: "100%",
    "&:hover": {
      backgroundColor: "#09e5ab",
    },
  },
}));

const ForgotPasswordModalContent = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const safeDispatch = useSafeDispatch(dispatch);
  const { status } = useScript(
    `https://www.google.com/recaptcha/api.js?render=${GOOGLE_RECAPTCHA_KEY}`
  );
  const { handleSubmit, values, handleChange } = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .required("Email is required")
        .email("Email is not valid"),
    }),
    onSubmit: async (values) => {
      try {
        if (status) {
          // const token = await validate();

          try {
            // const response = await authService.verifyRecaptcha(token);

            // if (response.status === "success") {
            const res = await authService.pwdChangeRequest(values.email);

            if (res.status === 200) {
              safeDispatch(pushSnackbar(res.data.message, res.data.status));

              safeDispatch(closeModal());
            }
            // }
          } catch (error) {}
        }
      } catch (error) {
        safeDispatch(pushSnackbar("Unknown Erorr", "error"));
      }
    },
  });
  return (
    <div className={classes.root}>
      <h2>Forgot Password ?</h2>
      <form onSubmit={handleSubmit} className={classes.form}>
        <FormControl
          variant="outlined"
          className={classes.formControl}
          size="small"
        >
          <InputLabel htmlFor="email">Email</InputLabel>
          <OutlinedInput
            id="email"
            value={values.email}
            onChange={handleChange}
            label="Email"
          />
        </FormControl>
        <Button
          variant="contained"
          type="submit"
          datacallback="handleSubmit"
          dataaction="submit"
          datasitekey="6LeW5TYaAAAAAPrwCUGpEdAtx46LxpSD-_4YQiXL"
          className={`${classes.submitbutton} g-recaptcha`}
        >
          Send Password Change Request
        </Button>
      </form>
    </div>
  );
};

export default ForgotPasswordModalContent;
