import React, { useState } from 'react';
import { Box, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    position: 'relative',
  },
  toggler: {
    cursor: 'pointer',
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    right: '0',

    display: 'none',
    minWidth: '8rem',
    background: 'white',
    boxShadow: '0px 2px 3px -1px black',
    borderRadius: '0.3rem',
    '&.open': {
      display: 'block',
    },
  },
});

const DropdownMenu = ({ toggler, children }) => {
  const classes = useStyles();
  const [show, setShow] = useState(false);

  return (
    <Box className={classes.root}>
      <Box onClick={() => setShow(!show)} className={classes.toggler}>
        {toggler}
      </Box>
      <Box className={`${classes.dropdown} ${show ? 'open' : ''}`}>
        {children}
      </Box>
    </Box>
  );
};

export default DropdownMenu;
