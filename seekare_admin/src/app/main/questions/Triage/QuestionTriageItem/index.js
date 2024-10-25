import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { FaTag } from 'react-icons/fa';

import * as API from 'app/services/api';
import useSafeDispatch from 'app/hooks/useSafeDispatch';
import { pushSnackbar } from 'app/store/ui/actions';

const useStyles = makeStyles({
  root: {
    padding: '1rem 0.3rem',
    borderBottom: '1px solid #e2e2e2',
    '&:hover': {
      backgroundColor: '#f7f7f7',
    },
  },
  tagsInput: {
    flex: 1,
  },
});

const QuestionTirageItem = ({ question, onSubmitTags }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const safeDispatch = useSafeDispatch(dispatch);
  const tags_from_db = useSelector((state) => state.tag.tags);

  const [tags, setTags] = useState([]);
  const [isTriaging, setIsTraging] = useState(false);

  const handleChangeTags = (value) => {
    setTags(value);
  };

  const onClickCanclelHandler = () => {
    setTags([]);
    setIsTraging(false);
  };

  const onSubmitHandler = async () => {
    try {
      const { message } = await API.questionService.addingTags(
        question._id,
        tags
      );

      safeDispatch(pushSnackbar(message, 'success'));
    } catch (error) {
      safeDispatch(pushSnackbar(error, 'error'));
    }

    setTags([]);
    setIsTraging(false);
    onSubmitTags();
  };

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} sm={10}>
        <Link to={`/questions/${question._id}/show`}>
          <Typography>{question.title}</Typography>
        </Link>
      </Grid>
      <Grid
        item
        xs={12}
        sm={2}
        component={Box}
        display='flex'
        justifyContent='flex-end'
      >
        {!isTriaging ? (
          <Button
            size='small'
            variant='outlined'
            color='primary'
            onClick={() => setIsTraging(true)}
          >
            <FaTag />
            &nbsp;Triage
          </Button>
        ) : (
          <>
            <Button
              variant='outlined'
              color='primary'
              size='small'
              onClick={onSubmitHandler}
            >
              Submit
            </Button>
            &nbsp;
            <Button
              variant='outlined'
              color='secondary'
              size='small'
              onClick={onClickCanclelHandler}
            >
              Cancel
            </Button>
          </>
        )}
      </Grid>
      {isTriaging && (
        <Box display='flex' width='100%' pt={1}>
          <Autocomplete
            fullWidth
            multiple
            filterSelectedOptions
            size='small'
            id='tags-outlined'
            value={tags}
            options={tags_from_db}
            getOptionLabel={(option) => option.title}
            className={classes.tagsInput}
            renderInput={(params) => (
              <TextField
                fullWidth
                {...params}
                label={''}
                size='small'
                variant='outlined'
                placeholder='Tags'
              />
            )}
            onChange={(e, value) => handleChangeTags(value)}
          />
        </Box>
      )}
    </Grid>
  );
};
export default QuestionTirageItem;
