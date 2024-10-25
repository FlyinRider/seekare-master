import React, { useCallback, useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Checkbox,
  Chip,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Typography,
  FormControl,
  FormHelperText,
  OutlinedInput,
  InputLabel,
} from "@material-ui/core";

import { Skeleton } from "@material-ui/lab";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";

import useStyles from "./useStyles";
import useSafeDispatch from "app/hooks/useSafeDispatch";
import * as API from "../../../../services/api";
import TitleHeader from "../../TitleHeader";
import Button from "app/main/shared-components/Button";
import Loader from "app/main/layouts/ClientLayout/Loader";
import { BiSad } from "react-icons/bi";
import { useFormik } from "formik";
import * as Yup from "yup";
import { authService } from "app/services/api";
import { updateUser, uploadFile } from "app/store/user/actions";
import { pushSnackbar } from "app/store/ui/actions";

const UserDetailPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const safeDispatch = useSafeDispatch(dispatch);
  // const resUser = useSelector((state) => state.user);

  const { userID } = useParams();
  const [user, setUser] = useState(null);
  const [userImage, setUserImage] = useState(
    "images/membership/premium_badge.svg"
  );
  const [questions, setQuestions] = useState([]);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);

  const [isUserEdit, setIsUserEdit] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchUser = async (userID) => {
      const { user } = await API.userService.getUser(userID);
      setUser(user);
      setUserImage(user.photoUrl);
    };

    const fetchQuestions = async (userID) => {
      const { questions } = await API.userService.getQuestionsPosted(userID);
      setQuestions(questions);
    };

    const fetchAnsweredQuestions = async (userID) => {
      const { questions } = await API.questionService.getQuestionsAnswered(
        userID
      );
      setAnsweredQuestions(questions);
    };

    fetchUser(userID);
    fetchQuestions(userID);
    fetchAnsweredQuestions(userID);
  }, [userID, safeDispatch]);

  function toggleEditForm() {
    setIsUserEdit((prevIsUserEdit) => !prevIsUserEdit);
  }

  const updateUserInfo = useCallback(({ username, email }) => {}, [dispatch]);

  const handleUploadImage = useCallback((e) => {
    if (isSubmitting) return;

    const reader = new FileReader(),
      files = e.target.files;
    reader.onload = async function (event) {
      setUserImage(reader.result);

      const API_BASE_URL =
        process.env.NODE_ENV === "development"
          ? "http://localhost:5000"
          : "https://seekare-new-backend.herokuapp.com";

      const file = await API.userService.uploadFile({
        base64File: event.target.result,
      });

      if (file.status === "success") {
        const filePath = `${API_BASE_URL}/uploads/${file.data}`;

        const payload = {
          userID,
          photoUrl: filePath,
        };

        await dispatch(updateUser(payload));
        setUserImage(filePath);
      } else {
        dispatch(pushSnackbar("Upload failed", "error"));
      }
    };
    reader.readAsDataURL(files[0]);
  }, []);

  const { handleSubmit, handleChange, values, errors, touched } = useFormik({
    initialValues: {
      userName: user && user.username,
      email: user && user.email,
      password: "",
      confirmPwd: "",
      age: 20,
    },
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      userName: Yup.string().required("Username is required"),
      email: Yup.string()
        .required("Email is required")
        .email("Email is not valid"),
    }),
    onSubmit: async (values, actions) => {
      if (isSubmitting) return;
      setIsSubmitting(true);

      try {
        const payload = {
          userID,
          username: values.userName,
          email: values.email,
        };

        await dispatch(updateUser(payload));
        setIsSubmitting(false);

        const { user } = await API.userService.getUser(userID);
        setUser(user);
      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <Box className={classes.root}>
      {isSubmitting && <Loader />}
      <TitleHeader title="User Detail" breadcrumb="Users / Detail" />
      {user ? (
        <Box mt={2} className={classes.detailContent}>
          <Grid
            container
            component={Paper}
            elevation={2}
            className={classes.userCard}
          >
            <Grid item xs={12} md={2} className={classes.cardAvatar}>
              <label htmlFor="change-img">
                <Avatar className={classes.avatar} src={userImage} />
                <input
                  type="file"
                  hidden
                  id="change-img"
                  onChange={handleUploadImage}
                  accept="image/*"
                />
              </label>
              <Chip
                className={classes.membershipBadge}
                color={`${
                  user.role && user?.role["title"] === "premium_user"
                    ? "primary"
                    : "default"
                }`}
                label={user?.role["title"]}
                avatar={
                  user.role && user?.role["title"] === "premium_user" ? (
                    <Avatar src="images/membership/premium_badge.svg" />
                  ) : null
                }
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography component="h3">{user.username}</Typography>
              <Typography component="p" variant="caption">
                {user.email}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              {isUserEdit ? null : (
                <Button size="sm" onClick={toggleEditForm}>
                  Edit
                </Button>
              )}
              {isUserEdit && (
                <Box>
                  <form onSubmit={handleSubmit} className={classes.editForm}>
                    <FormControl
                      variant="outlined"
                      size="small"
                      className={classes.formControl}
                    >
                      <InputLabel htmlFor="userName">Username</InputLabel>
                      <OutlinedInput
                        id="userName"
                        name="userName"
                        value={values.userName}
                        onChange={handleChange}
                        label="Username"
                      />
                      {errors && errors.userName && touched.userName && (
                        <FormHelperText error={true}>
                          {errors.userName}
                        </FormHelperText>
                      )}
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
                        onChange={handleChange}
                        label="Email"
                      />
                      {errors && errors.email && touched.email && (
                        <FormHelperText error={true}>
                          {errors.email}
                        </FormHelperText>
                      )}
                    </FormControl>
                    <div className={classes.submitWrapper}>
                      <Button
                        type="submit"
                        variant="contained"
                        className={classes.submitbutton}
                      >
                        Save
                      </Button>
                      <Button
                        type="button"
                        variant="contained"
                        onClick={toggleEditForm}
                        className={classes.submitbutton}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </Box>
              )}
            </Grid>
          </Grid>
          <Grid container spacing={2} className={classes.qas}>
            <Grid item xs={12} md={6}>
              <Paper>
                <Box p={2} className={classes.listCardHeader}>
                  <Typography variant="h6">Questions</Typography>
                </Box>
                <Box>
                  {questions && questions.length > 0 ? (
                    <List>
                      {questions.map((question) => (
                        <ListItem key={question._id}>
                          <ListItemAvatar>
                            <Checkbox
                              edge="start"
                              tabIndex={-1}
                              disableRipple
                            />
                          </ListItemAvatar>
                          <ListItemText primary={question.title} />
                          <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="delete">
                              <MdDelete />
                            </IconButton>
                          </ListItemSecondaryAction>
                        </ListItem>
                      ))}
                    </List>
                  ) : (
                    <Box
                      padding="1.5rem"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <BiSad fontSize="2rem" />
                      No Questions Yet
                    </Box>
                  )}
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper>
                <Box p={2} className={classes.listCardHeader}>
                  <Typography variant="h6">Answers</Typography>
                </Box>
                <Box>
                  {answeredQuestions && answeredQuestions.length > 0 ? (
                    <List>
                      {answeredQuestions.map((question) => (
                        <ListItem key={question._id}>
                          <ListItemAvatar>
                            <Checkbox
                              edge="start"
                              tabIndex={-1}
                              disableRipple
                            />
                          </ListItemAvatar>
                          <ListItemText primary={question.title} />
                          <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="delete">
                              <MdDelete />
                            </IconButton>
                          </ListItemSecondaryAction>
                        </ListItem>
                      ))}
                    </List>
                  ) : (
                    <Box
                      padding="1.5rem"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <BiSad fontSize="2rem" />
                      No Answers Yet
                    </Box>
                  )}
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      ) : (
        <Skeleton variant="rect" width={210} height={118} />
      )}
    </Box>
  );
};

export default UserDetailPage;
