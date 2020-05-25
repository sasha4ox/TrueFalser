import React from "react";
import { useSelector } from "react-redux";
import property from 'lodash/property';
import isEmpty from 'lodash/isEmpty';

import "./Header.scss";


function Header() {
  const currentUserName = useSelector(property('authorization.userData.name'));
  return (
    <header className="header">
       <h2 className="logo">TrueFalsr</h2>
       {!isEmpty(currentUserName) && <span>{currentUserName}</span>}
    </header>
  );
}
export default Header;
