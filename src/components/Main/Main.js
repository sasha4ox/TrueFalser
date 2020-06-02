import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import property from 'lodash/property';

import ChooseLanguage from '../ChooseLanguage/ChooseLanguage';
import Quiz from '../Quiz/Quiz';
import Result from '../Result/Result';
import AllLanguagesAnswersStatistic from '../AllLanguagesAnswersStatistic';

import './Main.scss';

function Main() {
  const userData = useSelector(property('authorization.userData'));
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
      <Route path="/statistic/all-languages-answers">
        <AllLanguagesAnswersStatistic />
      </Route>
    </div>
  );
}
export default Main;
