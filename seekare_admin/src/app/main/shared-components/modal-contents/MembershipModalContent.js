import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Button, Grid, makeStyles, Typography } from '@material-ui/core';

import { registerMembership } from 'app/store/auth/actions';
import MemberShipCard from '../MemberShipCard';

const useStyles = makeStyles({
  root: {
    backgroundColor: 'white',
    padding: '1rem',
    textAlign: 'center',
    outline: 'none',
    minWidth: '30rem',
  },
  submitbutton: {
    backgroundColor: '#09e5ab',
    color: 'white',
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: '#09e5ab',
    },
  },
});

const MembershipModalContent = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [membership, setMembership] = useState('');
  const handlePaymentSignUp = () => {
    const payment =
      membership !== '' && membership === 'premium'
        ? {
            payroll: 'paypal',
            holder: 'Jask Leks',
            number: '400343433412003',
            paid: true,
          }
        : {};
    if (membership === 'premium' && Object.keys(payment).length > 0) {
      dispatch(registerMembership(payment));

      return;
    }
  };
  return (
    <Box className={classes.root}>
      <Typography component='h4' variant='h6'>
        Select Your Membership
      </Typography>
      <Grid container component={Box} margin='1rem 0'>
        <Grid item xs={12} sm={6} component={Box} padding='1rem'>
          <MemberShipCard
            type='freemium'
            selected={membership === 'freemium'}
            onClick={() => setMembership('freemium')}
          />
        </Grid>
        <Grid item xs={12} sm={6} component={Box} padding='1rem'>
          <MemberShipCard
            type='premium'
            selected={membership === 'premium'}
            onClick={() => setMembership('premium')}
          />
        </Grid>
      </Grid>
      <Typography>You Can Change Membership Anytime</Typography>
      <Button
        variant='contained'
        className={classes.submitbutton}
        onClick={handlePaymentSignUp}
      >
        {membership !== ''
          ? membership === 'freemium'
            ? 'Sign Up for Free'
            : 'Signing Up for Premimum'
          : 'Choose your plan'}
      </Button>
    </Box>
  );
};

export default MembershipModalContent;
