import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Box, Link, Portal, Typography, makeStyles } from "@material-ui/core";
import CustomButton from "../Button";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#5c6d91",
    color: theme.palette.common.white,
    maxWidth: 600,
    position: "fixed",
    bottom: 0,
    left: 0,
    margin: theme.spacing(3),
    padding: theme.spacing(3),
    outline: "none",
    zIndex: 2000,
  },
  action: {},
}));

const CookiesNotification = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    Cookies.set("consent", "true");
    setOpen(false);
  };

  useEffect(() => {
    // const consent = Cookies.get('consent');
    // if (!consent) {
    //   setOpen(true);
    // }
  }, []);

  if (!open) {
    return null;
  }

  return (
    <Portal>
      <div className={classes.root}>
        <Typography variant="body1" color="inherit">
          We use Cookies to ensure that we give you the best experience on our
          website. Read our{" "}
          <Link
            component="a"
            color="inherit"
            underline="always"
            href="/terms"
            target="_blank"
          >
            Privacy Policy
          </Link>
          .
        </Typography>
        <Box mt={2} display="flex" justifyContent="flex-end">
          <CustomButton
            color="secondary"
            variant="rounded"
            size="md"
            onClick={handleClose}
            className={classes.action}
          >
            I Agree
          </CustomButton>
        </Box>
      </div>
    </Portal>
  );
};

export default CookiesNotification;
