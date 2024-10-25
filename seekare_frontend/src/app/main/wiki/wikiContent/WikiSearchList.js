import React from "react";
import { useSelector } from "react-redux";
import { Box, Grid, makeStyles, Typography } from "@material-ui/core";

import Loader from "app/main/layouts/ClientLayout/Loader";
import { WikiSearchResultItem } from "app/main/shared-components/WikiQuestionItem/SearchResultItem";
import { BsExclamationCircle } from "react-icons/bs";

const useStyles = makeStyles((theme) => ({
  rootWrapper: {},
}));
const WikiSearchList = () => {
  const classes = useStyles();

  const {
    loading: isLoading,
    data: searchRes,
    keyword,
  } = useSelector((state) => state.wiki.wikiList);

  return isLoading ? (
    <Loader />
  ) : (
    <Grid container className={classes.rootWrapper}>
      <Grid item xs={12}>
        <Typography variant="h6" component="h2">
          {!searchRes || searchRes.length < 1 ? (
            <Box display="flex" alignItems="center">
              <BsExclamationCircle />
              &nbsp; No available KarePages yet, try searching the KarePosts
            </Box>
          ) : (
            `Search: ${keyword} (${searchRes.length})`
          )}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Box>
          {searchRes &&
            searchRes.length > 0 &&
            searchRes.map((item) => (
              <WikiSearchResultItem
                keyword={keyword}
                key={item._id}
                wiki={item}
              />
            ))}
        </Box>
      </Grid>
    </Grid>
  );
};

export default WikiSearchList;
