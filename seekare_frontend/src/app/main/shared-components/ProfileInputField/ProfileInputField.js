import React from "react";

import { TextField, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  input: {
    border: "none",
    flex: "1",
    "& input": {
      border: "none",
      outline: "none",
    },
    "& fieldset": {
      border: "none",
    },
  },
}));

export const ProfileInputField = ({
  value,
  onChange,
  name,
  size,
  type,
  placeholder,
}) => {
  const classes = useStyles();

  return (
    <TextField
      variant="outlined"
      size={size}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={classes.input}
    />
  );
};
