import React, { useCallback } from 'react';
import { BiLeftIndent, BiLogOut, BiSearch } from 'react-icons/bi';
import { useDispatch } from 'react-redux';

import {
  Box,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  OutlinedInput,
  makeStyles,
} from '@material-ui/core';

import AvatarComponent from 'app/main/shared-components/AvatarComponent';
import useAuth from 'app/hooks/useAuth';
import { logout } from 'app/store/auth/actions';
import { ReactComponent as LogoIcon } from 'assets/icons/logo.svg';

const useStyles = makeStyles({
  root: {
    boxShadow: '0px 1px 5px -3px black',
    alignItems: 'center',
  },
  logo: {
    padding: '0.5rem',
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
  },
  searchInput: {
    '& input': {
      flex: '1 0',
      width: '100%',
      padding: '0.6rem 0',
    },
  },
  collapseSideBar: {
    cursor: 'pointer',
  },
  topRight: {
    display: 'flex',
    alignItems: 'center',
  },
});

const AdminHeader = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { currentUser } = useAuth();
  const onLogOut = useCallback(() => dispatch(logout()), [dispatch]);
  return (
    <Grid container color='default' className={classes.root}>
      <Grid item md={2}>
        <Link className={classes.logo} href='/'>
          {/* <img width='50' src='/images/logos/logo.png' alt='logo' /> */}
          <LogoIcon style={{ width: '40px', height: '40px' }} />
        </Link>
      </Grid>
      <Grid item md={8} component={Box} display='flex'>
        {/* <Box padding='0.5rem' className={classes.collapseSideBar}>
          <BiLeftIndent fontSize='1.2rem' />
        </Box>
        <OutlinedInput
          fullWidth
          variant='outlined'
          className={classes.searchInput}
          placeholder='Search Here'
          startAdornment={
            <InputAdornment position='start'>
              <BiSearch />
            </InputAdornment>
          }
        /> */}
      </Grid>
      <Grid
        item
        className={classes.topRight}
        md={2}
        component={Box}
        display='flex'
        justifyContent='flex-end'
        padding='0.5rem'
      >
        <AvatarComponent user={currentUser} />
        <IconButton onClick={onLogOut}>
          <BiLogOut />
        </IconButton>
        {/* <DropdownMenu toggler={<AvatarComponent user={currentUser} />}>
          <List>
            <ListItem>My Profile</ListItem>
            <ListItem>Settings</ListItem>
            <ListItem>Log Out</ListItem>
          </List>
        </DropdownMenu> */}
      </Grid>
    </Grid>
  );
};

export default AdminHeader;
