import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { FaSortDown, FaSortUp } from 'react-icons/fa';
import { Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    backgroundColor: '#f8f9fa',
    padding: '0.5rem 0',
  },
  headerItem: {
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    cursor: 'pointer',
  },
});

const TableHeader = ({ colums, onSorting }) => {
  const classes = useStyles();
  const [sortDirs, setSortDirs] = useState({});

  const onClickSorting = (name, sorting) => {
    if (sorting) {
      setSortDirs((prev) => {
        onSorting(name, !prev[name]);

        return { ...prev, [name]: !prev[name] };
      });
    }
  };

  return (
    <Grid container className={classes.root}>
      {colums.map((item) => (
        <Grid
          key={item.name}
          item
          md={parseInt(item.width, 10)}
          className={classes.headerItem}
          onClick={() => onClickSorting(item.name, item.sorting)}
        >
          {item.title}
          {item.sorting ? (
            sortDirs[item.name] && sortDirs[item.name] ? (
              <FaSortUp />
            ) : (
              <FaSortDown />
            )
          ) : null}
        </Grid>
      ))}
    </Grid>
  );
};

TableHeader.propTypes = {
  onSorting: PropTypes.func.isRequired,
};

TableHeader.defaultProps = {
  onSorting: () => {},
};

export default TableHeader;
