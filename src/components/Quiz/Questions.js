import React, { memo, useCallback, useEffect } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useSelector, useDispatch } from "react-redux";
import property from "lodash/property";
import "./Questions.scss";
import splitCode from "../../utils/splitCode";
import _map from "lodash/map";
import get from "lodash/get";
import { nextQuestion, answer, getQuestions } from "../../actions/quiz";
function Questions() {
  useEffect(() => {
    //for first getting question
    dispatch(nextQuestion({ id: 0 }));
  }, []);
  const dispatch = useDispatch();
  const UserId = useSelector(property('authorization.userData.id'));
  const testInfo = useSelector(property("quiz.test"));
  const questions = useSelector(property("quiz.allQuestions.questions"));
  const answeredQuestions = useSelector(property("quiz.allQuestions.answered"));
  const selectedLanguage = useSelector(
    property("quiz.language.selectedLanguage")
  );
  const currentQuestion = useSelector(
    property("quiz.allQuestions.currentQuestion[0]")
  );
  console.log(questions);
  const currentQuestionText = useSelector(
    property("quiz.allQuestions.currentQuestion[0].text")
  );
  const convertedStrings = splitCode(currentQuestionText);
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
      console.log(questions.length);
    },
    [
      dispatch,
      currentQuestion,
      questions,
      testInfo,
      selectedLanguage,
      answeredQuestions,
    ]
  );
  return (
    <div>
      <div>
        {convertedStrings.map((item, index) => {
          return (
            <div className="wrapper" key={index}>
              <SyntaxHighlighter
                language={selectedLanguage.name}
                style={docco}
                wrapLines={true}
                customStyle={{
                  width: "90%",
                  margin: "0px auto",
                  background: item.marked
                    ? "rgb(219, 255, 219)"
                    : "rgb(248, 248, 255)",
                }}
              >
                {item.code}
              </SyntaxHighlighter>
            </div>
          );
        })}
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
