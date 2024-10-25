import { combineReducers } from "redux";
import authReducer from "./auth.reducer";

const auth = combineReducers({
  auth: authReducer,
});

export default auth;
