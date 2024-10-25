import React from 'react';
import { Box, Button, makeStyles } from '@material-ui/core';
import { MdAddAlert } from 'react-icons/md';

import CustomButton from '../Button';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '400px',
    '& ul': {
      background: theme.palette.background.default,
      border: `2px solid ${theme.palette.secondary.main}`,
      borderRadius: '4px',
    },
  },
  dot: {
    display: 'flex',
    flexShrink: 0,
    width: 6,
    height: 6,
    borderRadius: 3,
    background: 'black',
  },
}));

const agreements = [
  'I agree not to post personal identifiable medical information.',
  'I agree to be respectful and do my best to be helpful.',
  'I understand that my posts may be edited or even removed by staff.',
  'I understand that any answers provided by physicians does not constitute a doctor - patient relationship.',
  'I understand that advice on this site is not a substitute for a formal evaluation by a qualified physician.',
];

const ConfirmPostModal = ({ onPost, onCancel }) => {
  const classes = useStyles();

  return (
    <Box p={2} className={classes.root}>
      <Box display='flex' alignItems='center'>
        <MdAddAlert />
        <Box fontSize='1.1rem' fontWeight='600' ml={2}>
          Please read below carefully before post
        </Box>
      </Box>

      <Box component='ul' py={1} px={3}>
        {agreements.map((item) => (
          <Box component='li' mt={1} display='flex' alignItems='center'>
            <Box className={classes.dot}></Box>
            <Box display='flex' ml={1}>
              {item}
            </Box>
          </Box>
        ))}
      </Box>

      <Box display='flex' alignItems='center' justifyContent='flex-end' p={2}>
        <CustomButton
          variant='contained'
          size='md'
          color='secondary'
          onClick={onPost}
        >
          Agreen and Post Answer
        </CustomButton>
        &nbsp;
        <Button color='primary' variant='outlined' onClick={onCancel}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default ConfirmPostModal;
