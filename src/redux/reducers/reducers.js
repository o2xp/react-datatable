import { combineReducers } from "redux";
import componentReducer from "./componentReducer";
import datatableReducer from "./datatableReducer";

export default combineReducers({
  datatableReducer,
  componentReducer
});
