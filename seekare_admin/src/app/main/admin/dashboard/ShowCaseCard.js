import React from "react";
import { Box, makeStyles, Paper } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    padding: "1rem",
    borderRadius: "0.3rem",
  },
  icon: (props) => ({
    padding: "1rem",
    border: `3px solid ${props.color}`,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }),
  number: (props) => ({
    fontSize: "1.5rem",
    fontWeight: "bold",
  }),
  title: (props) => ({
    color: props.color ? props.color : "black",
    textTransform: "capitalize",
    padding: "0.5rem",
    fontWeight: "bold",
    fontSize: "1.2rem",
  }),
});
const ShowCaseCard = ({ icon, number, title, color }) => {
  const classes = useStyles({ color });
  return (
    <Paper className={classes.root}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box className={classes.icon}>{icon}</Box>
        <Box className={classes.number}>{number}</Box>
      </Box>
      <Box className={classes.title}>{title}</Box>
    </Paper>
  );
};

export default ShowCaseCard;
