import React from 'react';
import { Box, Link, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

import { postedTimeFormat } from 'app/util/date';
import AvatarComponent from '../AvatarComponent';

const useStyles = makeStyles({
  root: {},
});

const UserComponent = ({ user, dateTime }) => {
  const classes = useStyles();
  return (
    <Box display='flex' alignItems='center'>
      <AvatarComponent user={user} />
      <Box className='user-info' padding='0 0.5rem'>
        <Link
          className={classes.userlink}
          to={`/user/${user.userID}/questions`}
        >
          {user && user.username}
        </Link>
        <Box
          component='p'
          margin='0'
          fontSize='0.7rem'
          fontWeight='600'
          className='posted-time'
        >
          {postedTimeFormat(dateTime)}
        </Box>
      </Box>
    </Box>
  );
};

UserComponent.propTypes = {
  user: PropTypes.object.isRequired,
  dateTime: PropTypes.string.isRequired,
};

export default UserComponent;
