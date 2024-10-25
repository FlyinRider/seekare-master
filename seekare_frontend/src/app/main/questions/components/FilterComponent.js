import React, { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import {
  Box,
  Link,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

import useAuth from 'app/hooks/useAuth';
import useQuery from 'app/hooks/useQuery';

const useStyles = makeStyles({
  root: {},
  selectButton: {
    background: 'none',
    padding: '0.7rem 1rem',
    border: 'none',
    fontSize: '1rem',
    textDecoration: 'none!important',
    color: 'black',
    cursor: 'pointer',
    transition: 'all 0.3s ease-in-out',
    '&.active, &:hover': {
      borderLeft: '3px solid #afd279',
      fontWeight: 600,
      background: '#5c6d91',
      color: 'white',
    },
  },
  sectionTitle: {
    fontWeight: 600,
    fontSize: '1rem',
    padding: '0.5rem 0',
  },
  searchItem: {
    display: 'block',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
});

const FilterComponent = ({ onChangeTags, onChangeTab }) => {
  const classes = useStyles();
  const { q } = useQuery();
  const [tags, setTags] = useState([]);
  const [tab, setTab] = useState(() => {
    return !q ? 'recents' : '';
  });

  const tagsList = useSelector((state) => state.tag.tags);

  const { currentUser, isAuthenticated, isMd } = useAuth();

  const handleChangeTags = useCallback(
    (value) => {
      setTags(value);
      onChangeTags(tags);
    },
    [onChangeTags, tags]
  );

  const handleChangeTab = useCallback(
    (tab) => {
      setTab(tab);
      onChangeTab(tab);
    },
    [onChangeTab]
  );

  return (
    <Paper className={classes.root}>
      <Box display='flex' flexDirection='column'>
        <Link
          className={`${classes.selectButton} ${
            tab === 'recents' ? 'active' : ''
          }`}
          onClick={() => handleChangeTab('recents')}
        >
          Recent Questions
        </Link>
        {isAuthenticated && (
          <>
            <Link
              className={`${classes.selectButton} ${
                tab === 'asked' ? 'active' : ''
              }`}
              onClick={() => handleChangeTab('asked')}
            >
              My Questions
            </Link>
            <Link
              className={`${classes.selectButton} ${
                tab === 'answered' ? 'active' : ''
              }`}
              onClick={() => handleChangeTab('answered')}
            >
              My Responses
            </Link>
          </>
        )}
      </Box>
      {isAuthenticated && (
        <Box padding='1rem'>
          <Typography
            component='h5'
            variant='h6'
            className={classes.sectionTitle}
          >
            My Search History
          </Typography>
          <Box>
            {currentUser &&
            currentUser.searchHistory &&
            currentUser.searchHistory.length > 0
              ? currentUser.searchHistory.map((item) => (
                  <Link
                    key={item}
                    className={classes.searchItem}
                    href={`/questions/?from_recent_search=true&q=${item}`}
                  >
                    {item}
                  </Link>
                ))
              : null}
          </Box>
        </Box>
      )}

      {isMd && (
        <Box padding='1rem'>
          <Typography
            component='h5'
            variant='h6'
            className={classes.sectionTitle}
          >
            Tags
          </Typography>
          <Autocomplete
            multiple
            filterSelectedOptions
            size='small'
            id='tags-outlined'
            className={classes.tagsInput}
            value={tags}
            options={tagsList}
            getOptionLabel={(option) => option.title}
            renderInput={(params) => (
              <TextField
                {...params}
                label={''}
                variant='outlined'
                placeholder='Tags'
              />
            )}
            onChange={(e, value) => handleChangeTags(value)}
          />
        </Box>
      )}
    </Paper>
  );
};

FilterComponent.propTypes = {
  doFilter: PropTypes.func.isRequired,
};

FilterComponent.defaultProps = {
  doFilter: () => {},
};

export default FilterComponent;
