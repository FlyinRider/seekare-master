import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  root: {},
});

const TableRow = ({ columns, datum }) => {
  const classes = useStyles();
  return (
    <Grid container className={classes.root}>
      {columns.map((item) => (
        <Grid item md={item.width} key={item.name}></Grid>
      ))}
    </Grid>
  );
};

export default TableRow;
