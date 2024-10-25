import React from "react";
import PropTypes from "prop-types";
import { Box, Button, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "white",
    padding: "2rem",
    [theme.breakpoints.down("sm")]: {
      minWidth: "20rem",
    },
  },
  actionButton: {
    margin: "0 0.5rem",
  },
}));

const ConfirmModal = ({ title, description, buttons }) => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Typography variant="h6">{title}</Typography>
      <Box p={2}>
        <Typography variant="body2">{description}</Typography>
      </Box>
      <Box display="flex" justifyContent="flex-end">
        {buttons.map((_btn) => (
          <Button
            color={_btn.type}
            className={classes.actionButton}
            variant="outlined"
            key={_btn.title}
            onClick={_btn.onClick}
          >
            {_btn.title}
          </Button>
        ))}
      </Box>
    </Box>
  );
};

ConfirmModal.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  buttons: PropTypes.array.isRequired,
};

ConfirmModal.defaultProps = {
  title: "Confirm Modal",
  description: "Please confirm your action",
  buttons: [
    {
      title: "Close",
      onClick: () => {},
    },
  ],
};

export default ConfirmModal;
