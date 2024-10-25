import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Box, makeStyles, Typography } from "@material-ui/core";

import { openModal } from "app/store/ui/actions";
import { ASKING } from "app/constants";
import CustomButton from "app/main/shared-components/Button";
import useAuth from "app/hooks/useAuth";
// import ReferButton from "app/main/shared-components/ReferButton";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "0 2rem",
    fontFamily: '"Oxygen", sans-serif',
    position: "relative",
    height: "100%",
  },
  askButton: {
    width: "100%",
    padding: "0.6rem 1rem",
    borderRadius: 8,
  },
  features: {
    padding: "0.5rem",
    border: "1px solid #9E99E4",
    borderRadius: "16px",
    marginTop: "0.5rem",
    maxHeight: "calc(100vh - 100px)",
    overflow: "hidden auto",
  },
  featuresTitle: {
    fontFamily: '"Oxygen", sans-serif',
    fontSize: "1.2rem",
    fontWeight: "bold",
    color: theme.palette.text.secondary,
  },
  item: {
    background: "white",
    borderRadius: "16px",
    padding: "16px",
    color: theme.palette.text.secondary,
    margin: "0.5rem 0",
    borderBottom: `1px solid ${theme.palette.border.main}`,
    boxShadow: "20.7876px 22.2285px 83.1505px rgba(27, 49, 66, 0.08);",

    "&:last-child": {
      border: "none",
    },

    "& p": {
      marginBottom: "0.5rem",
    },
  },
  itemTitle: {
    display: "flex",
    alignItems: "center",
    color: theme.palette.secondary.main,
    marginBottom: "0.5rem",
  },
  itemIcon: {
    padding: 10,
    width: 40,
    height: 40,
    borderRadius: "50%",
    backgroundColor: theme.palette.secondary.light,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",

    "& img": {
      width: 30,
      height: 30,
    },
    "&:before, &:after": {
      content: `" "`,
      border: "1px solid",
      borderColor: theme.palette.secondary.light,
      borderRadius: "50%",

      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },

    "&:before": {
      width: 42,
      height: 42,
    },
    "&:after": {
      width: 45,
      height: 45,
    },
  },
  titleText: {
    fontFamily: '"Oxygen", sans-serif',
    fontWeight: 700,
    color: theme.palette.secondary.main,
    marginLeft: "0.5rem",
  },
  footer: {
    position: "fixed",
    bottom: 0,
    paddingBottom: "2rem",
    color: theme.palette.text.secondary,
    "& a": {
      color: theme.palette.text.secondary,
      lineHeight: "2rem",
    },
  },
  footerLink: {
    marginLeft: "5px",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  rightBottom: {},
}));

const items = [
  {
    icon: "/images/icons/shield.svg",
    title: "Moderated by physicians",
    description: "Site moderated by physicians and trained professionals",
  },
  {
    icon: "/images/icons/brain.svg",
    title: "Share your experiences",
    description:
      "Help others by sharing your knowledge and personal experiences",
  },
  {
    icon: "/images/icons/no-stopping.svg",
    title: "Fight against misinformation",
    description:
      "Put an end to disinformation by spreading evidence based medical knowledge",
  },
];

const RightSidebar = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { isAuthenticated } = useAuth();

  const goToAsk = () => {
    if (isAuthenticated) {
      history.push("/wiki/question/ask");
    } else {
      dispatch(
        openModal("LOGIN_MODAL", {
          state: ASKING,
        })
      );
    }
  };

  return (
    <Box className={classes.root}>
      <Box display="flex" alignItems="center" justifyContent="flex-end">
        <CustomButton
          className={classes.askButton}
          color="secondary"
          variant="contained"
          onClick={goToAsk}
        >
          Add Post
        </CustomButton>
      </Box>
      <Box className={classes.features}>
        {/* <Typography className={classes.featuresTitle}>
          Build Health community Together
        </Typography> */}
        {items.map((item) => (
          <Box className={classes.item}>
            <Box className={classes.itemTitle}>
              <Box className={classes.itemIcon}>
                <img src={item.icon} alt="item icon" />
              </Box>
              <Typography className={classes.titleText}>
                {item.title}
              </Typography>
            </Box>
            <p>{item.description}</p>
          </Box>
        ))}
        {/* <Box className={classes.rightBottom}>
          <ReferButton />
        </Box> */}
      </Box>
      {/* <Box className={classes.footer}>
        <Box>
          <Link to="/about" className={classes.footerLink}>
            About Us
          </Link>
          &middot;
          <Link to="/contact" className={classes.footerLink}>
            Contact Us
          </Link>
        </Box>
        <Box>
          <Link to="/privacy" className={classes.footerLink}>
            Privacy Policy
          </Link>
          &middot;
          <Link to="/terms" className={classes.footerLink}>
            Terms and Conditions
          </Link>
        </Box>
      </Box> */}
    </Box>
  );
};

export default RightSidebar;
