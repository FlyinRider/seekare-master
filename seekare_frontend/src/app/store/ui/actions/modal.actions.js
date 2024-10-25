import * as ActionTypes from "./../types";

export const openModal = (modalType, modalProps) => ({
  type: ActionTypes.OPEN_MODAL,
  payload: { modalType, modalProps },
});

export const closeModal = () => ({
  type: ActionTypes.CLOSE_MODAL,
});
