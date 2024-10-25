import React from 'react';
import { Box, makeStyles } from '@material-ui/core';
import { BiMessageAltX } from 'react-icons/bi';

const useStyles = makeStyles({
  root: {
    padding: '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const NoData = () => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <BiMessageAltX fontSize='2rem' display='flex' />
      <Box fontWeight='bold' fontSize='1.5rem'>
        No Data Found
      </Box>
    </Box>
  );
};

export default NoData;
