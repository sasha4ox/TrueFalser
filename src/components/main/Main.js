import React from "react";
import { Link } from "react-router-dom";
import "./Main.scss";
function Main() {
  return (
    <main className="main">
      <p>Let's train your brain with awesome app for programmers "TrueFalsr"</p>

      <Link to="/login">Login</Link>
      <Link to="/registration">Registration</Link>
      <Link to="/login">Just play</Link>
    </main>
  );
}
export default Main;
