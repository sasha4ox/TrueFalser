import React from "react";
import { Link, Route, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import isEmpty from "lodash/isEmpty";

import ChooseLanguage from "../ChooseLanguage/ChooseLanguage";
import Quiz from "../Quiz/Quiz";

import "./Main.scss";
import property from "lodash/property";
import Result from "../Result/Result";

function Main() {
  const dispatch = useDispatch();
  const userData = useSelector(property("authorization.userData"));
  return (
    <div>
      <Route exact path="/select-language">
        {!isEmpty(userData) ? <ChooseLanguage /> : <Redirect to="/" />}
      </Route>
      <Route path="/quiz">
        <Quiz />
      </Route>
      <Route path="/result">
        <Result />
      </Route>
    </div>
  );
}
export default Main;
