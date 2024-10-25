import { combineReducers } from "redux";
import modalReducer from "./modal.reducer";
import snackbarReducer from "./snackbar.reduer";
import { contentReducer } from "./content.reducer";

const uiReducer = combineReducers({
  modal: modalReducer,
  snackbar: snackbarReducer,
  content: contentReducer,
});

export default uiReducer;
