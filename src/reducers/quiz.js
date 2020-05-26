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
} from "../constants";
import get from "lodash/get";
import _filter from "lodash/filter";
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
    currentQuestion: [
      // {
      //   id: 1,
      //   text: `def say_hello():
      // print("Hello")
      // say_hello()
      // say_hello()
      // say_hello()
      // *START*
      // def sum(*params):
      // result = 0
      // for n in params:
      //     result += n
      // return result
      // *FINISH*
      // sumOfNumbers1 = sum(1, 2, 3, 4, 5)      # 15
      // sumOfNumbers2 = sum(3, 4, 5, 6)         # 18
      // print(sumOfNumbers1)
      // print(sumOfNumbers2)`,
      //   highlightedText: "???",
      //   result: 111,
      //   LanguageId: 111,
      // },
    ],
    questions: [
      // {
      //   id: 1,
      //   text: `def say_hello():
      //   print("Hello")
      //   say_hello()
      //   say_hello()
      //   say_hello()
      //   *START*
      //   def sum(*params):
      //   result = 0
      //   for n in params:
      //       result += n
      //   return result
      //   *FINISH*
      //   sumOfNumbers1 = sum(1, 2, 3, 4, 5)      # 15
      //   sumOfNumbers2 = sum(3, 4, 5, 6)         # 18
      //   print(sumOfNumbers1)
      //   print(sumOfNumbers2)`,
      //   highlightedText: "???",
      //   result: 111,
      //   LanguageId: 111,
      // },
      // {
      //   id: 2,
      //   text: `*START* function noMatterWhat(item){
      //     return item*2
      //   }
      //   const trueFalse = typeof NaN === 'number'
      //   let a;
      //   if(trueFalse){
      //     a =  10
      //   } else{
      //     a= 5
      //   }
      //   let b = 2;
      //   console.log(a + b); //12 *FINISH*`,
      //   highlightedText: "???",
      //   result: 111,
      //   LanguageId: 111,
      // },
      // {
      //   id: 3,
      //   text: `def say_hello():
      //   print("Hello")
      //   say_hello()
      //   say_hello()
      //   say_hello()
      //   *START*
      //   def sum(*params):
      //   result = 0
      //   for n in params:
      //       result += n
      //   return result
      //   *FINISH*
      //   sumOfNumbers1 = sum(1, 2, 3, 4, 5)      # 15
      //   sumOfNumbers2 = sum(3, 4, 5, 6)         # 18
      //   print(sumOfNumbers1)
      //   print(sumOfNumbers2)`,
      //   highlightedText: "???",
      //   result: 111,
      //   LanguageId: 111,
      // },
    ],
  },
};
export default function quiz(state = initialState, action) {
  switch (action.type) {
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
          currentQuestion: [filteredQuestions[0]],
        },
      };
    default:
      return state;
  }
}
