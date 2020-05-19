import React from "react";
import { useDispatch } from "react-redux";
import { clickOnText } from "./actions/click";
function App() {
  const dispatch = useDispatch();
  const clickMe = () => {
    dispatch(clickOnText());
  };
  return <div onClick={clickMe}>Hello world</div>;
}

export default App;
