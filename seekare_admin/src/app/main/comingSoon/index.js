import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { RiSendPlaneLine } from 'react-icons/ri';
import { Box, IconButton, Typography, makeStyles } from '@material-ui/core';

import { enlistedEmailService } from 'app/services/api';
import DownCounter from 'app/main/shared-components/DownCounter';
import { pushSnackbar } from 'app/store/ui/actions';

const useStyles = makeStyles({
  root: {
    height: '80.2vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#252525 url(images/contact_bg.png) no-repeat center center',
    backgroundSize: 'cover',
    backgroundBlendMode: 'overlay',
    color: '#09e5ab',
    '& .notification-msg': {
      fontSize: '1.5rem',
      margin: '0.5rem 0',
    },
  },
  title: {
    fontSize: '3rem',
    fontWeight: '700',
  },
  emailInut: {
    color: 'white',
    background: 'no-repeat',
    padding: '0.5rem 1rem',
    borderRadius: '0.5rem',
    outline: 'none',
    fontSize: '1.2rem',
    marginRight: '0.5rem',
    border: '1px solid #09e5ab',
  },
  sendButton: {},
});

const ComingSoon = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');

  const onClickHandler = async () => {
    try {
      const res = await enlistedEmailService.addEmail(email);
      dispatch(pushSnackbar(res.data.message, res.data.status));
    } catch (error) {
      dispatch(pushSnackbar('Sorry, please try again later', 'error'));
    }
  };

  return (
    <Box className={classes.root}>
      <Typography component='h2' variant='h2' className={classes.title}>
        Coming Soon
      </Typography>
      <Box>
        <DownCounter scheduledDate='2022-02-03' />
      </Box>
      <Box
        display='flex'
        flexDirection='column'
        alignItems='center'
        padding='2rem 0'
      >
        <Typography className='notification-msg'>
          Get Notification when We are Back
        </Typography>
        <Box display='flex'>
          <input
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={classes.emailInut}
            name='email'
          />
          <IconButton
            className={classes.sendButton}
            type='submit'
            onClick={onClickHandler}
          >
            <RiSendPlaneLine color='#09e5ab' />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default ComingSoon;
