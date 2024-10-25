import React, { useCallback, useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import {
  Box,
  makeStyles,
  Paper,
  Typography,
  TextField,
  Button
} from "@material-ui/core";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import AddIcon from '@material-ui/icons/Add';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import * as API from "app/services/api";
import { openModal, pushSnackbar } from "app/store/ui/actions";
import useAuth from "app/hooks/useAuth";
import { BiTrash } from "react-icons/bi";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
  },
  header: {
    textAlign: "center",
  },
  title: {
    position: "relative",
  },
  sectionTitle: {
    fontWeight: 600,
    fontSize: "18px",
    color: "#171725",
    marginBottom: 20,
  },
  formSection: {
    height: "87vh",
    overflow: "hidden auto",
  },
  askForm: {
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    // justifyContent: "space-between",
    height: "100%",
    borderRadius: "1rem",
    background: "white",
    boxShadow: "0px 6px 58px rgba(196, 203, 214, 0.103611)",
    overflow: "hidden auto",
    "& p.description": {
      fontSize: 13,
      color: "#6C6C6C",
      marginBottom: 8,
    },
  },

  inputTitle: {
    width: "100%",
    background: "#F5F7FF",
    border: `1px solid #9589F3`,
    padding: "8px 14px",
    borderRadius: 6,
    fontSize: 15,

    "&:hover, &:active, &:focus, &:focus-within": {
      border: `1px solid ${theme.palette.secondary.light}`,
      outline: "none",
    },
  },

  action: {
    padding: "1rem 0",
    display: "flex",
    width:'50%',
    justifyContent: "flex-start",
    "& button": {
      width:'200px',
      margin:'0 auto'
    },
  },
  tipsSection: {},
  pin: {
    position: "absolute",
    top: "1rem",
    right: "1rem",
  },
  tipsPaper: {
    marginTop: "1rem",
    padding: "1rem",
    backgroundColor: "#e6e38a",
    position: "relative",
  },
  uploadZone: {
    border: "1px dotted gray",
    borderRadius: "0.5rem",
    backgroundColor: "#E2E2E2",
    minHeight: "5rem",
    height: "5rem",
    padding: "0.5rem 1rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    cursor: "pointer",
  },
  uploadedItem: {
    width: "3rem",
    height: "100%",
    border: "1px solid gray",
    borderRadius: "0.4rem",
    overflow: "hidden",
    margin: "0 0.5rem",
    display: "flex",
    alignItems: "center",
    "& img": {
      width: "100%",
    },
  },
  similarQuestions: {
    border: "1px solid gray",
    padding: "10px",
    marginTop: "10px",
  },
  similarQuestionItem: {
    fontWeight: 500,
    color: theme.palette.text.secondary,
    fontSize: "1.1rem",
    padding: "0.8rem 0",
    "&:hover": {
      fontWeight: "bold",
    },
  },

  agreements: {
    border: `1px dotted ${theme.palette.primary.main}`,
    borderRadius: "4px",
    background: theme.palette.background.default,
    fontSize: "0.9rem",
    fontWeight: 600,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    background: "black",
  },
  fieldTitle: {
    color: theme.palette.secondary.main,
    fontWeight: 500,
    fontSize: 17,
    marginBottom: 10,
  },

  discardButton: {
    background: "#633DF8",
    borderRadius: 6,
    padding: "12px 20px",
    fontSize: 15,
    fontWeight: 600,
    color: "#fff",
    border: "#633DF8",
    textTransform: "capitalize",

    "&:hover": {
      border: "#6c5da7",
      background: "#6c5da7",
    },
  },
  textField: {
      width:'50%',
      borderRadius: 12,
      paddingLeft:'10px',
      border: `1px solid ${theme.palette.secondary.light}`,
      "& .ql-toolbar": {
        border: "none",
      },
      "& .ql-container": {
        minHeight: "5rem",
        maxHeight: "10rem",
        overflow: "hidden auto",
        borderRadius: "6px",
        background: theme.palette.secondary.lightest,
        border: "none",
      },
      "& .ql-editor": {
        minHeight: ({ minHeight }) => (minHeight ? minHeight : "5rem"),
      },
    },
  
}));

const EmailService = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [errors, setErrors] = useState(null);
  const [touched, setToucehd] = useState(false);

  const [emailList, setEmailLists] = useState([]);
  const [emails, setEmails] = useState([]);
  const { currentUser: isAuthenticated } = useAuth();

  const alertUser = useCallback((e) => {
    e.preventDefault();
    e.returnValue = "";
  }, []);
  
  useEffect(() => {
    const handleGetEmails = async () => {
      const res = await API.emailService.getEmail();
      setEmailLists(res.emails);
     }
     handleGetEmails();
    window.addEventListener("beforeunload", alertUser);
    return () => {
      window.removeEventListener("beforeunload", alertUser);
    };
  }, [alertUser]);

  const handleChangeEmail = event  => {
    setEmails(event.target.value)
  }

  const validateEmail = (email) => {
    const trimmedEmail = email.trim(); // Remove extra spaces
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regular expression for email validation
    return emailRegex.test(trimmedEmail);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    let emailAddress = emails.replace(/\s/g, '').split(',')

    if (!isAuthenticated) {
      dispatch(pushSnackbar("Please login to post your question", "warning"));
      dispatch(openModal("LOGIN_MODAL"));
      return;
    }

    for(let i = 0; i < emailAddress.length; i++) {
      if(validateEmail(emailAddress[i])) {
        try {
            const res = await API.emailService.addEmail({
              email: emailAddress[i],
            });
            if (res) {
              dispatch(
                pushSnackbar(`${res.message}`, `${res.status}`)
              );
            }
            const data = await API.emailService.getEmail();
            setEmailLists(data.emails);
        } catch (error) {
            dispatch(
              pushSnackbar("Something went wrong, Please try againg!", "error")
            );
        }
      } else {
        dispatch(
          pushSnackbar(`${emailAddress[i]} is not the valid email address`, "error")
        );
      }
    }
  };
  const handleEmailListDelete = async (email) => {
    try {
      const res = await API.emailService.deleteEmail(email);
      if (res) {
        dispatch(
          pushSnackbar(`${res.message}`, `${res.status}`)
        );
      }
      const data = await API.emailService.getEmail();
      setEmailLists(data.emails);
    } catch (e) {
      dispatch(
        pushSnackbar("Something went wrong, Please try againg!", "error")
      );
    }
  }
  return (
    <Paper className={classes.askForm} component="form" onSubmit={handleSubmit}>
      <Box className={classes.title} mb={2}>
        <Typography
          variant="h5"
          component="h3"
          className={classes.sectionTitle}
        >
          Send Email To Users
        </Typography>
        <TextField
              label=""
              variant="outlined"
              placeholder="emails"
              style={{
                borderRadius: 12,
                background: "#F5F7FF",
                width:'50%',
              }}
              onChange={handleChangeEmail}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleSubmit}>
                      <AddIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
        />
      </Box>

      <Box className={classes.content} mb={2}>
        <Typography variant="h6" component="h2" className={classes.fieldTitle}>
          Emails
        </Typography>
        {/* <Typography component="p" variant="body1" className="description">
          Include any details that might help us answer your question
        </Typography> */}
        <TableContainer component={Paper} style={{width:'50%'}} >
          <Table aria-label="email list table" >
            <TableHead>
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* Replace the data below with your actual email list data */}
              {
                emailList.map((item,idx) => 
                <TableRow key={item.address}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>{item.address}</TableCell>
                  <TableCell>
                    <Button
                            className={classes.actionBtn}
                            variant="outlined"
                            size="small"
                            color="secondary"
                            onClick={() => handleEmailListDelete(item.address)}
                          >
                            <BiTrash />
                          </Button>
                    </TableCell>
                </TableRow>)
              }
              {/* Add more rows as needed */}
            </TableBody>
          </Table>
        </TableContainer>
        {errors &&
          touched &&
          errors.content &&
          errors.content.message !== "" && (
            <Box color="red">{errors.content.message}</Box>
          )}
      </Box>
    </Paper>
  );
};
export default EmailService;
