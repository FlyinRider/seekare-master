import React from "react";
import { useDispatch } from "react-redux";
import {
  Box,
  Typography,
  TextField,
  Button,
  makeStyles,
  FormHelperText,
} from "@material-ui/core";

import { useFormik } from "formik";
import * as Yup from "yup";

import useAuth from "app/hooks/useAuth";
import useSafeDispatch from "app/hooks/useSafeDispatch";
import { updateEmail } from "app/store/user/actions";

const useStyles = makeStyles((theme) => ({
  root: {},
  label: {
    color: theme.palette.secondary.main,
    fontSize: "16px",
  },
  fieldWrapper: {
    display: "flex",
    backgroundColor: theme.palette.secondary.lightest,
    padding: "5px",
    borderRadius: "8px",
    alignItems: "center",
  },
  input: {
    border: "none",
    flex: "1",
    "& input": {
      border: "none",
      outline: "none",
    },
    "& fieldset": {
      border: "none",
    },
  },
  inputIconImage: {
    width: 20,
    height: 20,
  },
  submitButton: {
    backgroundColor: theme.palette.secondary.blue,
    border: "none",
    color: "white",
  },
}));

const EmailUpdateTab = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const safeDispatch = useSafeDispatch(dispatch);
  const { currentUser } = useAuth();

  const { handleSubmit, handleChange, values, errors, touched, isValid } =
    useFormik({
      initialValues: {
        email: currentUser && currentUser.email,
      },
      validationSchema: Yup.object().shape({
        email: Yup.string()
          .required("Email is Required")
          .email("Please input valid Email"),
      }),
      onSubmit: async (values) => {
        safeDispatch(updateEmail(currentUser.userID, values.email));
      },
    });
  return (
    <Box component="form" onSubmit={handleSubmit} className={classes.root}>
      <Typography variant="h6" component="h2" className={classes.label}>
        Email
      </Typography>
      <Box className={classes.fieldWrapper}>
        <Box display="flex" alignContent="center" px={1}>
          <img
            src="/images/icons/email.svg"
            className={classes.inputIconImage}
            alt="email icon"
          />
        </Box>
        <TextField
          variant="outlined"
          size="small"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          placeholder="Your Email"
          className={classes.input}
        />

        <Button
          type="submit"
          disabled={!isValid}
          className={classes.submitButton}
        >
          Change Email
        </Button>
      </Box>
      {errors && errors.email && touched.email && (
        <FormHelperText error={true}>{errors.email}</FormHelperText>
      )}
    </Box>
  );
};

export default EmailUpdateTab;
