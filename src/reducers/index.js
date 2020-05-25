import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import quiz from "./quiz";
import authorization from "./authorization";

export default combineReducers({
  authorization,
  form: formReducer,
  quiz,
});
