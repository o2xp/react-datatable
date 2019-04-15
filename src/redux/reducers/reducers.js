import { combineReducers } from "redux";
import customComponentsReducer from "./customComponentsReducer";
import datatableReducer from "./datatableReducer";

export default combineReducers({
  datatableReducer,
  customComponentsReducer
});
