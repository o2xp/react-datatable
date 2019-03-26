import { combineReducers } from "redux";
import counterReducer from "./counterReducer";
import otherReducer from "./otherReducer";

export default combineReducers({
  counterReducer,
  otherReducer
});
