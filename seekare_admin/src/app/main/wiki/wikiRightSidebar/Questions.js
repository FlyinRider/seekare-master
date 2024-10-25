import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  makeStyles,
  MenuItem,
  Select,
} from "@material-ui/core";

import { getReferencedAnswers } from "app/store/answer/actions";
import {
  getSortedQuestions,
  emptyQuestion,
  setSearchTerm,
} from "app/store/question/actions";
import useAuth from "app/hooks/useAuth";
import TouchedWikiItem from "app/main/shared-components/WikiQuestionItem/TouchedWikiItem";
import { useHistory } from "react-router-dom";
import { setActiveContent } from "app/store/ui/actions";
import Spinner from "../spinner";
import { forwardRef } from "react";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

const useStyles = makeStyles((theme) => ({
  root: {},
  questions: {
    overflow: "hidden scroll",
    height: "92%",
    borderRadius: 10,
    "&::-webkit-scrollbar": {
      width: "0",
    },
    "&::-webkit-scrollbar-thumb": {
      display: "none",
    },
  },
  tabs: {
    padding: "10px 0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  tabsItem: {
    cursor: "pointer",
    textTransform: "uppercase",
    transition: "all 0.3s ease",
    justifyContent: "center",
    padding: "5px 10px",
    border: `1px solid gray`,
    fontWeight: 700,
    fontSize: "14px",
    color: theme.palette.text.secondary,
    "&:first-child": {
      borderTopLeftRadius: "6px",
      borderBottomLeftRadius: "6px",
    },
    "&:last-child": {
      borderTopRightRadius: "6px",
      borderBottomRightRadius: "6px",
    },
    "&.active, &:hover": {
      color: theme.palette.text.primary,
      backgroundColor: "white",
    },
  },
  allowAllIcon: {
    position: "absolute",
    top: "65px",
    right: "0",
  },
  formControl: {
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  button: {
    border: "none",
    borderRadius: 0,
    "&:hover": {
      border: "none",
      borderBottom: `2px solid ${theme.palette.secondary.main}`,
    },
  },
  selectedRadio: {
    color: theme.palette.secondary.main,
    borderBottom: `2px solid ${theme.palette.secondary.main}`,
    width: "50%",
  },
  radioButton: {
    width: "50%",
    color: theme.palette.text.main,
    borderBottom: `2px solid ${theme.palette.text.main}`,
  },

  postsGroup: {
    marginTop: "15px",
  },
  selectField: {
    backgroundColor: theme.palette.secondary.lightest,
    border: `1px solid ${theme.palette.secondary.main}`,
    borderRadius: "8px",
    padding: "5px 10px",
    "&:hover, &:focus, &:focus-within, &:active": {
      border: `1px solid ${theme.palette.secondary.light}`,
    },
    "&:after, &:before": {
      display: "none",
    },
  },
}));

const Questions = forwardRef(
  ({ referencedPosts, questions, setQuestions, pageNum, setPageNum }, ref) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const history = useHistory();
    const {
      questions: qs,
      searchTerm,
      page,
      isLoading,
    } = useSelector((state) => state.question);
    const answers = useSelector((state) => state.answer.answers);
    const location = useLocation();
    const pathname = location.pathname;
    const activeContent = useSelector(
      (state) => state.ui.content.activeContent
    );
    const { id: activeWikiId } = useSelector((state) => state.wiki.activeWiki);

    const { isAuthenticated, currentUser, isMd, isAdmin } = useAuth();
    useEffect(() => {
      const fetchQuestions = async (searchQuery, qSetting) => {
        return dispatch(
          getSortedQuestions({
            q: searchQuery,
            qSetting: "exact",
            page: page === 0 ? page : pageNum,
            activeWikiId:
              pathname.includes("/show") ||
              searchTerm.length > 1 ||
              referencedPosts
                ? undefined
                : isAdmin || isMd
                ? activeWikiId
                : undefined,
          })
        );
      };
      const fetchReferencedAnswers = async () => {
        return dispatch(getReferencedAnswers(activeWikiId));
      };
      console.log("========================>", isMd, isAdmin);
      if (
        activeWikiId != undefined &&
        searchTerm.length <= 1 &&
        !pathname.includes("/show") &&
        !referencedPosts &&
        (isMd || isAdmin)
      ) {
        fetchReferencedAnswers();
      }
      fetchQuestions(searchTerm);
    }, [dispatch, searchTerm, pageNum, activeWikiId, referencedPosts]);

    useEffect(() => {
      if (qs.length === 0) setQuestions([]);
      else {
        if (
          page == 0 &&
          !pathname.includes("/show") &&
          !referencedPosts &&
          (isMd || isAdmin)
        )
          setQuestions([...qs, ...answers]);
        else if (
          activeWikiId !== undefined &&
          searchTerm.length <= 1 &&
          !pathname.includes("/show") &&
          !referencedPosts &&
          (isMd || isAdmin)
        )
          setQuestions([...questions, ...qs, ...answers]);
        else setQuestions([...questions, ...qs]);
      }
    }, [qs]);

    const onSrcollHandler = (e) => {
      const bottom =
        e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight < 50;
      if (bottom && qs.length != 0 && !isLoading && qs.length >= 10) {
        setPageNum(Number(page) + 1);
      }
    };

    const onChangeTabHandler = useCallback(
      (tab) => {
        switch (tab) {
          case "recents":
            setQuestions([]);
            dispatch(getSortedQuestions({ tab: "recents" }));
            break;
          case "asked":
            setQuestions([]);
            dispatch(
              getSortedQuestions({ tab: "asked", userID: currentUser.userID })
            );
            break;
          case "answered":
            setQuestions([]);
            dispatch(
              getSortedQuestions({
                tab: "answered",
                userID: currentUser.userID,
              })
            );
            break;
          default:
            setQuestions([]);
            dispatch(getSortedQuestions({ tab: "recents" }));
            break;
        }
      },

      [currentUser.userID, dispatch]
    );

    const handleItemClick = (item) => {
      dispatch(setActiveContent("question"));
      if (history.location.pathname.indexOf("/wiki/question/") < 0) {
        dispatch(emptyQuestion());
      }
      history.push(
        `/wiki/question/${
          item.title !== undefined ? item._id : item.questionID
        }/${
          item.title !== undefined
            ? item.title
                .replace(/ /g, "-")
                .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "")
            : item.questionID
        }/show`
      );
    };

    const lin = () => {
      var links = document.getElementsByTagName("a");
      for (var i = 0; i < links.length; i++) {
        links[i].target = "_self";
      }
    };
    const handleSetQuestionLink = (item) => {
      console.log("how times");
      if (ref.current) {
        const editor = ref.current.getEditor();
        editor.focus();
        const selection = editor.getSelection();
        const cursorPosition = selection ? selection.index : 0;

        const value = editor.root.innerHTML;

        const newValue = `<span>&nbsp;<a href="/wiki/question/${
          item.title !== undefined ? item._id : item.questionID
        }/show" target="_self">[${item.user.username}]</a></span>`;

        //|${item.title !== undefined ?'question':'answer'}

        editor.clipboard.dangerouslyPasteHTML(cursorPosition, newValue);
        lin();
        // const newCursorPosition = cursorPosition + link.length;
        // quillRef.current.getEditor().setSelection(newCursorPosition);
        // ${activeWikiId == undefined ? item.user.username : `${item.user.username}|${item.questionId == undefined ? 'question' : 'answer'}|${item.questionId== undefined ? item._id:''}`}
      }
    };
    const POST_TYPES = useMemo(
      () => [
        { value: "all-post", label: "All Posts" },
        { value: "my-post", label: "My Posts" },
      ],
      []
    );
    const QUESTION_TYPES = useMemo(
      () => [
        { value: "newest", label: "Newest" },
        { value: "highest-rated", label: "Hightest Rated" },
        { value: "md-responded", label: "MD Responded" },
      ],
      []
    );

    const [postType, setPostType] = useState(POST_TYPES[0].value);
    const [sortType, setSortType] = useState(QUESTION_TYPES[0].value);

    // useEffect(() => {
    //   console.log(`In Questions questions `, questions);
    // }, [questions]);

    // const filteredQuestions = useMemo(() => {
    //   console.log(`In useMemo(filteredQuestions) questions `, questions);
    //   switch (sortType) {
    //     case "md-responded":
    //       return questions.filter((item) => item.mdReviewed);
    //     case "highest-rated":
    //       return questions.map((item) => item).sort((p, n) => n.likes - p.likes);
    //     case "newest":
    //     default:
    //       return questions
    //         .map((item) => item)
    //         .sort((p, n) => (p.date < n.date ? 1 : -1));
    //   }
    // }, [questions, sortType]);

    const calcQuestions = (questions, sortType) => {
      {
        switch (sortType) {
          case "md-responded":
            return questions.filter((item) => item.mdReviewed);
          case "highest-rated":
            return questions
              .map((item) => item)
              .sort((p, n) => n.likes - p.likes);
          case "newest":
          default:
            return questions
              .map((item) => item)
              .sort((p, n) => (p.date < n.date ? 1 : -1));
        }
      }
    };
    const [filteredQuestions, setFilteredQuestions] = useState([]);
    useEffect(() => {
      const newFilteredQuestions = calcQuestions(
        JSON.parse(JSON.stringify(questions)),
        sortType
      );
      setFilteredQuestions(
        Array.from(
          new Set(newFilteredQuestions.map((el) => JSON.stringify(el)))
        ).map((el) => JSON.parse(el))
      );
    }, [questions, sortType]);

    const handlePostTypeChange = (value) => {
      if (value === "my-post" && postType !== "my-post")
        onChangeTabHandler("asked");
      else if (value === "all-post" && postType !== "all-post")
        onChangeTabHandler("recents");
      setPostType(value);
    };

    const handleQuestionTypeChange = (event) => {
      setSortType(event.target.value);
    };
    const handleDeleteFilteredItem = (question) => {
      setFilteredQuestions(
        filteredQuestions.filter((item) => item._id !== question._id)
      );
    };
    return (
      <Box height="100%">
        {isAuthenticated && (
          <Box
            display="flex"
            flexDirection="column"
            className={classes.postsGroup}
          >
            <ButtonGroup
              variant="outlined"
              color="secondary"
              aria-label="contained secondary button group"
            >
              {POST_TYPES.map(({ value, label }) => (
                <Button
                  key={value}
                  onClick={() => handlePostTypeChange(value)}
                  className={`${
                    value === postType
                      ? classes.selectedRadio
                      : classes.radioButton
                  } ${classes.button}`}
                >
                  {label}
                </Button>
              ))}
            </ButtonGroup>
          </Box>
        )}
        <Box className={classes.questions} onScroll={onSrcollHandler}>
          {isAuthenticated && (
            <Box display="flex" flexDirection="column" my={1}>
              <FormControl className={classes.formControl}>
                <Select
                  labelId="question-type-select-label"
                  id="question-type-select"
                  value={sortType}
                  onChange={handleQuestionTypeChange}
                  className={classes.selectField}
                >
                  {QUESTION_TYPES.map(({ value, label }) => (
                    <MenuItem key={value} value={value}>
                      {label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          )}
          {filteredQuestions?.map((item, index) => (
            <TouchedWikiItem
              ref={ref}
              key={item._id}
              item_question={item}
              index={index}
              onClick={handleItemClick}
              onClickAlt={handleSetQuestionLink}
              searchTerm={searchTerm}
              referencedPosts={referencedPosts}
              handleDeleteFilteredItem={handleDeleteFilteredItem}
            />
          ))}
          {isLoading && <Spinner />}
        </Box>
      </Box>
    );
  }
);

export default Questions;
