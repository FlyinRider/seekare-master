import {
  SET_LOADING,
  SET_QUESTIONS,
  EMPTY_QUESTIONS,
  UPDATE_QUESTIONS,
  VOTE_QUESTIONS,
  SET_SEARCH_TERM,
  FETCH_QUESTION_CATEGOREIS_SUCCESS,
  FETCH_QUESTION_CATEGOREIS_FAILED,
  FETCH_SIMILAR_QUESTIONS_SUCCESS,
} from "./../types";

const initialState = {
  questions: [],
  page: 1,
  perpage: 10,
  total: 5,
  sorting: "latest",
  totalQs: 0,
  queries: [],
  searchHistory: [],
  similars: {
    title: "",
    candidates: [],
  },
  searchTerm: "",
  isLoading: false,
};

const questionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        isLoading: action.payload.isLoading,
      };
    case EMPTY_QUESTIONS:
      return {
        ...state,
        questions: [],
      };
    case SET_QUESTIONS:
      return {
        ...state,
        questions: action.payload.questions,
        page: action.payload.page,
        perpage: action.payload.perpage,
        total: action.payload.total,
        sorting: action.payload.sorting,
        totalQs: action.payload.totalQs,
        queries: action.payload.queries,
        isLoading: false,
      };
    case VOTE_QUESTIONS: {
      const { question, currentQuestions } = action.payload;
      // console.log("VOTE_", question);
      const updated_questions = currentQuestions;
      const index = updated_questions.findIndex(
        (item) => item._id === question._id
      );

      updated_questions[index]["likes"] = question["likes"];
      updated_questions[index]["dislikes"] = question["dislikes"];
      return {
        ...state,
        questions: [...updated_questions],
      };
    }
    case UPDATE_QUESTIONS:
      const { question } = action.payload;
      const updated_questions = state.questions;
      const index = updated_questions.findIndex(
        (item) => item._id === question._id
      );

      updated_questions[index]["mdAssigned"] = question["mdAssigned"];

      return {
        ...state,
        questions: [...updated_questions],
      };
    case SET_SEARCH_TERM:
      return {
        ...state,
        page: action.payload.page,
        searchTerm: action.payload.searchTerm,
        questions: [],
      };

    case FETCH_QUESTION_CATEGOREIS_SUCCESS:
      return {
        ...state,
        categories: action.payload,
      };

    case FETCH_QUESTION_CATEGOREIS_FAILED:
      return {
        ...state,
        categories: [],
      };
    case FETCH_SIMILAR_QUESTIONS_SUCCESS: {
      return {
        ...state,
        similars: action.payload,
      };
    }
    default:
      return state;
  }
};

export default questionReducer;
