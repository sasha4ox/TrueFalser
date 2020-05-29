import React, { memo } from "react";
import Circle from "react-circle";
import { useSelector } from "react-redux";
import property from "lodash/property";

import "./CountdownTimer.scss";

function CountdownTimer() {
  const secondsToEndQuiz = useSelector(property("quiz.timer.secondsToEnd"));
  const startSeconds = 60;
  const percentage = Math.floor(secondsToEndQuiz / (startSeconds / 100));

  return (
    <div className="wrapper_timer">
      <p className="timer_seconds">{secondsToEndQuiz}</p>
      <Circle
        animate={true}
        animationDuration="1s"
        responsive={true}
        size={150}
        lineWidth={30}
        progress={percentage}
        progressColor={percentage > 25 ? "cornflowerblue" : "red"}
        bgColor="whitesmoke"
        showPercentage={false}
        showPercentageSymbol={false}
      />
    </div>
  );
}

export default memo(CountdownTimer);
