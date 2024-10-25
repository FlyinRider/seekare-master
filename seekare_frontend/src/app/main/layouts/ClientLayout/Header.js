import React, { useCallback, useRef, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { Link, useHistory, useLocation } from "react-router-dom";
import {
  Box,
  Divider,
  Grid,
  Hidden,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
  Button,
} from "@material-ui/core";

import { BiCog } from "react-icons/bi";

import Logo from "app/main/shared-components/Logo";
import SearchInput from "app/main/shared-components/SearchInput";
import CustomButton from "app/main/shared-components/Button";
import { openModal } from "app/store/ui/actions";
import { setSearchTerm } from "app/store/question/actions";
import { SEARCH_SETTINGS } from "app/constants";
import useAuth from "app/hooks/useAuth";
import AvatarComponent from "app/main/shared-components/AvatarComponent";
import { logout } from "app/store/auth/actions";
import useClickOutside from "app/hooks/useClickOutside";
import useDebounce from "app/hooks/useDebounce";
import * as API from "app/services/api";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "0.5rem 0",
  },
  logo: {
    paddingLeft: "2rem",
    borderRadius: "1rem",
    overflow: "hidden",
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

  menuButton: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  // menuButtonSmall: {
  //   [theme.breakpoints.up("sm")]: {
  //     display: "none",
  //   },
  // },
}));

const Header = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const { isAuthenticated, isAdmin, currentUser } = useAuth();

  const [searchQuery, setSearchQuery] = useState("");
  const [showSimilarQueries, setShowSimilarQueries] = useState(false);
  const [similarQueries, setSimilarQueries] = useState([]);

  const query = useDebounce(searchQuery, 2000);

  useEffect(() => {
    const fetchSimilarQueries = async () => {
      if (query !== "") {
        setShowSimilarQueries(true);
        const { searches } = await API.questionService.getSimilarQueries(query);
        setSimilarQueries(searches);
      } else {
        setShowSimilarQueries(false);
        setSimilarQueries([]);
      }
    };

    fetchSimilarQueries();
  }, [query]);

  const [qSetting, setQSetting] = useState("any");
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useClickOutside(dropdownRef, () => {
    setOpenDropdown(false);
  });

  const queryListRef = useRef(null);
  useClickOutside(queryListRef, () => {
    setShowSimilarQueries(false);
  });

  const openLoginModal = useCallback(() => {
    return dispatch(openModal("LOGIN_MODAL"));
  }, [dispatch]);

  const openSignUpModal = useCallback(() => {
    return dispatch(openModal("REGISTER_MODAL"));
  }, [dispatch]);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const selectSetting = (setting) => {
    setQSetting(setting);
    setAnchorEl(null);
  };

  const onChangeHandler = (value) => {
    setSearchQuery(value);
  };

  const onLogOut = useCallback(() => dispatch(logout()), [dispatch]);

  const onKeyUpHandler = useCallback(
    (e) => {
      if (e.keyCode === 13) {
        dispatch(setSearchTerm(searchQuery));
        history.push(
          `/questions?q=${searchQuery ? searchQuery : ""}&qSetting=${qSetting}`
        );
      }
    },
    [dispatch, searchQuery, history, qSetting]
  );

  const onClickDropdownHeader = () => {
    setOpenDropdown(!openDropdown);
  };

  const onClickSimilarQuery = (query) => {
    setSearchQuery(query);
  };

  return (
    <Grid
      component="header"
      container
      className={classes.root}
      alignItems="center"
    >
      <Grid item xs={9} sm={6} md={3} className={classes.logo}>
        <Logo />
      </Grid>
      <Hidden smDown>
        <Grid item md={6}>
          {location.pathname !== "/profile" && (
            <Box display="flex" className={classes.searchInputWrapper}>
              <Box flexGrow="1">
                <SearchInput
                  value={searchQuery}
                  onKeyUp={onKeyUpHandler}
                  onChange={onChangeHandler}
                />
                {similarQueries && similarQueries.length > 0 && (
                  <Box
                    className={[
                      classes.similarQueries,
                      !showSimilarQueries && classes.hidden,
                    ].join(" ")}
                    ref={queryListRef}
                  >
                    {similarQueries.map((query) => (
                      <Box
                        className={classes.similarQueryItem}
                        onClick={() => onClickSimilarQuery(query)}
                      >
                        {query}
                      </Box>
                    ))}
                  </Box>
                )}
              </Box>
              <Box
                className={classes.qSetting}
                display="flex"
                alignItems="center"
              >
                <Box marginRight="0.5rem" className={classes.qSettingText}>
                  {SEARCH_SETTINGS[qSetting]}
                </Box>
                <IconButton size="small" onClick={handleClick}>
                  <BiCog />
                </IconButton>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  onClose={() => setAnchorEl(null)}
                >
                  {Object.keys(SEARCH_SETTINGS).map((_key) => (
                    <MenuItem key={_key} onClick={() => selectSetting(_key)}>
                      {SEARCH_SETTINGS[_key]}
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </Box>
          )}
        </Grid>
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

export default Header;
