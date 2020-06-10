import React, { memo, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import property from "lodash/property";
import _map from "lodash/map";
import _filter from "lodash/filter";
import _isNull from "lodash/isNull";
import isEmpty from "lodash/isEmpty";
import get from "lodash/get";

import {
  selectLanguage,
  getLanguages,
  startQuizAgain,
  showLanguages,
} from "../../actions/quiz";
import Spinner from "../Spinner";
import Header from "../Header/Header";

import style from "./ChooseLanguage.module.scss";
import UserLanguages from "./components/UserLanguages/UserLanguages";

function ChooseLanguage() {
  const MIN_LVL_LANGUAGE_SKILL = 0;
  const dispatch = useDispatch();
  const languages = useSelector(property("quiz.language.languages"));
  const userLanguages = _filter(
    useSelector(property("authorization.userData.userLanguages")),
    (language) => language.myAssessment !== MIN_LVL_LANGUAGE_SKILL
  );
  const isShowMyLanguages = useSelector(property("quiz.isShowMylanguages"));
  const isLanguageLoading = useSelector(property("quiz.language.loading"));
  const isLanguageSelected = useSelector(
    property("quiz.language.selectedLanguage")
  );
  const isLanguageSet = useSelector(property("authorization.isLanguageSet"));

  const selectedLanguage = useCallback(
    (event) => {
      const selectedLanguge = _filter(languages, (language) =>
        get(event, "target.name") === "All languages"
          ? true
          : get(event, "target.name").includes(language.name)
      );
      dispatch(selectLanguage(selectedLanguge));
    },
    [dispatch, languages]
  );

  useEffect(() => {
    if (!_isNull(isLanguageSelected)) dispatch(startQuizAgain());
    dispatch(getLanguages());
  }, [dispatch, isLanguageSelected]);

  const handleChange = useCallback(
    (event) => {
      dispatch(showLanguages(event.target.checked));
    },
    [dispatch]
  );

  return (
    <>
      <Header />
      {!isEmpty(userLanguages) && (
        <form>
          <label>
            <input
              type="checkbox"
              name="showMyLanguages"
              onChange={handleChange}
            />
            Show only my languages
          </label>
        </form>
      )}
      {isLanguageSet && !isShowMyLanguages && (
        <main className={style.choose_main}>
          <h1>Select language for Quiz</h1>
          {isLanguageLoading && <Spinner />}
          {!isLanguageLoading &&
            _map(languages, (language) => {
              return (
                <div key={language.id} className={style.choose_lang}>
                  <Link
                    to="/quiz"
                    name={language.name}
                    onClick={selectedLanguage}
                  >
                    {language.name}
                  </Link>
                </div>
              );
            })}
        </main>
      )}
      {isLanguageSet && isShowMyLanguages && (
        <main className={style.choose_main}>
          <h1>Select language for Quiz</h1>
          <div className={style.choose_lang}>
            {_map(userLanguages, (language) => {
              return (
                <Link
                  key={language.LanguageId}
                  to="/quiz"
                  name={language.Language.name}
                  onClick={selectedLanguage}
                >
                  {language.Language.name}
                </Link>
              );
            })}
            <Link
              to="/quiz"
              name={userLanguages
                .map((language) => language.Language.name)
                .join(" ")}
              onClick={selectedLanguage}
            >
              All My languages
            </Link>
          </div>
        </main>
      )}
      {!isLanguageSet && <UserLanguages />}
    </>
  );
}
export default memo(ChooseLanguage);
