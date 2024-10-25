import * as ActionTypes from "../types";

export const setActiveContent = (content) => ({
  type: ActionTypes.SET_ACTIVE_CONTENT,
  payload: content,
});

export const setIsRunTour = (isTourRun, step) => {
  return {
    type: ActionTypes.SET_IS_RUN_TOUR,
    payload: {
      isTourRun,
      step,
    },
  };
};
