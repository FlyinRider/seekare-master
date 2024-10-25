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
    display:'block',
    margin: "16px 0px",
    width: "100%",
  },
  paper: {
    width: 250,
    height: 230,
    overflow: "auto",
  },
  button: {
    margin: '0 auto',
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
  answerId,
  userID
}) {
  const classes = useStyles();
  const [checked, setChecked] = useState([]);
  const [right, setRight] = useState([]);
  const [left, setLeft] = useState([]);
  const [checkedStatus, setCheckedStatus] = useState({});

  useEffect(() => {
    const excludes = not(
      categories.map((c) => c._id),
      myCategories.map((c) => c._id)
    );
    setLeft(getGroupsByIds(excludes, categories));

    console.log(
      `excludes`,
      myCategories,
      categories,
      getGroupsByIds(myCategories, categories)
    );
    setRight(myCategories);
    myCategories.map(item => checkedStatus[item._id] = true)
    setCheckedStatus({...checkedStatus});
  }, [categories, myCategories]);

  const leftChecked = intersection(
    checked,
    left.map((i) => i._id)
  );
  const rightChecked = intersection(
    checked,
    right.map((v) => v._id)
  );

  const handleToggle = (item) => () => {
    if(checkedStatus[item._id] == true) {
      checkedStatus[item._id] = false;
      let temp = []
      for(let i = 0; i < right.length; i++){
        if(right[i]._id !== item._id) {
          temp.push(right[i])
        }
      }
      setCheckedStatus({...checkedStatus})
      setRight([...temp]);
    }
    else {
      checkedStatus[item._id] = true;
      right.push(item)
      setCheckedStatus({...checkedStatus})
      setRight([...right])
    }
  };
  
  const hanleClick = (id) => {
    for(let i = 0 ; i < left.length; i++) {
      if(left[i]._id === id) right.push(left[id])
    }
  }

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
    // setChecked(not(checked, leftChecked));
  };
  // handleCheckedRight();
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

  const customList = (categories, right, title) => (
    <div>
      <Typography>{title}</Typography>
      <Paper className={classes.paper}>
        <List dense component="div" role="list">
          {categories.map((item) => {
            const labelId = `transfer-list-item-${item._id}-label`;
            return (
              <ListItem
                key={item._id}
                role="listitem"
                button
                onClick={handleToggle(item)}
              >
                <ListItemIcon>
                  <Checkbox
                    checked={checkedStatus[item._id] == undefined? false : checkedStatus[item._id]}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={item.title} />
              </ListItem>
            );
          })}
          {/* {rights.map(({ _id, title }) => {
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
                    checked={true}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={title} />
              </ListItem>
            );
          })} */}
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
        {customList(categories,right)}

        <Box
          display="flex"
          justifyContent="flex-end"
          className={classes.action}
          mt={6}
        >
          {/* <Button
            variant="contained"
            color="secondary"
            onClick={() => onDeleteCategories(leftChecked)}
          >
            <DeleteOutlinedIcon />
            Delete
          </Button> */}
        </Box>
      </Grid>
      {/* <Grid item>
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
      </Grid> */}
      <Grid item>
        {/* {customList(right, "Referenced Book")} */}
        <Box
          display="flex"
          justifyContent="flex-end"
          className={classes.action}
          mt={2}
        >
          <Button
            variant="contained"
            color="secondary"
            onClick={() => onSaveCategories(answerId, userID, right)}
            style={{margin:'0 auto'}}
          >
            <SaveOutlinedIcon />
            Save
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}
