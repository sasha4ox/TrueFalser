import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
function App() {
  const codeString = `
  const trueFlase = typeof NaN === 'number'
  let a;
  if(trueFlase){
    a =  10
  } else{
    a= 5
  }
  let b = 2;
  console.log(a + b); //12`;
  const codeString2 = `def say_hello():
    print("Hello")
     
say_hello()
say_hello()
say_hello()


def sum(*params):
    result = 0
    for n in params:
        result += n
    return result
 
 
sumOfNumbers1 = sum(1, 2, 3, 4, 5)      # 15
sumOfNumbers2 = sum(3, 4, 5, 6)         # 18
print(sumOfNumbers1)
print(sumOfNumbers2)
`;
  const codeString3 = `<?php
  function recursion($a)
  {
      if ($a < 20) {
          echo "$a";
          recursion($a + 1);
      }
  }
  ?>`;
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
