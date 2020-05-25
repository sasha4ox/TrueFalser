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
} from '../constants';

export default function authorization(state = {}, action) {
  switch (action.type) {
      case WITHOUT_REGISTRATION:
        return {
          ...state,
          userData: action.data  ,
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
    case GET_GOOGLE_URL:
      return {
          ...state,
          googleUrl: action.url
      };
    case  AUTHORIZATION_SUCCESS:
      return {
         ...state,
         userData: action.data,
         googleUrl: null
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