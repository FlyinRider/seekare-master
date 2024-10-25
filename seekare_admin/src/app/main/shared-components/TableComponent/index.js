import React from 'react';
import { Box, makeStyles, Paper } from '@material-ui/core';

import TableHeader from './TableHeader';
import MDTableRow from './TableRow';

const useStyles = makeStyles({
  root: {
    backgroundColor: 'white',
  },
  header: {
    fontWeight: 'bold',
  },
});

const TableComponent = ({ columns, data }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <TableHeader colums={columns} />
      <Box>
        {data.map((datum) => (
          <MDTableRow key={datum._id} datum={datum} columns={columns} />
        ))}
      </Box>
    </Paper>
  );
};

export default TableComponent;
