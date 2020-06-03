import React, { memo } from "react";
import { useParams } from "react-router-dom";

import style from "./SelectedStatistic.module.scss";

function SelectedStatistic() {
  const { id } = useParams();

  return (
    <div className={style.statistic}>
      <h1>{id}</h1>
    </div>
  );
}

export default memo(SelectedStatistic);
