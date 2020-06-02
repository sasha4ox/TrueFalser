import {
  ALERT_SHOW,
  ALERT_HIDE,
  LOGIN_START,
  LOGIN_FAILURE,
  REGISTRATION_START,
  REGISTRATION_FAILURE,
  GET_GOOGLE_URL,
  AUTHORIZATION_SUCCESS,
  WITHOUT_REGISTRATION,
  GET_FACEBOOK_URL,
  CHOSEN_AUTHORIZATION_URL,
} from '../constants';

export default function authorization(state = {}, action) {
  switch (action.type) {
    case WITHOUT_REGISTRATION:
      return {
        ...state,
        userData: action.data,
      };
    case LOGIN_START:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        ...action.data,
        isLoggedIn: false,
      };
    case REGISTRATION_START:
      return {
        ...state,
        loading: true,
      };
    case REGISTRATION_FAILURE:
      return {
        ...state,
        loading: false,
        ...action.data,
      };
    case CHOSEN_AUTHORIZATION_URL:
      return {
        ...state,
        chosenAuthorizationUrl: action.chosenAuthorizationUrl,
      };
    case GET_GOOGLE_URL:
      return {
        ...state,
        googleUrl: action.url,
      };
    case GET_FACEBOOK_URL:
      return {
        ...state,
        facebookUrl: action.url,
      };
    case AUTHORIZATION_SUCCESS:
      return {
        ...state,
        userData: action.data,
        googleUrl: null,
      };
    case ALERT_HIDE:
      return {
        ...state,
        alert: null,
      };
    case ALERT_SHOW:
      return {
        ...state,
        alert: action.text,
        view: action.view,
      };
    default:
      return state;
  }
}
