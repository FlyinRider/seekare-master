import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "0 2px",
    background: "#d3d4d7",
  },
}));

const HightLightTag = ({ children }) => {
  const classes = useStyles();
  return <span className={classes.root}>{children}</span>;
};

HightLightTag.propTypes = {
  chidlren: PropTypes.node,
};

export default HightLightTag;
