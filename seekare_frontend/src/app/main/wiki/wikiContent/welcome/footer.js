import React from "react";
import { Box, Grid, makeStyles, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import useSafeDispatch from "app/hooks/useSafeDispatch";
import { changeResponsive, setIsRunTour } from "app/store/ui/actions";
import CustomButton from "app/main/shared-components/Button";
import Banner from "app/main/home/Banner";

import { closeModal, openModal } from "app/store/ui/actions";

const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: '"Oxygen", sans-serif',
    position: "relative",
    // height: "100%",
    display: "flex",
    flexDirection: "column",
    background: "transparent",
    [theme.breakpoints.down("sm")]: {
      // marginTop: "200px",
    },
  },
  askButton: {
    width: "100%",
    padding: "0.6rem 1rem",
  },
  features: {
    flexGrow: 1,
    "& h4": {
      fontWeight: "bold",
      fontSize: "2rem",
      padding: "0.5rem 0",
    },
  },
  featuresTitle: {
    fontFamily: '"Oxygen", sans-serif',
    color: theme.palette.text.secondary,
    textAlign: "center",
    fontSize: "1.5rem",
    fontWeight: "bold",
    padding: "20px 0",
  },
  itemWrapper: {
    position: "relative",
    height: "100%",
    marginTop: 20,

    "&:before": {
      content: "' '",
      display: "block",
      position: "absolute",
      width: "90%",
      height: 40,
      borderRadius: "1rem",
      bottom: -10,
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 0,
      background: "rgba(255, 255, 255, 0.94)",
      opacity: 0.84,
    },
  },
  item: {
    color: theme.palette.text.secondary,
    margin: "0.5rem 0",
    borderRadius: "1rem",
    background: "white",
    padding: "0 20px",
    position: "relative",
    boxShadow: "29.3902px 31.4273px 117.561px rgba(27, 49, 66, 0.08)",
    paddingTop: 60,
    height: "100%",
    zIndex: 2,
    [theme.breakpoints.down("sm")]: {
      "& p": {
        // display: "none",
        fontSize: "0.9rem",
      },
    },
    [theme.breakpoints.down(512)]: {
      paddingTop: "30px",
      "& p": {
        display: "block",
        fontSize: "0.9rem",
      },
    },
    "&:last-child": {
      border: "none",
    },

    "& p": {
      marginBottom: "0.5rem",
      textAlign: "center",
    },
  },
  itemTitle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    flexDirection: "column",
    color: theme.palette.text.primary,
    marginBottom: "0.5rem",

    "& h5": {
      fontSize: "1.2rem",
    },
  },
  itemIcon: {
    padding: 10,
    width: 80,
    height: 80,
    borderRadius: "50%",
    backgroundColor: theme.palette.secondary.light,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: -40,
    left: "50%",
    transform: "translateX(-50%)",
    [theme.breakpoints.down(512)]: {
      width: 60,
      height: 60,
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
      width: 84,
      height: 84,
      [theme.breakpoints.down(512)]: {
        flexWrap: "wrap",
        width: 64,
        height: 64,
      },
    },
    "&:after": {
      width: 65,
      height: 65,
      [theme.breakpoints.down(512)]: {
        width: 60,
        height: 60,
      },
    },
  },
  titleText: {
    fontFamily: '"Oxygen", sans-serif',
    fontWeight: 700,
    color: theme.palette.text.secondary,
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.9rem !important",
    },
  },
  footer: {
    display: "flex",
    justifyContent: "space-evenly",
    padding: "10px 0",
    color: theme.palette.text.secondary,
    "& a": {
      color: theme.palette.text.secondary,
      lineHeight: "2rem",
    },
    [theme.breakpoints.down(1340)]: {
      marginTop:'30px'
    },
    [theme.breakpoints.down(768)]: {
      marginTop:'40px'
    },
    [theme.breakpoints.up(1340)]: {
      marginTop:'0'
    },
  },
  footerLink: {
    marginLeft: "5px",
    color: "#353C48",
    fontSize: "0.8rem",
    alignSelf: "center",
    cursor: "pointer",

    "&:hover": {
      textDecoration: "underline",
    },
  },
  itemsWrappers: {
    marginTop: 30,
    [theme.breakpoints.down(1280)]: {
      "&>:last-child": {
        display: "none",
      },
    },
  },
  itemsWrapper: {
    marginTop: 30,
    [theme.breakpoints.down("sm")]: {
      flexWrap: "nowrap",
    },
    [theme.breakpoints.down(512)]: {
      flexWrap: "wrap",
    },
  },
  gettingStartedButton: {
    padding: "20px 0",
    textAlign: "center",
  },
  gettingStarted: {
    [theme.breakpoints.down(1340)]: {
      display: "none",
      position: "absolute",
      top: "-22px",
      right: "0",
      zIndex: "10",
    },
  },
  tutorialButton: {
    [theme.breakpoints.down(1340)]: {
      background: "transparent",
      color: 'transparent',
      '&:hover' : {
        background:'transparent',
        color:'transparent !important',
        cursor:'inherit !important'
      }
    },
  },
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

export const WelcomeFooter = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const safeDispatch = useSafeDispatch(dispatch);
  const handleGettingStarted = () => {
    dispatch(setIsRunTour(true, 0));
  };
  const responsive =
    useSelector((state) => state.ui.responsive.responsiveType) || "landing";

  const handleClickLink = (selectedModal) => () => {
    safeDispatch(
      openModal(selectedModal, {
        onCancel: async () => {
          safeDispatch(closeModal());
        },
      })
    );
  };
  return (
    <div
      style={{
        display: responsive === "landing" ? "" : "none",
      }}
    >
      <Banner className={`${classes.bannerContainer} `} />
      <Box className={`${classes.root}`}>
        <Box className={classes.features} mt="5">
          {/* <Typography variant="h6" className={classes.featuresTitle}>
            Build Health community Together
          </Typography> */}
          <Grid container className={`${classes.itemsWrappers} welcome-part`}>
            {items.map((item) => (
              <Grid
                item
                lg={4}
                component={Box}
                p={1}
                key={item.title}
                style={{ width: "100%" }}
              >
                <Box className={classes.itemWrapper}>
                  <Box className={classes.item}>
                    <Box className={classes.itemTitle}>
                      <Box className={classes.itemIcon}>
                        <img src={item.icon} alt={item.title} />
                      </Box>
                      <Typography
                        variant="h5"
                        component="h5"
                        className={classes.titleText}
                      >
                        {item.title}
                      </Typography>
                    </Box>
                    <p>{item.description}</p>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
          <Box className={classes.gettingStarted}>
            <Box className={classes.gettingStartedButton} mt={2}>
              <CustomButton
                variant="contained"
                color="secondary"
                onClick={handleGettingStarted}
                size="lg"
                className={classes.tutorialButton}
              >
                Launch Tutorial
              </CustomButton>
            </Box>
          </Box>
        </Box>

        <Box className={classes.footer}>
          <div
            className={classes.footerLink}
            onClick={handleClickLink("ABOUT_MODAL")}
          >
            About Us
          </div>
          <div
            className={classes.footerLink}
            onClick={handleClickLink("CONTACT_US_MODAL")}
          >
            Contact Us
          </div>
          <div
            className={classes.footerLink}
            onClick={handleClickLink("PRIVACY_MODAL")}
          >
            Privacy Policy
          </div>
          <div
            className={classes.footerLink}
            onClick={handleClickLink("TERMS_MODAL")}
          >
            Terms and Conditions
          </div>
        </Box>
      </Box>
    </div>
  );
};
