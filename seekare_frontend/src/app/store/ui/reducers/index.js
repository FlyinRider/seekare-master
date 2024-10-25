import { combineReducers } from "redux";
import modalReducer from "./modal.reducer";
import responsiveReducer from "./responsive.reducer";
import snackbarReducer from "./snackbar.reduer";
import { contentReducer } from "./content.reducer";

const uiReducer = combineReducers({
  modal: modalReducer,
  snackbar: snackbarReducer,
  content: contentReducer,
  responsive: responsiveReducer,
});

export default uiReducer;
