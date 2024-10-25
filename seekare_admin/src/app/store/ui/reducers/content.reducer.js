import * as ActionTypes from "./../types";

const intialState = {
  activeContent: '',
  isTourRun: false,
  step: 0,
};

export const contentReducer = (state = intialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_ACTIVE_CONTENT:
      return {
        ...state,
        activeContent: action.payload,
      };
    case ActionTypes.SET_IS_RUN_TOUR:
      return {
        ...state,
        isTourRun: action.payload.isTourRun,
        step: action.payload.step,
      };
    default:
      return state;
  }
};
