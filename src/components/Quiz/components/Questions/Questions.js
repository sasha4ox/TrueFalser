import React, { memo, useCallback, useEffect, useRef } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useSelector, useDispatch } from "react-redux";
import property from "lodash/property";
import _map from "lodash/map";
import get from "lodash/get";
import Prism from "prismjs";

import { nextQuestion, answer, getQuestions } from "../../../../actions/quiz";
import { useLocation, useParams, useHistory } from "react-router-dom";
import splitCode from "../../../../utils/splitCode";
import Code from "../Code/Code";

import "./Questions.scss";

function Questions() {
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        //for first getting question
        dispatch(nextQuestion({ id: 0 }));
    }, [dispatch]);
    const params = useParams();
    const location = useLocation();

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
    const codeEl = useRef(null);
    const next = useCallback(
        (event) => {

            console.info(event);
            let userAnswer;
            if (!get(event, "target.name")) {
                userAnswer = get(event, "code") === "ArrowRight" ? true : false;
            } else {
                userAnswer = get(event, "target.name") === "true" ? true : false;
            }

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
            // history.push(`/quiz/${Number(params.id) + 1}`);
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
            // history,
            // params,
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
        <div className="code_container">
            <div>
                {convertedStrings && (
                    <Code
                        lang={selectedLanguage.name.toLowerCase()}
                        code={convertedStrings}
                    />
                )}

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