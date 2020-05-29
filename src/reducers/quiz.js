import {
  SELECT_LANGUAGE_FOR_QUIZ,
  END_QUIZ,
  NEXT_QUESTION,
  GET_QUIZ_QUESTIONS_SUCCESS,
  GET_LANGUAGES_START,
  GET_LANGUAGES_SUCCESS,
  GET_LANGUAGES_FAILURE,
  CREATE_QUIZ_QUESTIONS_SUCCESS,
  GET_QUIZ_RESULT_START,
  GET_QUIZ_RESULT_FAILURE,
  GET_QUIZ_RESULT_SUCCESS,
  START_QUIZ_AGAIN,
  SCREEN_ORIENTATION,
  COUNTDOWN_TIMER_TICK,
  COUNTDOWN_TIMER_START,
} from "../constants";

import get from "lodash/get";
import _filter from "lodash/filter";
import _head from "lodash/head";
const initialState = {
  language: {
    selectedLanguage: null,
    languages: [],
    loading: false,
  },
  isQuizStarted: false,
  isQuizFinished: false,
  allQuestions: {
    answered: [],
    currentQuestion: [],
    questions: [],
  },
  isNeedToRotate: false,
  timer: {
    isTimerStart: false,
    secondsToEnd: null,
  },
};
export default function quiz(state = initialState, action) {
  switch (action.type) {
    case COUNTDOWN_TIMER_START:
      return {
        ...state,
        timer: {
          isTimerStart: true,
          secondsToEnd: action.secondsToEnd,
        },
      };
    case COUNTDOWN_TIMER_TICK:
      return {
        ...state,
        timer: {
          ...state.timer,
          secondsToEnd: state.timer.secondsToEnd - 1,
        },
      };
    case SCREEN_ORIENTATION:
      return {
        ...state,
        isNeedToRotate: action.payload,
      };
    case GET_QUIZ_RESULT_START:
      return {
        ...state,
      };
    case GET_QUIZ_RESULT_FAILURE:
      return {
        ...state,
        result: action.payload,
      };
    case GET_QUIZ_RESULT_SUCCESS:
      return {
        ...state,
        result: action.payload,
      };
    case GET_LANGUAGES_START:
      return {
        ...state,
        language: {
          ...state.language,
          loading: true,
        },
      };
    case GET_LANGUAGES_SUCCESS:
      return {
        ...state,
        language: {
          ...state.language,
          loading: false,
          languages: [...action.payload],
        },
      };
    case GET_LANGUAGES_FAILURE:
      return {
        ...state,
        language: {
          ...state.language,
          loading: false,
          error: action.payload,
        },
      };
    case SELECT_LANGUAGE_FOR_QUIZ:
      return {
        ...state,
        language: {
          ...state.language,
          selectedLanguage: action.language,
        },
      };
    case CREATE_QUIZ_QUESTIONS_SUCCESS:
      return {
        ...state,
        test: action.payload,
      };
    case GET_QUIZ_QUESTIONS_SUCCESS:
      return {
        ...state,
        allQuestions: {
          ...state.allQuestions,
          questions: [...state.allQuestions.questions, ...action.payload],
        },
        isQuizStarted: true,
        isQuizFinished: false,
      };
    case START_QUIZ_AGAIN:
      return {
        ...initialState,
      };
    case END_QUIZ:
      return {
        ...state,
        timer: {
          isTimerStart: false,
          secondsToEnd: 0,
        },
        isQuizStarted: false,
        isQuizFinished: true,
      };
    case NEXT_QUESTION:
      const filteredQuestions = _filter(
        get(state, "allQuestions.questions"),
        (question) => get(question, "id") !== get(action, "currentQuestion.id")
      );
      return {
        ...state,
        allQuestions: {
          ...state.allQuestions,
          answered: [...state.allQuestions.answered, action.currentQuestion],
          questions: [...filteredQuestions],
          currentQuestion: [_head(filteredQuestions)],
        },
      };
    default:
      return state;
  }
}
