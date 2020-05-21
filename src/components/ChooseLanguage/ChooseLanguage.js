import React, { memo, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import get from "lodash/get";
import { selectLanguage, getLanguages } from "../../actions/quiz";
import property from "lodash/property";
import _map from "lodash/map";
import isEmpty from "lodash/isEmpty";
import _filter from "lodash/filter";
import "./ChooseLanguage.scss";
function ChooseLanguage() {
  const dispatch = useDispatch();
  const languages = useSelector(property("quiz.language.languages"));
  console.log(languages);
  const selectedLanguage = useCallback(
    (event) => {
      const selectedLanguge = _filter(
        languages,
        (language) => language.id === Number(get(event, "target.name"))
      );
      dispatch(selectLanguage(...selectedLanguge));
    },
    [dispatch, languages]
  );
  useEffect(() => {
    dispatch(getLanguages());
  }, [dispatch]);
  return (
    <main className="choose_main">
      <h1>Select language for Quiz</h1>
      {!isEmpty(languages) &&
        _map(languages, (language) => {
          return (
            <div key={language.id} className="choose_lang">
              <Link to="/quiz" name={language.id} onClick={selectedLanguage}>
                {language.name}
              </Link>
            </div>
          );
        })}
    </main>
  );
}
export default memo(ChooseLanguage);
