import React, { useState, forwardRef } from "react";
import {
  Box,
  Typography,
  TextField,
  makeStyles,
  Button,
} from "@material-ui/core";
import Editor from "app/main/shared-components/Editor";
import useAuth from "app/hooks/useAuth";

const useStyles = makeStyles((theme) => ({
  inputTitle: {
    marginBottom: 4,
  },
  actions: {},
  actionBtn: {
    marginLeft: "20px",
    color: theme.palette.text.white,
  },
}));

const WikiQuizForm = forwardRef(
  (
    {
      qTitle,
      qContent,
      onUpdateQuiz,
      onCancelQuiz,
      editFlag,
      setQTitle,
      setQContent,
      id,
    },
    ref
  ) => {
    const classes = useStyles();
    const { isMd, isAdmin } = useAuth();
    const [title, setTitle] = useState(qTitle[id] || "");
    const [content, setContent] = useState(qContent[id] || "");
    const onChangeTitle = (e) => {
      setTitle(e.target.value);
      qTitle[id] = title;
      setQTitle({ ...qTitle });
    };
    const onChangeContent = (value) => {
      setContent(value);
      qContent[id] = value;
      setQContent({ ...qContent });
    };
    return (
      <Box pt={2} px={2} borderColor="border.primary">
        <Box mb={1} display="flex" justifyContent="space-between">
          {editFlag === "new" && (
            <Typography variant="h6" component="h6" color="secondary">
              New Question
            </Typography>
          )}
          {editFlag === "edit" && (
            <Typography variant="h6" component="h6" color="secondary">
              Edit Question
            </Typography>
          )}
          {editFlag === "new" && (
            <Box className={classes.actions}>
              <Button
                variant="contained"
                color="secondary"
                mr={2}
                className={classes.actionBtn}
                // disabled={!title || !content}
                onClick={() => onUpdateQuiz({ title, content })}
              >
                Save
              </Button>
              <Button
                variant="contained"
                color="primary"
                ml={2}
                className={classes.actionBtn}
                onClick={onCancelQuiz}
              >
                Cancel
              </Button>
            </Box>
          )}
        </Box>
        <TextField
          variant="outlined"
          size="small"
          name="title"
          type="text"
          onChange={onChangeTitle}
          onBlur={onChangeTitle}
          value={title}
          placeholder="Question Title"
          className={classes.inputTitle}
          autoComplete="off"
          required
        />
        <Editor
          id={id}
          ref={ref}
          onlyText={!isMd || !isAdmin}
          content={content}
          onChangeContent={onChangeContent}
          placeholder="Question Content"
        />
      </Box>
    );
  }
);

WikiQuizForm.defaultProps = {
  editFlag: "new",
  qTitle: "",
  qContent: "",
};

export default WikiQuizForm;
