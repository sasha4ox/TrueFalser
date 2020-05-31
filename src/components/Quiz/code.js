import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import isArray from "lodash/isArray";
import _map from "lodash/map";
import classnames from "classnames";
function Code({ code }) {
  return (
    <>
      {_map(code, (itemCode) => {
        if (isArray(itemCode.code)) {
          return (
            <div
              className={classnames({
                string_start: itemCode.isStartSeparated === true,
                string_finish: itemCode.isStartSeparated === false,
                divededOnOneline: itemCode.isBetweenStartFinish,
              })}

              // {
              //   itemCode.isStartSeparated ? "string_start" : "string_finish"
              // }
            >
              {_map(itemCode.code, (item) => {
                return (
                  <SyntaxHighlighter language="javascript" style={docco}>
                    {item}
                  </SyntaxHighlighter>
                );
              })}
            </div>
          );
        } else {
          return (
            <div className={itemCode.marked && "marked_string"}>
              <SyntaxHighlighter language="javascript" style={docco}>
                {itemCode.code}
              </SyntaxHighlighter>
            </div>
          );
        }
      })}
    </>
  );
}
export default Code;
