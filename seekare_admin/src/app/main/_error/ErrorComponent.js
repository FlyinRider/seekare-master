import React from 'react';
import {
  Button,
  Grid,
  Link,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    maxWidth: '50%',
    margin: 'auto',
    paddingTop: '10rem',
  },
  errorBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    padding: '2rem 3rem',
  },
});

const ErrorComponent = () => {
  const classes = useStyles();

  return (
    <Grid className={classes.root}>
      <Paper className={classes.errorBox}>
        <Typography color='secondary' component='p' variant='h6'>
          No Data Found
        </Typography>
        <Link component={Button} href='/questions'>
          Go Back Questions
        </Link>
      </Paper>
    </Grid>
  );
};

export default ErrorComponent;
