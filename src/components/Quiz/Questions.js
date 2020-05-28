import React, { memo, useCallback, useEffect, useRef } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useSelector, useDispatch } from "react-redux";
import property from "lodash/property";
import { useLocation, useParams, useHistory } from "react-router-dom";
import "./Questions.scss";
import splitCode from "../../utils/splitCode";
import _map from "lodash/map";
import get from "lodash/get";
import { nextQuestion, answer, getQuestions } from "../../actions/quiz";
import Prism from "prismjs";
import Code from "./code";
function Questions() {
  const history = useHistory();

  useEffect(() => {
    //for first getting question
    dispatch(nextQuestion({ id: 0 }));
  }, []);
  const params = useParams();
  const location = useLocation();

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
  const convertedStrings =
    currentQuestionText && splitCode(currentQuestionText);

  // useEffect(() => {
  //   setTimeout(() => Prism.highlightAll(), 0);
  // }, []);
  const codeEl = useRef(null);
  const next = useCallback(
    (event) => {
      const answerToServer = {
        TestId: get(testInfo, "id"),
        // UserId: get(testInfo, "UserId"),
        UserId,
        LanguageId: get(selectedLanguage, "id"),
        QuestionId: get(currentQuestion, "id"),
        answer: get(currentQuestion, "result"),
        userAnswer: get(event, "target.name") === "true" ? true : false,
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
      history.push(`/quiz/${Number(params.id) + 1}`);
      // if (codeEl && codeEl.current) {
      //   Prism.highlightElement(codeEl.current);
      //   console.log(codeEl.current);
      // }
    },
    [
      dispatch,
      currentQuestion,
      questions,
      testInfo,
      selectedLanguage,
      answeredQuestions,
      history,
      params,
    ]
  );
  return (
    <div>
      <div>
        {/* <pre className="keep-markup">
          <code
            ref={codeEl}
            className={`language-${selectedLanguage.name.toLowerCase()}`}
          >
            {convertedStrings &&
              convertedStrings.map((item, index) => {
                if (item.isStartWithNewString) {
                  return (
                    <div key={index}>
                      {item.code} <br />
                    </div>
                  );
                }
                if (item.isFinishMarkLAst) {
                  return (
                    <div key={index}>
                      <br />
                      {item.code}
                    </div>
                  );
                }
                if (item.marked) {
                  return <mark key={index}>{item.code}</mark>;
                }
                return item.code;
              })}
          </code>
        </pre> */}
        {/* <pre className="keep-markup">
          <code className={`language-${selectedLanguage.name.toLowerCase()}`}>
            {convertedStrings &&
              convertedStrings.map((item, index) => {
                if (item.isStartWithNewString) {
                  return (
                    <div key={index}>
                      {item.code} <br />
                    </div>
                  );
                }
                if (item.isFinishMarkLAst) {
                  return (
                    <div key={index}>
                      <br />
                      {item.code}
                    </div>
                  );
                }
                if (item.marked) {
                  return <mark key={index}>{item.code}</mark>;
                }
                return item.code;
              })}
          </code>
        </pre> */}
        {convertedStrings && (
          <Code
            lang={selectedLanguage.name.toLowerCase()}
            code={convertedStrings}
          />
        )}

        {/* {convertedStrings && (
          <SyntaxHighlighter language="javascript" style={docco}>
            {`dsds`}
          </SyntaxHighlighter>
        )} */}
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
