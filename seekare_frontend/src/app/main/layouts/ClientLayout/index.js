import React from "react";
import { Box, makeStyles } from "@material-ui/core";
import Header from "./Header";
import { useLocation } from "react-router-dom";
import WikiHeader from "./WikiHeader";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "calc(100vh - 77px)",
  },
}));

const ClientLayout = ({ children }) => {
  const classes = useStyles();
  const location = useLocation();
  const GHeader =
    location.pathname.startsWith("/wiki") || location.pathname === "/"
      ? WikiHeader
      : Header;

  return (
    <React.Fragment>
      <GHeader />
      <Box className={classes.root}>{children}</Box>
    </React.Fragment>
  );
};

export default ClientLayout;
