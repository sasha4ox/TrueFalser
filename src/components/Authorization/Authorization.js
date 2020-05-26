import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import property from 'lodash/property';
import isEmpty from 'lodash/isEmpty';

import Login from './components/login/Login';
import Registration from './components/registration/Registration';
import {
    getGoogleAuthorizationUrl,
    getFacebookAuthorizationUrl,
} from '../../actions/authorization';

function Authorization() {
  const dispatch = useDispatch();
  const userData = useSelector(property('authorization.userData'));
  const googleUrl = useSelector(property('authorization.googleUrl'));
  const facebookUrl = useSelector(property('authorization.facebookUrl'));
  useEffect(() => {
    if(isEmpty(googleUrl)) {
       dispatch(getGoogleAuthorizationUrl());
    }
  }, [dispatch, googleUrl]);
  useEffect(() => {
      if(isEmpty(googleUrl)) {
          dispatch(getFacebookAuthorizationUrl());
      }
  }, [dispatch, googleUrl]);
  return (
    <div>
      <Route exact path="/login">
          {!isEmpty(userData)
              ? <Redirect to="/"/>
              : <Login
                  googleUrl={googleUrl}
                  facebookUrl={facebookUrl}
              />}
      </Route>
      <Route exact path="/registration">
          {!isEmpty(userData)
              ? <Redirect to="/"/>
              : <Registration
                  googleUrl={googleUrl}
                  facebookUrl={facebookUrl}
              />}
          {/*<Registration googleUrl={googleUrl} />*/}
      </Route>
    </div>
  );
}

export default Authorization;