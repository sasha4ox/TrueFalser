import React, { memo, useCallback, useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import property from "lodash/property";

import Questions from "./components/Questions/Questions";
import { endQuiz, createTest, screenOrientation } from "../../actions/quiz";
import LanguageTimer from "./components/LanguageTimer/LanguageTimer";

import "./Quiz.scss";

let interval;

function Quiz() {
  const isQuizFinished = useSelector(property("quiz.isQuizFinished"));
  const isQuizStarted = useSelector(property("quiz.isQuizStarted"));
  const userId = useSelector(property("authorization.userData.id"));
  const languageId = useSelector(property("quiz.language.selectedLanguage.id"));
  const isNeedToRotate = useSelector(property("quiz.isNeedToRotate"));
  const dispatch = useDispatch();
  const [seconds, setSeconds] = useState(0);

  const downTimer = () => {
    setSeconds(85);
    interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev - 1 === 0) {
          clearInterval(interval);
          dispatch(endQuiz());
        }
        return prev - 1;
      });
    }, 1000);
  };
  const quizElement = useRef(null); //for fullscreen
  const startGame = useCallback(() => {
    downTimer();
    dispatch(createTest(userId, languageId));
  }, [dispatch, userId]);

  const checkWidth = () => {
    const orientation = window.matchMedia("(orientation: portrait)");
    const maxWidth665px = window.matchMedia("(max-width: 665px)");
    const maxHeigth = window.matchMedia("(max-height: 425px)");
    console.log("maxHeigth", maxHeigth.matches);
    if (orientation.matches && maxWidth665px.matches) {
      dispatch(screenOrientation(true));
    } else if (maxHeigth.matches) {
      quizElement.current.requestFullscreen(); //for fullscreen
      dispatch(screenOrientation(false));
    } else {
      dispatch(screenOrientation(false));
    }
  };

  useEffect(() => {
    checkWidth();
  }, []);
  useEffect(() => {
    window.addEventListener("resize", checkWidth);
    return () => {
      window.removeEventListener("resize", checkWidth);
    };
  });

  return (
    <div className="quiz" ref={quizElement}>
      {/* ref for fullscreen */}
      {isQuizFinished && <Redirect to="result" />}
      {isQuizStarted && <LanguageTimer seconds={seconds} />}
      {isQuizStarted ? (
        <Questions />
      ) : (
        <div className="wrapper_start_quiz">
          <button
            type="button"
            className="start_button"
            onClick={startGame}
            disabled={isNeedToRotate}
          >
            START QUIZ
          </button>
          {isNeedToRotate && (
            <p>
              Please rotate the screen to horizontal for a more comfortable game
            </p>
          )}
        </div>
      )}
    </div>
  );
}
export default memo(Quiz);
