import React from 'react';

import {
  Box,
  FormHelperText,
  makeStyles,
  OutlinedInput,
} from '@material-ui/core';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { MdWarning } from 'react-icons/md';
import Cookies from 'js-cookie';

import Logo from 'app/main/shared-components/Logo';
import {
  SIMPLE_AUTH_COOKIE,
  useSiteBasicAuth,
} from 'app/context/SimpleAuthProvider';

const MDHelpPWD = '!';

const useStyles = makeStyles({
  root: {
    width: '100vw',
    height: '100vh',
    background: '#bfbfbf',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    minWidth: '400px',
    maxWidth: '500px',
    borderRadius: '15px',
    boxShadow: '0 1px 10px -9px  gray',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: '#f7f7f7',
    padding: '20px',
  },
  logo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontSize: '2rem',
    fontWeight: 'bold',
    color: 'white',
    marginBottom: '2rem',
    '& img': {
      width: '10rem',
    },
  },
  passwordField: {
    width: '100%',
  },
});

const SiteProtection = () => {
  const classes = useStyles();
  const { setAuthenticated } = useSiteBasicAuth();

  const { handleSubmit, handleChange, values, errors, touched } = useFormik({
    initialValues: {
      password: '',
    },
    validationSchema: Yup.object().shape({
      password: Yup.string().required('Password is Required'),
    }),
    onSubmit: (value) => {
      if (value.password === MDHelpPWD) {
        Cookies.set(SIMPLE_AUTH_COOKIE, 'ok');
        setAuthenticated(true);
      } else {
        alert('Password is Wrong');
      }
    },
  });
  return (
    <Box className={classes.root}>
      <Box className={classes.form} component='form' onSubmit={handleSubmit}>
        <Box className={classes.logo}>
          <Logo />
        </Box>
        <Box className={classes.passwordField}>
          <OutlinedInput
            type='password'
            fullWidth
            name='password'
            value={values.password}
            onChange={handleChange}
            placeholder='Please Type your password'
          />
          {errors && errors.password && touched && (
            <FormHelperText variant='filled' error>
              {errors.password}
            </FormHelperText>
          )}
        </Box>
      </Box>
      <Box color='white' display='flex' alignItems='center' mt={2}>
        <MdWarning color='yello' />
        Only Approved Users can accces
      </Box>
    </Box>
  );
};

export default SiteProtection;
