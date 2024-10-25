import React from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  OutlinedInput,
  Paper,
  Typography,
} from "@material-ui/core";

import { userService } from "app/services/api";
import useSafeDispatch from "app/hooks/useSafeDispatch";
import { pushSnackbar } from "app/store/ui/actions";

const AddUserForm = ({ onFormSubmit, onCanCel }) => {
  const dispatch = useDispatch();
  const safeDispatch = useSafeDispatch(dispatch);
  const { handleSubmit, handleChange, values, errors, touched, resetForm } =
    useFormik({
      initialValues: {
        userName: "",
        email: "",
        password: "",
        confirmPwd: "",
      },
      validationSchema: Yup.object().shape({
        userName: Yup.string().required("Username is required"),
        email: Yup.string()
          .required("Email is required")
          .email("Email is not valid"),
        confirmPwd: Yup.string()
          .required()
          .test(
            "confirmPwd",
            "Password is not matched",
            (val) => values.password === val
          ),
        password: Yup.string()
          .required("Password is required")
          .min(8, "Password should be more than 8 letters"),
      }),
      onSubmit: async (values) => {
        try {
          const { status, message } = await userService.createUser(
            values.userName,
            values.email,
            values.password
          );
          safeDispatch(() => {
            console.log("userService::createUser", message, status);
            pushSnackbar(message, status);
          });
          if (status === "success") {
            onFormSubmit();
            resetForm();
          }
        } catch (error) {
          safeDispatch(pushSnackbar("Unknown Error", "error"));
        }
      },
    });

  const onSaveHandler = () => {
    handleSubmit();
  };

  const onCancelHandler = () => {
    onCanCel();
    resetForm();
  };

  return (
    <Box component={Paper} p={2} mt={1}>
      <Box display="flex" justifyContent="flex-end">
        <Button variant="outlined" color="primary" onClick={onSaveHandler}>
          Save
        </Button>
        &nbsp;
        <Button variant="outlined" color="secondary" onClick={onCancelHandler}>
          Cancel
        </Button>
      </Box>
      <Typography variant="h6">New User Info</Typography>
      <Box padding="0.5rem"></Box>
      <Grid component="form" onSubmit={handleSubmit} container spacing={2}>
        <Grid item xs={12} sm={6}>
          <FormControl variant="outlined" size="small" fullWidth>
            <InputLabel htmlFor="email">Username</InputLabel>
            <OutlinedInput
              id="userName"
              name="userName"
              value={values.userName}
              onChange={handleChange}
              type="text"
              label="Username"
            />
            {errors && errors.userName && touched.userName && (
              <FormHelperText error={true}>{errors.userName}</FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl variant="outlined" size="small" fullWidth>
            <InputLabel htmlFor="email">Email</InputLabel>
            <OutlinedInput
              id="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              type="email"
              label="Email"
            />
            {errors && errors.email && touched.email && (
              <FormHelperText error={true}>{errors.email}</FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl variant="outlined" size="small" fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
              id="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              type="password"
              label="Password"
            />
            {errors && errors.password && touched.password && (
              <FormHelperText error={true}>{errors.password}</FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl variant="outlined" size="small" fullWidth>
            <InputLabel htmlFor="confirmPwd">Confirm Your Password</InputLabel>
            <OutlinedInput
              id="confirmPwd"
              name="confirmPwd"
              value={values.confirmPwd}
              onChange={handleChange}
              type="password"
              label="Confirm Password"
            />
            {errors && errors.confirmPwd && touched.confirmPwd && (
              <FormHelperText error={true}>{errors.confirmPwd}</FormHelperText>
            )}
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddUserForm;
