import React from "react";
import { Link, Route, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

import ChooseLanguage from '../ChooseLanguage/ChooseLanguage';
import Quiz from '../Quiz/Quiz';

import "./Main.scss";
import property from "lodash/property";

function Main() {
  const dispatch = useDispatch();
  const userData = useSelector(property('authorization.userData'));
  return (
      <div>
          <Route exact path="/select-language">
              {!isEmpty(userData) ? <ChooseLanguage /> : <Redirect to="/" />}
          </Route>
          <Route path="/quiz">
              <Quiz />
          </Route>
          {/*<ChooseLanguage/>*/}
      </div>
    // <main className="main">
    //   <p>Let's train your brain with awesome app for programmers "TrueFalser"</p>
    //
    //   <Link to="/login">Login</Link>
    //   <Link to="/registration">Registration</Link>
    //   <Link to="/login">Just play</Link>
    // </main>
  );
}
export default Main;
