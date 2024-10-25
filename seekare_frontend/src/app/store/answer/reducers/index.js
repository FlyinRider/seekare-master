import * as AnswerActionTypes from "./../types";

const initialState = {
  answers: [],
};

const answerReducer = (state = initialState, action) => {
  const answers = state.answers;
  switch (action.type) {
    case AnswerActionTypes.SET_ANSWERS:
      return {
        ...state,
        answers: action.payload.answers,
      };
    case AnswerActionTypes.VOTE_ANSWER:
      const index = answers.findIndex(
        (item) => item._id === action.payload.answer._id
      );
      answers[index].likes = action.payload.answer?.likes;
      answers[index].dislikes = action.payload.answer?.dislikes;

      return {
        ...state,
        answers: JSON.parse(JSON.stringify(answers)),
      };
    case AnswerActionTypes.UPDATE_ANSWER:
      const prevAnswers = state.answers;
      const newIndex = prevAnswers.findIndex(
        (item) => item._id === action.payload.answer._id
      );

      prevAnswers[newIndex].content = action.payload.answer.content;
      prevAnswers[newIndex].isShow = action.payload.answer.isShow;

      return {
        ...state,
        answers: JSON.parse(JSON.stringify(prevAnswers)),
      };
    case AnswerActionTypes.DELETE_ANSWER:
      const i = answers.findIndex(
        (item) => item._id === action.payload.answerID
      );

      answers.splice(i, 1);

      return {
        ...state,
        answers: [...answers],
      };
    default:
      return state;
  }
};

export default answerReducer;
