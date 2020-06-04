import React, { memo } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import property from "lodash/property";
import _filter from "lodash/filter";
import isEmpty from "lodash/isEmpty";
import _toLower from "lodash/toLower";
import _head from "lodash/head";
import _map from "lodash/map";
import style from "./SelectedStatistic.module.scss";

function SelectedStatistic() {
  const { id } = useParams();
  const statistics = useSelector(property("statistics.data"));
  // const currentStatistic = _head(
  //   _filter(statistics, (item) => _toLower(item.name) === id)
  // );
  // const currentStatistic = useSelector(property(`statistic.data.${id}`));
  const currentStatistic = useSelector(property(`statistics.data.${id}`));
  console.log("currentStatistic", currentStatistic);
  return (
    <>
      {/* {!isEmpty(currentStatistic) && (
        <div className={style.statistic}>
          <p>
            {`Correct answers, average time: ${currentStatistic.averageTimeOfCorrectAnswers} sec`}
          </p>
          <p>
            Incorrect answers, average time:
            {currentStatistic.averageTimeOfIncorrectAnswers}
          </p>
          <p>Correct answers: {currentStatistic.correctAnswers}</p>
          <p>
            Percentile95 of correct answers:
            {currentStatistic.percentile95OfCorrect}
          </p>
          <p>
            Percentile95 of incorrect answers:
            {currentStatistic.percentile95OfIncorrect}
          </p>
          <p>Total answers:{currentStatistic.totalAnswers}</p>
        </div>
        
      )} */}
      {!isEmpty(currentStatistic) && (
        <div className={style.statistic}>
          {_map(currentStatistic, (item, index) => {
            return (
              <div key={index} className={style.statisticItem}>
                {item[`${id}`] && (
                  <p>
                    {item.name} <span>{item[`${id}`]}</span>
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

export default memo(SelectedStatistic);
