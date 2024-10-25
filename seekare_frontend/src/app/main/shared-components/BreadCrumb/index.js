import React from 'react';
import PropTypes from 'prop-types';
import { Box, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    padding: '0.2rem 0.5rem',
    border: `1px dotted ${theme.palette.secondary.main}`,
    borderRadius: '4px',
    width: 'fit-content',
    margin: 'auto',
  },
  link: {
    '&:hover, & a:hover': {
      color: theme.palette.secondary.main,
    },
  },
}));

const BreadCrumb = ({ paths }) => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      {paths.map((item, idx) => {
        const last = idx === paths.length - 1;

        return (
          <React.Fragment key={item.pathname}>
            {last ? (
              item.pathname
            ) : (
              <Box className={classes.link}>
                <Link to={item.to}>{item.pathname}</Link> /
              </Box>
            )}
          </React.Fragment>
        );
      })}
    </Box>
  );
};

PropTypes.propTypes = {
  paths: PropTypes.arrayOf(
    PropTypes.shape({
      pathname: PropTypes.string,
      to: PropTypes.string,
    })
  ),
};

PropTypes.defaultProps = {
  paths: [],
};

export default BreadCrumb;
