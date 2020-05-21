import {
  SELECT_LANGUAGE_FOR_QUIZ,
  END_QUIZ,
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
} from "../constants/index";
import fetchAsync from "../utils/fetch";
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
      const payload = await fetchAsync(
        "https://true-falser-server.herokuapp.com/api/language/list"
      );
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
export function startQuiz(LanguageId, excludedquestions) {
  return async (dispatch) => {
    dispatch(getQuestionsStart());
    try {
      const payload = await fetchAsync(
        `https://true-falser-server.herokuapp.com/api/questions/?id=${LanguageId}&excludedquestions=${
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
      const payload = await fetchAsync(
        "https://true-falser-server.herokuapp.com/api/test",
        "POST",
        {
          UserId,
          LanguageId,
        }
      );
      if (payload.status === "error") {
        return dispatch(createTestFailure(payload.message));
      }
      dispatch(createTestSuccess(payload.data));
      return dispatch(startQuiz(LanguageId));
    } catch (error) {
      return dispatch(createTestFailure(error.message));
    }
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
