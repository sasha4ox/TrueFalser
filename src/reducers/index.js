import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import quiz from "./quiz";
import authorization from "./authorization";
import statistic from "./statistic";

export default combineReducers({
  authorization,
  form: formReducer,
  quiz,
  statistic,
});
