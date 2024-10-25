import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BiShow, BiTrash } from "react-icons/bi";
import {
  makeStyles,
  Box,
  Button,
  Chip,
  Grid,
  Paper,
  Typography,
  OutlinedInput,
  InputAdornment,
} from "@material-ui/core";
import { BiSearch } from "react-icons/bi";

import {
  assignMD,
  deleteQuestion,
  getQuestions,
  setBannedQuestion,
  setStatus,
} from "app/store/question/actions";
import TableHeader from "app/main/shared-components/TableComponent/TableHeader";
import NoData from "app/main/shared-components/NoData";
import { postedTimeFormat } from "app/util/date";
import useSafeDispatch from "app/hooks/useSafeDispatch";
import { closeModal, openModal, pushSnackbar } from "app/store/ui/actions";
import * as API from "app/services/api";
import MdCell from "./MdCell";

const columns = [
  {
    name: "title",
    title: "Question Title",
    sorting: true,
    width: 2,
  },
  {
    name: "answers",
    title: "Answers",
    sorting: false,
    width: 1,
  },
  {
    name: "user",
    title: "Asked By",
    sorting: false,
    width: 1,
  },
  {
    name: "tags",
    title: "Tag",
    sorting: false,
    width: 2,
  },
  {
    name: "mdAssigned",
    title: "MD Assigned",
    sorting: false,
    width: 3,
  },
  {
    name: "MDReivewed",
    title: "MD Reviewed",
    sorting: false,
    width: 1,
  },

  {
    name: "date",
    title: "Asked DateTime",
    sorting: true,
    width: 1,
  },
  {
    name: "actions",
    title: "Actions",
    sorting: false,
    width: 1,
  },
];

const useStyles = makeStyles({
  root: { padding: "1.5rem" },
  searchInput: {
    "& input": {
      flex: "1 0",
      width: "100%",
      padding: "0.4rem 0",
    },
  },
  table: {},
  tableRow: {
    padding: "1rem 0",
    textAlign: "center",
    borderBottom: "1px solid #e2e2e2",
    "&:hover": {
      backgroundColor: "#e2e2e2",
    },
  },
  actionBtn: {
    minWidth: "2rem",
    margin: "0 0.2rem",
  },
});

const AdminQuestionsPage = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const safeDispatch = useSafeDispatch(dispatch);
  const questions = useSelector((state) => state.question.questions);

  const [searchWord, setSearchWord] = useState("");

  useEffect(() => {
    async function fetchData() {
      await safeDispatch(getQuestions({}));
    }

    fetchData();
  }, [safeDispatch]);

  const handleChangeSearchInput = (e) => {
    setSearchWord(e.target.value);
  };

  const handleSearch = async (e) => {
    if (e.key === "Enter") {
      await safeDispatch(getQuestions({ searchQuery: searchWord }));
    }
  };

  const onDeleteHandler = (qId, title) => {
    safeDispatch(
      openModal("CONFIRM_MODAL", {
        title: "Confirm Delete Question",
        description: `Are you sure delete "${title}" question`,
        buttons: [
          {
            title: "Yes",
            type: "secondary",
            onClick: () => {
              safeDispatch(deleteQuestion(qId));
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
  };

  const onClickViewDetail = (questionID) => {
    history.push(`/admin/questions/${questionID}`);
  };

  const onSortingHandler = (sortBy, dir) => {
    safeDispatch(getQuestions({ sortBy, dir }));
  };

  const onAssignMdHandler = (questionID, md) => {
    safeDispatch(assignMD(questionID, md._id));
  };

  const onDeleteMDHandler = async (questionID) => {
    try {
      await API.questionService.removeMD(questionID);
      safeDispatch(pushSnackbar("Removed MD", "success"));
      safeDispatch(getQuestions({}));
    } catch (error) {
      safeDispatch(pushSnackbar("Failed to removed MD", "error"));
    }
  };

  /**
   * Banned Button Click Handler
   *
   * @param {string} questionID Questino._id
   * @param {boolean} bannedStatus Question.banned
   */
  const onClickBan = async (questionID, bannedStatus) => {
    safeDispatch(
      openModal("CONFIRM_MODAL", {
        title: `Confirm ${bannedStatus ? "Banning" : "Permtting"} Question`,
        description: `Are you sure ${
          bannedStatus ? "Banning" : "Permtting"
        } question`,
        buttons: [
          {
            title: "Yes",
            type: "secondary",
            onClick: () => {
              safeDispatch(setBannedQuestion(questionID, bannedStatus));
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
  };

  /**
   * Hide Button Click Handler
   *
   * @param {string} questionID Question ID
   */
  const onClickHide = async (questionID) => {
    safeDispatch(
      openModal("CONFIRM_MODAL", {
        title: `Confirm Hiding Question`,
        description: `Are you sure hiding this question`,
        buttons: [
          {
            title: "Yes",
            type: "secondary",
            onClick: () => {
              safeDispatch(setStatus(questionID, "hidden"));
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
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.titleHeader}>
        <Typography component="h2" variant="h6">
          Questions
        </Typography>
        <Typography>Admin/Questions</Typography>
      </Box>
      <Box mt={2}>
        <Box display="flex" justifyContent="flex-start">
          <Box>
            <OutlinedInput
              fullWidth
              variant="outlined"
              className={classes.searchInput}
              placeholder="Enter Search Here"
              onChange={handleChangeSearchInput}
              onKeyDown={handleSearch}
              startAdornment={
                <InputAdornment position="start">
                  <BiSearch />
                </InputAdornment>
              }
            />
          </Box>
        </Box>
      </Box>
      <Box marginTop="1rem">
        <Paper className={classes.table}>
          <TableHeader colums={columns} onSorting={onSortingHandler} />
          <Box>
            {questions && questions.length > 0 ? (
              questions?.map((datum) =>
                // eslint-disable-next-line no-mixed-operators
                !(datum?.status && datum?.status === "hidden") ? (
                  <Grid key={datum?._id} container className={classes.tableRow}>
                    <Grid item md={2}>
                      {datum?.title}
                    </Grid>
                    <Grid item md={1}>
                      {datum?.answers}
                    </Grid>
                    <Grid item md={1}>
                      {datum?.user?.username}
                    </Grid>
                    <Grid item md={2}>
                      {datum?.tags && (
                        <Box>
                          {datum?.tags.map((tagItem) => (
                            <Chip
                              key={tagItem?._id}
                              size="small"
                              label={tagItem?.title}
                            />
                          ))}
                        </Box>
                      )}
                    </Grid>
                    <Grid item md={3}>
                      <MdCell
                        question={datum}
                        onAssignMd={(md) => onAssignMdHandler(datum._id, md)}
                        onDeleteMD={() => onDeleteMDHandler(datum._id)}
                      />
                    </Grid>
                    <Grid item md={1}>
                      {datum?.mdReviewed ? "Yes" : "No"}
                    </Grid>
                    <Grid item md={1}>
                      {postedTimeFormat(datum?.date)}
                    </Grid>
                    <Grid item md={1}>
                      <Button
                        variant="outlined"
                        size="small"
                        color="secondary"
                        className={classes.actionBtn}
                        onClick={() => onDeleteHandler(datum._id, datum.title)}
                      >
                        <BiTrash />
                      </Button>
                      <Button
                        variant="outlined"
                        className={classes.actionBtn}
                        size="small"
                        color="primary"
                        onClick={() => onClickViewDetail(datum._id)}
                      >
                        <BiShow />
                      </Button>
                      <Button
                        variant="outlined"
                        className={classes.actionBtn}
                        size="small"
                        color={datum?.banned ? "primary" : "secondary"}
                        onClick={() => onClickBan(datum._id, datum.banned)}
                      >
                        {datum?.banned ? "Permit" : "Ban"}
                      </Button>

                      <Button
                        variant="outlined"
                        className={classes.actionBtn}
                        size="small"
                        color="secondary"
                        onClick={() => onClickHide(datum._id)}
                      >
                        Hide
                      </Button>
                    </Grid>
                  </Grid>
                ) : null
              )
            ) : (
              <NoData />
            )}
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default AdminQuestionsPage;
