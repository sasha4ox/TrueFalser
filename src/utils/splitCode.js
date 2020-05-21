import isEmpty from "lodash/isEmpty";
import _trim from "lodash/trim";
import _split from "lodash/split";
import _last from "lodash/last";
import _head from "lodash/head";
function splitCode(string) {
  const arrayOfString = [];
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
      { code: firstPartOfCode, marked: false },
      { code: codeWithBackground, marked: true }
    );
  } else if (isEmpty(firstPartOfCode)) {
    arrayOfString.push(
      { code: codeWithBackground, marked: true },
      { code: thirdPartOfCode, marked: false }
    );
  } else if (!isEmpty(thirdPartOfCode)) {
    arrayOfString.push(
      { code: firstPartOfCode, marked: false },
      { code: codeWithBackground, marked: true },
      { code: thirdPartOfCode, marked: false }
    );
  }
  return arrayOfString;
}
export default splitCode;
