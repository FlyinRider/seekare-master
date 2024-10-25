import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const RatioTableByKeyword = ({ users, onUserSelect }) => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>No </TableCell>
            <TableCell align='left'>Username</TableCell>
            <TableCell align='left'>Useremail</TableCell>
            <TableCell align='right'>Counts</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map(({ userId, count, user }, i) => (
            <TableRow key={userId}>
              <TableCell align='left'>{i + 1}</TableCell>
              <TableCell align='left' onClick={() => onUserSelect(userId)}>
                {(user && user.username) || userId}
              </TableCell>
              <TableCell align='left'>{(user && user.email) || ''}</TableCell>
              <TableCell align='right'>{count}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RatioTableByKeyword;
