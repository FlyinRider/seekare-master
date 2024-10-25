import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import {
  Box,
  Button,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";

import { closeModal } from "app/store/ui/actions";
import useSafeDispatch from "app/hooks/useSafeDispatch";
import CustomButton from "../Button";
import Editor from "../Editor";
import useAuth from "app/hooks/useAuth";

const useStyles = makeStyles({
  root: {
    padding: "1rem 2rem",
    backgroundColor: "white",
  },
  header: {
    marginBottom: "1rem",
  },
  askForm: {
    padding: "1rem",
    minHeight: "60vh",
    "& p.description": {
      margin: "0 0 1rem",
    },
  },
  title: {
    marginBottom: "2rem",
  },
  inputTitle: {
    width: "100%",
  },
  content: {
    marginBottom: "2rem",
  },
  quillEditor: {
    borderRadius: "0.5rem",
    "& .ql-container": {
      minHeight: "15rem",
      maxHeight: "15rem",
      overflow: "hidden auto",
    },
    "& .ql-editor": {
      "& p": {
        minHeight: "5rem",
      },
    },
  },
  tags: {},
  action: {
    padding: "1rem 0",
    "& button": {
      marginRight: "1rem",
    },
  },
  tipsSection: {
    padding: "3rem 2rem",
  },
  tipsPaper: {
    padding: "2rem 1rem",
    backgroundColor: "#e6e38a",
  },
});

const EditQuestionModal = ({ question, updateQuestion }) => {
  const dispatch = useDispatch();
  const safeDispatch = useSafeDispatch(dispatch);
  const { isMd, isAdmin } = useAuth();
  const classes = useStyles();
  const [title, setTitle] = useState(() => {
    return question.title;
  });
  const [content, setContent] = useState(() => {
    return question.content;
  });
  const [tags, setTags] = useState(() => {
    return question.tags;
  });

  const tags_from_db = useSelector((state) => state.tag.tags);

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const onChangeContent = (value) => {
    setContent(value);
  };

  const handleChangeTags = (value) => {
    const newValue = value.map((item) => {
      if (typeof item === "string") {
        item = {
          title: item,
        };
      }

      return item;
    });

    setTags((prev) => (newValue.length < 6 ? newValue : prev));
  };

  const discardForm = () => {
    safeDispatch(closeModal());
  };

  const onClickHandler = () => {
    updateQuestion({
      title,
      content,
      tags,
    });
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.title}>
        <Typography variant="h6" component="h2">
          Title
        </Typography>
        <Typography component="p" variant="body1" className="description">
          Be specific and imagine you’re asking a question to another person
        </Typography>
        <TextField
          variant="outlined"
          size="small"
          name="title"
          type="text"
          onChange={onChangeTitle}
          value={title}
          placeholder="e.g. Why is Covid is so dangerous?"
          className={classes.inputTitle}
        />
      </Box>
      <Box className={classes.content}>
        <Typography variant="h6" component="h2">
          Details
        </Typography>
        <Typography component="p" variant="body1" className="description">
          Include any details that might help us answer your question
        </Typography>
        <Editor
          onlyText={!isMd || !isAdmin}
          content={content}
          onChangeContent={onChangeContent}
        />
      </Box>
      <Box className={classes.tags}>
        <Typography variant="h6" component="h2">
          Tags
        </Typography>
        <Typography className="description">
          Add up to 5 tags to describe what your question is about
        </Typography>
        <Autocomplete
          multiple
          filterSelectedOptions
          size="small"
          id="tags-outlined"
          value={tags}
          options={tags_from_db}
          freeSolo
          getOptionSelected={(option, value) => option.title === value.title}
          getOptionLabel={(option) => option.title}
          renderInput={(params) => (
            <TextField
              {...params}
              label={""}
              variant="outlined"
              placeholder="Tags"
              helperText={
                tags.length > 4
                  ? "Reached limit of tags, to add new one , please remove another"
                  : ""
              }
            />
          )}
          onChange={(e, value) => handleChangeTags(value)}
        />
      </Box>
      <Box className={classes.action}>
        <CustomButton
          variant="contained"
          type="submit"
          size="md"
          color="secondary"
          onClick={onClickHandler}
        >
          Update Question
        </CustomButton>
        <Button
          type="reset"
          variant="outlined"
          color="secondary"
          onClick={discardForm}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

EditQuestionModal.propTypes = {
  question: PropTypes.object.isRequired,
  updateQuestion: PropTypes.func.isRequired,
};

EditQuestionModal.defaultProps = {
  updateQuestion: () => {},
};

export default EditQuestionModal;
