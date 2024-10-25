import React, { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';

import useQuery from 'app/hooks/useQuery';
import { authService } from 'app/services/api';
import useSafeDispatch from 'app/hooks/useSafeDispatch';
import { pushSnackbar } from 'app/store/ui/actions';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
  },

  formBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    margin: 'auto',
  },
  title: {
    padding: '2rem 0',
  },
  formControl: {
    width: '100%',
    margin: '0 0 1rem',
  },
  submitbutton: {
    backgroundColor: '#09e5ab',
    color: 'white',
    fontWeight: 'bold',
    width: '100%',
    '&:hover': {
      backgroundColor: '#09e5ab',
    },
  },
});

const PwdChange = () => {
  const dispatch = useDispatch();
  const safeDispatch = useSafeDispatch(dispatch);
  const classes = useStyles();
  const history = useHistory();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfrimPwd, setShowConfrimPwd] = useState(false);
  const { token } = useQuery();
  const { values, handleSubmit, errors, touched, handleChange } = useFormik({
    initialValues: {
      password: '',
      confirmPwd: '',
    },
    validationSchema: Yup.object().shape({
      confirmPwd: Yup.string()
        .required()
        .test(
          'confirmPwd',
          'Passwords do not match',
          (val) => values.password === val
        ),
      password: Yup.string()
        .required('Password is required')
        .min(8, 'Password should be more than 8 letters'),
    }),
    onSubmit: async (values) => {
      try {
        const res = await authService.pwdChange(token, values.password);
        safeDispatch(pushSnackbar(res.data.message, res.data.status));

        history.push('/');
      } catch (error) {
        safeDispatch(pushSnackbar('Unknown Error', 'error'));
      }
    },
  });

  if (!token) {
    return <Redirect to='/' />;
  }

  return (
    <Box className={classes.root}>
      <Box component='form' onSubmit={handleSubmit} className={classes.formBox}>
        <Typography component='h2' variant='h6' className={classes.title}>
          New Password
        </Typography>
        <FormControl
          variant='outlined'
          size='small'
          className={classes.formControl}
        >
          <InputLabel htmlFor='password'>Password</InputLabel>
          <OutlinedInput
            type={`${showPassword ? 'text' : 'password'}`}
            id='password'
            name='password'
            value={values.password}
            onChange={handleChange}
            label='New Password'
            autoComplete='off'
            endAdornment={
              <InputAdornment position='end'>
                <IconButton
                  aria-label='toggle password visibility'
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <MdVisibility /> : <MdVisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
          {errors && errors.password && touched.password && (
            <FormHelperText error={true}>{errors.password}</FormHelperText>
          )}
        </FormControl>
        <FormControl
          variant='outlined'
          size='small'
          className={classes.formControl}
        >
          <InputLabel htmlFor='password'>Confirm Password</InputLabel>
          <OutlinedInput
            type={`${showConfrimPwd ? 'text' : 'password'}`}
            id='confirmPwd'
            name='confirmPwd'
            value={values.confirmPwd}
            onChange={handleChange}
            label='Confirm New Password'
            endAdornment={
              <InputAdornment position='end'>
                <IconButton
                  aria-label='toggle password visibility'
                  onClick={() => setShowConfrimPwd(!showConfrimPwd)}
                >
                  {showConfrimPwd ? <MdVisibility /> : <MdVisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
          {errors && errors.confirmPwd && touched.confirmPwd && (
            <FormHelperText error={true}>{errors.confirmPwd}</FormHelperText>
          )}
        </FormControl>
        <Box width='100%'>
          <Button type='submit' className={classes.submitbutton}>
            Change Password
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default PwdChange;
