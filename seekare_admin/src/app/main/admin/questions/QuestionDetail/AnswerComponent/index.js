import React, { useState } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { Box, Button, IconButton, makeStyles, Paper } from "@material-ui/core";
import { RiDeleteBin7Line, RiEdit2Line } from "react-icons/ri";

import CustomButton from "app/main/shared-components/Button";
import Editor from "app/main/shared-components/Editor";
import useSafeDispatch from "app/hooks/useSafeDispatch";
import { updateAnswer } from "app/store/answer/actions";
import useAuth from "app/hooks/useAuth";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "10px 0",
    padding: "0.2rem",
    position: "relative",
    borderColor: (props) => theme.palette[props.variant].main,
    "&:hover $editBtn": {
      opacity: 1,
    },
  },
  editBtn: {
    position: "absolute",
    top: 0,
    right: 0,
    opacity: 0,
    transition: "opacity 0.3s ease-in-out",
  },
}));

const AnswerComponent = ({ answer, onClickDeleteAnswer, variant }) => {
  const classes = useStyles({ variant });
  const { isMd, isAdmin } = useAuth();
  const dispatch = useDispatch();
  const safeDispatch = useSafeDispatch(dispatch);

  const [content, setContent] = useState(() => answer.content);
  const [isEdit, setIsEdit] = useState(false);

  const onClickEditAnswer = () => {
    setIsEdit(true);
  };

  const discardForm = () => {
    setContent(answer.content);
    setIsEdit(false);
  };

  const onClickUpdate = () => {
    safeDispatch(updateAnswer(answer._id, content));

    setIsEdit(false);
  };

  const onChangeContent = (value) => {
    setContent(value);
  };

  return (
    <Paper className={classes.root} key={answer._id} variant="outlined" square>
      {!isEdit ? (
        <Box
          position="absolute"
          top="0.5rem"
          right="0"
          display="flex"
          className={classes.editBtn}
        >
          <IconButton onClick={onClickDeleteAnswer}>
            <RiDeleteBin7Line />
          </IconButton>
          <IconButton onClick={onClickEditAnswer}>
            <RiEdit2Line />
          </IconButton>
        </Box>
      ) : (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
          padding="0.2rem 0"
        >
          <CustomButton
            type="submit"
            size="sm"
            onClick={onClickUpdate}
            color="secondary"
          >
            Update Answer
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

      {isEdit ? (
        <Editor
          onlyText={!isMd || !isAdmin}
          content={content}
          onChangeContent={onChangeContent}
        />
      ) : (
        <Box
          padding="1rem"
          dangerouslySetInnerHTML={{ __html: answer.content }}
        />
      )}
    </Paper>
  );
};

AnswerComponent.propTypes = {
  answer: PropTypes.object,
  onClickDeleteAnswer: PropTypes.func,
  variant: PropTypes.oneOf(["primary", "secondary"]),
};

AnswerComponent.defaultProps = {
  answer: {},
  onClickDeleteAnswer: () => {},
  variant: "secondary",
};

export default AnswerComponent;
