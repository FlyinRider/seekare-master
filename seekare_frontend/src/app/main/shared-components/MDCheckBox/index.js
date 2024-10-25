import React from "react";
import { Checkbox, withStyles } from "@material-ui/core";

const MDCheckBox = withStyles((theme) => ({
  root: {
    color: theme.palette.secondary.main,
    "&$checked": {
      color: theme.palette.secondary.main,
    },
  },
  checked: {},
}))((props) => <Checkbox color="default" {...props} />);

export default MDCheckBox;
