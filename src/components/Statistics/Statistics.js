import React, { memo } from "react";
import _map from "lodash/map";
import { NavLink } from "react-router-dom";
import classnames from "classnames";

import style from "./Statistics.module.scss";
import Header from "../Header/Header";

const data = ["Hard", 2, 3, 4, 5, 6, 7];

function Statistics() {
  return (
    <>
      <Header />
      <ul className={classnames("nav nav-tabs", style.nav)}>
        {_map(data, (item, index) => {
          return (
            <li className="nav-item" key={index}>
              <NavLink
                className="nav-link active"
                activeClassName={style.activeTab}
                to={`/statistic/${item}`}
              >
                {item}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </>
  );
}
export default memo(Statistics);
