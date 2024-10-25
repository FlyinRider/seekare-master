import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Button,
  Dialog,
  IconButton,
  Typography,
  withStyles,
  Box,
  Divider,
  Grid,
  TextField,
} from "@material-ui/core";

import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";

import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";

import {
  fetchAllWikiCategories,
  saveWikiCategory,
  updateWikiCategory,
  deleteWikiCategories,
} from "app/store/question/actions";
import TransferList from "./CategoryList";
import { updateWikiCategoryByWikiId } from "app/store/wiki/actions";
import useAuth from "app/hooks/useAuth";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    minWidth: "500px",
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    overflow: "hidden",
  },
}))(MuiDialogContent);

const NewCategorySection = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    width: "100%",
    color: "black",
  },
}))(Grid);

const WikiTagDialog = ({ wikiId, myCategories }) => {
  const [open, setOpen] = useState(false);

  const { isAuthenticated, isAdmin, isMd } = useAuth();
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.question.categories);

  const [categText, setCategText] = useState({ value: "", id: "" });

  useEffect(() => {
    dispatch(fetchAllWikiCategories());
  }, [dispatch]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSaveCategories = (categs) => {
    if (categs.length !== myCategories.length) {
      dispatch(
        updateWikiCategoryByWikiId(
          wikiId,
          categs.map((c) => c._id)
        )
      );
    }
    setOpen(false);
  };

  const handleNewCategory = () => {
    if (categText.value) dispatch(saveWikiCategory(categText.value));
  };

  const handleDeleteCategories = (tagIds) => {
    if (tagIds.length !== 0) {
      dispatch(deleteWikiCategories(tagIds));
    }
  };

  const handleUpdateCategory = () => {
    if (categText.value)
      dispatch(updateWikiCategory(categText.id, categText.value));
  };

  const handleTextFieldChange = (value) => {
    setCategText((t) => ({ ...t, value }));
  };

  return (
    <div style={{ textAlign: "center" }}>
      {isAuthenticated && (isMd || isAdmin) && (
        <Button variant="outlined" color="secondary" onClick={handleClickOpen}>
          Edit Category
          <EditIcon />
        </Button>
      )}
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Edit Categories
        </DialogTitle>

        <DialogContent dividers>
          <NewCategorySection container>
            {categText.id ? (
              <Box display="flex" mb={2}>
                <TextField
                  id="outlined-basic"
                  label="New Category"
                  variant="outlined"
                  size="small"
                  color="secondary"
                  value={categText.value}
                  onChange={(e) => handleTextFieldChange(e.target.value)}
                />
                <Box ml={2}>
                  <Button
                    variant="contained"
                    color="secondary"
                    ml={2}
                    onClick={handleUpdateCategory}
                    disabled={!categText}
                  >
                    <SaveOutlinedIcon />
                    Update
                  </Button>
                </Box>
              </Box>
            ) : (
              <Box display="flex" mb={2}>
                <TextField
                  id="outlined-basic"
                  label="New Category"
                  variant="outlined"
                  size="small"
                  color="secondary"
                  value={categText.value}
                  onChange={(e) => handleTextFieldChange(e.target.value)}
                />
                <Box ml={2}>
                  <Button
                    variant="contained"
                    color="secondary"
                    ml={2}
                    onClick={handleNewCategory}
                    disabled={!categText}
                  >
                    <AddIcon />
                    ADD
                  </Button>
                </Box>
              </Box>
            )}
          </NewCategorySection>
          <Divider />
          <TransferList
            categories={categories || []}
            myCategories={myCategories || []}
            onSaveCategories={handleSaveCategories}
            onDeleteCategories={handleDeleteCategories}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default WikiTagDialog;
