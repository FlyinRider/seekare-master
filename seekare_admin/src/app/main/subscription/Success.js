import React from 'react';
import { Box, Typography, Link, Button } from '@material-ui/core';
import { useEffect } from 'react';

import useQuery from 'app/hooks/useQuery';
import * as API from 'app/services/api';
import useAuth from 'app/hooks/useAuth';
import { FaCheck } from 'react-icons/fa';

const SubscriptionSuccess = () => {
  const { session_id } = useQuery();
  const { currentUser } = useAuth();

  useEffect(() => {
    const checkoutSession = async (userID, sessionId) => {
      await API.paymentService.checkoutSession(userID, sessionId);
    };

    if (session_id && currentUser.userID) {
      checkoutSession(currentUser.userID, session_id);
    }
  }, [session_id, currentUser]);

  return (
    <Box
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      height='75vh'
    >
      <Typography variant='h4' component='h1'>
        Thank You!
      </Typography>
      <Box py={3}>
        <FaCheck fontSize='2rem' color='#09e5ab' />
      </Box>
      <Box maxWidth='25rem' textAlign='center' p={2}>
        <Typography>
          You are now Premium Meber of our community. You will get a lot of
          benefits. Please enjoy!
        </Typography>
      </Box>

      <Link component={Button} href='/profile'>
        Go To See your benefits
      </Link>
    </Box>
  );
};

export default SubscriptionSuccess;
