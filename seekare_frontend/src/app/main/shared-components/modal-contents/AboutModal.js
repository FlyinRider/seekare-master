import React from "react";
import { Box, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    maxHeight: "87vh",
    borderRadius: "8px",
    backgroundColor: "white",
    padding: "2rem",
    overflow: "hidden auto",
    [theme.breakpoints.down("sm")]: {
      minWidth: "20rem",
      padding: "0.4rem",
    },
  },
  pageTitle: {
    color: theme.palette.text.primary,
    fontWeight: "bold",
  },
  pageContentCard: {
    background: "white",
    borderRadius: "8px",
    overflow: "hidden",
  },
  whoweareDesc: {
    marginBottom: "2rem",
  },
  bannerImage: {
    backgroundImage: "url(images/about_us.jpg)",
    backgroundPosition: "top",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    minHeight: "15rem",
    height: "400px",
    [theme.breakpoints.down("sm")]: {
      height: "250px",
    },
  },
  detailItem: {
    border: "1px solid gray",
    borderRadius: "8px",
    padding: "1rem",
  },
  detailTitle: {
    color: theme.palette.text.main,
    fontSize: "1.6rem",
    fontWeight: "bold",
  },
}));

// const items = [
//   {
//     title: "100+ million",
//     description: "Monthly Visitors ",
//   },
//   {
//     title: "100+ million",
//     description: "Monthly Visitors ",
//   },
//   {
//     title: "100+ million",
//     description: "Monthly Visitors ",
//   },
//   {
//     title: "100+ million",
//     description: "Monthly Visitors ",
//   },
// ];

const AboutModal = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box display="flex" justifyContent="center">
        <Typography variant="h4" className={classes.pageTitle}>
          About Us
        </Typography>
      </Box>
      <Box className={classes.pageContentCard}>
        <Box className={classes.bannerImage}></Box>
        <Box padding={2}>
          <Typography variant="h6" className={classes.pageTitle}>
            Who We Are
          </Typography>
          <br />
          <Typography variant="body2" className={classes.whoweareDesc}>
            At SeeKare, we are a group of physicians and healthcare
            professionals with decades of patient care and health information
            management experience. Our mission is to build a free community care
            platform that will provide a place for patient discussion and
            physician-supported insights. We believe that patients need a
            trustworthy source where they can easily access clear, reliable
            medical information from board-certified physicians and share first
            hand experience with fellow patients. Our goal is to build
            collective knowledge on how to tackle the most challenging issues of
            healthcare. Our users are the crucial source, not only for health
            questions, but also for collaborative sharing of real patient
            experiences. Our hope is that these conversations will build a
            better informed patient community that will improve the future of
            care for all. Let's seek better care together.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default AboutModal;
