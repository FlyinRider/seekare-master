import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Box, Grid, Hidden, makeStyles, Typography } from "@material-ui/core";
import cn from "classnames";

import QuestionEntry from "app/main/shared-components/QuestionItem";
import { getSortedQuestions, setSearchTerm } from "app/store/question/actions";
import useAuth from "app/hooks/useAuth";
import useQuery from "app/hooks/useQuery";
import TagList from "app/main/shared-components/TagList";
import RightSidebar from "app/main/layouts/ClientLayout/RightSidebar";
import BreadCrumb from "app/main/shared-components/BreadCrumb";
import MDSwitch from "app/main/shared-components/MDSwitch";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "90%",
    margin: "auto",
    "& h1": {
      color: "#3C7F97",
      fontWeight: "normal",
    },
  },
  questions: {
    height: "87vh",
    overflow: "hidden auto",
    paddingTop: 0,
    paddingBottom: "30px",
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
  //   filterSection: {
  //     padding: "2rem",
  //   },
  //   questionsListSection: {
  //     padding: "2rem",
  //   },
  //   questionsTitle: {
  //     display: "flex",
  //     justifyContent: "space-between",
  //     alignItems: "flex-start",
  //     marginBottom: "1rem",
  //     "& h1": {
  //       margin: 0,
  //     },
  //   },
  //   questionListHeader: {
  //     display: "flex",
  //     justifyContent: "flex-end",
  //   },
  //   questionsNumber: {
  //     fontWeight: "bold",
  //     fontSize: "1.2rem",
  //   },
  //   sorting: {
  //     "& button": {
  //       textTransform: "capitalize",
  //     },
  //   },
  //   questionsListFooter: {
  //     display: "flex",
  //     alignItems: "center",
  //     justifyContent: "space-between",
  //     padding: "1rem 0",
  //   },
  //   paginator: {},
}));

// const BootstrapInput = withStyles((theme) => ({
//   root: {
//     "label + &": {
//       marginTop: theme.spacing(2),
//     },
//   },
//   input: {
//     borderRadius: 1,
//     position: "relative",
//     backgroundColor: theme.palette.background.paper,
//     border: "1px solid #ced4da",
//     fontSize: 16,
//     padding: "10px 20px 10px 12px",
//     transition: theme.transitions.create(["border-color", "box-shadow"]),
//     fontFamily: [
//       "-apple-system",
//       "BlinkMacSystemFont",
//       '"Segoe UI"',
//       "Roboto",
//       '"Helvetica Neue"',
//       "Arial",
//       "sans-serif",
//       '"Apple Color Emoji"',
//       '"Segoe UI Emoji"',
//       '"Segoe UI Symbol"',
//     ].join(","),
//     "&:focus": {
//       borderRadius: 4,
//       borderColor: "#80bdff",
//       boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
//     },
//   },
// }))(InputBase);

const QuestionsPage = () => {
  const dispatch = useDispatch();
  const [onlyMDReponded, setOnlyMDReponded] = useState(false);

  const [currentTab, setCurrentTab] = useState("recents");

  const classes = useStyles({
    currentTab,
  });
  // const history = useHistory();
  // const [slug, setSlug] = useState("latest");
  const { isAuthenticated, currentUser } = useAuth();
  const { q: searchQuery, qSetting } = useQuery();

  const [queries, setQueries] = useState(() => {
    if (qSetting !== "exact") {
      return searchQuery
        ? searchQuery
            .trim()
            .split(" ")
            .filter((item) => {
              return item.length > 1;
            })
        : [];
    } else {
      return [searchQuery];
    }
  });

  console.log(queries);

  const fetchQuestions = useCallback(
    (searchQuery, qSetting) => {
      return dispatch(
        getSortedQuestions({
          q: searchQuery,
          qSetting,
        })
      );
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(setSearchTerm(searchQuery));
    setQueries(() => {
      fetchQuestions(searchQuery, qSetting);
      if (qSetting !== "exact") {
        return searchQuery
          ? searchQuery
              .trim()
              .split(" ")
              .filter((item) => item.length > 1)
          : [];
      } else {
        return [searchQuery];
      }
    });
  }, [dispatch, fetchQuestions, qSetting, searchQuery]);

  const { questions } = useSelector((state) => state.question);

  const filteredQuestions = useMemo(() => {
    return onlyMDReponded
      ? questions.filter((item) => item.mdReviewed)
      : questions;
  }, [onlyMDReponded, questions]);

  // const handleChange = (page) => {
  //   dispatch(
  //     getSortedQuestions({
  //       tab: currentTab,
  //       userID: currentUser.userID,
  //       q: searchQuery,
  //       qSetting,
  //       perpage,
  //       page,
  //       slug,
  //     })
  //   );
  // };

  // const handleChangePerpage = (perpage) => {
  //   dispatch(
  //     getSortedQuestions({
  //       tab: currentTab,
  //       userID: currentUser.userID,
  //       q: searchQuery,
  //       qSetting,
  //       perpage,
  //       page,
  //       slug,
  //     })
  //   );
  // };

  // const handleChangeSoringSlug = (sortingSlug) => {
  //   setSlug(sortingSlug);

  //   dispatch(
  //     getSortedQuestions({
  //       tab: currentTab,
  //       userID: currentUser.userID,
  //       q: searchQuery,
  //       qSetting: "any",
  //       perpage,
  //       page,
  //       slug: sortingSlug,
  //     })
  //   );
  // };

  const onChangeTabHandler = useCallback(
    (tab) => {
      setCurrentTab(tab);
      switch (tab) {
        case "recents":
          dispatch(getSortedQuestions({ tab: "recents" }));
          break;
        case "asked":
          dispatch(
            getSortedQuestions({ tab: "asked", userID: currentUser.userID })
          );
          break;
        case "answered":
          dispatch(
            getSortedQuestions({ tab: "answered", userID: currentUser.userID })
          );
          break;
        default:
          dispatch(getSortedQuestions({ tab: "recents" }));
          break;
      }
    },
    [currentUser.userID, dispatch]
  );

  // const onChangeTagsHandler = (tags) => {
  //   dispatch(getQuestions({ tags }));
  // };

  const paths = [
    {
      pathname: "Home",
      to: "/",
    },
    {
      pathname: "Questions",
      to: "/questions",
    },
  ];

  return (
    <Grid container>
      <Hidden mdDown>
        <Grid item md={3}>
          <BreadCrumb paths={paths} />
          <TagList />
        </Grid>
      </Hidden>
      <Grid item md={6}>
        <Box className={classes.tabs} position="relative">
          <Box
            className={[
              classes.tabsItem,
              currentTab === "recents" && "active",
            ].join(" ")}
            onClick={() => onChangeTabHandler("recents")}
          >
            New Questions
          </Box>
          {isAuthenticated && (
            <>
              <Box
                className={[
                  classes.tabsItem,
                  currentTab === "asked" && "active",
                ].join(" ")}
                onClick={() => onChangeTabHandler("asked")}
              >
                Your Questions
              </Box>
              <Box
                className={[
                  classes.tabsItem,
                  currentTab === "answered" && "active",
                ].join(" ")}
                onClick={() => onChangeTabHandler("answered")}
              >
                Your Answers
              </Box>
            </>
          )}

          <Box position="absolute" right="0">
            <Typography component="div">
              <Grid component="label" container alignItems="center" spacing={1}>
                <Grid item>{onlyMDReponded ? "MD Responded" : "All"}</Grid>
                <Grid item>
                  <MDSwitch
                    checked={onlyMDReponded}
                    onChange={(e) => setOnlyMDReponded(e.target.checked)}
                    name="onlyMDResponded"
                  />
                </Grid>
              </Grid>
            </Typography>
          </Box>
        </Box>
        <Box py={2} className={cn(classes.questions, "hidden-track")}>
          {filteredQuestions.map((item) => (
            <QuestionEntry queries={queries} key={item._id} question={item} />
          ))}
        </Box>
      </Grid>
      <Hidden>
        <Grid item md={3}>
          <RightSidebar />
        </Grid>
      </Hidden>
    </Grid>
  );
};

export default QuestionsPage;
