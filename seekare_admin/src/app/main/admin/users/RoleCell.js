import React, { useState } from 'react';
import { Box, makeStyles, MenuItem, Select } from '@material-ui/core';
import { BiCheckCircle, BiEdit } from 'react-icons/bi';
import { FcCancel } from 'react-icons/fc';

import useRole from 'app/hooks/useRole';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    '& .role-content': {
      position: 'relative',
      padding: '0.5rem',
      display: 'flex',
      alignItems: 'center',
      '& .edit-btn': {
        visibility: 'hidden',
        cursor: 'pointer',
        '&:hover': {
          fontWeight: 'bolder',
        },
      },
      '&:hover': {
        '& .edit-btn': {
          color: '#1B5A90',
          visibility: 'visible',
        },
      },
    },
  },
});

const RoleCell = ({ roleId, onUpdatedRole }) => {
  const classes = useStyles();
  const [isEditing, setIsEditing] = useState(false);
  const [selectedRole, setSelectedRole] = useState(roleId);

  const { roles, getRoleInfo } = useRole();
  const onSelectRole = (e) => {
    setSelectedRole(e.target.value);
  };

  const onClickSave = () => {
    if (selectedRole !== roleId) {
      onUpdatedRole(selectedRole);
    }
    setIsEditing(false);
  };

  return (
    <Box className={classes.root}>
      {!isEditing ? (
        <Box className='role-content'>
          <Box>
            {getRoleInfo(roleId) ? getRoleInfo(roleId)['title'] : 'No Role Yet'}
          </Box>
          <Box
            display='flex'
            alignItems='center'
            className='edit-btn'
            ml={1}
            onClick={() => setIsEditing(!isEditing)}
          >
            <BiEdit />
          </Box>
        </Box>
      ) : (
        <Box className='role-content'>
          <Select
            labelId='demo-controlled-open-select-label'
            id='demo-controlled-open-select'
            value={selectedRole}
            onChange={onSelectRole}
          >
            {roles.map((_role) => (
              <MenuItem key={_role.title} value={_role._id}>
                {_role.title}
              </MenuItem>
            ))}
          </Select>
          <Box
            ml={1}
            display='flex'
            fontSize='1.2rem'
            fontWeight='bold'
            color='#1B5A90'
            className='save-btn'
            onClick={onClickSave}
          >
            <BiCheckCircle />
          </Box>
          <Box
            display='flex'
            className='cancel-btn'
            fontSize='1.2rem'
            color='#1B5A90'
            fontWeight='bold'
            onClick={() => setIsEditing(!isEditing)}
          >
            <FcCancel />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default RoleCell;
