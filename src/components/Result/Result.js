import React, { memo, useEffect, useCallback } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import property from "lodash/property";
import { getResult, startQuizAgain } from "../../actions/quiz";
import "./Result.scss";
import get from "lodash/get";

function Result() {
  const dispatch = useDispatch();
  const testId = useSelector(property("quiz.test.id"));
  const testResult = useSelector(property("quiz.result"));

  useEffect(() => {
    dispatch(getResult(testId));
  }, [testId, dispatch]);

  const tryTestAgain = useCallback(() => {
    dispatch(startQuizAgain());
  }, [dispatch]);
  return (
    <div className="result_wrapper">
      <h1>Your result :</h1>
      <p className="result_questions">
        Questions: {get(testResult, "totalAnswersInTest")}
      </p>
      <p className="result_questions_rigth">
        Rigth answers: {get(testResult, "correctAnswersInTest")}
      </p>
      <NavLink to="/select-language" onClick={tryTestAgain}>
        try agian
      </NavLink>
    </div>
  );
}
export default memo(Result);
