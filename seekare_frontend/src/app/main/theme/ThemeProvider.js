import React from "react";
import { ThemeProvider, createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      main: "#EB5757",
      dark: "#EB5757",
      active: "#F0EFFF",
      light: "#9E99E4",
    },
    secondary: {
      main: "#4C6FFF",
      blue: "#3F8CFF",
      light: "#A2C9F5 ",
      active: "#D9EAFF",

      lighter: "#F5F7FF",
      lightest: "#F0EFFF",
      contrastText: "#EFEFEF",
      pink: {
        light: "#EAE9FF",
      },
    },
    pink: {},
    background: {
      default: "#EBEBEB",
      paper: "#F7F7F7",
    },
    text: {
      primary: "#0000008f",
      secondary: "#333333",
      main: "#586586",
      warning: "#f57c00",
      success: "#388e3c",
      white: "#ffffff",
    },
    border: {
      main: "#DDDDDD",
      primary: "#81c784",
    },
  },
});

const MDThem = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default MDThem;
