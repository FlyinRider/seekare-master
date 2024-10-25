import React, { useState } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import {
  Box,
  Button,
  FormHelperText,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { MdSend } from "react-icons/md";
import { pushSnackbar } from "app/store/ui/actions";

import { validateEmail } from "app/util/helper";
import Editor from "../Editor";
import useAuth from "app/hooks/useAuth";

const useStyles = makeStyles({
  root: {
    padding: "1rem 2rem",
    backgroundColor: "white",
  },
});

const InviteUserModal = ({ onSend, onCancel, defContent }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { isMd, isAdmin, isAuthenticated } = useAuth();
  const [emailState, setEmailState] = useState("");
  const [emails, setEmails] = useState([]);
  const [subject, setSubject] = useState("Hi, Please joint Great MD Community");
  const [content, setContent] = useState(defContent);
  const [errors, setErrors] = useState({});

  const handleChangeSingleEmail = (e) => {
    setEmailState(e.target.value);
  };

  const handleChangeEmail = (value) => {
    const latestInput = value[value.length - 1];

    if (value.length < 1 || validateEmail(latestInput)) {
      setErrors({ ...errors, email: undefined });
      setEmails([...value]);
    } else {
      setErrors((prev) => {
        return { ...prev, email: "Email is not valid" };
      });
    }
  };

  const onClickSend = () => {
    if (isAuthenticated) {
      setErrors((prev) => {
        let emailErr = undefined;
        if (emails.length < 1 && emailState === "") {
          emailErr = "Email is required";
        } else if (emails.length < 1 && !validateEmail(emailState)) {
          emailErr = "Email is invalid";
        }

        return {
          ...prev,
          email: emailErr,
          content: content === "" ? "Content is required" : undefined,
          subject: subject === "" ? "Subject is required" : undefined,
        };
      });

      let emailsTemp = [...emails];
      if (emails.length < 1 && validateEmail(emailState)) {
        console.log(validateEmail(emailState));
        emailsTemp = [...emails, emailState];
        setEmails(emailsTemp);
      }

      if (emailsTemp.length > 0 && content !== "" && subject !== "") {
        console.log(emailsTemp);
        onSend(emailsTemp, subject, content);
        // setEmails([]);
        // setContent("");
      }
    } else {
      dispatch(pushSnackbar("Please, sign in", "error"));
    }
  };

  const onClickCancel = () => {
    setEmails([]);
    setContent("");
    setSubject("Hi, Please joint Great MD Community");
    onCancel();
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.tags}>
        <Typography variant="h6" component="h2">
          Emails
        </Typography>
        <Typography>Add Emails to invite.</Typography>

        <Autocomplete
          fullWidth
          multiple
          freeSolo
          size="small"
          id="emails-outlined"
          value={emails}
          options={[]}
          // clearOnBlur={true}
          getOptionSelected={(option, value) => option === value}
          getOptionLabel={(option) => option}
          renderInput={(params) => (
            <TextField
              {...params}
              label={""}
              type="email"
              variant="outlined"
              placeholder="Please press enter to add an email."
              onChange={handleChangeSingleEmail}
              value={emailState}
            />
          )}
          onChange={(e, value) => handleChangeEmail(value)}
        />
        {errors && errors.email && (
          <FormHelperText error={true}>{errors.email}</FormHelperText>
        )}
      </Box>
      <Box mt={1}>
        <Typography variant="h6" component="h2">
          Subject
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          name="title"
          type="text"
          onChange={(e) => setSubject(e.target.value)}
          value={subject}
          inputProps={{ disabled: true }}
          required
        />
        {errors && errors.subject && (
          <FormHelperText error={true}>{errors.subject}</FormHelperText>
        )}
      </Box>
      <Box mt={1}>
        <Typography variant="h6" component="h2">
          Invitation Statement
        </Typography>
        <Editor
          onlyText={!isMd || !isAdmin}
          content={content}
          onChangeContent={(text) => setContent(text)}
        />
        {errors && errors.content && (
          <FormHelperText error={true}>{errors.content}</FormHelperText>
        )}
      </Box>
      <Box display="flex" justifyContent="flex-end" my={1}>
        <Button
          variant="outlined"
          color="primary"
          endIcon={<MdSend />}
          onClick={onClickSend}
        >
          Send
        </Button>
        &nbsp;
        <Button
          type="reset"
          variant="outlined"
          color="secondary"
          onClick={onClickCancel}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

InviteUserModal.propTypes = {
  onSend: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  defContent: PropTypes.string,
};

InviteUserModal.defaultProps = {
  onSend: () => {},
  onCancel: () => {},
  defContent: "",
};

export default InviteUserModal;
