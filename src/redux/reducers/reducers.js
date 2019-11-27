import { combineReducers } from "redux";
import customComponentsReducer from "./customComponentsReducer";
import datatableReducer from "./datatableReducer";
import notifierReducer from "./notifierReducer";
import textReducer from "./textReducer";

export default combineReducers({
  datatableReducer,
  customComponentsReducer,
  notifierReducer,
  textReducer
});
