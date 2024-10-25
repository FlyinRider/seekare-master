import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { Box } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "16px 0px",
    width: "100%",
  },
  paper: {
    width: 220,
    height: 230,
    overflow: "auto",
  },
  button: {
    margin: theme.spacing(0.5, 0),
  },
  action: {
    width: "100%",
  },
}));

function not(a, b) {
  return a.filter((av) => av && b.findIndex((bv) => av === bv) === -1);
}

function intersection(a, b) {
  return a.filter((av) => av && b.findIndex((bv) => av === bv) !== -1);
}
function getGroupsByIds(nIds, nItems) {
  return nIds
    .map((id) => nItems.find((nItem) => nItem && nItem._id === id))
    .filter((i) => i);
}

export default function TransferList({
  categories,
  myCategories,
  onSaveCategories,
  onDeleteCategories,
}) {
  const classes = useStyles();

  const [checked, setChecked] = useState([]);
  const [right, setRight] = useState([]);
  const [left, setLeft] = useState([]);

  useEffect(() => {
    const excludes = not(
      categories.map((c) => c._id),
      myCategories
    );
    setLeft(getGroupsByIds(excludes, categories));

    console.log(
      `excludes`,
      myCategories,
      categories,
      getGroupsByIds(myCategories, categories)
    );
    setRight(getGroupsByIds(myCategories, categories));
  }, [categories, myCategories]);

  const leftChecked = intersection(
    checked,
    left.map((i) => i._id)
  );
  const rightChecked = intersection(
    checked,
    right.map((v) => v._id)
  );

  const handleToggle = (value) => () => {
    const currentIndex = checked.findIndex((c) => c === value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleAllRight = () => {
    setRight(right.concat(left));
    setLeft([]);
  };

  const handleCheckedRight = () => {
    setLeft(
      getGroupsByIds(
        not(
          left.map((r) => r._id),
          leftChecked
        ),
        left
      )
    );
    setRight(right.concat(getGroupsByIds(leftChecked, left)));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(getGroupsByIds(rightChecked, right)));
    setRight(
      getGroupsByIds(
        not(
          right.map((r) => r._id),
          rightChecked
        ),
        right
      )
    );
    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
  };

  const customList = (items, title) => (
    <div>
      <Typography>{title}</Typography>
      <Paper className={classes.paper}>
        <List dense component="div" role="list">
          {items.map(({ _id, title }) => {
            const labelId = `transfer-list-item-${_id}-label`;

            return (
              <ListItem
                key={_id}
                role="listitem"
                button
                onClick={handleToggle(_id)}
              >
                <ListItemIcon>
                  <Checkbox
                    checked={checked.indexOf(_id) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={title} />
              </ListItem>
            );
          })}
          <ListItem />
        </List>
      </Paper>
    </div>
  );

  return (
    <Grid
      container
      spacing={2}
      justify="center"
      alignItems="center"
      className={classes.root}
    >
      <Grid item>
        {customList(left, "Non-Selected Category")}

        <Box
          display="flex"
          justifyContent="flex-end"
          className={classes.action}
          mt={2}
        >
          <Button
            variant="contained"
            color="secondary"
            onClick={() => onDeleteCategories(leftChecked)}
          >
            <DeleteOutlinedIcon />
            Delete
          </Button>
        </Box>
      </Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleAllRight}
            disabled={left.length === 0}
            aria-label="move all right"
          >
            ≫
          </Button>
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleAllLeft}
            disabled={right.length === 0}
            aria-label="move all left"
          >
            ≪
          </Button>
        </Grid>
      </Grid>
      <Grid item>
        {customList(right, "selected category")}
        <Box
          display="flex"
          justifyContent="flex-end"
          className={classes.action}
          mt={2}
        >
          <Button
            variant="contained"
            color="secondary"
            onClick={() => onSaveCategories(right)}
          >
            <SaveOutlinedIcon />
            Save
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}
