import React, { memo, useCallback, useEffect } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useSelector, useDispatch } from "react-redux";
import property from "lodash/property";
import _map from "lodash/map";
import _toLower from "lodash/toLower";
import get from "lodash/get";
import isArray from "lodash/isArray";

import "./Questions.scss";

import splitCode from "../../../../utils/splitCode";
import generateUniqueKey from "../../../../utils/generateUniqueKey";
import { nextQuestion, answer, getQuestions } from "../../../../actions/quiz";

function Questions() {
  useEffect(() => {
    //for first getting question
    dispatch(nextQuestion({ id: 0 }));
  }, []);
  const dispatch = useDispatch();
  const UserId = useSelector(property("authorization.userData.id"));
  const testInfo = useSelector(property("quiz.test"));
  const questions = useSelector(property("quiz.allQuestions.questions"));
  const answeredQuestions = useSelector(property("quiz.allQuestions.answered"));
  const selectedLanguage = useSelector(
    property("quiz.language.selectedLanguage")
  );
  const currentQuestion = useSelector(
    property("quiz.allQuestions.currentQuestion[0]")
  );
  const currentQuestionText = useSelector(
    property("quiz.allQuestions.currentQuestion[0].text")
  );
  const convertedStrings = splitCode(currentQuestionText);
  const currentQuestionLanguage = _toLower(
    useSelector(property("quiz.allQuestions.currentQuestion[0].Language.name"))
  );

  const next = useCallback(
    (event) => {
      let userAnswer;
      if (!get(event, "target.name")) {
        userAnswer = get(event, "code") === "ArrowRight" ? true : false;
      } else {
        userAnswer = get(event, "target.name") === "true" ? true : false;
      }

      const answerToServer = {
        TestId: get(testInfo, "id"),
        UserId,
        LanguageId: get(selectedLanguage, "id"),
        QuestionId: get(currentQuestion, "id"),
        answer: get(currentQuestion, "result"),
        userAnswer,
      };

      if (questions.length === 2) {
        // get more questions
        const answeredQuestionsId = _map(
          answeredQuestions,
          (answer) => answer.id
        );
        const questionsIsStateId = _map(questions, (question) => question.id);
        const excludeId = [
          ...answeredQuestionsId,
          ...questionsIsStateId,
        ].join();
        dispatch(getQuestions(selectedLanguage.id, excludeId));
      }
      dispatch(answer(answerToServer));
      dispatch(nextQuestion(currentQuestion));
    },
    [
      dispatch,
      currentQuestion,
      questions,
      testInfo,
      selectedLanguage,
      answeredQuestions,
      UserId,
    ]
  );

  //arrow answer
  const keyDown = (event) => {
    if (event.code === "ArrowRight") return next(event);
    if (event.code === "ArrowLeft") return next(event);
  };
  useEffect(() => {
    window.addEventListener("keydown", keyDown);
    return () => {
      window.removeEventListener("keydown", keyDown);
    };
  });

  return (
    <div className="wrapper_questions">
      <div className="wrapper_question">
        <div className="question">
          {_map(convertedStrings, (itemCode, index) => {
            if (isArray(itemCode.code)) {
              return (
                <div
                  key={generateUniqueKey(index)}
                  className={
                    itemCode.isStartSeparated ? "string_start" : "string_finish"
                  }
                >
                  {_map(itemCode.code, (item, index) => {
                    return (
                      <SyntaxHighlighter
                        key={generateUniqueKey(index)}
                        language={currentQuestionLanguage}
                        style={docco}
                      >
                        {item}
                      </SyntaxHighlighter>
                    );
                  })}
                </div>
              );
            } else {
              return (
                <div
                  className={itemCode.marked && "marked_string"}
                  key={generateUniqueKey(index)}
                >
                  <SyntaxHighlighter
                    language={currentQuestionLanguage}
                    style={docco}
                  >
                    {itemCode.code}
                  </SyntaxHighlighter>
                </div>
              );
            }
          })}
        </div>
      </div>
      <div className="wrapper_for_Button">
        <button
          name="false"
          type="button"
          className="button button_false"
          onClick={next}
        >
          False
        </button>
        <button
          name="true"
          type="button"
          className="button button_true"
          onClick={next}
        >
          True
        </button>
      </div>
    </div>
  );
}
export default memo(Questions);
