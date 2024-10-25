import React, { useCallback, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import { Link } from "react-router-dom";
import { Box, Divider, Grid, Hidden, makeStyles } from "@material-ui/core";

import Logo from "app/main/shared-components/Logo";
import CustomButton from "app/main/shared-components/Button";
import { openModal } from "app/store/ui/actions";
import useAuth from "app/hooks/useAuth";
import AvatarComponent from "app/main/shared-components/AvatarComponent";
import { logout } from "app/store/auth/actions";
import useClickOutside from "app/hooks/useClickOutside";

const useStyles = makeStyles((theme) => ({
  root: {},
  logo: {
    padding: "0.5rem 1rem",
  },
  rightSide: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "1rem",
  },
  button: {
    margin: "0 0.5rem",
  },
  searchInputWrapper: {
    position: "relative",
  },
  qSetting: {
    position: "absolute",
    right: "10px",
    top: "50%",
    transform: "translateY(-50%)",
  },
  qSettingText: {
    padding: "2px 6px",
    background: theme.palette.secondary.main,
    color: "white",
    borderRadius: "4px",
    fontSize: "12px",
    fontWeight: "bold",
  },
  userDropdown: {
    position: "relative",
    cursor: "pointer",
    "& .dropdown-header": {
      display: "flex",
      alignItems: "center",
    },
    "& .dropdown-menu": {
      position: "absolute",
      top: "100%",
      right: "0",
      background: "white",
      borderRadius: "8px",
      padding: "10px",
      listStyle: "none",
      opacity: 0,
      transition: "all 0.3s ease-in",
      marginTop: "-20px",
      visibility: "hidden",
      zIndex: 1000,
      "& li": {
        minWidth: "140px",
        padding: "10px 0",
        "& a": {
          color: theme.palette.text.secondary,
          "&:hover": {
            color: theme.palette.text.primary,
          },
        },
      },

      "&.show": {
        marginTop: "10px",
        opacity: 1,
        visibility: "visible",
      },
    },
  },
  similarQueries: {
    position: "absolute",
    top: "100%",
    width: "100%",
    background: "white",
    borderRadius: "4px",
    padding: "10px",
    zIndex: 1000,
    boxShadow: "0 10px 10px -8px grey",
    visibility: "visible",
    opacity: 1,
    marginTop: 10,
  },
  hidden: {
    opacity: 1,
    visibility: "hidden",
    marginTop: -100,
  },

  similarQueryItem: {
    margin: "5px 0",
    cursor: "pointer",
    padding: "5px",
    "&:hover": {
      background: theme.palette.background.paper,
    },
  },
}));

const WikiHeader = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { isAuthenticated, isAdmin, currentUser } = useAuth();

  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useClickOutside(dropdownRef, () => {
    setOpenDropdown(false);
  });

  const openLoginModal = useCallback(() => {
    return dispatch(openModal("LOGIN_MODAL"));
  }, [dispatch]);

  const openSignUpModal = useCallback(() => {
    return dispatch(openModal("REGISTER_MODAL"));
  }, [dispatch]);

  const onLogOut = useCallback(() => dispatch(logout()), [dispatch]);

  const onClickDropdownHeader = () => {
    setOpenDropdown(!openDropdown);
  };

  return (
    <Grid
      component="header"
      container
      className={classes.root}
      alignItems="center"
      justify="space-between"
    >
      <Box width="20%" maxWidth="20%" className={classes.logo}>
        <Logo />
      </Box>
      <Hidden smDown>
        <Grid item md={6}></Grid>
      </Hidden>
      <Grid
        item
        xs={3}
        sm={6}
        md={3}
        className={`${classes.rightSide} rightSideHeader`}
      >
        {!isAuthenticated ? (
          <>
            <CustomButton
              className={classes.button}
              type="button"
              onClick={openLoginModal}
            >
              Login
            </CustomButton>
            &nbsp;
            <CustomButton
              className={classes.button}
              variant="outlined"
              color="secondary"
              size="md"
              onClick={openSignUpModal}
            >
              Sign up
            </CustomButton>
          </>
        ) : (
          <Box className={classes.userDropdown} ref={dropdownRef}>
            <Box className="dropdown-header" onClick={onClickDropdownHeader}>
              <AvatarComponent user={currentUser} />
              <Box ml={1} fontWeight="bold">
                {currentUser.username}
              </Box>
            </Box>

            <Box
              className={["dropdown-menu", openDropdown ? "show" : ""].join(
                " "
              )}
              component="ul"
            >
              <Box component="li" display="flex" alignItems="center">
                <Box mr={1} display="flex" alignItems="center">
                  <img src="/images/icons/accountIcon.png" alt="account" />
                </Box>
                <Link to="/profile">Profile Setting</Link>
              </Box>
              {isAdmin && (
                <Box component="li" display="flex" alignItems="center">
                  <Box mr={1} display="flex" alignItems="center">
                    <img src="/images/icons/accountIcon.png" alt="account" />
                  </Box>
                  <Link to="/admin">Admin Dashboard</Link>
                </Box>
              )}
              <Divider />
              <Box
                component="li"
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Link to="#" onClick={onLogOut}>
                  Log Out
                </Link>
                <Box>
                  <img src="/images/icons/logout.png" alt="logout" />
                </Box>
              </Box>
            </Box>
          </Box>
        )}
      </Grid>
    </Grid>
  );
};

export default WikiHeader;
