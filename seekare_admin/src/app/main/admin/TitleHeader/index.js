import React from 'react';
import { Box, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  root: {},
});

const TitleHeader = ({ title, breadcrumb }) => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Typography component='h1' variant='h6'>
        {title}
      </Typography>
      <Typography>{breadcrumb}</Typography>
    </Box>
  );
};

export default TitleHeader;
