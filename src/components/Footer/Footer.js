import React from 'react';

import elifechLogo from '../../assets/eliftech.ico';
import './Footer.scss';

function Footer() {
  return (
    <footer className="footerContainer">
      <div className="footerContainerDiv">
        <span>Made by  </span>
        <a href="https://www.eliftech.com/" target="_blank">
          <span>Eliftech  </span>
          <img alt="Eliftech" src={elifechLogo} />
        </a>
      </div>
    </footer>
  );
}
export default Footer;
