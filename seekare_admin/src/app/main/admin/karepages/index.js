import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiTrash } from "react-icons/bi";
import {
  makeStyles,
  Box,
  Button,
  Grid,
  Paper,
  Typography,
  OutlinedInput,
  InputAdornment,
} from "@material-ui/core";
import { BiSearch } from "react-icons/bi";

import {
  fetchAllWikis,
  fetchWikiListByKeyword,
  deleteWiki,
} from "app/store/wiki/actions";

import TableHeader from "app/main/shared-components/TableComponent/TableHeader";
import NoData from "app/main/shared-components/NoData";
import useSafeDispatch from "app/hooks/useSafeDispatch";
import { closeModal, openModal, pushSnackbar } from "app/store/ui/actions";

const columns = [
  {
    name: "title",
    title: "Kare Title",
    sorting: true,
    width: 3,
  },
  // {
  //   name: "questions",
  //   title: "Questions",
  //   sorting: false,
  //   width: 3,
  // },
  {
    name: "content",
    title: "Content",
    sorting: false,
    width: 8,
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
    padding: "1rem 0 1rem 1rem",
    textAlign: "center",
    borderBottom: "1px solid #e2e2e2",
    "&:hover": {
      backgroundColor: "#e2e2e2",
    },
  },
  columnTitle: {
    textAlign: "left",
  },
  columnContent: {
    textAlign: "left",
    "& p": {
      padding: 0,
      margin: 0,
    },
  },
  actionBtn: {
    minWidth: "2rem",
    margin: "0 0.2rem",
  },
});

const AdminKarePage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const safeDispatch = useSafeDispatch(dispatch);

  const wikis = useSelector((state) => state.wiki.wikis);
  const wikisBySearch = useSelector((state) => state.wiki.wikiList.data);

  const [wikiList, setWikiList] = useState([]);
  const [searchWord, setSearchWord] = useState("");

  useEffect(() => {
    safeDispatch(fetchAllWikis());
  }, [safeDispatch]);

  useEffect(() => {
    if (wikis || wikis?.length !== 0) {
      setWikiList(wikis);
    }
  }, [wikis]);

  useEffect(() => {
    if (wikisBySearch || wikisBySearch?.length !== 0) {
      setWikiList(wikisBySearch);
    }
  }, [wikisBySearch]);

  const handleChangeSearchInput = (e) => {
    setSearchWord(e.target.value);
  };

  const handleSearch = async (e) => {
    if (e.key === "Enter") {
      await safeDispatch(fetchWikiListByKeyword(searchWord));
    }
  };

  const onDeleteHandler = (id, title) => {
    safeDispatch(
      openModal("CONFIRM_MODAL", {
        title: "Confirm Delete Karepage",
        description: `Are you sure delete "${title}" Karepage`,
        buttons: [
          {
            title: "Yes",
            type: "secondary",
            onClick: () => {
              safeDispatch(deleteWiki(id));
              safeDispatch(fetchAllWikis());
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

  const onSortingHandler = (sortBy, dir) => {
    // safeDispatch(getQuestions({ sortBy, dir }));
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.titleHeader}>
        <Typography component="h2" variant="h6">
          Kare Pages
        </Typography>
        <Typography>Admin/Kare Pages</Typography>
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
            {wikiList && wikiList.length > 0 ? (
              wikiList?.map((datum) =>
                // eslint-disable-next-line no-mixed-operators
                !(datum.status && datum.status === "hidden") ? (
                  <Grid key={datum._id} container className={classes.tableRow}>
                    <Grid item md={3} className={classes.columnTitle}>
                      {datum.title}
                    </Grid>
                    {/* <Grid item md={3}>
                      {datum.questions}
                    </Grid> */}
                    <Grid item md={8}>
                      <Box
                        className={classes.columnContent}
                        dangerouslySetInnerHTML={{ __html: datum.content }}
                      />
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

export default AdminKarePage;
