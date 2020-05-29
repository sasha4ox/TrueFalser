import React, { memo } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import property from "lodash/property";
function LanguageTimer({ seconds }) {
  const currentQuestionLanguage = useSelector(
    property("quiz.allQuestions.currentQuestion[0].Language.name")
  );

  return (
    <div className="wrapperFor_timer_language">
      <div className="question_language"> {currentQuestionLanguage}</div>
    </div>
  );
}

LanguageTimer.propTypes = {
  seconds: PropTypes.number,
};

export default memo(LanguageTimer);
