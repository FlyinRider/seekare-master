import * as ActionTypes from "./../types";

const intialState = {
  //   landing: true,
  //   kareBook: false,
  //   kareBookItem: false,
  //   karePost: false,
  //   karePostItem: false,
  //   addPost: false,
  responsiveType: "",
};

const responsiveReducer = (state = intialState, action) => {
  switch (action.type) {
    case ActionTypes.MOBILE_RESPONSIVE:
      return {
        ...state,
        responsiveType: action.payload.responsiveType,
      };
    default:
      return state;
  }
};

export default responsiveReducer;
