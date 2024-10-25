import React, { useState, forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles, Box, Typography } from "@material-ui/core";
import { setSearchTerm } from "app/store/question/actions";

import SearchInput from "app/main/shared-components/SearchInput";
import Questions from "./Questions";
import CustomButton from "app/main/shared-components/Button";
import useAuth from "app/hooks/useAuth";
import { useHistory } from "react-router-dom";
import { changeResponsive, openModal } from "app/store/ui/actions";
import { ASKING } from "app/constants";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { useWikiContext } from "../wikiContext";

const useStyles = makeStyles((theme) => ({
  root: {
    overflow: "hidden",
    display: "flex",
    height: "100%",
    flexDirection: "column",
    padding: 10,
    // [theme.breakpoints.down("sm")]: {
    //   paddingTop: "40px",
    // },
  },
  menuIcon: {
    fontSize: 25,
    cursor: "pointer",
  },
  searchInputWrapper: {
    padding: "10px 5px",
  },
  mainContent: {
    background: (props) =>
      props.activeContent === "question" ? "#EAE9FF" : "white",
    border: (props) =>
      props.activeContent === "question"
        ? "1px solid #9E99E4"
        : "1px solid transparent",
    padding: 10,
    borderRadius: "1rem",
    height: "calc(100% - 120px)",
  },
  wikiListTitle: {
    width: "234px",
    textAlign: "center",
    fontSize: "1.7rem",
    fontWeight: "bold",
    color: theme.palette.text.secondary,
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  titleIcon: {
    color: theme.palette.secondary.main,
  },
  responsiveTabs: {
    textAlign: "center",
    fontSize: "1rem",
    fontWeight: "bold",
    color: theme.palette.text.secondary,
    display: "flex",
    alignItems: "center",
    width: "50%",
    borderRadius: "12px",
    borderWidth: "1px",
    "& span": {
      marginLeft: "0.5rem",
    },
    [theme.breakpoints.down("sm")]: {
      borderRadius: "0",
    },
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  searchinput: {
    background: "#e6e6e6",
    color: "black !important",
    borderRadius: "1rem",
  },
  addPostBtn: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "10px",
      fontWeight: "0",
    },
    [theme.breakpoints.down(375)]: {
      padding: "0.2rem",
    },
  },
  switchControl: {
    [theme.breakpoints.down("sm")]: {
      paddingTop: "40px",
      marginTop: "-100px",
      marginRight: "-200px",
    },
  },
  itemImage: {
    [theme.breakpoints.down(375)]: {
      width: "20px",
      height: "20px",
    },
  },
}));

const WikiRightSidebar = forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const { isAuthenticated, isMd, isAdmin } = useAuth();

  const history = useHistory();
  const location = useLocation();
  const pathname = location.pathname;
  const activeContent = useSelector((state) => state.ui.content.activeContent);

  const { id: activeWikiId } = useSelector((state) => state.wiki.activeWiki);
  const responsive = useSelector((state) => state.ui.responsive.responsiveType);

  const { searchTerm } = useSelector((state) => state.question);
  const classes = useStyles({
    activeContent,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [referencedPosts, setReferencedPosts] = useState(false);
  // const [questions, setQuestions] = useState([]);
  // const [pageNum, setPageNum] = useState(0);
  const { pageNum, setPageNum, questions, setQuestions } = useWikiContext();

  const handleSetReferenced = () => {
    setReferencedPosts((prev) => !prev);
    setQuestions([]);
    setPageNum(0);
  };
  const onKeyUpHandler = (e) => {
    if (e.keyCode === 13 && searchQuery !== searchTerm) {
      dispatch(setSearchTerm(searchQuery));
      setPageNum(0);
    }
  };
  const onChangeHandler = (value) => {
    setSearchQuery(value);
  };

  const handleNewQuestionPost = () => {
    if (isAuthenticated) {
      dispatch(changeResponsive("addPost"));
      history.push("/wiki/question/ask");
    } else {
      dispatch(
        openModal("LOGIN_MODAL", {
          state: ASKING,
        })
      );
    }
  };
  const handleClickKareBook = () => {
    dispatch(changeResponsive("kareBook"));
  };
  const handleClickKarePost = () => {
    dispatch(changeResponsive("karePost"));
  };
  return (
    <Box
      className={`${classes.root} karePost`}
      style={{
        display: responsive === "karePost" ? "block" : "",
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        px={2}
        mb={1}
      >
        <Typography
          variant="h6"
          component="h6"
          className={classes.wikiListTitle}
        >
          <img src="/images/icons/karepost.svg" alt="karepost" />
          <Box component="span" fontSize="1.5rem" ml={2}>
            {activeWikiId === undefined ||
            pathname.includes("/show") ||
            referencedPosts
              ? "KarePost"
              : isMd || isAdmin
              ? "Referenced Post"
              : "KarePost"}
          </Box>
        </Typography>
        {responsive === "karePost" && (
          <Box
            display="flex"
            justifyContent="space-around"
            width="80%"
            className={classes.tabContainer}
          >
            <Typography
              variant="h6"
              component="h6"
              className={classes.responsiveTabs}
              onClick={handleClickKareBook}
            >
              <div
                style={{
                  margin: "0 auto",
                  display: "flex",
                }}
              >
                <img
                  src="/images/icons/karebook.svg"
                  alt="karebook"
                  className={classes.itemImage}
                />
                <span>KareBook</span>
              </div>
            </Typography>
            <Typography
              variant="h6"
              component="h6"
              className={classes.responsiveTabs}
              style={{
                borderBottom: "solid cadetblue",
              }}
              onClick={handleClickKarePost}
            >
              <div
                style={{
                  margin: "0 auto",
                  display: "flex",
                }}
              >
                <img
                  src="/images/icons/karepost.svg"
                  alt="karepost"
                  className={classes.itemImage}
                />
                <span>KarePost</span>
              </div>
            </Typography>
          </Box>
        )}
        {pathname.includes("/show") ||
        searchTerm.length > 1 ||
        activeWikiId === undefined ? (
          <></>
        ) : isMd || isAdmin ? (
          <FormControlLabel
            style={{ marginLeft: "-130px" }}
            className={classes.switchControl}
            control={
              <Switch
                checked={referencedPosts}
                onChange={handleSetReferenced}
                value="referencedPosts"
              />
            }
            label=""
          />
        ) : (
          <></>
        )}
        <Box display="flex" alignItems="center">
          <CustomButton
            color="secondary"
            type="submit"
            variant="outlined"
            size="sm"
            onClick={handleNewQuestionPost}
            className={`${classes.addPostBtn} karePostAddBtn`}
          >
            Add Post
          </CustomButton>
          {/* <Box onClick={handleClickMenu} mx={1}>
            <CloseIcon className={classes.menuIcon} />
          </Box> */}
        </Box>
      </Box>

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        px={1}
        py={1}
        bgcolor="white"
        borderRadius="1rem"
        mb={1}
      >
        <SearchInput
          value={searchQuery}
          onKeyUp={onKeyUpHandler}
          onChange={onChangeHandler}
          placeholder="Search Posts"
          className={`${classes.searchinput} search-question`}
        />
      </Box>
      <Box className={classes.mainContent}>
        <Questions
          ref={ref}
          referencedPosts={referencedPosts}
          questions={questions}
          setQuestions={setQuestions}
          pageNum={pageNum}
          setPageNum={setPageNum}
        />
      </Box>
    </Box>
  );
});

export default WikiRightSidebar;
