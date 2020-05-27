import isEmpty from "lodash/isEmpty";
import _trim from "lodash/trim";
import _split from "lodash/split";
import _last from "lodash/last";
import _head from "lodash/head";
import _join from "lodash/join";
import _filter from "lodash/filter";
function splitCode(string) {
  const arrayOfString = [];
  const isStartWithNewString = isEmpty(
    _split(
      _join(
        _filter(_split(string, "\n"), (item) => item.includes("*FINISH*")),
        ""
      ),
      "*FINISH*"
    )
    // string
    //   .split("\n")
    //   .filter((item) => item.includes("*START*"))
    //   .join("")
    //   .split("*START*")[0]
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
  const thirdPartOfCode = _trim(_last(_split(codeWithFinishMark, "*FINISH*")));
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
export default splitCode;
