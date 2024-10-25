import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Box, FormHelperText, makeStyles, Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
} from "@material-ui/core";

import { useFormik } from "formik";
import * as Yup from "yup";
import CustomButton from "app/main/shared-components/Button";
import * as API from "app/services/api";
import { pushSnackbar } from "app/store/ui/actions";

const useStyles = makeStyles((theme) => ({
  contactInfo: {
    background: "white",
    height: "35%",
    borderRadius: "8px",
    padding: "24px",
    marginBottom: "20px",
  },
  contactRow: {
    display: "flex",
    alignItems: "center",
    fontSize: "14px",
    fontWeight: "600",
    marginBottom: "16px",
  },
  imageBox: {
    width: "40px",
    flexShrink: "0",
    marginRight: "5px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  contactForm: {
    background: "white",
    flexGrow: 1,
    padding: "24px",
    borderRadius: "8px",
    minWidth: "30rem",
  },
  formBody: {},
  formFieldGroup: {
    marginBottom: "12px",
    "& label": {
      color: theme.palette.text.primary,
      fontSize: "14px",
      fontWeight: "700",
    },
    "& input, textarea": {
      fontSize: "14px",
      padding: "10px 18px",
      borderRadius: "8px",
      width: "100%",
      outline: "none",
      // border: "1px solid",
    },
    "& textarea": {
      border: "1px solid #7e7e7e8f",
      borderRadius: 5
    },
  },
  formControl: {
    width: "100%",
    margin: "0 0 1rem",
  },
  sectionTitle: {
    fontSize: "22px",
    fontWeight: "bold",
    marginBottom: "12px",
    color: theme.palette.text.primary,
  },
}));

const ContactPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const { handleSubmit, handleChange, values, errors, touched, resetForm } =
    useFormik({
      initialValues: {
        fullname: "",
        email: "",
        message: "",
      },
      validationSchema: Yup.object().shape({
        fullname: Yup.string().required("Full Name is required"),
        email: Yup.string().required("Email is required"),
        message: Yup.string().required("Message is required"),
      }),
      onSubmit: async (values) => {
        const { fullname, email, message } = values;
        try {
          await API.emailService.send(fullname, email, "subject", message);
          dispatch(pushSnackbar("Email Sent", "success"));
          resetForm();
          history.push("/");
        } catch (error) {
          dispatch(pushSnackbar("Sorry, Please try again later!", "error"));
        }
      },
    });
  return (
    <Box className={classes.contactForm}>
      <Typography className={classes.sectionTitle}>
        Drop your Message
      </Typography>
      <Box
        className={classes.formBody}
        component="form"
        onSubmit={handleSubmit}
      >
        <Box className={classes.formFieldGroup}>
          {/* <label htmlFor="name">Name</label>
          <br />
          <input
            onChange={handleChange}
            id="name"
            type="text"
            name="fullname"
            value={values.fullname}
          /> */}
          <FormControl
            variant="outlined"
            className={classes.formControl}
            size="small"
          >
            <InputLabel htmlFor="name">Name</InputLabel>
            <OutlinedInput
              id="name"
              type="text"
              name="fullname"
              value={values.fullname}
              onChange={handleChange}
              label="Name"
            />
            {errors && touched.fullname && errors.fullname && (
              <FormHelperText error={true}>{errors.fullname}</FormHelperText>
            )}
          </FormControl>
        </Box>
        <Box className={classes.formFieldGroup}>
          {/* <label htmlFor="email">Email</label>
          <br />
          <input
            onChange={handleChange}
            id="email"
            type="text"
            name="email"
            value={values.email}
          /> */}
          <FormControl
            variant="outlined"
            className={classes.formControl}
            size="small"
          >
            <InputLabel htmlFor="email">Email</InputLabel>
            <OutlinedInput
              id="email"
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              label="Email"
            />
            {errors && touched.email && errors.email && (
              <FormHelperText error={true}>{errors.email}</FormHelperText>
            )}
          </FormControl>
        </Box>
        <Box className={classes.formFieldGroup}>
          <FormControl
            variant="outlined"
            className={classes.formControl}
            size="small"
          >
            <label htmlFor="message">Message</label>
            <textarea
              onChange={handleChange}
              id="message"
              rows={4}
              name="message"
              value={values.message}
            ></textarea>{" "}
            {errors && touched.message && errors.message && (
              <FormHelperText error={true}>{errors.message}</FormHelperText>
            )}
          </FormControl>
        </Box>
        <CustomButton
          fullwidth
          type="submit"
          size="md"
          variant="contained"
          color="secondary"
        >
          Send Your Message
        </CustomButton>
      </Box>
    </Box>
  );
};

export default ContactPage;
