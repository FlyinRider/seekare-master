import React from 'react';
import { useDispatch } from 'react-redux';
import {
  Box,
  Typography,
  Chip,
  makeStyles,
  TextField,
  Button,
  FormHelperText,
} from '@material-ui/core';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import useSafeDispatch from 'app/hooks/useSafeDispatch';
import { updateInfo } from 'app/store/user/actions';
import useAuth from 'app/hooks/useAuth';

const useStyles = makeStyles({
  root: {},
  avatar: {
    width: '150px',
    height: '150px',
    margin: '1rem 0',
  },
  input: {
    display: 'none',
  },
});

const AboutTab = ({ user }) => {
  const dispatch = useDispatch();
  const safeDispatch = useSafeDispatch(dispatch);
  const classes = useStyles();
  const { id, username, intro, role } = user;
  const { isNormalUser } = useAuth();

  const { handleSubmit, handleChange, values, errors, touched, isValid } =
    useFormik({
      initialValues: {
        username,
        intro,
      },
      validationSchema: Yup.object().shape({
        username: Yup.string().required('Username is required'),
      }),
      onSubmit: (values) => {
        const { username, intro } = values;
        safeDispatch(updateInfo(id, username, intro));
      },
    });

  return (
    <Box
      component='form'
      onSubmit={handleSubmit}
      container
      spacing={2}
      className={classes.root}
    >
      <Box>
        <Typography variant='h6' component='h2'>
          Name
        </Typography>
        <TextField
          fullWidth
          size='small'
          variant='outlined'
          name='username'
          value={values.username}
          onChange={handleChange}
        />
        {errors && errors.username && touched.username && (
          <FormHelperText error={true}>{errors.username}</FormHelperText>
        )}
      </Box>
      {!isNormalUser && (
        <Box mt={1}>
          <Typography variant='h6' component='h2'>
            Role
          </Typography>
          <Chip label={role?.title} />
        </Box>
      )}
      <Box display='flex' justifyContent='flex-end' mt={1}>
        <Button
          type='submit'
          color='primary'
          variant='outlined'
          disabled={!isValid}
        >
          Update Info
        </Button>
      </Box>
    </Box>
  );
};

export default AboutTab;
