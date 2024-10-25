import { pushSnackbar } from "../../ui/actions";
import {
  SET_ANSWERS,
  UPDATE_ANSWER,
  DELETE_ANSWER,
  VOTE_ANSWER,
} from "../types";
import * as API from "../../../services/api";

export const getAnswers = (questionID) => {
  return async (dispatch) => {
    try {
      const { answers } = await API.answerService.getAnswers(questionID);

      dispatch(setAnswers(answers));
    } catch (error) {}
  };
};
export const getReferencedAnswers = (activeWikiId) => {
  return async (dispatch) => {
    try {
      const { answers } = await API.answerService.getReferencedAnswers(
        activeWikiId
      );
      dispatch(setAnswers(answers));
    } catch (error) {}
  };
};

const setAnswers = (answers) => ({
  type: SET_ANSWERS,
  payload: {
    answers,
  },
});

export const postAnswer = (
  questionID,
  userID,
  content,
  isMdAssigned,
  mdReviewed
) => {
  return async (dispatch) => {
    try {
      await API.answerService.postAnswer(
        questionID,
        userID,
        content,
        isMdAssigned,
        mdReviewed
      );

      dispatch(pushSnackbar("Your answer is posted", "success"));
      dispatch(getAnswers(questionID));
    } catch {
      dispatch(
        pushSnackbar("Sorry, can't post your answer. Please try again", "error")
      );
    }
  };
};

export const postReference = (questionId, userID, books) => {
  return async (dispatch) => {
    try {
      await API.questionService.postReference(questionId, userID, books);
      dispatch(pushSnackbar("You referenced books", "success"));
      // dispatch(getReferences(questionId));
    } catch {
      pushSnackbar("Sorry, can't reference books. Please try again", "error");
    }
  };
};

export const postReferenceAnswer = (answerId, userID, books) => {
  return async (dispatch) => {
    try {
      await API.answerService.postReferenceAnswer(answerId, userID, books);
      dispatch(pushSnackbar("You referenced books", "success"));
      // dispatch(getReferences(questionId));
    } catch {
      pushSnackbar("Sorry, can't reference books. Please try again", "error");
    }
  };
};
export const deleteAnswerReference = (answerId, userID, activeWikiId) => {
  return async (dispatch) => {
    try {
      await API.answerService.deleteAnswerReference(
        answerId,
        userID,
        activeWikiId
      );
      dispatch(pushSnackbar("You deleted a referenced answer", "success"));
      // dispatch(getReferences(questionId));
    } catch {
      pushSnackbar("Sorry, can't reference books. Please try again", "error");
    }
  };
};
/**
 * 



 *
 * @param {String} answerID
 * @param {String} userID
 * @param {Number} vote 1 | 0 | -1
 */
export const voteAnswer = (answerID, userID, vote) => {
  return async (dispatch) => {
    try {
      const { answer } = await API.answerService.voteAnswer(
        answerID,
        userID,
        vote
      );

      dispatch(updateAnswerVote(answer));
    } catch (error) {
      dispatch(pushSnackbar("Can not vote the ansewr", "error"));
    }
  };
};

const updateAnswerVote = (answer) => ({
  type: VOTE_ANSWER,
  payload: {
    answer,
  },
});

export const updateAnswer = (answerID, content, isShow) => {
  return async (dispatch) => {
    try {
      const { updated_answer } = await API.answerService.updateAnswer(
        answerID,
        content,
        isShow
      );

      dispatch(changeAnswer(updated_answer));
      dispatch(pushSnackbar("Updated the Answer", "success"));
    } catch (error) {
      dispatch(pushSnackbar(error, "error"));
    }
  };
};

const changeAnswer = (answer) => ({
  type: UPDATE_ANSWER,
  payload: {
    answer,
  },
});

export const deleteAnswer = (answerID) => {
  return async (dispatch) => {
    try {
      await API.answerService.deleteAnswer(answerID);
      dispatch(removeDeletedAnswer(answerID));

      dispatch(pushSnackbar("Deleted answer", "success"));
    } catch (error) {
      dispatch(pushSnackbar("Can not delete the Answer", "error"));
    }
  };
};

const removeDeletedAnswer = (answerID) => ({
  type: DELETE_ANSWER,
  payload: {
    answerID,
  },
});
