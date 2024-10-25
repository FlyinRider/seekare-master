import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { Box, Grid, makeStyles, Typography } from '@material-ui/core';
import { useStripe } from '@stripe/react-stripe-js';
import useAuth from 'app/hooks/useAuth';
import * as API from 'app/services/api';
import MemberShipCard from 'app/main/shared-components/MemberShipCard';
import Loader from 'app/main/layouts/ClientLayout/Loader';
import useSafeDispatch from 'app/hooks/useSafeDispatch';
import { closeModal, openModal, pushSnackbar } from 'app/store/ui/actions';

const useStyles = makeStyles({
  root: {},
  planCol: {
    display: 'flex',
    maxWidth: '23rem',
  },
  tabSecTitle: {
    padding: 0,
    marginBottom: '2rem',
  },
});

const SubscriptionTab = () => {
  const classes = useStyles();
  const stripe = useStripe();
  const dispatch = useDispatch();
  const safeDispatch = useSafeDispatch(dispatch);
  const { isNormalUser, currentUser } = useAuth();
  const [pending, setPending] = useState(false);

  const onUpgradeHandler = useCallback(async () => {
    if (isNormalUser) {
      setPending(true);

      try {
        const { priceId } = await API.paymentService.setup();
        const { sessionId } = await API.paymentService.createSession(priceId);

        await stripe.redirectToCheckout({
          sessionId: sessionId,
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      safeDispatch(
        openModal('CONFIRM_MODAL', {
          title: 'Are you sure to downgrade',
          description: `Oh, sorry, you are gonna leave our membership! Really~ ?`,
          buttons: [
            {
              title: 'Yes',
              type: 'secondary',
              onClick: async () => {
                setPending(true);

                try {
                  await API.paymentService.cancelSubscription(
                    currentUser.userID
                  );
                  safeDispatch(
                    pushSnackbar(
                      'Downgraded, You are welcome back anytime!',
                      'success'
                    )
                  );

                  window.location.reload();
                } catch (error) {}
              },
            },
            {
              title: 'Cancel',
              type: 'primary',
              onClick: () => {
                safeDispatch(closeModal());
              },
            },
          ],
        })
      );
    }
  }, [currentUser.userID, isNormalUser, safeDispatch, stripe]);

  return (
    <Box mt={2}>
      <Typography variant='h6' component='h2' className={classes.tabSecTitle}>
        Choose Your Subscription Plan
      </Typography>
      <Grid container spacing={2} justify='center'>
        <Grid item xs={12} sm={6} className={classes.planCol}>
          <MemberShipCard
            onClickUpgrade={onUpgradeHandler}
            type='freemium'
            isCurrentPlan={isNormalUser}
          />
        </Grid>
        <Grid item xs={12} sm={6} className={classes.planCol}>
          <MemberShipCard
            type='premium'
            isCurrentPlan={!isNormalUser}
            onClickUpgrade={onUpgradeHandler}
          />
        </Grid>
      </Grid>
      {pending && <Loader />}
    </Box>
  );
};

export default SubscriptionTab;
