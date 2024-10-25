import React from 'react';
import { Link } from 'react-router-dom';
import { BiError } from 'react-icons/bi';
import { Box, Grid, Typography, makeStyles } from '@material-ui/core';

import sidebarConfig from 'app/config/admin.sidebar.config';
import useAuth from 'app/hooks/useAuth';
import AdminHeader from './Header';
import SideBar from './SideBar';
import SideBarItem from './SideBar/SideBarItem';
import Footer from './Footer';

const useStyles = makeStyles({
  root: {},
  mainWrapper: {
    height: '85vh',
  },

  main: {
    maxHeight: '100%',
    backgroundColor: '#f8f9fa',
    overflow: 'hidden auto',
  },
});

const AdminLayout = ({ children }) => {
  const classes = useStyles();
  const { isAdmin, isRoot } = useAuth();

  return (
    <>
      {isAdmin || isRoot ? (
        <React.Fragment>
          <AdminHeader />
          <Grid component='main' container className={classes.mainWrapper}>
            <Grid item xs={12} md={2}>
              <SideBar>
                {sidebarConfig.map((item) => (
                  <SideBarItem key={item.title} {...item} />
                ))}
              </SideBar>
            </Grid>
            <Grid className={classes.main} item xs={12} md={10}>
              {children}
            </Grid>
          </Grid>
          <Footer />
        </React.Fragment>
      ) : (
        <Box
          display='flex'
          flexDirection='column'
          height='100vh'
          width='100vw'
          alignItems='center'
          justifyContent='center'
        >
          <Box fontSize='2rem' color='red'>
            <BiError />
          </Box>
          <Typography variant='h6' color='secondary'>
            You are not allowed to access this page
          </Typography>
          <Box padding=''>
            <Link to='/'>Go Back to Home Page</Link>
          </Box>
        </Box>
      )}
    </>
  );
};

export default AdminLayout;
