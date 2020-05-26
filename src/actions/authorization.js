import nodeFetch from 'node-fetch';
import get from 'lodash/get';
import history from '../history';

import { apiUrl } from '../client-config';
import {
    FETCH_DATA_START,
    FETCH_DATA_FAILURE,
    ALERT_SHOW,
    ALERT_HIDE,
    LOGIN_START,
    LOGIN_FAILURE,
    REGISTRATION_START,
    REGISTRATION_FAILURE,
    AUTHORIZATION_SUCCESS,
    GET_GOOGLE_URL,
    WITHOUT_REGISTRATION,
} from "../constants";

let timeOut;
const millisecondsToAlertDisappear = 3000;

export function alertShow(text, view) {
    return {
        type: ALERT_SHOW,
        text,
        view,
    };
}
export function alertHide() {
    return {
        type: ALERT_HIDE,
    };
}

export function loginStart() {
    return {
        type: LOGIN_START,
    };
}

export function loginFailure(data) {
    return {
        type: LOGIN_FAILURE,
        data,
    };
}

export function loginSuccess(data) {
    history.push('/');
    return {
        type: AUTHORIZATION_SUCCESS,
        data: get(data, 'data'),
    };
}

function fetchDataStart() {
    return {
        type: FETCH_DATA_START,
    };
}
function fetchDataFailure(data) {
    return {
        type: FETCH_DATA_FAILURE,
        payload: data,
    };
}

export function registrationStart() {
    return {
        type: REGISTRATION_START,
    };
}
export function registrationSuccess(data) {
    // history.push('/login');
    return {
        type: AUTHORIZATION_SUCCESS,
        data: get(data, 'data'),
    };
}

export function registrationFailure(data) {
    return {
        type: REGISTRATION_FAILURE,
        data,
    };
}

export function registration(registrationValue) {
    return async dispatch => {
        dispatch(registrationStart());
        try {
            const payload = await fetch(`${apiUrl}/user/signup`, {
                method: 'post',
                body: JSON.stringify(registrationValue),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await payload.json();
            if (payload.status === 'error') {
                dispatch(alertCreator(data.message, data.status));
                return dispatch(registrationFailure(payload));
            }
            dispatch(alertCreator(data.message, data.status));
            return dispatch(registrationSuccess(data));
        } catch (error) {
            dispatch(alertCreator(error.message, 'error'));
            return dispatch(registrationFailure(error));
        }
    };
}

function getGoogleUrl(data) {
    console.info('getGoogleUrl!!!', data);
  // history.push(`${data}`);
    return {
        type: GET_GOOGLE_URL,
        url: data,
    }
}

function getUserData(data) {
   history.push('/');
   //  history.replace('/main');
    return {
       type: AUTHORIZATION_SUCCESS,
       data: data,
   }
}

export function alertCreator(text, view) {
    return dispatch => {
        dispatch(alertShow(text, view));
        clearTimeout(timeOut);
        timeOut = setTimeout(() => {
            dispatch(alertHide());
        }, millisecondsToAlertDisappear);
    };
}

export function login(loginValue) {
    return async dispatch => {
        dispatch(loginStart());
        try {
            const response = await fetch(`${apiUrl}/user/signin`, {
                method: 'post',
                body: JSON.stringify(loginValue),
                // credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            console.info('Login response', data);
            if (response.status === 'error') {
                dispatch(alertCreator(response.message, response.status));
                return dispatch(loginFailure(response));
            }
            dispatch(alertCreator(data.message, data.status));
            return dispatch(loginSuccess(data));
        } catch (error) {
            dispatch(alertCreator(error.message, 'error'));
            return dispatch(loginFailure(error));
        }
    };
}

export function getGoogleAuthorizationUrl() {
  return async dispatch => {
      dispatch(fetchDataStart());
      try {
          const response = await nodeFetch(`${apiUrl}/user/google`, {
              method: 'get'
          });
          const data = await response.json();
          console.info('googleAuthorizationUrl!!', data);
          return dispatch(getGoogleUrl(data.data));
      } catch (error) {
          console.info('googleAuthorization!!', error);
          return dispatch(fetchDataFailure(error));
      }
  }
}

export function getUserDataFromGoogleCode(code) {
  return async dispatch => {
    dispatch(fetchDataStart());
    try {
       const response = await nodeFetch(
           `${apiUrl}/user/google/code?code=${code}`, {
           method: 'get',
       });
       const data = await response.json();
       console.info('getUserDataFromGoogleCode!!', data);
       return dispatch(getUserData(data.data));
    } catch (error) {
      return dispatch(fetchDataFailure(error))
    }
  }
}

export function withoutRegistration() {
  const anonymousUser = {
    id: 1000,
    name: 'Anonymous'
  };
  return {
    type: WITHOUT_REGISTRATION,
    data: anonymousUser,
  }
}