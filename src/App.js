import React, { memo, useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SyntaxHighlighter from "react-syntax-highlighter";
import isEmpty from "lodash/isEmpty";
import property from "lodash/property";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Switch, Route, Redirect } from "react-router-dom";

import _trim from "lodash/trim";
import _split from "lodash/split";
import _last from "lodash/last";
import _head from "lodash/head";
import Main from "./components/main/Main";
import Header from "./components/header/Header";
import Quiz from "./components/Quiz/Quiz";
import ChooseLanguage from "./components/ChooseLanguage/ChooseLanguage";
import Authorization from "./components/Authorization";
import ParseUrlPage from "./components/ParseUrlPage";
import Registration from "./components/Authorization/components/registration/Registration";

// import Prism from "prismjs";

function App() {
  const userData = useSelector(property("authorization.userData"));
  const googleUrl = useSelector(property("authorization.googleUrl"));

  // useEffect(() => {
  //   setTimeout(() => Prism.highlightAll(), 0);
  // });

  const code = `
  const foo = 'foo';
  const bar = 'bar';
  <mark>text</mark>
  console.log(foo + bar);
  echo()
  `.trim();

  const submitCode = (event) => {
    event.preventDefault();
    if (textAreaText === "") {
      return;
    }
    splitCode(textAreaText);
    setTextAreaText("");
  };
  const [textAreaText, setTextAreaText] = useState("");
  const changeTextCode = (event) => {
    setTextAreaText(event.target.value);
    console.log(textAreaText);
  };
  const [convertedStrings, setConvertedStrings] = useState([]);
  const defaultStrings = [
    {
      code: `*START* function noMatterWhat(item){
    return item*2
  }
  const trueFalse = typeof NaN === 'number'
  let a;
  if(trueFalse){
    a =  10
  } else{
    a= 5
  }
  let b = 2;
  console.log(a + b); //12 *FINISH*`,
    },
    {
      code: `def say_hello():
  print("Hello")

  say_hello()
  say_hello()
  say_hello()
  *START*
  def sum(*params):
  result = 0
  for n in params:
      result += n
  return result
  *FINISH*
  sumOfNumbers1 = sum(1, 2, 3, 4, 5)      # 15
  sumOfNumbers2 = sum(3, 4, 5, 6)         # 18
  print(sumOfNumbers1)
  print(sumOfNumbers2)
  `,
    },
    {
      code: `<?php
        *START*
  function recursion($a)
  {
      if ($a < 20) {
          echo "$a";
          recursion($a + 1);
      }

  }
  ?> *FINISH*`,
    },
  ];

  function splitCode(string) {
    const arrayOfString = [];
    const isStartWithNewString = isEmpty(
      string
        .split("\n")
        .filter((item) => item.includes("*START*"))
        .join("")
        .split("*START*")[0]
    );
    const isFinishMarkLAst = isEmpty(
      string
        .split("\n")
        .filter((item) => item.includes("*FINISH*"))
        .join("")
        .split("*FINISH*")[1]
    );
    const firstPartOfCode = _trim(_head(_split(string, "*START*")));
    const codeWithFinishMark = _trim(_last(_split(string, "*START*")));
    const codeWithBackground = _trim(
      _head(_split(codeWithFinishMark, "*FINISH*"))
    );
    const thirdPartOfCode = _trim(
      _last(_split(codeWithFinishMark, "*FINISH*"))
    );
    if (isEmpty(thirdPartOfCode) && isEmpty(firstPartOfCode)) {
      arrayOfString.push({ code: codeWithBackground, marked: true });
    } else if (isEmpty(thirdPartOfCode)) {
      arrayOfString.push(
        { code: firstPartOfCode, marked: false, isStartWithNewString },
        { code: codeWithBackground, marked: true }
      );
    } else if (isEmpty(firstPartOfCode)) {
      arrayOfString.push(
        { code: codeWithBackground, marked: true },
        { code: thirdPartOfCode, marked: false, isFinishMarkLAst }
      );
    } else if (!isEmpty(thirdPartOfCode)) {
      arrayOfString.push(
        { code: firstPartOfCode, marked: false, isStartWithNewString },
        { code: codeWithBackground, marked: true },
        { code: thirdPartOfCode, marked: false, isFinishMarkLAst }
      );
    }
    return arrayOfString;
  }
  const [codeLanguages, setCodeLanguages] = useState("javascript");
  const changeCodeLanguages = useCallback((event) => {
    setCodeLanguages(event.target.name);
  });

  return (
    <div>
      <Header />
      <Switch>
        <Route path="/callback">
          <ParseUrlPage />
        </Route>
        {/* <Route
            path={["/login", "/registration"]}
            component={Authorization}
        /> */}
        <Route
          path={["/select-language", "/quiz", "quiz/:id"]}
          // render={() => <Main/>}
          component={Main}
        />
        {/* <Route
          path="/"
          render={() => (!isEmpty(userData) ? <Redirect to="/select-language" /> : <Redirect to="/login"/>)}
        /> */}
        <Redirect to="/select-language" />
      </Switch>

      {/* I thought code below works as we want, but no */}
      {/* <pre className="keep-markup">
        <code className="language-js">
          {splitCode(`function  noMatterWhat (item){
  return *START* item*2
}
const trueFalse = typeof NaN === 'number'
let a;
if(trueFalse){
  a =  10
} else{
  *FINISH*
  a= 5
}
let b = 2;
console.log(a + b); //12`).map((item) => {
            if (item.isStartWithNewString) {
              return (
                <div>
                  {item.code} <br />
                </div>
              );
            }
            if (item.isFinishMarkLAst) {
              return (
                <div>
                  <br />
                  {item.code}
                </div>
              );
            }
            if (item.marked) {
              return <mark>{item.code}</mark>;
            }
            return item.code;
          })}
        </code>
      </pre> */}
    </div>
  );
}

export default memo(App);
