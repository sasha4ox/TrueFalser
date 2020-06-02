import React, { memo, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import property from 'lodash/property';
import _map from 'lodash/map';
import _filter from 'lodash/filter';
import _isNull from 'lodash/isNull';
import get from 'lodash/get';

import {
  selectLanguage,
  getLanguages,
  startQuizAgain,
} from '../../actions/quiz';
import Spinner from '../Spinner';
import Header from '../Header/Header';

import './ChooseLanguage.scss';

function ChooseLanguage() {
  const dispatch = useDispatch();
  const languages = useSelector(property('quiz.language.languages'));
  const isLanguageLoading = useSelector(property('quiz.language.loading'));
  const isLanguageSelected = useSelector(
    property('quiz.language.selectedLanguage'),
  );
  const selectedLanguage = useCallback(
    (event) => {
      const selectedLanguge = _filter(
        languages,
        (language) => language.id === Number(get(event, 'target.name')),
      );
      dispatch(selectLanguage(...selectedLanguge));
    },
    [dispatch, languages],
  );
  useEffect(() => {
    if (!_isNull(isLanguageSelected)) dispatch(startQuizAgain());
    dispatch(getLanguages());
  }, [dispatch, isLanguageSelected]);
  return (
    <>
      <Header />
      <main className="choose_main">
        <h1>Select language for Quiz</h1>
        {isLanguageLoading && <Spinner />}
        {!isLanguageLoading
          && _map(languages, (language) => (
            <div key={language.id} className="choose_lang">
              <Link name={language.id} onClick={selectedLanguage} to="/quiz">
                {language.name}
              </Link>
            </div>
          ))}
      </main>
    </>
  );
}
export default memo(ChooseLanguage);
