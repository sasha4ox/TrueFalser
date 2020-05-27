import React, { useEffect, useRef } from "react";
import Prism from "prismjs";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import _map from "lodash/map";
function Code({ lang, code }) {
  const codeEl = useRef();
  const highligh = () => {
    if (codeEl && codeEl.current) {
      Prism.highlightElement(codeEl.current);
    }
  };

  useEffect(() => {
    // highligh();

    setTimeout(() => {
      Prism.highlightAll();
    }, 0);

    // return () => {
    //   document.removeEventListener(
    //     "DOMContentLoaded",
    //     Prism.highlightElement(codeEl.current)
    //   );
    // };
  }, [code]);
  console.log(code);
  return (
    <pre className="keep-markup">
      <code ref={codeEl} className="language-javascript">
        {_map(code, (item, index) => {
          if (item.isStartWithNewString) {
            return (
              <div key={index}>
                {item.code} <br />
              </div>
            );
          }
          if (item.isFinishMarkLAst) {
            return (
              <div key={index}>
                <br />
                {item.code}
              </div>
            );
          }
          if (item.marked) {
            return <mark key={index}>{item.code}</mark>;
          }
          return item.code;
        })}
        {/* {code[0].code} */}
      </code>
    </pre>
  );
}
export default Code;
