import React from "react";
import { useSelector } from "react-redux";
import property from 'lodash/property';
import isEmpty from 'lodash/isEmpty';
import { Link } from "react-router-dom";

import "./Header.scss";


function Header() {
  const currentUserName = useSelector(property('authorization.userData.name'));
  return (
    <header className="header">
        <div className="headerLinks">
            <h2 className="logo">
                <Link to="/">TrueFalsr</Link>
            </h2>
            <div className="statistic">
                <Link to="/statistic/all-languages-answers">
                    Statistic
                </Link>
            </div>
        </div>
       {!isEmpty(currentUserName) && <span>{currentUserName}</span>}
    </header>
  );
}
export default Header;
