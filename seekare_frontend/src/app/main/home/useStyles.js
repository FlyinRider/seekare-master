import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {},
  questions: {
    overflow: "hidden scroll",
    height: "72vh",
    "&::-webkit-scrollbar": {
      width: "0",
    },
    "&::-webkit-scrollbar-thumb": {
      display: "none",
    },
  },
  tabs: {
    padding: "10px 0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  tabsItem: {
    cursor: "pointer",
    textTransform: "uppercase",
    transition: "all 0.3s ease",
    justifyContent: "center",
    padding: "5px 10px",
    border: `1px solid gray`,
    fontWeight: 700,
    fontSize: "14px",
    color: theme.palette.text.secondary,
    "&:first-child": {
      borderTopLeftRadius: "6px",
      borderBottomLeftRadius: "6px",
    },
    "&:last-child": {
      borderTopRightRadius: "6px",
      borderBottomRightRadius: "6px",
    },
    "&.active, &:hover": {
      color: theme.palette.text.primary,
      backgroundColor: "white",
    },
  },
}));

export default useStyles;
