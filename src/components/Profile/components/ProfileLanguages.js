import React, { useCallback, useEffect } from "react";
import { Field, reduxForm } from "redux-form";
import { useSelector, useDispatch, connect } from "react-redux";
import _map from "lodash/map";
import get from "lodash/get";
import _forEach from "lodash/forEach";
import property from "lodash/property";
import isEmpty from "lodash/isEmpty";

import UserLanguageFieldSelect from "../../ChooseLanguage/components/UserLanguageFieldSelect";

import style from "../../ChooseLanguage/components/UserLanguages.module.scss";
import {
  setUserLanguages,
  setUserLanguagesSkip,
} from "../../../actions/authorization";
import Spinner from "../../Spinner";
import options from "../../../constants/optionsForSelectLanguage";
import { getLanguages } from "../../../actions/quiz";

function ProfileLanguages() {
  const languages = useSelector(property("quiz.language.languages"));
  const languagesIsLoading = useSelector(property("quiz.language.loading"));
  const formValue = useSelector(property("form.language.values"));
  const userId = useSelector(property("authorization.userData.id"));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLanguages());
  }, [dispatch]);

  const skipButton = useCallback(() => {
    dispatch(setUserLanguagesSkip());
  }, [dispatch]);

  const submitForm = useCallback(
    (event) => {
      event.preventDefault();
      const userLanguages = _map(languages, (language) => {
        return {
          LanguageId: language.id,
          UserId: userId,
          myAssessment: get(formValue, `${language.name}.value`) || null,
        };
      });
      const answerToServer = {
        UserId: userId,
        userLanguages,
      };
      dispatch(setUserLanguages(answerToServer));
    },
    [formValue, userId, dispatch]
  );

  return (
    <>
      <h1 className={style.selectLanguageText}>
        Please, provide for us your skill level of languages.
      </h1>
      {languagesIsLoading && <Spinner />}
      {!languagesIsLoading && (
        <>
          <form id="languages" className={style.form} onSubmit={submitForm}>
            <div>
              {_map(languages, (language) => {
                return (
                  <Field
                    key={language.id}
                    name={language.name}
                    label={language.name}
                    options={options}
                    component={UserLanguageFieldSelect}
                  />
                );
              })}
            </div>
          </form>
          <div className={style.wrapperButtons}>
            <button
              type="submit"
              form="languages"
              className={style.button}
              disabled={isEmpty(formValue)}
            >
              Save
            </button>
          </div>
        </>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  let initialValues = {};
  _forEach(get(state, "authorization.userData.userLanguages"), (language) => {
    initialValues[`${language.Language.name}`] = {
      value: language.myAssessment,
      label: options.filter(
        (option) => option.value === language.myAssessment
      )[0].label,
    };
  });
  return { initialValues };
};

export default connect(mapStateToProps)(
  reduxForm(
    {
      form: "language",
    },
    mapStateToProps
  )(ProfileLanguages)
);
