import React, { memo, useCallback, useEffect } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useSelector, useDispatch } from "react-redux";
import property from "lodash/property";
import "./Questions.scss";
import splitCode from "../../utils/splitCode";
import { nextQuestion } from "../../actions/quiz";
function Questions() {
  useEffect(() => {
    dispatch(nextQuestion({ id: 0 }));
  }, []);
  const dispatch = useDispatch();
  const selectedLanguage = useSelector(
    property("quiz.language.selectedLanguage")
  );
  const currentQuestion = useSelector(
    property("quiz.allQuestions.currentQuestion[0]")
  );
  console.log(currentQuestion);
  const currentQuestionText = useSelector(
    property("quiz.allQuestions.currentQuestion[0].text")
  );
  const convertedStrings = splitCode(currentQuestionText);
  const next = useCallback(() => {
    dispatch(nextQuestion(currentQuestion));
  }, [dispatch, currentQuestion]);
  return (
    <div>
      <div>
        {convertedStrings.map((item) => {
          return (
            <div className="wrapper">
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
        <button name="false" className="button button_false">
          False
        </button>
        <button name="true" className="button button_true" onClick={next}>
          True
        </button>
      </div>
    </div>
  );
}
export default memo(Questions);
