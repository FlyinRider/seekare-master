import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: (props) => ({
    border: "none",
    outline: "none",
    borderRadius:
      props.size === "lg"
        ? "1.2rem"
        : props.size === "md"
        ? 6
        : props.size === "sm"
        ? "0.5rem"
        : "0.5rem",
    background:
      props.variant === "default" ? "none" : theme.palette[props.color].main,
    color: props.variant === "default" ? "gray" : "white",
    // display: "inline-block",
    fontSize: `${
      props.size === "lg"
        ? "1.1rem"
        : props.size === "md"
        ? "1rem"
        : props.size === "sm"
        ? "0.8rem"
        : "1rem"
    }`,
    fontWeight: 600,
    padding: `${
      props.size === "lg"
        ? "0.8rem 1rem"
        : props.size === "md"
        ? "0.6rem 0.8rem"
        : props.size === "sm"
        ? "0.4rem 0.6rem"
        : "0.2rem 0.4rem"
    }`,
    textAlign: "center",
    "&:hover": {
      background:
        props.variant === "default" ? "none" : theme.palette[props.color].dark,
      color: props.variant === "default" ? "gray" : "white",
    },
    cursor: "pointer",
    "&:disabled": {
      background: theme.palette.secondary.light,
      cursor: "not-allowed",
    },
    [theme.breakpoints.down("sm")]: {
      padding: "0.5rem 0.5rem",
      fontSize: "0.8rem",
    },
  }),
}));

const CustomButton = ({
  children,
  variant = "default", // default, outlined, contained
  color = "primary",
  size,
  className,
  onClick,
  type,
  disabled,
  style,
  ref,
  ...rest
}) => {
  const classes = useStyles({ size, variant, color });
  return (
    <button
      className={`${classes.root} ${className}`}
      type={type}
      onClick={onClick}
      style={style}
    >
      {children}
    </button>
  );
};

export default CustomButton;
