import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import {
  Box,
  Grid,
  Hidden,
  Typography,
  makeStyles,
  Button,
} from "@material-ui/core";

import useAuth from "app/hooks/useAuth";
import Loader from "app/main/layouts/ClientLayout/Loader";
import * as API from "app/services/api";
import RightSidebar from "app/main/layouts/ClientLayout/RightSidebar";
import PasswordChangeTab from "./PasswordChangeTab";
import EmailUpdateTab from "./EmailUpdateTab";
import QuestionListItem from "./QuestionListItem";
import BigographTab from "./BiographyTab";

const useStyle = makeStyles((theme) => ({
  root: {
    height: "87vh",
    overflow: "hidden auto",
    "&::-webkit-scrollbar": {
      width: "0",
    },
    "&::-webkit-scrollbar-thumb": {
      display: "none",
    },
  },
  sideTabs: {
    padding: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "10px",
  },
  sideTabItem: {
    cursor: "pointer",
    textTransform: "uppercase",
    transition: "all 0.3s ease",
    justifyContent: "center",
    padding: "5px 10px",
    border: `1px solid gray`,
    fontWeight: 700,
    fontSize: "14px",
    color: theme.palette.text.secondary,
    "&:first-child": {
      borderTopLeftRadius: "6px",
      borderBottomLeftRadius: "6px",
    },
    "&:last-child": {
      borderTopRightRadius: "6px",
      borderBottomRightRadius: "6px",
    },
    "&.active, &:hover": {
      color: theme.palette.text.primary,
      backgroundColor: "white",
    },
  },
  tabSecTitle: {
    marginBottom: "1rem",
  },
  tabContent: {
    background: "white",
    borderRadius: "8px",
    padding: "20px",
    width: "100%",
  },
  roleChip: {
    textTransform: "uppercase",
  },
  answersSec: {
    marginTop: "2rem",
  },
  divider: {
    width: "25%",
    height: "2px",
    backgroundColor: "#09e5ab",
  },
  sectionTitle: {
    fontSize: "1rem",
  },
  leftSide: {
    padding: "0 1rem",
  },
  leftSideInner: {
    borderRadius: "1rem",
    background: "white",
    height: "calc(100vh - 100px)",
    overflow: "hidden",
  },
  questionsList: {
    maxHeight: "20rem",
    overflow: "hidden auto",
  },
  dateTime: {
    color: theme.palette.text.primary,
    fontSize: "0.8rem",
  },
  submitButton: {
    backgroundColor: theme.palette.secondary.blue,
    border: "none",
    color: "white",
  },
}));

const ProfilePage = () => {
  const classes = useStyle();
  const {
    pending,
    currentUser,
    isNormalUser,
    isMd,
    isPremiumUser,
    isAuthenticated,
  } = useAuth();
  const [questions, setQuestions] = useState([]);
  const [questionsAnswered, setQuestionsAnswered] = useState([]);
  const [mdQuestions, setMdQuestions] = useState([]);
  const [userDetail, setUserDetail] = useState(null);

  useEffect(() => {
    const fetchUserDetail = async () => {
      try {
        const { user } = await API.userService.getUser(currentUser.userID);
        setUserDetail(user);
      } catch (error) {
        console.log(error);
      }
    };

    if (currentUser.userID) {
      fetchUserDetail();
    }
  }, [currentUser]);

  useEffect(() => {
    const fetchQuestions = async () => {
      const { questions } = await API.userService.getQuestionsPosted(
        currentUser.userID
      );

      const { questions: questionsAnswered } =
        await API.questionService.getQuestionsAnswered(currentUser.userID);

      if (isMd) {
        const { mdQuestions } = await API.questionService.getMDQuestions(
          currentUser.userID
        );
        setMdQuestions(mdQuestions);
      }

      setQuestions(questions);
      setQuestionsAnswered(questionsAnswered);
    };

    if (currentUser && currentUser.userID) {
      fetchQuestions();
    }
  }, [currentUser, isMd, isNormalUser, isPremiumUser]);

  return (
    <Grid container>
      <Hidden mdDown>
        <Grid item md={3} className={classes.leftSide}>
          <Box className={classes.leftSideInner}>
            <Box px={4} mt={2}>
              <Box
                component={Typography}
                variant="h6"
                className={classes.sectionTitle}
                display="flex"
              >
                Questions Posted by You
                <Box>({questions && questions.length})</Box>
              </Box>
              <Box className={`${classes.questionsList} hidden-track`}>
                {questions &&
                  questions.slice(0, 3).map((qItem) => (
                    <Box key={qItem._id} mb={1}>
                      <QuestionListItem question={qItem} />
                    </Box>
                  ))}
              </Box>
              <Box>
                <Button className={classes.submitButton}>See All</Button>
              </Box>
            </Box>
            <Box px={4} mt={2}>
              <Box
                component={Typography}
                variant="h6"
                className={classes.sectionTitle}
                display="flex"
              >
                Questions Answered by You
                <Box>({questionsAnswered && questionsAnswered.length})</Box>
              </Box>
              <Box className={`${classes.questionsList} hidden-track`}>
                {questionsAnswered &&
                  questionsAnswered.slice(0, 3).map((qItem) => (
                    <Box key={qItem._id} mb={1}>
                      <QuestionListItem question={qItem} />
                    </Box>
                  ))}
              </Box>
              <Box>
                <Button className={classes.submitButton}>See All</Button>
              </Box>
            </Box>
            {isMd && mdQuestions.length > 0 && (
              <Box px={4} mt={2}>
                <Box className={classes.divider}></Box>
                <Box
                  component={Typography}
                  variant="h6"
                  className={classes.sectionTitle}
                  display="flex"
                >
                  Questions Assigned to You
                  <Box>({mdQuestions && mdQuestions.length})</Box>
                </Box>
                <Box className={`${classes.questionsList} hidden-track`}>
                  {mdQuestions &&
                    mdQuestions.slice(0, 3).map((qItem) => (
                      <Box key={qItem._id} mb={1}>
                        <QuestionListItem question={qItem} />
                      </Box>
                    ))}
                </Box>
                <Box>
                  <Button className={classes.submitButton}>See All</Button>
                </Box>
              </Box>
            )}
          </Box>
        </Grid>
      </Hidden>
      <Grid item md={6} className={classes.root}>
        <>
          {pending ? (
            <Loader />
          ) : (
            <>
              {isAuthenticated ? (
                <Box>
                  {/* <Box className={classes.sideTabs}>
                    {tabs.map((tab) => (
                      <Box
                        key={tab}
                        className={`${classes.sideTabItem} ${
                          activeTab === tab && "active"
                        }`}
                        onClick={() => onClickTab(tab)}
                      >
                        {tab}
                      </Box>
                    ))}
                  </Box> */}
                  <Box className={classes.tabContent}>
                    {!currentUser && <Loader />}
                    <BigographTab user={userDetail} />
                    <EmailUpdateTab />
                    <PasswordChangeTab />
                  </Box>
                </Box>
              ) : (
                <Redirect to="/" />
              )}
            </>
          )}
        </>
      </Grid>
      <Hidden>
        <Grid item md={3}>
          <RightSidebar />
        </Grid>
      </Hidden>
    </Grid>
  );
};

export default ProfilePage;
