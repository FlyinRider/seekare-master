import React, { useState, useCallback, forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles, Box, Typography } from "@material-ui/core";
import { setSearchTerm } from "app/store/question/actions";

import SearchInput from "app/main/shared-components/SearchInput";
import Questions from "./Questions";
import CustomButton from "app/main/shared-components/Button";
import useAuth from "app/hooks/useAuth";
import { useHistory } from "react-router-dom";
import { openModal } from "app/store/ui/actions";
import { ASKING } from "app/constants";
import { useEffect } from "react";
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
  },
  titleIcon: {
    color: theme.palette.secondary.main,
  },
  searchinput: {
    background: "#e6e6e6",
    color: "black !important",
    borderRadius: "1rem",
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
    }
  };
  const onChangeHandler = (value) => {
    setSearchQuery(value);
  };

  const handleNewQuestionPost = () => {
    if (isAuthenticated) {
      history.push("/wiki/question/ask");
    } else {
      dispatch(
        openModal("LOGIN_MODAL", {
          state: ASKING,
        })
      );
    }
  };

  return (
    <Box className={`${classes.root} karePost`}>
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
            {activeWikiId == undefined ||
            pathname.includes("/show") ||
            referencedPosts
              ? "KarePost"
              : isMd || isAdmin
              ? "Referenced Post"
              : "KarePost"}
          </Box>
        </Typography>
        {pathname.includes("/show") ||
        searchTerm.length > 1 ||
        activeWikiId == undefined ? (
          <></>
        ) : isMd || isAdmin ? (
          <FormControlLabel
            style={{ marginLeft: "-130px" }}
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
            className="karePostAddBtn"
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
          className={classes.searchinput}
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
