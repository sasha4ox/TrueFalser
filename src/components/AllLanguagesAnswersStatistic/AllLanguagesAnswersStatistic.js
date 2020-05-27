import React from 'react';
import { useSelector } from 'react-redux';
import Circle from 'react-circle';
import isEmpty from 'lodash/isEmpty'
import map from 'lodash/map';
import property from 'lodash/property';
import get from 'lodash/get';
import isNan from 'lodash/isNaN';

import './AllLanguagesAnswersStatistic.scss'

function AllLanguagesAnswersStatistic() {
  const allLanguagesAnswersStatistic = useSelector(property('statistic.allLanguagesAnswersStatistic'));
  return (
     <div className="allLanguagesAnswersStatistic">
         <p>All languages correct answers statistic</p>
         <div className="allLanguagesAnswersStatisticItems">
             { !isEmpty(allLanguagesAnswersStatistic) ? (
                 map(allLanguagesAnswersStatistic, item => {
                     const correctAnswersInPercent = Math.round(
                         Number(get(item, 'correctAnswers'))
                         / Number(get(item, 'totalAnswers'))
                         * 100
                     );
                     console.info('correctAnswersInPercent!!', correctAnswersInPercent);
                     const answersValue = !isNan(correctAnswersInPercent)
                         ? correctAnswersInPercent
                         : 0;
                     const textColorStyle =
                         correctAnswersInPercent >= 70
                          ? "#28a745"
                          : "#e3b713";
                     return (
                         <div key={get(item, 'id')}>
                             <p>{get(item, 'name')}</p>
                             <Circle
                                 animate={true}
                                 animationDuration="1s"
                                 size={150}
                                 progress={answersValue}
                                 progressColor="cornflowerblue"
                                 bgColor="whitesmoke"
                                 textColor={textColorStyle}
                                 textStyle={{
                                     font: 'bold 5rem Helvetica, Arial, sans-serif'
                                 }}
                                 percentSpacing={10}
                                 roundedStroke={true}
                                 showPercentage={true}
                                 showPercentageSymbol={true}
                             />
                         </div>
                     );
                 })
             ) : (<span>No data eat</span>)

             }
         </div>
     </div>
  );
}

export default AllLanguagesAnswersStatistic;