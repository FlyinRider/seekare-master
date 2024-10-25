import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { Box, Button, makeStyles, Typography } from "@material-ui/core";

import { closeModal } from "app/store/ui/actions";
import Editor from "../Editor";
import CustomButton from "./../Button";
import useAuth from "app/hooks/useAuth";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "20px",
  },
  action: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
}));

const MdResponseModal = ({ mdResponse, onPostAnswer, questionTitle }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { isAdmin, isMd } = useAuth();
  const [content, setContent] = useState(() => {
    return mdResponse || "";
  });

  const onChangeContentHandler = (value) => setContent(value);

  const onClickHandler = () => {
    onPostAnswer(content);
    closeModal();
  };

  const discardForm = () => {
    setContent("");

    dispatch(closeModal());
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.title} py={1}>
        <Typography variant="h6" component="h2">
          {questionTitle || "Question Title"}
        </Typography>
      </Box>
      <Box className={classes.content}>
        <Typography component="p" variant="body1" className="description">
          Please put your kind Answer for this Question
        </Typography>
        <Editor
          content={content}
          onlyText={!isMd || !isAdmin}
          onChangeContent={onChangeContentHandler}
        />
      </Box>
      <Box className={classes.action} py={1}>
        <CustomButton
          type="submit"
          variant="contained"
          size="md"
          color="secondary"
          onClick={onClickHandler}
        >
          Post MD Answer
        </CustomButton>
        &nbsp;
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

MdResponseModal.propTypes = {
  onPostAnswer: PropTypes.func,
  questionTitle: PropTypes.string,
};

MdResponseModal.defaultProps = {
  onPostAnswer: () => {},
  questionTitle: "",
};

export default MdResponseModal;
