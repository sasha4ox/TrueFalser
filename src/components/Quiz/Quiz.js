import React, { memo, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import property from "lodash/property";
import Questions from "./Questions";
import { endQuiz, createTest } from "../../actions/quiz";
import { Switch, Route, Redirect } from "react-router-dom";
import "./Quiz.scss";
let interval;
function Quiz() {
  const isQuizFinished = useSelector(property("quiz.isQuizFinished"));
  const isQuizStarted = useSelector(property("quiz.isQuizStarted"));
  const dispatch = useDispatch();
  const [seconds, setSeconds] = useState(60);
  const downTimer = () => {
    setSeconds(60);
    // interval = setInterval(() => {
    //   setSeconds((prev) => {
    //     if (prev - 1 === 0) {
    //       clearInterval(interval);
    //       dispatch(endQuiz());
    //     }
    //     return prev - 1;
    //   });
    // }, 1000);
  };

  const startGame = useCallback(() => {
    downTimer();
    dispatch(createTest(1, 1));
  }, [dispatch]);
  return (
    <div className="quiz">
      <Route path="/quiz/:id">
        <Questions />
      </Route>
      {/* {isQuizFinished && <Redirect to="result" />} */}
      {isQuizStarted && <div className="timer">{seconds}</div>}
      {isQuizStarted ? (
        //
        <Redirect to="/quiz/1" />
      ) : (
        <button type="button" className="start_button" onClick={startGame}>
          START QUIZ
        </button>
      )}
    </div>
  );
}
export default memo(Quiz);
