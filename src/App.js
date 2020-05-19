import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { clickOnText } from "./actions/click";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
function App() {
  const codeString = `
  if(dsdss){dsds} else{dsds}
  let a = 1;
  let b = 2
  console.log(a + b = 3);`;
  const codeString2 = `
  if(abc){
    console.log('hi there')
  }
  
  output: undefined`;
  const codeString3 = `
  if({}){
    return 10
  }
  output: 10
 `;
  const dispatch = useDispatch();
  const [codeLanguages, setCodeLanguages] = useState("javascript");
  const changeCodeLanguages = useCallback((event) => {
    setCodeLanguages(event.target.name);
  });
  return (
    <div>
      <SyntaxHighlighter
        language={codeLanguages}
        style={docco}
        customStyle={{ width: "90%", margin: "15px auto" }}
      >
        {codeString}
      </SyntaxHighlighter>
      <SyntaxHighlighter
        language={codeLanguages}
        style={docco}
        customStyle={{ width: "90%", margin: "15px auto" }}
      >
        {codeString2}
      </SyntaxHighlighter>
      <SyntaxHighlighter
        language={codeLanguages}
        style={docco}
        customStyle={{ width: "90%", margin: "15px auto" }}
      >
        {codeString3}
      </SyntaxHighlighter>
      <div className="wrapper-forButton">
        <button name="javascript" onClick={changeCodeLanguages}>
          javascript
        </button>
        <button name="php" onClick={changeCodeLanguages}>
          php
        </button>
        <button name="python" onClick={changeCodeLanguages}>
          python
        </button>
      </div>
    </div>
  );
}

export default App;
