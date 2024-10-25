import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, Redirect, useHistory } from "react-router-dom";
import {
  Box,
  Button,
  Grid,
  Hidden,
  makeStyles,
  Typography,
} from "@material-ui/core";
import * as API from "app/services/api";
import useAuth from "app/hooks/useAuth";
import useSafeDispatch from "app/hooks/useSafeDispatch";
import { pushSnackbar } from "app/store/ui/actions";
import RightSidebar from "app/main/layouts/ClientLayout/RightSidebar";

export const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2rem",
  },
  recentQCards: {
    padding: "1rem",
    minHeight: "20rem",
  },
  qItem: {
    display: "flex",
    justifyContent: "space-between",
    padding: "1rem 0.5rem",
    border: `1px solid ${theme.palette.secondary.main}`,
    borderRadius: "4px",
    marginBottom: "5px",
    "&:hover": {
      background: "#f7f7f7",
    },
  },
}));

const MDQuestions = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const safeDispatch = useSafeDispatch(dispatch);
  const { isMd, currentUser } = useAuth();

  const [mdQuestions, setMdQuestions] = useState([]);

  useEffect(() => {
    if (currentUser.userID) {
      const fetchMdQuestions = async () => {
        const { mdQuestions } = await API.questionService.getMDQuestions(
          currentUser.userID
        );

        setMdQuestions(mdQuestions);
      };

      fetchMdQuestions();
    }
  }, [currentUser]);

  if (!isMd) {
    safeDispatch(pushSnackbar("Only MD can access to this page", "warning"));
    return <Redirect to="/questions" />;
  }

  return (
    <Grid container>
      <Hidden mdDown>
        <Grid item md={3}>
          <Typography component="h6" variant="h6">
            Recent Answered Questions
          </Typography>
        </Grid>
      </Hidden>
      <Grid item md={6}>
        <Typography variant="h6" component="h1">
          Questions Assigned To You (MD)
        </Typography>
        <Typography>
          {mdQuestions.length > 0
            ? `${mdQuestions.length} Questions Assigned`
            : "No Questions Assigned"}
        </Typography>
        {mdQuestions.length > 0 && (
          <Box padding="1rem 0">
            {mdQuestions.map((qItem) => (
              <Box key={qItem._id} className={classes.qItem}>
                <Link to={`/questions/${qItem._id}/show`}>{qItem.title}</Link>
                <Box>
                  <Button
                    variant="outlined"
                    size="small"
                    color="secondary"
                    onClick={() => history.push(`/questions/${qItem._id}/show`)}
                  >
                    Answer
                  </Button>
                </Box>
              </Box>
            ))}
          </Box>
        )}
      </Grid>
      <Hidden>
        <Grid item md={3}>
          <RightSidebar />
        </Grid>
      </Hidden>
    </Grid>
  );
};

export default MDQuestions;
