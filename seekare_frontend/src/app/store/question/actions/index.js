import { pushSnackbar } from "../../ui/actions";
import {
  EMPTY_QUESTIONS,
  FETCH_QUESTION_CATEGOREIS_SUCCESS,
  FETCH_SIMILAR_QUESTIONS_SUCCESS,
  SET_LOADING,
  SET_QUESTIONS,
  SET_SEARCH_TERM,
  UPDATE_QUESTIONS,
  VOTE_QUESTIONS,
} from "../types";
import * as API from "app/services/api";

export const postQuestion = (questionData) => {
  return async (dispatch) => {
    try {
      const res = await API.questionService.postQuestion(questionData);
      if (res) {
        dispatch(
          pushSnackbar("Your questions is posted successfully", "success")
        );
      }
    } catch (error) {
      dispatch(
        pushSnackbar("Something went wrong, Please try againg!", "error")
      );
    }
  };
};

export const getQuestions = ({
  searchQuery,
  perPageLimit,
  pageNumber,
  sortingSlug,
  userID,
  recents,
  tags,
  sortBy,
  dir,
}) => {
  return async (dispatch) => {
    try {
      const { questions, perpage, page, total, sorting, totalQs, queries } =
        await API.questionService.getQuestions(
          searchQuery,
          perPageLimit,
          pageNumber,
          sortingSlug,
          userID,
          recents,
          tags,
          sortBy,
          dir
        );

      dispatch({
        type: SET_QUESTIONS,
        payload: {
          questions,
          perpage,
          page,
          total,
          sorting,
          totalQs,
          queries,
        },
      });
    } catch (error) {}
  };
};

export const getSortedQuestions = ({
  slug,
  tab,
  q,
  qSetting,
  perpage,
  page,
  userID,
  tags,
  activeWikiId,
}) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADING, payload: { isLoading: true } });
    try {
      const {
        questions,
        perpage: limit,
        page: pageNum,
        total,
        totalQs,
      } = await API.questionService.getSortedQuestions({
        slug,
        tab,
        q,
        qSetting,
        perpage,
        page,
        userID,
        tags,
        activeWikiId,
      });
      dispatch({
        type: SET_QUESTIONS,
        payload: {
          questions: questions && questions[0]?.data ? questions[0]?.data : [],
          perpage: limit,
          page: pageNum,
          total,
          sorting: slug,
          totalQs,
          queries: q,
        },
      });
    } catch (e) {
      dispatch({ type: SET_LOADING, payload: { isLoading: false, page: 0 } });
      throw new Error(e);
    }
  };
};

export const emptyQuestion = () => {
  return async (dispatch) => dispatch({ type: EMPTY_QUESTIONS });
};

export const deleteQuestion = (questionID) => {
  return async (dispatch) => {
    try {
      await API.questionService.deleteQuestion(questionID);

      dispatch(pushSnackbar("Succesfully Deleted", "success"));

      dispatch(getQuestions({}));
    } catch (error) {
      dispatch(
        pushSnackbar("Something went wrong, Please try againg!", "error")
      );
    }
  };
};

export const setBannedQuestion = (questionID, bannedStatus) => {
  return async (dispatch) => {
    try {
      await API.questionService.setBannedQuestion(questionID, bannedStatus);

      dispatch(
        pushSnackbar(
          bannedStatus ? "Banned the question" : "Permitted the Question",
          "success"
        )
      );

      dispatch(getQuestions({}));
    } catch (error) {
      dispatch(pushSnackbar("Failed", "error"));
    }
  };
};

export const setStatus = (questionID, status) => {
  return async (dispatch) => {
    try {
      await API.questionService.setStatus(questionID, status);

      dispatch(pushSnackbar(`Success updating status: ${status}`, "success"));

      dispatch(getQuestions({}));
    } catch (error) {
      dispatch(pushSnackbar("Failed", "error"));
    }
  };
};

export const assignMD = (questionID, md) => {
  return async (dispatch) => {
    try {
      const { question } = await API.questionService.assignMd(questionID, md);
      dispatch(updateQuestions(question));
    } catch (error) {
      const { message } = error;
      dispatch(pushSnackbar(message, "error"));
    }
  };
};

const updateQuestions = (question) => ({
  type: UPDATE_QUESTIONS,
  payload: {
    question,
  },
});

// export const voteOn = (questionID, userID, vote, setQuestion) => {
//   return async (dispatch) => {
//     try {
//       const { question } = await API.questionService.vote(
//         questionID,
//         userID,
//         vote
//       );
//       console.log(
//         "questionID",
//         questionID,
//         userID,
//         "userID",
//         "vote",
//         vote,
//         question
//       );
//       dispatch(voteQuestions(question));
//     } catch (error) {
//       const { message } = error;
//       console.log("Question:error", error);
//       dispatch(pushSnackbar(message, "error"));
//     }
//   };
// };

export const voteQuestions = (question, currentQuestions) => ({
  type: VOTE_QUESTIONS,
  payload: {
    question,
    currentQuestions,
  },
});

export const deleteReference = (questionId, userID, activeWikiId) => {
  return async (dispatch) => {
    try {
      await API.questionService.deleteReference(
        questionId,
        userID,
        activeWikiId
      );
      dispatch(pushSnackbar("You deleted a Referenced Book", "success"));
      // dispatch(getReferences(questionId));
    } catch {
      pushSnackbar("Sorry, can't reference books. Please try again", "error");
    }
  };
};

export const getQuestionsAnswered = ({ userID }) => {
  return async (dispatch) => {
    try {
      const { questions, totalQs } =
        await API.questionService.getQuestionsAnswered(userID);

      dispatch({
        type: SET_QUESTIONS,
        payload: {
          questions,
          perpage: 10,
          page: 1,
          total: 1,
          sorting: 1,
          totalQs,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const setSearchTerm = (searchTerm) => ({
  type: SET_SEARCH_TERM,
  payload: {
    searchTerm,
    page: 0,
  },
});

const fetchAllWikiCategoriesSuccess = (payload) => ({
  type: FETCH_QUESTION_CATEGOREIS_SUCCESS,
  payload,
});

const saveAllSimilarQuestion = (payload) => ({
  type: FETCH_SIMILAR_QUESTIONS_SUCCESS,
  payload,
});

export const fetchAllWikiCategories = () => {
  return async (dispatch) => {
    try {
      const categories = await API.questionService.getAllWikiCategoryData();
      dispatch(fetchAllWikiCategoriesSuccess(categories));
    } catch (error) {}
  };
};

export const saveWikiCategory = (title) => {
  return async (dispatch) => {
    try {
      await API.questionService.addWikiCategoryData(title);
      dispatch(fetchAllWikiCategories());
    } catch (error) {}
  };
};

export const updateWikiCategory = (id, title) => {
  return async (dispatch) => {
    try {
      await API.questionService.updatedWikiCategoryData(id, title);
      dispatch(fetchAllWikiCategories());
    } catch (error) {}
  };
};

export const deleteWikiCategories = (tagIds) => {
  return async (dispatch) => {
    try {
      await API.questionService.deleteWikiCategories(tagIds);
      dispatch(fetchAllWikiCategories());
    } catch (error) {}
  };
};

export const findSimilarQuestions = (title) => {
  return async (dispatch) => {
    try {
      const candidates = await API.questionService.getSimilarQuesitons({
        queryTitle: title,
      });

      dispatch(
        saveAllSimilarQuestion({
          title,
          candidates,
        })
      );
    } catch (error) {}
  };
};
