import React from "react";
import { makeStyles } from "@material-ui/core";
import { BsX } from "react-icons/bs";

const useStyles = makeStyles((theme) => ({
  tooltipWrapper: {
    arrowColor: "#0a7fc1",
    backgroundColor: "#0a7fc1",
    overlayColor: "rgba(47, 39, 166, 0.59)",
    primaryColor: "#FFFFFF",
    color: "#FFFFFF",
    borderRadius: 5,
    fontSize: 16,
    maxWidth: "100%",
    width: 380,
    position: "relative",
    padding: 20,
  },
  closeIcon: {
    fontSize: 28,
    position: "absolute",
    right: 10,
    top: 10,
    cursor: "pointer",
  },
  title: {
    lineHeight: 1.4,
    textAlign: "center",
    padding: "20px 10px",
    color: "#FFFFFF",
    fontWeight: "bolder",
    fontSize: 17,
  },
  buttonWrapper: {
    alignItems: "center",
    display: "flex",
    justifyContent: "flex-end",
    marginTop: 15,
  },
  nextButton: {
    color: "#0a7fc1",
    background: "#FFFFFF",
    border: "none",
    borderRadius: 4,
    padding: 8,
    cursor: "pointer",
    fontSize: 16,
    lineHeight: 1,
    appearance: "none",
  },
  backButton: {
    color: "#0a7fc1",
    background: "#FFFFFF",
    border: "none",
    borderRadius: 4,
    padding: 8,
    cursor: "pointer",
    fontSize: 16,
    lineHeight: 1,
    appearance: "none",
    marginRight: 4,
  },
}));

const CustomTooltip = ({
  index,
  size,
  step,
  skipProps,
  closeProps,
  primaryProps,
  tooltipProps,
  backProps,
  isFirstStep,
  isLastStep,
}) => {
  const classes = useStyles();

  return (
    <div {...tooltipProps} className={classes.tooltipWrapper}>
      <BsX {...closeProps} className={classes.closeIcon} />
      <div className={classes.title}>{step.content}</div>
      <div className={classes.buttonWrapper}>
        {/* <button {...skipProps}>Skip Tour</button> */}
        {index > 0 && (
          <button {...backProps} className={classes.backButton}>
            Back
          </button>
        )}
        <button {...primaryProps} className={classes.nextButton}>
          {isLastStep ? "Done" : "Next"}
        </button>
      </div>
    </div>
  );
};

export default CustomTooltip;
