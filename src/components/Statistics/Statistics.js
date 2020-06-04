import React, { memo, useEffect } from "react";
import _map from "lodash/map";
import _toLower from "lodash/toLower";
import _head from "lodash/head";
import { NavLink } from "react-router-dom";
import classnames from "classnames";
import { useDispatch, useSelector } from "react-redux";

import style from "./Statistics.module.scss";
import Header from "../Header/Header";
import { getStatistics } from "../../actions/statistics";
import property from "lodash/property";
import isEmpty from "lodash/isEmpty";

function Statistics() {
  const dispatch = useDispatch();
  const statistics = useSelector(property("statistics.data"));
  const statisticsMetric = !isEmpty(statistics) && Object.keys(statistics);
  useEffect(() => {
    dispatch(getStatistics());
  }, []);

  return (
    <>
      <Header />
      {/* <ul className={classnames("nav nav-tabs", style.nav)}>
        {_map(statistics, (item, index) => {
          return (
            <li className="nav-item" key={index}>
              <NavLink
                className="nav-link active"
                activeClassName={style.activeTab}
                to={`/statistic/${_toLower(item.name)}`}
              >
                {item.name}
              </NavLink>
            </li>
          );
        })}
      </ul> */}
      <ul className={classnames("nav nav-tabs", style.nav)}>
        {_map(statisticsMetric, (item, index) => {
          return (
            <li className="nav-item" key={index}>
              <NavLink
                className="nav-link active"
                activeClassName={style.activeTab}
                to={`/statistic/${item}`}
              >
                {/* |([0-9])([A-Z]) */}
                {item
                  .replace(/([a-z])([A-Z])/g, "$1 $2")
                  .replace(/([0-9])([A-Z])/g, "$1 $2")
                  .toLowerCase()
                  .replace(_head(item), _head(item).toUpperCase())}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </>
  );
}
export default memo(Statistics);
