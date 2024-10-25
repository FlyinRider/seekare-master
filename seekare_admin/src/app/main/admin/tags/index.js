import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Button,
  Chip,
  FormHelperText,
  Grid,
  OutlinedInput,
  Paper,
  TextField,
  makeStyles,
} from '@material-ui/core';
import { useFormik } from 'formik';
import { Autocomplete } from '@material-ui/lab';
import * as Yup from 'yup';

import TitleHeader from '../TitleHeader';

import useSafeDispatch from 'app/hooks/useSafeDispatch';
import { addTag, deleteTag } from 'app/store/tag/actions';

const useStyles = makeStyles({
  root: {},
  tagInput: {
    marginRight: '0.5rem',
    '& input': {
      padding: '10px',
    },
  },
  tagChip: {
    display: 'flex',
    justifyContent: 'flex-start',
    maxWidth: '100%',
    width: 'fit-content',
  },
  tagItem: {
    margin: '0.5rem',
    border: '1px solid gray',
    borderRadius: '4px',
    width: '150px',
    height: '150px',
    boxShadow: '2px 3px 4px -5px black',
    padding: '5px',
    display: 'flex',
    flexDirection: 'column',
  },
});

const AdminTagsPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const safeDispatch = useSafeDispatch(dispatch);
  const tags = useSelector((state) => state.tag.tags);

  const onDeleteTag = (tagId) => {
    safeDispatch(deleteTag(tagId));
  };

  const getCategoryTag = (categoryTagID) => {
    const idx = tags.findIndex((item) => item._id === categoryTagID);
    if (idx > -1) {
      return tags[idx];
    } else {
      return null;
    }
  };

  const { handleSubmit, handleChange, values, errors, setFieldValue } =
    useFormik({
      initialValues: {
        title: '',
        slug: '',
        description: '',
        category: null,
      },
      validationSchema: Yup.object().shape({
        title: Yup.string().required('Title is required'),
      }),
      onSubmit: () => {
        safeDispatch(addTag(values));
      },
    });

  return (
    <Box padding='1rem' className={classes.root}>
      <TitleHeader title='Tags Management' breadcrumb='Admin / Tags' />
      <Box component={Paper} padding='1rem 0.5rem'>
        <Grid component='form' onSubmit={handleSubmit} container spacing={2}>
          <Grid item xs={12} sm={6}>
            <OutlinedInput
              fullWidth
              className={classes.tagInput}
              placeholder='Title of Tag'
              name='title'
              value={values.title}
              onChange={handleChange}
            />
            {errors && errors.title && (
              <FormHelperText error>{errors.title}</FormHelperText>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <OutlinedInput
              fullWidth
              className={classes.tagInput}
              placeholder='Slug'
              name='slug'
              value={values.slug}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} component={Box} mt={2}>
          <Grid item xs={12} sm={6}>
            <OutlinedInput
              fullWidth
              className={classes.tagInput}
              placeholder='Description'
              name='description'
              value={values.description}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Autocomplete
              id='tags'
              fullWidth
              options={tags}
              getOptionLabel={(option) => option.title}
              style={{ flexGrow: 1 }}
              className={classes.tagInput}
              onChange={(e, value) => setFieldValue('category', value?._id)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  size='small'
                  label='Select Category Tag'
                  variant='outlined'
                />
              )}
            />
          </Grid>
        </Grid>
        <Box display='flex' justifyContent='flex-end' mt={2}>
          <Button variant='outlined' color='primary' onClick={handleSubmit}>
            Add Tag
          </Button>
        </Box>
      </Box>
      <Box>
        <Box
          padding='1rem'
          border='1px solid black'
          borderColor='gray'
          borderRadius='0.4rem'
          marginTop='0.5rem'
          display='flex'
          flexWrap='wrap'
        >
          {tags && (
            <>
              {tags.map((_item) => (
                <Box className={classes.tagItem}>
                  <Chip
                    className={classes.tagChip}
                    key={_item._id}
                    label={_item.title}
                    onDelete={() => onDeleteTag(_item._id)}
                  />
                  <Box display='flex' flexGrow='1'>
                    {_item?.description}
                  </Box>
                  {_item.category && (
                    <Box borderRadius='2px' border='1px solid black'>
                      Category: {getCategoryTag(_item.category)?.title}
                    </Box>
                  )}
                </Box>
              ))}
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default AdminTagsPage;
