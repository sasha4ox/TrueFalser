import React, { useEffect, useCallback, useRef, useState } from "react";
import { useSelector } from "react-redux";
import property from "lodash/property";
import isEmpty from "lodash/isEmpty";
import { Link } from "react-router-dom";

import userSvg from "../../assets/user.svg";
import trueFalserLogo from "../../assets/true_falser_logo.png";
import style from "./Header.module.scss";
import elifechLogo from "../../assets/eliftech.ico";

function Header() {
  const currentUserName = useSelector(property("authorization.userData.name"));
  const headerWidth = useRef();
  const initialWidth = null;
  const mobileWidth = 450;
  const [currentWidth, setCurrentWidth] = useState(initialWidth);
  const getWindowWidth = useCallback(() => {
    setCurrentWidth(headerWidth.current.offsetWidth);
  }, [currentWidth]);

  useEffect(() => {
    if (currentWidth === initialWidth) {
      getWindowWidth();
    }
    headerWidth.current.addEventListener("headerWidth", getWindowWidth);
    const currentHeaderWidth = headerWidth.current;
    return function removeHeaderWidthListener() {
      if (currentWidth === headerWidth.current.offsetWidth) {
        currentHeaderWidth.removeEventListener("headerWidth", getWindowWidth);
      }
    };
  }, [currentWidth, getWindowWidth]);

  return (
    <header ref={headerWidth} className={style.header}>
      <div className={style.appInfo}>
        <div className={style.headerLinks}>
          <h2 className={style.logo}>
            <Link to="/">
              <img alt="Logo" src={trueFalserLogo} />
            </Link>
          </h2>
          <h2 className={style.logoText}>
            <Link to="/">TrueFalsr</Link>
          </h2>
          {/* <div className="statistic">*/}
          {/*  <Link to="/statistic/all-languages-answers">Statistic</Link>*/}
          {/*</div> */}
        </div>
        <div className={style.descriptionContainerDiv}>
          <span>Code Readability Quiz</span>
          {(isEmpty(currentUserName) && currentWidth <= mobileWidth) ||
          currentWidth >= mobileWidth ? (
            <div className={style.descriptionContainer}>
              <span>made by </span>
              <a href="https://www.eliftech.com/" target="_blank">
                <span>Eliftech </span>
                <img alt="Eliftech" src={elifechLogo} />
              </a>
            </div>
          ) : (
            <span />
          )}
        </div>
      </div>
      <div className={style.links}>
        <div className={style.statistic}>
          <Link to="/statistic/averageTimeOfCorrectAnswers">Statistic</Link>
        </div>
      </div>

      <div className={style.userDataContainer}>
        {!isEmpty(currentUserName) && currentWidth >= mobileWidth && (
          <img alt={currentUserName} src={userSvg} />
        )}
        {!isEmpty(currentUserName) && <span>{currentUserName}</span>}
      </div>
    </header>
  );
}
export default Header;
