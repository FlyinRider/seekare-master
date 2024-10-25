import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Box,
  Button,
  Grid,
  Paper,
  Typography,
  makeStyles,
  InputAdornment,
  OutlinedInput,
} from "@material-ui/core";
import { BiShow, BiTrash, BiUserCheck, BiUserX, BiSearch } from "react-icons/bi";
import Pagination from "react-js-pagination";
import "bootstrap/dist/css/bootstrap.min.css";

import { authService, emailService } from "app/services/api";
import TableHeader from "app/main/shared-components/TableComponent/TableHeader";
import NoData from "app/main/shared-components/NoData";
import CustomButton from "app/main/shared-components/Button";
import { postedTimeFormat } from "app/util/date";
import {
  deactivateUser,
  deleteUser,
  updateUserRole,
} from "app/store/user/actions";
import useSafeDispatch from "app/hooks/useSafeDispatch";
import { closeModal, openModal, pushSnackbar } from "app/store/ui/actions";
import RoleCell from "./RoleCell";
import AddUserForm from "./AddUserForm";

const useStyles = makeStyles((theme) => ({
  root: { padding: "1rem" },
  titleHeader: {},
  tableRow: {
    padding: "1rem 0",
    textAlign: "center",
    borderBottom: "1px solid #e2e2e2",
    "&:hover": {
      backgroundColor: "#e2e2e2",
    },
  },
  searchInput: {
    '& input': {
      flex: '1 0',
      width: '100%',
      padding: '0.4rem 0',
    },
  },
  actionBtn: {
    margin: "0 0.1rem",
    minWidth: "10px",
  },
  deactiavedTag: {
    display: "block",
    background: theme.palette.primary.main,
    fontSize: "0.8rem",
    padding: "5px",
    borderRadius: "4px",
  },
  paginationWrapper: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",

    "& .pagination": {
      margin: 0,
    },

    "& ul.pagination li a": {
      textDecoration: "none",
      color: "#6b6b6b",
      fontSize: 15,

      "&:hover": {
        color: "#6b6b6b",
      },
    },

    "& ul.pagination li.active a": {
      color: "white",
      backgroundColor: "#6b6b6b",
      borderColor: "#6b6b6b",

      "&:hover": {
        color: "#fff",
      },

      "&:focus": {
        outline: "none",
      },
    },
  },
}));

const AdminUsersPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const safeDispatch = useSafeDispatch(dispatch);

  const [users, setUsers] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [pageOffset, setPageOffset] = useState(0);
  const [sortBy, setSortBy] = useState();
  const [sortDir, setSortDir] = useState();
  const [searchWord, setSearchWord] = useState('');

  const columns = useMemo(
    () => [
      {
        name: "username",
        title: "Username",
        sorting: true,
        width: 1,
      },
      {
        name: "email",
        title: "Email",
        sorting: true,
        width: 2,
      },
      {
        name: "role",
        title: "Role",
        sorting: false,
        width: 2,
      },
      {
        name: "questionsNumber",
        title: "Questions",
        sorting: false,
        width: 1,
      },
      {
        name: "answersNumber",
        title: "Answers",
        sorting: false,
        width: 1,
      },
      {
        name: "createDate",
        title: "Member Since",
        sorting: true,
        width: 2,
      },
      {
        name: "actions",
        title: "Actions",
        sorting: false,
        width: 3,
      },
    ],
    []
  );

  const fetchUsers = async (params) => {
    const { users, count } = await authService.getUsers(params);
    setUsers(users);
    setTotalRecords(count);
  };

  useEffect(() => {
    let payload = {
      limit: pageSize,
      offset: 0,
      searchWord,
    };

    fetchUsers(payload);
  }, []);

  const handleChangeSearchInput = (e) => {
    setSearchWord(e.target.value);
  }

  const handleSearch = async (e) => {
    if (e.key === 'Enter') {
      let payload = {
        limit: pageSize,
        offset: 0,
        sortBy,
        sortDir,
        searchWord
      };

      await fetchUsers(payload);
      setCurrentPage(1);
      setPageOffset(0);
    }
  }

  const onDeleteHandler = (userID, userName) => {
    safeDispatch(
      openModal("CONFIRM_MODAL", {
        title: "Confirm Delete Account",
        description: `Are you sure to delete ${userName} account`,
        buttons: [
          {
            title: "Yes",
            type: "secondary",
            onClick: () => {
              safeDispatch(deleteUser(userID));
              safeDispatch(closeModal());
              fetchUsers();
            },
          },
          {
            title: "Cancel",
            type: "primary",
            onClick: () => {
              safeDispatch(closeModal());
            },
          },
        ],
      })
    );
    fetchUsers();
  };

  /**
   * Deactivate the User
   *
   * @param {string} userID  User ID
   */
  const onClickDeactivate = (userID, userName, activateStatus) => {
    safeDispatch(
      openModal("CONFIRM_MODAL", {
        title: `Confirm ${activateStatus ? "Activate" : "Deactivate"}  Account`,
        description: `Are you sure to ${
          activateStatus ? "activate" : "deactivate"
          } ${userName} account`,
        buttons: [
          {
            title: "Yes",
            type: "secondary",
            onClick: () => {
              safeDispatch(deactivateUser(userID, !activateStatus));
              safeDispatch(closeModal());
            },
          },
          {
            title: "Cancel",
            type: "primary",
            onClick: () => {
              safeDispatch(closeModal());
            },
          },
        ],
      })
    );

    fetchUsers();
  };

  const onUpdatRoleHandler = (userID, selectedRole) => {
    safeDispatch(updateUserRole(userID, selectedRole));
    fetchUsers();
  };

  const onClickDetailView = (userID) => {
    window.location.href = `/admin/users/${userID}`;
  };

  const onSortingHandler = (name, direction) => {
    setSortBy(name);
    setSortDir(direction);

    const payload = {
      limit: pageSize,
      offset: pageOffset,
      sortBy: name,
      sortDir: direction,
      searchWord
    };

    fetchUsers(payload);
  };

  const onClickAddUser = () => {
    setIsAdding(true);
  };

  const onCancelHandler = () => {
    setIsAdding(false);
  };

  const onFormSubmitHandler = () => {
    setIsAdding(false);
    fetchUsers();
  };

  const onClickInvite = () => {
    safeDispatch(
      openModal("INVITE_USER_MODAL", {
        onSend: async (emails, subject, content) => {
          try {
            const { status, message } = await emailService.invite(
              emails,
              subject,
              content
            );
            dispatch(pushSnackbar(message, status));
            safeDispatch(closeModal());
          } catch (error) {
            dispatch(pushSnackbar("Unknown Error", "error"));
          }
        },
        onCancel: async () => {
          safeDispatch(closeModal());
        },
      })
    );
  };

  const handleChangePagination = async (pageNumber) => {
    const offset = parseInt((pageNumber - 1) * pageSize);

    setCurrentPage(pageNumber);
    setPageOffset(offset);

    // call API to get data based on pageNumber
    let payload = {
      limit: pageSize,
      offset,
      sortBy,
      sortDir,
      searchWord
    };

    fetchUsers(payload);
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.titleHeader}>
        <Typography component="h2" variant="h6">
          Users
        </Typography>
        <Typography>Admin / Users</Typography>
      </Box>

      <Box mt={2}>
        <Box display="flex" justifyContent="space-between">
          <Box>
            <OutlinedInput
              fullWidth
              variant='outlined'
              className={classes.searchInput}
              placeholder='Enter Search Here'
              onChange={handleChangeSearchInput}
              onKeyDown={handleSearch}
              startAdornment={
                <InputAdornment position='start'>
                  <BiSearch />
                </InputAdornment>
              }
            />
          </Box>
          <Box>
            {!isAdding && (
              <>
                <Button
                  type="button"
                  variant="outlined"
                  color="secondary"
                  onClick={onClickInvite}
                >
                  Invite by Email
                </Button>
                &nbsp;
                <CustomButton size="md" onClick={onClickAddUser}>
                  Add User
                </CustomButton>
              </>
            )}
          </Box>
        </Box>
        {isAdding && (
          <AddUserForm
            onFormSubmit={onFormSubmitHandler}
            onCanCel={onCancelHandler}
          />
        )}
      </Box>
      <Box marginTop="1rem">
        <Paper className={classes.table}>
          <TableHeader colums={columns} onSorting={onSortingHandler} />
          <Box>
            {users && users.length > 0 ? (
              users.map((datum) => (
                <Grid key={datum._id} container className={classes.tableRow}>
                  <Grid item md={1}>
                    {datum.username}
                    {datum.deactivated && (
                      <span className={classes.deactiavedTag}>
                        Deactivated User
                      </span>
                    )}
                  </Grid>
                  <Grid item md={2}>
                    {datum.email}
                  </Grid>
                  <Grid item md={2}>
                    <RoleCell
                      roleId={datum.role}
                      onUpdatedRole={(selectedRole) =>
                        onUpdatRoleHandler(datum._id, selectedRole)
                      }
                    />
                  </Grid>
                  <Grid item md={1}>
                    {datum.questionsNumber}
                  </Grid>
                  <Grid item md={1}>
                    {datum.answersNumber}
                  </Grid>
                  <Grid item md={2}>
                    {postedTimeFormat(datum.createDate)}
                  </Grid>
                  <Grid item md={3}>
                    <Button
                      className={classes.actionBtn}
                      variant="outlined"
                      size="small"
                      color="secondary"
                      onClick={() => onDeleteHandler(datum._id, datum.username)}
                    >
                      <BiTrash />
                    </Button>
                    <Button
                      className={classes.actionBtn}
                      variant="outlined"
                      size="small"
                      color="primary"
                      onClick={() => onClickDetailView(datum._id)}
                    >
                      <BiShow />
                    </Button>

                    <Button
                      className={classes.actionBtn}
                      variant="outlined"
                      size="small"
                      color={!datum.deactivated ? "primary" : "secondary"}
                      onClick={() =>
                        onClickDeactivate(
                          datum._id,
                          datum.username,
                          datum.deactivated
                        )
                      }
                    >
                      {!datum.deactivated ? <BiUserX /> : <BiUserCheck />}
                    </Button>
                  </Grid>
                </Grid>
              ))
            ) : (
                <NoData />
              )}
          </Box>
        </Paper>
        <Box mt={2} className={classes.paginationWrapper}>
          <Box mr={1}>Total Records: {totalRecords}</Box>
          <Pagination
            className="pagination-field"
            itemClass="page-item" // add it for bootstrap 4
            linkClass="page-link" // add it for bootstrap 4
            activePage={currentPage}
            itemsCountPerPage={pageSize}
            totalItemsCount={totalRecords}
            pageRangeDisplayed={5}
            onChange={handleChangePagination}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default AdminUsersPage;
