import React from 'react';
import { Box, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    position: 'fixed',
    bottom: 0,
    backgroundColor: '#eee',
    width: '100vw',
    padding: '1rem 2rem',
  },
});

const Footer = () => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Box>&copy;2020 All right reserved</Box>
    </Box>
  );
};

export default Footer;
