import React, { useEffect, useRef, useCallback } from "react";
import Prism, { } from "prismjs";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
// import Highlight, { defaultProps } from "prism-react-renderer";
// import theme from "prism-react-renderer/themes/nightOwl";
import styled from "styled-components";
import _map from "lodash/map";
import {useDispatch, useSelector} from "react-redux";
import property from "lodash/property";

import "./Code.scss";

function Code({ lang, code }) {
    const codeEl = useRef();
    const codePre = useRef();
    // console.info('codePre!!!', codePre);
    setTimeout(
    () => {
            console.info('Prism.highlightAll() update!!!');
            Prism.highlightAll();
            }, 0);
    // codePre.style.overflow = "hidden";
    // const dispatch = useDispatch;
    // const currentQuestionId = useSelector(
    //     property("quiz.allQuestions.currentQuestion[0].id")
    // );
    // const currentQuestionText = useSelector(
    //     property("quiz.allQuestions.currentQuestion[0].text")
    // );
    // const highligh = () => {
    //     if (codeEl && codeEl.current) {
    //         Prism.highlightElement(codeEl.current);
    //     }
    // };

    useEffect(() => {
        if (code) {
            Prism.highlightAll();
            // setTimeout(() => {
            //     console.info('Prism.highlightAll() in useEffect!!!');
            //     Prism.highlightAll();
            // }, 0);
        }
    }, [code]);

    const Pre = styled.pre`
    text-align: left;
    margin: 1em 0;
    padding: 0.5em;
    overflow: scroll;
  `;

  //   const Line = styled.div`
  //   display: table-row;
  // `;
  //
  //   const LineNo = styled.span`
  //   display: table-cell;
  //   text-align: right;
  //   padding-right: 1em;
  //   user-select: none;
  //   opacity: 0.5;
  // `;
  //
  //   const LineContent = styled.span`
  //   display: table-cell;
  // `;
    return (
      <>
        <div className="codeRoot">
            <Pre ref={codePre} className="keep-markup">
                <code ref={codeEl} className="language-javascript">
                    {_map(code, (item, index) => {
                        if (item.isStartWithNewString) {
                            // const currentElement = Prism.highlight(item.code, Prism.languages.javascript, `${lang}`);
                            return `${item.code}`
                        }
                        if (item.isFinishMarkLAst) {
                            return `${item.code}`;
                            // return (
                            //   <div key={index}>
                            //     <br />
                            //     {item.code}
                            //   </div>
                            // );
                        }
                        if (item.marked) {
                            return <mark key={index}>{item.code}</mark>;
                        }
                        return item.code;
                    })}
                </code>
            </Pre>
        </div>
     </>
    );
}
export default Code;
