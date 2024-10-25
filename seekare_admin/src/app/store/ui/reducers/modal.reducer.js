import * as ActionTypes from "./../types";

const intialState = {
  open: false,
  modalType: null,
  modalProps: null,
};

const modalReducer = (state = intialState, action) => {
  switch (action.type) {
    case ActionTypes.OPEN_MODAL:
      return {
        ...state,
        open: true,
        modalType: action.payload.modalType,
        modalProps: action.payload.modalProps,
      };
    case ActionTypes.CLOSE_MODAL:
      return {
        ...state,
        open: false,
        modalType: null,
        modalProps: null,
      };
    default:
      return state;
  }
};

export default modalReducer;
