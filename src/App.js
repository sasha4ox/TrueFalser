import React, { memo, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import property from 'lodash/property';
import { Switch, Route, Redirect } from 'react-router-dom';

import { getAllLanguagesStatistic } from './actions/statistic';
import Main from './components/Main/Main';
import Authorization from './components/Authorization';
import ParseUrlPage from './components/ParseUrlPage';

import './App.scss';

function App() {
  const dispatch = useDispatch();
  const userData = useSelector(property('authorization.userData'));
  // const googleUrl = useSelector(property("authorization.googleUrl"));
  const allLanguagesStatistic = useSelector(
    property('statistic.allLanguagesAnswersStatistic'),
  );
  useEffect(() => {
    if (isEmpty(allLanguagesStatistic)) {
      dispatch(getAllLanguagesStatistic());
    }
  }, [allLanguagesStatistic, dispatch]);
  return (
    <div className="app">
      <Switch>
        <Route path="/callback/google">
          <ParseUrlPage chosenAuthorizationUrl="google" />
        </Route>
        <Route path="/callback/facebook">
          <ParseUrlPage chosenAuthorizationUrl="facebook" />
        </Route>
        <Route component={Authorization} path={['/login', '/registration']} />
        <Route
          component={Main}
          path={[
            '/select-language',
            '/quiz',
            '/result',
            '/statistic/all-languages-answers',
          ]}
        />
        <Route
          path="/"
          render={() => (!isEmpty(userData) ? (
            <Redirect to="/select-language" />
          ) : (
            <Redirect to="/login" />
          ))}
        />
      </Switch>
    </div>
  );
}

export default memo(App);
