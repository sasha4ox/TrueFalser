import React from "react";
import { Link, Route, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import isEmpty from "lodash/isEmpty";

import ChooseLanguage from "../ChooseLanguage/ChooseLanguage";
import Quiz from "../Quiz/Quiz";

import "./Main.scss";
import property from "lodash/property";

function Main() {
  const dispatch = useDispatch();
  const userData = useSelector(property("authorization.userData"));
  return (
    <div>
      <Route exact path="/select-language">
        {/* {!isEmpty(userData) ? <ChooseLanguage /> : <Redirect to="/" />} */}
        <ChooseLanguage />
      </Route>
      <Route path={["/quiz", "/quiz/:id"]} component={Quiz} />
      {/*<ChooseLanguage/>*/}
    </div>
  );
}
export default Main;
