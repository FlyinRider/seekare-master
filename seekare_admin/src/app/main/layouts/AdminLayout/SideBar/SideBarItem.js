import React from "react";
import { Box, makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    borderRadius: "0.5rem",
    display: "flex",
    alignItems: "center",
    color: "white",
    padding: "0.5rem",
    cursor: "pointer",
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      backgroundColor: "#00d0f1",
    },
  },
  link: {
    color: "white",
    textDecoration: "none",

    "&:hover": {
      fontWeight: "bold",
      color: "white",
    },
  },
});
const SideBarItem = ({ icon, title, link }) => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Box padding="0.2rem" display="flex">
        {icon}
      </Box>
      <Box padding="0.2rem" color="white">
        <Link className={classes.link} to={link}>
          {title}
        </Link>
      </Box>
    </Box>
  );
};

export default SideBarItem;
