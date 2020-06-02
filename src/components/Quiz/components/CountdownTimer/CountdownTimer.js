import React, { memo } from 'react';
import Circle from 'react-circle';
import { useSelector } from 'react-redux';
import property from 'lodash/property';

import './CountdownTimer.scss';

function CountdownTimer() {
  const secondsToEndQuiz = useSelector(property('quiz.timer.secondsToEnd')) || 60;
  const startSeconds = 60;
  const percentage = Math.floor(secondsToEndQuiz / (startSeconds / 100));
  const currentQuestionLanguage = useSelector(
    property('quiz.allQuestions.currentQuestion[0].Language.name'),
  );

  return (
    <div className="wrapper_timer">
      <div className="question_language">
        {' '}
        {currentQuestionLanguage}
      </div>
      <p className="timer_seconds">{secondsToEndQuiz}</p>
      <Circle
        animate
        animationDuration="1s"
        bgColor="whitesmoke"
        lineWidth={30}
        progress={percentage}
        progressColor={percentage > 25 ? 'cornflowerblue' : 'red'}
        responsive
        showPercentage={false}
        showPercentageSymbol={false}
        size={150}
      />
    </div>
  );
}

export default memo(CountdownTimer);
