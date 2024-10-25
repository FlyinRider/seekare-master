import React from 'react';
import { Box, Typography, Link, Button } from '@material-ui/core';
import { FaExclamation } from 'react-icons/fa';

const SubscriptionFailed = () => {
  return (
    <Box
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      minHeight='75vh'
    >
      <Typography component='h2' variant='h4'>
        Subscription Failed
      </Typography>
      <Box py={3}>
        <FaExclamation fontSize='3rem' color='#D9575B' />
      </Box>
      <Box maxWidth='25rem' textAlign='center' p={2}>
        <Typography component='p' variant='body1'>
          Sorry to be failed! But cheers! You can do it again anytime later.
          Thanks
        </Typography>
      </Box>
      <Link
        component={Button}
        variant='outlined'
        color='secondary'
        href='/profile'
      >
        Go Back to Profile Page
      </Link>
    </Box>
  );
};

export default SubscriptionFailed;
