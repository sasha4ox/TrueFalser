import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link }  from 'react-router-dom';
import property from 'lodash/property';

import CustomFieldLogin from './components/CustomFieldLogin/CustomFieldLogin';
import LoginRegistrationButton from './components/LoginRegistrationButton/LoginRegistrationButton';
import {
  login,
  alertCreator,
  withoutRegistration,
} from '../../../../actions/authorization';
import Alert from './components/Alert/Alert';
import AuthorizationWith from '../AuthorizationWith';

import './Login.scss';

const validate = value => {
  const errors = {};
  // const minLengthPassword = 5;
  if (!value.login) {
    errors.login = 'Required';
  }
  // else if (value.email.length < minLengthPassword) {
  //   errors.email = `Bro, not enough characters for a valid email`;
  // } else if (!value.email.match(/^[\d.a-z-]+@[\da-z-]{2,}.[a-z]{2,}$/i)) {
  //   errors.email = 'Please, check your email, it looks invalid ';
  // }
  if (!value.password) {
    errors.password = 'Required';
  }
  // else if (value.password.length < minLengthPassword) {
  //   errors.password = `Password must have at least 5 characters, you typed only ${value.password.length}`;
  // }

  return errors;
};

function Login({ googleUrl, facebookUrl }) {
  const formLoginState = useSelector(property('form.Login'));
  const formLoginValue = useSelector(property('form.Login.values'));
  const loginState = useSelector(property('authorization'));
  const dispatch = useDispatch();
  const loginHandler = useCallback(
    event => {
      event.preventDefault();
      if (formLoginState.syncErrors) {
        return dispatch(alertCreator('All fields have to be filled.', 'error'));
      }

      return dispatch(login(formLoginValue));
    },
    [dispatch, formLoginValue, formLoginState],
  );
  const anonymousPass = useCallback(() => {
    dispatch(withoutRegistration());
  }, [dispatch]);
  return (
    <div className="containerLogin">
      {loginState.alert && (
        <Alert message={loginState.alert} view={loginState.view} />
      )}
      <h1 className="textLogin">Welcome to TrueFalser!</h1>
      <div className="formContainerLogin">
        <div className="withoutRegistration">
          <button
              className="btn btn-light"
              onClick={anonymousPass}
          >
            Without registration
          </button>
        </div>
        <form className="loginForm" onSubmit={loginHandler}>
          <Field
            component={CustomFieldLogin}
            label="Email "
            // name="email"
            name="login"
            type="text"
          />
          <Field
            component={CustomFieldLogin}
            label="Password"
            name="password"
            type="password"
          />
          <div className="wrapperForButton">
            <LoginRegistrationButton name="login" />
            <div className="wrapperForLink">
              <Link className="link" to="/registration">
                Don&apos;t have an account? Click for create.
              </Link>
              {/* <Link className={s.link} to="/password_reset"> */
                /*  Forgot your password? */
                /* </Link> */}
            </div>
          </div>
        </form>
        <AuthorizationWith
            googleUrl={googleUrl}
            facebookUrl={facebookUrl}
        />
        {/*<div className="signInWith">*/}
        {/*  <span>Sign in with</span>*/}
        {/*  <a href={googleUrl} className="item">*/}
        {/*  <img alt="Google" src="https://assets.gitlab-static.net/assets/auth_buttons/google_64-9ab7462cd2115e11f80171018d8c39bd493fc375e83202fbb6d37a487ad01908.png"/>*/}
        {/*  <span>Google</span>*/}
        {/*  </a>*/}
        {/*</div>*/}
      </div>
    </div>
  );
}

Login.whyDidYouRender = true;
export default reduxForm({
  form: 'Login',
  validate,
})(Login);
