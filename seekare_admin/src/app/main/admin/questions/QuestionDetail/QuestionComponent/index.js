import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Box,
  Button,
  Chip,
  IconButton,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { Autocomplete, Skeleton } from "@material-ui/lab";
import { BiEdit } from "react-icons/bi";

import Editor from "app/main/shared-components/Editor";
import CustomButton from "app/main/shared-components/Button";
import * as API from "app/services/api";
import useSafeDispatch from "app/hooks/useSafeDispatch";
import { pushSnackbar } from "app/store/ui/actions";
import useAuth from "app/hooks/useAuth";

const useStyles = makeStyles({
  root: {
    padding: "0.5rem",
    position: "relative",
  },
});

const QuestionComponent = ({ question, onUpdateQuestion }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const safeDispatch = useSafeDispatch(dispatch);
  const [isEdit, setIsEdit] = useState(false);
  const [title, setTitle] = useState(() => question.title);
  const [content, setContent] = useState(() => question.content);
  const { isMd, isAdmin } = useAuth();

  const [tags, setTags] = useState(() => {
    return question.tags;
  });
  const tags_from_db = useSelector((state) => state.tag.tags);

  const onClickEditQuestion = () => {
    setIsEdit(true);
  };

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const onChangeContent = (value) => {
    setContent(value);
  };

  const discardForm = () => {
    setTitle(question.title);
    setContent(question.content);
    setIsEdit(false);
  };

  const handleChangeTags = (value) => {
    setTags(value);
  };

  const onClickHandler = async () => {
    const res = await API.questionService.update(question._id, {
      title,
      content,
      tags,
    });

    safeDispatch(pushSnackbar("Updated Question", "success"));

    onUpdateQuestion(res.updated_question);
    setIsEdit(false);
  };

  return (
    <Paper className={classes.root}>
      {!isEdit ? (
        <Box position="absolute" top="0.5rem" right="0">
          <IconButton onClick={onClickEditQuestion}>
            <BiEdit />
          </IconButton>
        </Box>
      ) : (
        <Box display="flex" alignItems="center" justifyContent="flex-end">
          <CustomButton type="submit" size="sm" onClick={onClickHandler}>
            Update Question
          </CustomButton>
          &nbsp;
          <Button
            type="reset"
            variant="outlined"
            color="secondary"
            size="small"
            onClick={discardForm}
          >
            Cancel
          </Button>
        </Box>
      )}

      {!isEdit ? (
        <React.Fragment>
          {question ? (
            <Typography component="h1" variant="h6">
              {question.title}
            </Typography>
          ) : (
            <Skeleton animation="wave" />
          )}

          {question ? (
            <Box dangerouslySetInnerHTML={{ __html: question.content }} />
          ) : (
            <Skeleton variant="text" />
          )}
          <Box>
            {question &&
              question.tags.map((tagItem) => (
                <Chip
                  key={tagItem.title}
                  clickable
                  className={classes.tagItem}
                  label={tagItem.title}
                />
              ))}
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Box className={classes.root}>
            <Box className={classes.title}>
              <Typography variant="h6" component="h2">
                Title
              </Typography>
              <Typography component="p" variant="body1" className="description">
                Be specific and imagine you’re asking a question to another
                person
              </Typography>
              <TextField
                fullWidth
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
                content={content}
                onlyText={!isMd || !isAdmin}
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
                getOptionSelected={(option, value) =>
                  option.title === value.title
                }
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
          </Box>
        </React.Fragment>
      )}
    </Paper>
  );
};

export default QuestionComponent;
