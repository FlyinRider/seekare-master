import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  Box,
  FormHelperText,
  Grid,
  Hidden,
  makeStyles,
  Typography,
} from '@material-ui/core';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import CustomButton from 'app/main/shared-components/Button';
import * as API from 'app/services/api';
import { pushSnackbar } from 'app/store/ui/actions';
import TagList from 'app/main/shared-components/TagList';
import RightSidebar from 'app/main/layouts/ClientLayout/RightSidebar';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '87vh',
    overflow: 'hidden auto',
  },
  map: {
    overflow: 'hidden',
    borderRadius: '8px',
    position: 'relative',
    height: '100%',
    '& img': {
      height: '100%',
    },
    '&::after': {
      content: '""',
      display: 'block',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '100%',
      background: '#6d7c9b9c',
      zIndex: 2,
    },
  },
  right: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  contactInfo: {
    background: 'white',
    height: '35%',
    borderRadius: '8px',
    padding: '24px',
    marginBottom: '20px',
  },
  contactRow: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '14px',
    fontWeight: '600',
    marginBottom: '16px',
  },
  imageBox: {
    width: '40px',
    flexShrink: '0',
    marginRight: '5px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactForm: {
    background: 'white',
    flexGrow: 1,
    padding: '24px',
    borderRadius: '8px',
  },
  formBody: {},
  formFieldGroup: {
    marginBottom: '12px',
    '& label': {
      color: theme.palette.text.primary,
      fontSize: '14px',
      fontWeight: '700',
    },
    '& input, textarea': {
      fontSize: '14px',
      padding: '10px 18px',
      borderRadius: '8px',
      width: '100%',
      outline: 'none',
      border: '1px solid',
    },
  },
  sectionTitle: {
    fontSize: '22px',
    fontWeight: 'bold',
    marginBottom: '12px',
    color: theme.palette.text.primary,
  },
}));

const ContactPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { handleSubmit, handleChange, values, errors, touched, resetForm } =
    useFormik({
      initialValues: {
        fullname: '',
        email: '',
        message: '',
      },
      validationSchema: Yup.object().shape({
        fullname: Yup.string().required('Full Name is required'),
        email: Yup.string().required('Email is required'),
        message: Yup.string().required('Message is required'),
      }),
      onSubmit: async (values) => {
        const { fullname, email, message } = values;
        try {
          await API.emailService.send(fullname, email, 'subject', message);
          dispatch(pushSnackbar('Email Sent', 'success'));
          resetForm();
          history.push('/');
        } catch (error) {
          dispatch(pushSnackbar('Sorry, Please try again later!', 'error'));
        }
      },
    });
  return (
    <Grid container>
      <Hidden mdDown>
        <Grid item md={3}>
          <TagList />
        </Grid>
      </Hidden>
      <Grid item md={6} className={classes.root}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Box className={classes.map}>
              <img src='/images/map.png' alt='map' />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} className={classes.right}>
            <Box className={classes.contactInfo}>
              <Typography className={classes.sectionTitle}>
                Contact Information
              </Typography>
              <Box className={classes.contactRow}>
                <Box className={classes.imageBox}>
                  <img src='/images/icons/location.png' alt='location icon' />
                </Box>
                <Box>
                  3556 BEECH STREET, SAN FRANCISCO, CALIFORNIA, CA 94108
                </Box>
              </Box>
              <Box className={classes.contactRow}>
                <Box className={classes.imageBox}>
                  <img src='/images/icons/phone.png' alt='location icon' />
                </Box>
                <Box>+12345678</Box>
              </Box>
              <Box className={classes.contactRow}>
                <Box className={classes.imageBox}>
                  <img src='/images/icons/email.png' alt='location icon' />
                </Box>
                <Box>mdhelp.io</Box>
              </Box>
            </Box>
            <Box className={classes.contactForm}>
              <Typography className={classes.sectionTitle}>
                Drop your Message
              </Typography>
              <Box
                className={classes.formBody}
                component='form'
                onSubmit={handleSubmit}
              >
                <Box className={classes.formFieldGroup}>
                  <label htmlFor='name'>Name</label>
                  <br />
                  <input
                    onChange={handleChange}
                    id='name'
                    type='text'
                    name='fullname'
                    value={values.fullname}
                  />
                  {errors && touched.fullname && errors.fullname && (
                    <FormHelperText error={true}>
                      {errors.fullname}
                    </FormHelperText>
                  )}
                </Box>
                <Box className={classes.formFieldGroup}>
                  <label htmlFor='email'>Email</label>
                  <br />
                  <input
                    onChange={handleChange}
                    id='email'
                    type='text'
                    name='email'
                    value={values.email}
                  />
                  {errors && touched.email && errors.email && (
                    <FormHelperText error={true}>{errors.email}</FormHelperText>
                  )}
                </Box>
                <Box className={classes.formFieldGroup}>
                  <label htmlFor='message'>Message</label>
                  <br />
                  <textarea
                    onChange={handleChange}
                    id='message'
                    rows={4}
                    name='message'
                    value={values.message}
                  ></textarea>{' '}
                  {errors && touched.message && errors.message && (
                    <FormHelperText error={true}>
                      {errors.message}
                    </FormHelperText>
                  )}
                </Box>
                <CustomButton
                  fullwidth
                  type='submit'
                  size='md'
                  variant='contained'
                  color='secondary'
                >
                  Send Your Message
                </CustomButton>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Hidden>
        <Grid item md={3}>
          <RightSidebar />
        </Grid>
      </Hidden>
    </Grid>
  );
};

export default ContactPage;
