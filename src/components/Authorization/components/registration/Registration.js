import React, { useCallback } from 'react';
import { Field, reduxForm } from 'redux-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import property from 'lodash/property';
import get from 'lodash/get';


import CustomFieldRegistration from './components/CustomFieldRegistration/CustomFieldRegistration';
import { alertCreator, registration } from '../../../../actions/authorization';
import Alert from '../login/components/Alert/Alert';
import LoginRegistrationButton from '../login/components/LoginRegistrationButton/LoginRegistrationButton';
import AuthorizationWith from '../AuthorizationWith';

import'./Registration.scss';

const validate = value => {
  const errors = {};
  // const minLengthPassword = 5;
  // const minLengthName = 1;
  if (!value.login) {
    errors.login = 'Required';
  }
  // else if (value.email.length < minLengthPassword) {
  //   errors.email = `Bro, not enough characters for a valid email`;
  // } else if (!value.email.match(/^[\d.a-z-]+@[\da-z-]{2,}.[a-z]{2,}$/i)) {
  //   errors.email = 'Please, check your email, it looks invalid ';
  // }
  if (!value.name) {
    errors.name = 'Required';
  }
  // else if (value.userName.length <= minLengthName) {
  //   errors.userName = `Bro, not enough characters for a name`;
  // }

  if (!value.password) {
    errors.password = 'Required';
  }
  // else if (value.password.length < minLengthPassword) {
  //   errors.password = `Password must have at least 5 characters, you typed only ${value.password.length}`;
  // }

  return errors;
};
function Registration({ googleUrl }) {
  const dispatch = useDispatch();
  const registrationForm = useSelector(property('form.Registration'));
  const loginState = useSelector(property('authorization'));
  const registrationHandler = useCallback(
    event => {
      event.preventDefault();
      if (registrationForm.syncErrors) {
        console.info(registrationForm.syncErrors);
        return dispatch(alertCreator('All fields have to be filled.', 'error'));
      }

      return dispatch(registration(get(registrationForm, 'values')));
    },
    [dispatch, registrationForm],
  );
  return (
    <div className="containerRegistration">
      {loginState.alert && (
        <Alert message={loginState.alert} view={loginState.view} />
      )}
      <h1 className="textRegistration">
        Please register to get test result
      </h1>
      <div className="formContainerRegistration">
        <form className="RegistrationForm" onSubmit={registrationHandler}>
          <Field
            component={CustomFieldRegistration}
            label="Name"
            name="name"
            type="text"
          />
          <Field
            component={CustomFieldRegistration}
            label="Email"
            name="login"
            type="text"
          />
          <Field
            component={CustomFieldRegistration}
            label="Password"
            name="password"
            type="password"
          />
          <div className="wrapperForButton">
            <LoginRegistrationButton name="Registration" />
            <div className="wrapperForLink">
              <Link className="link" to="/login">
                Have an account? Click for Log in.
              </Link>
            </div>
          </div>
        </form>
        <AuthorizationWith />
        {/*<div className="signInWithR">*/}
        {/*  <span>Sign in with</span>*/}
        {/*  <a href={googleUrl} className="item">*/}
        {/*    <img alt="Google" src="https://assets.gitlab-static.net/assets/auth_buttons/google_64-9ab7462cd2115e11f80171018d8c39bd493fc375e83202fbb6d37a487ad01908.png"/>*/}
        {/*    <span>Google</span>*/}
        {/*  </a>*/}
        {/*</div>*/}
      </div>
    </div>
  );
}

Registration.whyDidYouRender = true;
export default reduxForm({
  form: 'Registration',
  validate,
})(Registration);
