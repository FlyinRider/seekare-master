import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { makeStyles, Box, List, ListItem, Typography } from "@material-ui/core";

import {
  createNewWikiData,
  fetchAllWikis,
  fetchWikiByID,
  fetchWikiListByKeyword,
} from "app/store/wiki/actions";
import { FaAngleDoubleDown, FaAngleDoubleUp } from "react-icons/fa";
import { useState } from "react";
// import ReferButton from "app/main/shared-components/ReferButton";
import { useHistory } from "react-router-dom";
import SearchInput from "app/main/shared-components/SearchInput";
import CustomButton from "app/main/shared-components/Button";
import useAuth from "app/hooks/useAuth";
import { setActiveContent } from "app/store/ui/actions";
import { useWikiContext } from "../wikiContext";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    overflow: "hidden",
    height: "100%",
    display: "flex",
    flexDirection: "column",

    background: (props) =>
      props.activeContent === "wiki" ? theme.palette.secondary.active : "white",
    borderRadius: "1rem",
    border: (props) =>
      props.activeContent === "wiki"
        ? `1px solid ${theme.palette.secondary.main}`
        : "1px solid transparent",
  },
  tagSearch: {
    border: "none",
    borderRadius: "0.5rem",
    width: "100%",
    background: theme.palette.secondary.light,
    fontSize: "1.2rem",
    outline: "none",
    color: theme.palette.primary.secondary,
  },
  menuIcon: {
    fontSize: 25,
    cursor: "pointer",
    marginLeft: 10,
  },
  searchInputWrapper: {
    padding: "10px 5px",
  },
  mainContent: {
    overflow: "hidden auto",
    flex: 1,
  },
  title: {
    color: theme.palette.text.primary,
  },
  wikiList: {
    marginTop: 10,
  },
  wikiListTitle: {
    textAlign: "center",
    fontSize: "1.4rem",
    fontWeight: "bold",
    color: theme.palette.text.secondary,
    display: "flex",
    alignItems: "center",
    "& span": {
      marginLeft: "0.5rem",
    },
  },
  wikiActions: {
    marginTop: 0,
    display: "flex",
    justifyContent: "flex-start",
    marginBottom: "50px",
  },
  items: {
    padding: 0,
    margin: 0,
    marginTop: "10px",
    listStyle: "none",
  },
  item: {
    textTransform: "capitalize",
    fontSize: "0.9rem",
    padding: "10px 0",
    cursor: "pointer",
    position: "relative",
    border: "none",
    color: "#000",
    paddingLeft: 32,
    borderRadius: 4,
    overflow: "hidden",
    "&:before": {
      content: '" "',
      position: "absolute",
      width: 4,
      height: 4,
      borderRadius: 2,
      background: "green",
      top: "50%",
      left: 16,
      transform: "translateY(-50%)",
    },

    "&:hover": {
      color: theme.palette.secondary.main,
      background: "linear-gradient(90deg, #d3c2d7, #ffffff00)",
      transition: "all 0.3s ease",
    },
    "&.selected": {
      color: theme.palette.secondary.main,
      fontWeight: "bold",
    },
  },
  leftBottom: {
    position: "relative",
    marginTop: 10,
    marginBottom: 10,
    padding: "0 10px",
  },
  showmoreButton: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    fontSize: "16px",
    fontWeight: "500",
    marginBottom: "10px",
    padding: "7px",
    borderRadius: "0.6rem",
    cursor: "pointer",
    "& > svg": {
      marginLeft: "3px",
      alignSelf: "center",
    },
  },
  copywrite: {
    textAlign: "center",
    paddingTop: "10px",
    color: theme.palette.text.secondary,
  },
  libaryIcon: {
    color: theme.palette.secondary.main,
  },
  helperText: {
    fontSize: "13px",
    color: "#525252",
  },
}));

const WikiLeftSidebar = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { isAuthenticated, isMd: isMdUserRole } = useAuth();

  const wikis = useSelector((state) => state.wiki.wikis);
  const activeContent = useSelector((state) => state.ui.content.activeContent);
  const { id: activeWikiId } = useSelector((state) => state.wiki.activeWiki);

  const { pageNum, setPageNum, questions, setQuestions } = useWikiContext();

  const [searchKey, setSearchKey] = useState("");

  const [isShow, setShow] = useState(false);

  // all wiki
  useEffect(() => {
    dispatch(fetchAllWikis());
  }, [dispatch]);

  const onClickWikiItem = (wiki) => {
    setPageNum(0);
    dispatch(fetchWikiByID(wiki?._id));
    dispatch(setActiveContent("wiki"));
    history.push(
      `/wiki/${wiki._id}/${
        wiki.title !== undefined
          ? wiki.title
              .replace(/ /g, "-")
              .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "")
          : wiki.questionID
      }`
    );
  };

  const handleNewWikiClick = (e) => {
    dispatch(createNewWikiData());
    history.push("/wiki");
  };

  const handleShowClick = () => {
    setShow(!isShow);
  };

  const classes = useStyles({
    activeContent,
  });
  const handleChangeSearch = (value) => {
    setSearchKey(value);
  };

  const handleKeyChangeSearch = useCallback(
    (e) => {
      if (e.key === "Enter") {
        dispatch(fetchWikiListByKeyword(searchKey));
        history.push("/wiki/search");
      }
    },
    [dispatch, searchKey, history]
  );

  return (
    <Box className={`${classes.root} kareBook`}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        px={2}
      >
        <Typography
          variant="h6"
          component="h6"
          className={classes.wikiListTitle}
        >
          <img src="/images/icons/karebook.svg" alt="karebook" />
          <span>KareBook</span>
        </Typography>
        {isAuthenticated && isMdUserRole && (
          <Box display="flex" alignItems="center">
            <CustomButton
              color="secondary"
              type="submit"
              variant="outlined"
              size="sm"
              onClick={handleNewWikiClick}
            >
              Add Book
            </CustomButton>
          </Box>
        )}
      </Box>
      <Box className={classes.mainContent}>
        <Box className={classes.wikiList}>
          <Box px={2}>
            <SearchInput
              className={`${classes.tagSearch} kareBook-searchBar`}
              name="tag_search_query"
              onChange={handleChangeSearch}
              onKeyUp={handleKeyChangeSearch}
              placeholder="Search Pages"
              value={searchKey}
            />
          </Box>
          <List component="ul" className={classes.items}>
            {wikis &&
              wikis.map((item, index) => (
                <>
                  {(isShow || index < 15) && (
                    <ListItem
                      key={`category_${item._id}`}
                      button
                      divider
                      onClick={() => onClickWikiItem(item)}
                      selected={activeWikiId === item._id}
                      className={classes.item}
                    >
                      {!item?.category && (
                        <Box component="li" fontSize="1rem">
                          {item.title}
                        </Box>
                      )}
                    </ListItem>
                  )}
                </>
              ))}
          </List>
        </Box>
      </Box>
      <Box className={classes.leftBottom}>
        <CustomButton
          color="secondary"
          variant="outlined"
          onClick={handleShowClick}
          className={classes.showmoreButton}
        >
          Show {`${isShow ? "Less" : "More"}`}
          {isShow ? <FaAngleDoubleUp /> : <FaAngleDoubleDown />}
        </CustomButton>
        <Typography className={classes.helperText}>
          Don't see your page listed?
        </Typography>
        <Typography className={classes.helperText}>
          Use "Search Pages" to search the entire KareBook
        </Typography>
        {/* <ReferButton /> */}
      </Box>
    </Box>
  );
};

export default WikiLeftSidebar;
