import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import property from 'lodash/property';
import isEmpty from 'lodash/isEmpty';

import Login from './components/login/Login';
import Registration from './components/registration/Registration';
import { getGoogleAuthorizationUrl } from '../../actions/authorization';

function Authorization() {
  const dispatch = useDispatch();
  const userData = useSelector(property('authorization.userData'));
  const googleUrl = useSelector(property('authorization.googleUrl'));
  useEffect(() => {
    if(isEmpty(googleUrl)) {
       dispatch(getGoogleAuthorizationUrl());
    }
  }, [dispatch, googleUrl]);
  return (
    <div>
      <Route exact path="/login">
          {!isEmpty(userData) ? <Redirect to="/"/> : <Login googleUrl={googleUrl} />}
      </Route>
      <Route exact path="/registration">
          {!isEmpty(userData) ? <Redirect to="/"/> : <Registration googleUrl={googleUrl} />}
          {/*<Registration googleUrl={googleUrl} />*/}
      </Route>
    </div>
  );
}

export default Authorization;