import React from "react";
import PropTypes from "prop-types";
import { Box, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.logo,
    display: "flex",
    alignItems: "center",
    width: "max-content",
    background: "white",
    padding: "0.5rem 1rem",
    borderRadius: "1rem",
    "& img": {
      width: "45px",
    },
    "& .title": {
      margin: "0 0.2rem",
      fontSize: "1.5rem",
      fontWeight: "600",
      color: theme.palette.primary ? theme.palette.primary.main : "black",
    },
  },
}));

const Logo = ({ dir }) => {
  const classes = useStyles();
  return (
    <Box
      component="a"
      href="/"
      className={classes.root}
      display="flex"
      flexDirection={dir}
    >
      <img src="/images/logos/logo.svg" alt="logo" />
      <Box display="flex" flexDirection="column" alignItems="center">
        <Box display="flex" fontWeight="600" fontSize="1.2rem">
          <Box color="#3C7F97">SEE</Box>
          <Box color="#C4A397">KARE</Box>
        </Box>
      </Box>
      {/* <Box className="title">MD Help</Box> */}
    </Box>
  );
};

Logo.propTypes = {
  dir: PropTypes.oneOf(["row", "column"]),
};

export default Logo;
