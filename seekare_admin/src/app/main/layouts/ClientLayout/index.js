import React from "react";
import { Box, makeStyles } from "@material-ui/core";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { openModal } from "app/store/ui/actions";
import WikiHeader from "./WikiHeader";
const useStyles = makeStyles((theme) => ({
  root: {
    height: "calc(100vh - 77px)",
  },
}));

const ClientLayout = ({ children }) => {
  const classes = useStyles();
  const location = useLocation();
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(openModal("LOGIN_MODAL"));
  }, []);
  return (
    <React.Fragment>
      <Box className={classes.root}>{children}</Box>
    </React.Fragment>
  );
};

export default ClientLayout;
