import React, { useCallback, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import { Link } from "react-router-dom";
import {
  Box,
  Divider,
  Grid,
  Hidden,
  makeStyles,
  Button,
  MenuItem,
  MenuList,
  Typography,
} from "@material-ui/core";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import { FaHeart } from "react-icons/fa";
import Logo from "app/main/shared-components/Logo";
import CustomButton from "app/main/shared-components/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import { openModal } from "app/store/ui/actions";
import useAuth from "app/hooks/useAuth";
import AvatarComponent from "app/main/shared-components/AvatarComponent";
import { logout } from "app/store/auth/actions";
import useClickOutside from "app/hooks/useClickOutside";
import "./style.css";

const useStyles = makeStyles((theme) => ({
  root: {},
  logo: {
    padding: "0.5rem 1rem",
    [theme.breakpoints.down(426)]: {
      '& img': {
        width: '7%'
      }
    },
  },
  support: {
    marginLeft:'auto',
    background:'#a7c6fa',
    alignItems:'center',
    padding:'5px 10px',
    borderRadius:'10px',
    textTransform:'capitalize !important',
    '&:hover' : {
      background:'#fc8f81'
    },
    [theme.breakpoints.down(426)]: {
      '& p': {
        fontSize:'0.7rem'
      }
    },
  },
  rightSide: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "1rem",
    maxWidth:'max-content'
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
  menuButton: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  menuButtonSmall: {
    position: "relative",
    [theme.breakpoints.up(960)]: {
      display: "none",
    },
  },
  menu: {
    position: "absolute",
    background: "white",
    borderRadius: "3px",
    zIndex: "10",
    top: "70px",
    right: "10px",
  },
}));

const WikiHeader = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { isAuthenticated, currentUser } = useAuth();

  const [selectMenu, setSelectMenu] = React.useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const anchorRef = useRef(null);
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
      component="div"
      container
      className={classes.root}
      alignItems="center"
      justify="space-between"
    >
      <Box width="20%" maxWidth="20%" className={classes.logo}>
        <Logo />
      </Box>
      {/* <Hidden smDown>
        <Grid item md={6}></Grid>
      </Hidden> */}
        <Button className={classes.support}>
          <a href="https://www.buymeacoffee.com/seekare.org" target="_blank" style={{
            display:'flex',
            alignItems:'center',
            justifyContent:'space-between'
          }}>
            <FaHeart style={{marginRight:'5px'}} color="red"/>
            <Typography style={{color:'white'}}>Support Seekare</Typography>
          </a>
        </Button>
      <Grid
        item
        xs={3}
        sm={6}
        md={3}
        className={`${classes.rightSide} rightSideHeader`}
      >
        {!isAuthenticated ? (
          <>
            <Box className={classes.menuButton}>
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
            </Box>
            <div className={classes.menuButtonSmall}>
              <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={(e, prev) => setSelectMenu(!prev)}
              >
                <div id="nav-icon2" className={selectMenu ? "open" : ""}>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </Button>
              <Popper
                open={selectMenu}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                placement="right-start"
                style={{
                  top: "0 !important",
                  left: "inherit !important",
                  right: "10px",
                  zIndex: "10",
                }}
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin:
                        placement === "bottom" ? "center top" : "center bottom",
                    }}
                  >
                    <Paper>
                      <ClickAwayListener
                        onClickAway={() => setSelectMenu(false)}
                      >
                        <MenuList>
                          <MenuItem>
                            <CustomButton
                              className={classes.button}
                              variant="outlined"
                              size="md"
                              color="secondary"
                              onClick={openLoginModal}
                              style={{
                                width: "100%",
                              }}
                            >
                              Login
                            </CustomButton>
                          </MenuItem>
                          <MenuItem>
                            <CustomButton
                              className={classes.button}
                              variant="outlined"
                              color="secondary"
                              size="md"
                              onClick={openSignUpModal}
                            >
                              Sign up
                            </CustomButton>
                          </MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </div>
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
