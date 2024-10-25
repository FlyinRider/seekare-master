import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  Grid,
  makeStyles,
  OutlinedInput,
  Paper,
} from '@material-ui/core';
import { FcCancel } from 'react-icons/fc';
import { BiPencil, BiSave, BiTrash } from 'react-icons/bi';

import TableHeader from 'app/main/shared-components/TableComponent/TableHeader';
import TitleHeader from '../TitleHeader';
import CustomButton from 'app/main/shared-components/Button';
import useSafeDispatch from 'app/hooks/useSafeDispatch';
import { closeModal, openModal } from 'app/store/ui/actions';
import { createRole, deleteRole, updateRole } from 'app/store/role/actions';

const useStyles = makeStyles({
  root: {},
  tableRow: {
    padding: '1rem 0.5rem',
    textAlign: 'center',
    alignItems: 'center',
    borderBottom: '1px solid #e2e2e2',
  },
  actionBtn: {
    minWidth: '1rem',
    margin: '0 0.1rem',
  },
  inlineInputField: {
    '& input': {
      padding: '0.5rem',
    },
  },
});

const RoleManagement = () => {
  const dispatch = useDispatch();
  const safeDispatch = useSafeDispatch(dispatch);
  const classes = useStyles();
  const [editRoleID, setEditRoleID] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [roleTitle, setRoleTitle] = useState('');
  const [roleDesc, setRoleDesc] = useState('');
  const roles = useSelector((state) => state.role.items);

  const columns = [
    {
      name: 'title',
      title: 'Role Title',
      sorting: false,
      width: 3,
    },
    {
      name: 'desc',
      title: 'Description',
      sorting: false,
      width: 8,
    },
    {
      name: 'actions',
      title: 'Actions',
      sorting: false,
      width: 1,
    },
  ];

  const onDeleteHandler = (role) => {
    safeDispatch(
      openModal('CONFIRM_MODAL', {
        title: 'Confirm Delet Role',
        description: `Are you sure delete "${role.title}" role`,
        buttons: [
          {
            title: 'Yes',
            type: 'secondary',
            onClick: () => {
              safeDispatch(deleteRole(role._id));
              safeDispatch(closeModal());
            },
          },
          {
            title: 'Cancel',
            type: 'primary',
            onClick: () => {
              safeDispatch(closeModal());
            },
          },
        ],
      })
    );
  };

  const onClickEdit = (role) => {
    if (!isAdding) {
      setEditRoleID(role._id);
      setRoleTitle(role.title);
      setRoleDesc(role.desc);
    }
  };

  const onSaveHandler = (role) => {
    safeDispatch(updateRole(role._id, roleTitle, roleDesc));
    setEditRoleID(null);
  };

  const onCancelEdit = () => {
    setEditRoleID(null);
  };

  const onCreateHandler = () => {
    safeDispatch(createRole(roleTitle, roleDesc));
    setIsAdding(false);
  };

  const onCancelCreate = () => {
    setIsAdding(false);
  };

  const onClickCreateHandler = () => {
    if (!editRoleID) {
      setRoleTitle('');
      setRoleDesc('');
      setIsAdding(true);
    }
  };

  return (
    <Box padding='1rem'>
      <TitleHeader title='Role Management' breadcrumb='Admin / Roles' />
      <Box display='flex' justifyContent='flex-end'>
        <CustomButton size='md' onClick={onClickCreateHandler}>
          Add New Role
        </CustomButton>
      </Box>
      <Box component={Paper} marginTop='1rem'>
        <TableHeader colums={columns} />
        {roles &&
          roles.map((item) => (
            <Grid key={item._id} container className={classes.tableRow}>
              {editRoleID && editRoleID === item._id ? (
                <>
                  <Grid item xs={3} component={Box} padding='0.2rem'>
                    <OutlinedInput
                      className={classes.inlineInputField}
                      fullWidth
                      defaultValue={item.title}
                      onChange={(e) => setRoleTitle(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={8} component={Box} padding='0.2rem'>
                    <OutlinedInput
                      className={classes.inlineInputField}
                      fullWidth
                      defaultValue={item.desc}
                      onChange={(e) => setRoleDesc(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={1}>
                    <Button
                      variant='outlined'
                      className={classes.actionBtn}
                      size='small'
                      color='primary'
                      onClick={() => onSaveHandler(item)}
                    >
                      <BiSave />
                    </Button>
                    <Button
                      variant='outlined'
                      size='small'
                      color='secondary'
                      className={classes.actionBtn}
                      onClick={() => onCancelEdit(item)}
                    >
                      <FcCancel />
                    </Button>
                  </Grid>
                </>
              ) : (
                <>
                  <Grid item xs={3}>
                    {item.title}
                  </Grid>
                  <Grid item xs={8}>
                    {item.desc}
                  </Grid>
                  <Grid item xs={1}>
                    <Button
                      variant='outlined'
                      size='small'
                      color='secondary'
                      className={classes.actionBtn}
                      onClick={() => onDeleteHandler(item)}
                    >
                      <BiTrash />
                    </Button>
                    <Button
                      variant='outlined'
                      className={classes.actionBtn}
                      size='small'
                      color='primary'
                      onClick={() => onClickEdit(item)}
                    >
                      <BiPencil />
                    </Button>
                  </Grid>
                </>
              )}
            </Grid>
          ))}
        {isAdding && (
          <Grid container className={classes.tableRow}>
            <Grid item xs={3} component={Box} padding='0.2rem'>
              <OutlinedInput
                className={classes.inlineInputField}
                fullWidth
                onChange={(e) => setRoleTitle(e.target.value)}
              />
            </Grid>
            <Grid item xs={8} component={Box} padding='0.2rem'>
              <OutlinedInput
                className={classes.inlineInputField}
                fullWidth
                onChange={(e) => setRoleDesc(e.target.value)}
              />
            </Grid>
            <Grid item xs={1}>
              <Button
                variant='outlined'
                className={classes.actionBtn}
                size='small'
                color='primary'
                onClick={() => onCreateHandler()}
              >
                <BiSave />
              </Button>
              <Button
                variant='outlined'
                size='small'
                color='secondary'
                className={classes.actionBtn}
                onClick={() => onCancelCreate()}
              >
                <FcCancel />
              </Button>
            </Grid>
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default RoleManagement;
