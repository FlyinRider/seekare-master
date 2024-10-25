import React, { useEffect, useState } from 'react';
import { BiPencil, BiTrash } from 'react-icons/bi';
import { Box, Button, Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';

import * as API from 'app/services/api';
import TableHeader from 'app/shared-components/TableComponent/TableHeader';

const useStyles = makeStyles({
  root: {},
  actionBtn: {
    minWidth: '1rem',
    margin: '0 0.1rem',
  },
});

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const classes = useStyles();

  const columns = [
    {
      name: 'title',
      title: 'Title',
      sorting: false,
      width: 3,
    },
    {
      name: 'tag',
      title: 'Tag',
      sorting: false,
      width: 2,
    },
    {
      name: 'description',
      title: 'Description',
      sorting: false,
      width: 6,
    },
    {
      name: 'actions',
      title: 'Actions',
      sorting: false,
      width: 1,
    },
  ];

  useEffect(() => {
    const fetchCategories = async () => {
      const { categories } = await API.categoryService.getCategories();
      setCategories(categories);
    };

    fetchCategories();
  });

  const onDeleteHandler = (category) => {};

  const onClickEdit = (category) => {};

  const renderCategoryRow = (category) => {
    return (
      <>
        {columns.map((column) => (
          <Grid>
            {column.name ? (
              category[column.name]
            ) : (
              <>
                <Button
                  variant='outlined'
                  size='small'
                  color='primary'
                  className={classes.actionBtn}
                  onClick={() => onDeleteHandler(category)}
                >
                  <BiTrash />
                </Button>
                <Button
                  variant='outlined'
                  className={classes.actionBtn}
                  size='small'
                  color='secondary'
                  onClick={() => onClickEdit(category)}
                >
                  <BiPencil />
                </Button>
              </>
            )}
          </Grid>
        ))}
      </>
    );
  };

  return (
    <Box>
      <Box></Box>
      <Paper>
        <TableHeader colums={columns} />
        {categories.map((category) => renderCategoryRow())}
      </Paper>
    </Box>
  );
};

export default CategoryPage;
