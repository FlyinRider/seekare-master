import React from "react";
import { useDispatch } from "react-redux";

import {
  Box,
  Button,
  FormHelperText,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { useFormik } from "formik";

import * as Yup from "yup";
import * as API from "app/services/api";
import useSafeDispatch from "app/hooks/useSafeDispatch";
import { pushSnackbar } from "app/store/ui/actions";
import useAuth from "app/hooks/useAuth";
import { ProfileInputField } from "./../../shared-components";

export const useStyles = makeStyles((theme) => ({
  root: {},
  inputTitle: {
    color: theme.palette.secondary.main,
    fontSize: "16px",
  },
  inputIconImage: {
    width: 20,
    height: 20,
  },
  fieldWrapper: {
    display: "flex",
    backgroundColor: theme.palette.secondary.lightest,
    padding: "5px",
    borderRadius: "8px",
    alignItems: "center",
  },
  submitButton: {
    backgroundColor: theme.palette.secondary.blue,
    border: "none",
    color: "white",
  },
}));

const PasswordChangeTab = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const safeDispatch = useSafeDispatch(dispatch);
  const { currentUser } = useAuth();

  const { handleSubmit, handleChange, values, errors, touched, resetForm } =
    useFormik({
      initialValues: {
        currentPwd: "",
        newPwd: "",
        confirmPwd: "",
      },
      validationSchema: Yup.object().shape({
        currentPwd: Yup.string()
          .required("Current Password is needed")
          .min(8, "Should be more than 8 letters"),
        newPwd: Yup.string()
          .required("New Password is needed")
          .min(8, "Shhould be more than 8 letters"),
        confirmPwd: Yup.string()
          .required("Confirm your Password")
          .min(8, "Shhould be more than 8 letters")
          .test(
            "confirmPwd",
            "Password is not matched",
            (val) => values.newPwd === val
          ),
      }),
      onSubmit: async (values) => {
        try {
          const { status, message } = await API.userService.changePassword({
            userID: currentUser.userID,
            ...values,
          });

          safeDispatch(pushSnackbar(message, status));
        } catch (error) {
          safeDispatch(pushSnackbar("Can not update password", "error"));
        } finally {
          resetForm();
        }
      },
    });

  return (
    <Box component="form" onSubmit={handleSubmit} className={classes.root}>
      <Box my={1}>
        <Typography variant="h6" component="h2" className={classes.inputTitle}>
          Password
        </Typography>
        <Box className={classes.fieldWrapper}>
          <Box
            display="flex"
            alignContent="center"
            px={1}
            className={classes.inputIconImage}
          >
            <img src="/images/icons/lock.svg" alt="email icon" />
          </Box>
          <ProfileInputField
            size="small"
            name="currentPwd"
            type="password"
            value={values.currentPwd}
            onChange={handleChange}
            placeholder="Your Current Password"
          />
        </Box>

        {errors && errors.currentPwd && touched.currentPwd && (
          <FormHelperText error={true}>{errors.currentPwd}</FormHelperText>
        )}
      </Box>
      <Box my={1}>
        <Typography variant="h6" component="h2" className={classes.inputTitle}>
          New Password
        </Typography>
        <Box className={classes.fieldWrapper}>
          <Box display="flex" alignContent="center" px={1}>
            <img
              src="/images/icons/lock.svg"
              className={classes.inputIconImage}
              alt="email icon"
            />
          </Box>
          <ProfileInputField
            size="small"
            name="newPwd"
            type="password"
            value={values.newPwd}
            onChange={handleChange}
            placeholder="New Password"
          />
        </Box>

        {errors && errors.newPwd && touched.newPwd && (
          <FormHelperText error={true}>{errors.newPwd}</FormHelperText>
        )}
      </Box>
      <Box my={1}>
        <Typography variant="h6" component="h2" className={classes.inputTitle}>
          Confirm Password
        </Typography>
        <Box className={classes.fieldWrapper}>
          <Box display="flex" alignContent="center" px={1}>
            <img
              src="/images/icons/lock.svg"
              className={classes.inputIconImage}
              alt="email icon"
            />
          </Box>
          <ProfileInputField
            size="small"
            name="confirmPwd"
            type="password"
            value={values.confirmPwd}
            onChange={handleChange}
            placeholder="Confirm New Password"
          />
        </Box>

        {errors && errors.confirmPwd && touched.confirmPwd && (
          <FormHelperText error={true}>{errors.confirmPwd}</FormHelperText>
        )}
      </Box>
      <Box display="flex" justifyContent="flex-start">
        <Button
          type="submit"
          disabled={false}
          variant="outlined"
          className={classes.submitButton}
        >
          Change Password
        </Button>
      </Box>
    </Box>
  );
};

export default PasswordChangeTab;
