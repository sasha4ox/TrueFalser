import {
  SELECT_LANGUAGE_FOR_QUIZ,
  END_QUIZ,
  START_QUIZ_AGAIN,
  NEXT_QUESTION,
  GET_QUIZ_QUESTIONS_START,
  GET_QUIZ_QUESTIONS_SUCCESS,
  GET_QUIZ_QUESTIONS_FAILURE,
  CREATE_QUIZ_QUESTIONS_SUCCESS,
  CREATE_QUIZ_QUESTIONS_FAILURE,
  CREATE_QUIZ_QUESTIONS_START,
  GET_LANGUAGES_START,
  GET_LANGUAGES_FAILURE,
  GET_LANGUAGES_SUCCESS,
  ANSWER_QUIZ_START,
  ANSWER_QUIZ_FAILURE,
  ANSWER_QUIZ_SUCCESS,
  GET_QUIZ_RESULT_START,
  GET_QUIZ_RESULT_FAILURE,
  GET_QUIZ_RESULT_SUCCESS,
  SCREEN_ORIENTATION,
  COUNTDOWN_TIMER_START,
  COUNTDOWN_TIMER_TICK,
} from "../constants/index";

import fetchAsync from "../utils/fetch";
import { apiUrl } from "../client-config";

export function countdownTimerStart(secondsToEnd) {
  return {
    type: COUNTDOWN_TIMER_START,
    secondsToEnd,
  };
}
export function countdownTimerTick() {
  return {
    type: COUNTDOWN_TIMER_TICK,
  };
}

export function screenOrientation(isNeedToRotate) {
  return {
    type: SCREEN_ORIENTATION,
    payload: isNeedToRotate,
  };
}

export function selectLanguage(language) {
  return {
    type: SELECT_LANGUAGE_FOR_QUIZ,
    language,
  };
}
export function getLanguagesStart() {
  return {
    type: GET_LANGUAGES_START,
  };
}
export function getLanguagesFailure(data) {
  return {
    type: GET_LANGUAGES_FAILURE,
    payload: data,
  };
}
export function getLanguagesSuccess(data) {
  return {
    type: GET_LANGUAGES_SUCCESS,
    payload: data,
  };
}
export function getLanguages() {
  return async (dispatch) => {
    try {
      dispatch(getLanguagesStart());
      const payload = await fetchAsync(`${apiUrl}/language/list`);
      if (payload.status === "error") {
        return dispatch(getLanguagesFailure(payload.message));
      }
      return dispatch(getLanguagesSuccess(payload.data));
    } catch (error) {
      return dispatch(getLanguagesFailure(error.message));
    }
  };
}
export function getQuestionsStart() {
  return {
    type: GET_QUIZ_QUESTIONS_START,
  };
}
export function getQuestionsSuccess(data) {
  return {
    type: GET_QUIZ_QUESTIONS_SUCCESS,
    payload: data,
  };
}
export function getQuestionsFailure(data) {
  return {
    type: GET_QUIZ_QUESTIONS_FAILURE,
    payload: data,
  };
}
export function createTestStat() {
  return {
    type: CREATE_QUIZ_QUESTIONS_START,
  };
}
export function createTestSuccess(data) {
  return {
    type: CREATE_QUIZ_QUESTIONS_SUCCESS,
    payload: data,
  };
}
export function createTestFailure(data) {
  return {
    type: CREATE_QUIZ_QUESTIONS_FAILURE,
    payload: data,
  };
}
export function getQuestions(LanguageId, excludedquestions) {
  return async (dispatch) => {
    dispatch(getQuestionsStart());
    try {
      const payload = await fetchAsync(
        `${apiUrl}/questions/?id=${LanguageId}&excludedquestions=${
          excludedquestions ? excludedquestions : 0
        }`
      );
      if (payload.status === "error") {
        return dispatch(getQuestionsFailure(payload.message));
      }
      return dispatch(getQuestionsSuccess(payload.data));
    } catch (error) {
      return dispatch(getQuestionsFailure(error.message));
    }
  };
}
export function createTest(UserId, LanguageId) {
  return async (dispatch) => {
    dispatch(createTestStat());
    // dispatch(getQuestionsStart());
    try {
      const payload = await fetchAsync(`${apiUrl}/test`, "POST", {
        UserId,
        LanguageId,
      });
      if (payload.status === "error") {
        return dispatch(createTestFailure(payload.message));
      }
      dispatch(createTestSuccess(payload.data));
      return dispatch(getQuestions(LanguageId));
    } catch (error) {
      return dispatch(createTestFailure(error.message));
    }
  };
}
export function startQuizAgain() {
  return {
    type: START_QUIZ_AGAIN,
  };
}
export function endQuiz() {
  return {
    type: END_QUIZ,
  };
}
export function nextQuestion(currentQuestion) {
  return {
    type: NEXT_QUESTION,
    currentQuestion,
  };
}

// ANSWER
export function answerStart() {
  return {
    type: ANSWER_QUIZ_START,
  };
}
export function answerFailure() {
  return {
    type: ANSWER_QUIZ_FAILURE,
  };
}
export function answerSuccess() {
  return {
    type: ANSWER_QUIZ_SUCCESS,
  };
}

export function answer(answerData) {
  return async (dispatch) => {
    try {
      dispatch(answerStart());
      const payload = await fetchAsync(`${apiUrl}/answer`, "POST", answerData);
      if (payload.status === "error") {
        return dispatch(endQuiz());
      }
    } catch (error) {
      return dispatch(endQuiz());
    }
  };
}

export function getQuizResultStart() {
  return {
    type: GET_QUIZ_RESULT_START,
  };
}

export function getQuizResultFailure(data) {
  return {
    type: GET_QUIZ_RESULT_FAILURE,
    payload: data,
  };
}

export function getQuizResultSuccess(data) {
  return {
    type: GET_QUIZ_RESULT_SUCCESS,
    payload: data,
  };
}

export function getResult(testId) {
  return async (dispatch) => {
    try {
      dispatch(getQuizResultStart());
      const payload = await fetchAsync(`${apiUrl}/test/result/${testId}`);
      if (payload.status === "error") {
        return dispatch(getQuizResultFailure(payload.message));
      }
      return dispatch(getQuizResultSuccess(payload.data));
    } catch (error) {
      return dispatch(getQuizResultFailure(error.message));
    }
  };
}
