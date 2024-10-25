import React from "react";

import { Box, makeStyles, Paper } from "@material-ui/core";
import { WelcomeFooter } from "./footer";

const useStyles = makeStyles((theme) => ({
  rootWrapper: {},
  gettingStarted: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    paddingTop: "30px",
  },
  gettingStartedWrapper: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    boxShadow: "none",
    borderRadius: "1rem",
    flexGrow: 1,
    background: "transparent  ",
  },
  welcome: {
    color: theme.palette.secondary.main,
    "& svg > path": {
      fill: theme.palette.secondary.main,
      stroke: theme.palette.secondary.main,
    },
    "& svg": {
      maxWidth: "40px",
      maxHeight: "40px",
      marginRight: "20px",
    },
    display: "flex",
  },
  bannerContainer: {
    marginBottom: "20px",
  },
}));

export const Welcome = ({ wikis }) => {
  const classes = useStyles();

  return (
    <Box display="flex" flexDirection="column" height="100%">
      {/* <Banner className={classes.bannerContainer} /> */}
      <Paper className={classes.gettingStartedWrapper}>
        <WelcomeFooter wikis={wikis} />
      </Paper>
    </Box>
  );
};
