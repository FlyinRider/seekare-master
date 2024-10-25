import React from 'react';
import { Box, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    background: '#1B5A90',
    minHeight: '84.5vh',
    padding: '1rem',
  },
});

const SideBar = ({ children }) => {
  const classes = useStyles();
  return <Box className={classes.root}>{children}</Box>;
};

export default SideBar;
