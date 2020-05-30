import React, { memo, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import property from "lodash/property";
import throttle from "lodash/throttle";

import Questions from "./components/Questions/Questions";
import {
  endQuiz,
  createTest,
  screenOrientation,
  countdownTimerStart,
  countdownTimerTick,
  isShowingHeaderInQuiz,
} from "../../actions/quiz";
import CountdownTimer from "./components/CountdownTimer/CountdownTimer";
import Header from "../Header/Header";

import "./Quiz.scss";

let interval;

function Quiz() {
  const isQuizFinished = useSelector(property("quiz.isQuizFinished"));
  const isQuizStarted = useSelector(property("quiz.isQuizStarted"));
  const userId = useSelector(property("authorization.userData.id"));
  const languageId = useSelector(property("quiz.language.selectedLanguage.id"));
  const isNeedToRotate = useSelector(property("quiz.isNeedToRotate"));
  const secondsToEndQuiz = useSelector(property("quiz.timer.secondsToEnd"));
  const isTimerStart = useSelector(property("quiz.timer.isTimerStart"));
  const isShowHeader = useSelector(property("quiz.isShowHeader"));
  const dispatch = useDispatch();

  // countdown timer    ---- START
  useEffect(() => {
    if (isTimerStart) {
      interval = setInterval(() => {
        dispatch(countdownTimerTick());
      }, 1000);
    }
  }, [isTimerStart, dispatch]);

  useEffect(() => {
    if (secondsToEndQuiz === 0) {
      dispatch(endQuiz());
    }
  }, [secondsToEndQuiz, dispatch]);
  useEffect(() => {
    checkWidth();
    return () => {
      clearInterval(interval);
    };
  }, []);
  // countdown timer    ---- END

  const startGame = useCallback(() => {
    dispatch(createTest(userId, languageId));
    dispatch(countdownTimerStart(60));
  }, [dispatch, userId, languageId]);

  const checkWidth = () => {
    const orientation = window.matchMedia("(orientation: portrait)");
    const maxWidth665px = window.matchMedia("(max-width: 665px)");
    const maxHeight = window.matchMedia("(max-height: 450px)");
    if (orientation.matches && maxWidth665px.matches) {
      dispatch(screenOrientation(true));
    } else {
      dispatch(screenOrientation(false));
    }
    if (maxHeight.matches) {
      dispatch(isShowingHeaderInQuiz(false));
    } else {
      dispatch(isShowingHeaderInQuiz(true));
    }
  };
  useEffect(() => {
    window.addEventListener("resize", throttle(checkWidth, 500));
    return () => {
      window.removeEventListener("resize", throttle(checkWidth, 500));
    };
  });

  return (
    <>
      {isShowHeader && <Header />}
      <div className="quiz">
        {isQuizFinished && <Redirect to="result" />}
        {isQuizStarted && (
          <div>
            <CountdownTimer />
          </div>
        )}
        {/* <LanguageTimer seconds={secondsToEndQuiz/> */}
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
                Please rotate the screen to horizontal for a more comfortable
                game
              </p>
            )}
          </div>
        )}
      </div>
    </>
  );
}
export default memo(Quiz);
