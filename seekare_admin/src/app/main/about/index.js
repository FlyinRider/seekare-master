import React from "react";
import { Box, Grid, Hidden, makeStyles, Typography } from "@material-ui/core";

import TagList from "app/main/shared-components/TagList";
import RightSidebar from "app/main/layouts/ClientLayout/RightSidebar";

const useStyle = makeStyles((theme) => ({
  root: {},
  pageTitle: {
    color: theme.palette.text.primary,
    fontSize: "22px",
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

const items = [
  {
    title: "100+ million",
    description: "Monthly Visitors ",
  },
  {
    title: "100+ million",
    description: "Monthly Visitors ",
  },
  {
    title: "100+ million",
    description: "Monthly Visitors ",
  },
  {
    title: "100+ million",
    description: "Monthly Visitors ",
  },
];

const AboutPage = () => {
  const classes = useStyle();
  return (
    <Grid container>
      <Hidden mdDown>
        <Grid item md={3}>
          <TagList />
        </Grid>
      </Hidden>
      <Grid item md={6}>
        <Typography className={classes.pageTitle}>About Us</Typography>
        <Box className={classes.pageContentCard}>
          <Box className={classes.bannerImage}></Box>
          <Box padding={2}>
            <Typography variant="h6" className={classes.pageTitle}>
              Who We Are
            </Typography>
            <Typography variant="body2" className={classes.whoweareDesc}>
                  We are a team of experienced health care professionals ranging from board-certified physicians to developers to medical informatic specialists.  Our team shares one common goal; to create a space to that allows for open discussion and the free-exchange of health related topics
            </Typography>
            <Grid container spacing={2}>
              {items.map((item) => (
                <Grid component={Box} item xs={12} sm={6}>
                  <Box className={classes.detailItem}>
                    <Typography className={classes.detailTitle}>
                      {item.title}
                    </Typography>
                    <Typography className={classes.detailDescription}>
                      {item.description}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Grid>
      <Hidden>
        <Grid item md={3}>
          <RightSidebar />
        </Grid>
      </Hidden>
    </Grid>
  );
};

export default AboutPage;
