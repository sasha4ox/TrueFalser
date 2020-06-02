import React, {
  useEffect, useCallback, useRef, useState,
} from 'react';
import { useSelector } from 'react-redux';
import property from 'lodash/property';
import isEmpty from 'lodash/isEmpty';
import { Link } from 'react-router-dom';

import userSvg from '../../assets/user.svg';
import trueFalserLogo from '../../assets/true_falser_logo.png';
import './Header.scss';
import elifechLogo from '../../assets/eliftech.ico';

function Header() {
  const currentUserName = useSelector(property('authorization.userData.name'));
  const headerWidth = useRef();
  const initialWidth = null;
  const mobileWidth = 450;
  const [currentWidth, setCurrentWidth] = useState(initialWidth);
  const getWindowWidth = useCallback(() => {
    setCurrentWidth(headerWidth.current.offsetWidth);
    console.info('currentWidth!!!!!', currentWidth);
  }, [currentWidth]);

  useEffect(() => {
    if (currentWidth === initialWidth) {
      getWindowWidth();
    }
    headerWidth.current.addEventListener('headerWidth', getWindowWidth);
    const currentHeaderWidth = headerWidth.current;
    return function removeHeaderWidthListener() {
      if (currentWidth === headerWidth.current.offsetWidth) {
        currentHeaderWidth.removeEventListener('headerWidth', getWindowWidth);
      }
    };
  }, [currentWidth, getWindowWidth]);

  return (
    <header ref={headerWidth} className="header">
      <div className="appInfo">
        <div className="headerLinks">
          <h2 className="logo">
            <Link to="/">
              <img alt="Logo" src={trueFalserLogo} />
            </Link>
          </h2>
          <h2 className="logoText">
            <Link to="/">TrueFalsr</Link>
          </h2>
          {/* <div className="statistic"> */}
          {/*  <Link to="/statistic/all-languages-answers">Statistic</Link> */}
          {/* </div> */}
        </div>
        <div className="descriptionContainerDiv">
          <span>Code Readability Quiz</span>
          {(isEmpty(currentUserName) && currentWidth <= mobileWidth)
              || (currentWidth >= mobileWidth) ? (
                <div className="descriptionContainer">
                  <span>made by  </span>
                  <a href="https://www.eliftech.com/" target="_blank">
                    <span>Eliftech  </span>
                    <img alt="Eliftech" src={elifechLogo} />
                  </a>
                </div>
            ) : <span />}
        </div>
      </div>
      <div className="userDataContainer">
        {!isEmpty(currentUserName) && currentWidth >= mobileWidth && (
          <img alt={currentUserName} src={userSvg} />
        )}
        {!isEmpty(currentUserName) && <span>{currentUserName}</span>}
      </div>
    </header>
  );
}
export default Header;
