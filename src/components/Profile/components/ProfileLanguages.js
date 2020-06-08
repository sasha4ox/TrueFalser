import React, { useCallback, useEffect } from "react";
import { Field, reduxForm } from "redux-form";
import { useSelector, useDispatch, connect } from "react-redux";
import _map from "lodash/map";
import get from "lodash/get";
import _forEach from "lodash/forEach";
import property from "lodash/property";
import isEmpty from "lodash/isEmpty";
import isEqual from "lodash/isEqual";

import UserLanguageFieldSelect from "../../ChooseLanguage/components/UserLanguageFieldSelect";

import style from "../../ChooseLanguage/components/UserLanguages.module.scss";
import {
  updateUserLanguages,
  getUserLanguages,
  setUserLanguages,
} from "../../../actions/authorization";
import Spinner from "../../Spinner";
import options from "../../../constants/optionsForSelectLanguage";
import { getLanguages } from "../../../actions/quiz";

function ProfileLanguages() {
  const languages = useSelector(property("quiz.language.languages"));
  const languagesIsLoading = useSelector(property("quiz.language.loading"));
  const formValue = useSelector(property("form.language.values"));
  const formValueInitial = useSelector(property("form.language.initial"));
  const userId = useSelector(property("authorization.userData.id"));
  const userLanguages = useSelector(
    property("authorization.userData.userLanguages")
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLanguages());
  }, [dispatch]);

  const submitForm = useCallback(
    async (event) => {
      event.preventDefault();
      if (isEmpty(userLanguages)) {
        const userLanguages = _map(languages, (language) => {
          return {
            LanguageId: language.id,
            myAssessment: get(formValue, `${language.name}.value`) || null,
          };
        });
        const answerToServer = {
          UserId: userId,
          userLanguages,
        };
        dispatch(setUserLanguages(answerToServer));
      } else {
        if (!isEqual(formValue, formValueInitial)) {
          const setUserLanguages = _map(userLanguages, (language) => {
            return {
              LanguageId: get(
                formValueInitial,
                `${get(language, "Language.name")}.LanguageId`
              ),
              UserId: get(language, "UserId"),
              id: get(language, "id"),
              myAssessment: get(formValue, `${language.Language.name}.value`),
            };
          });
          const answerToServer = {
            UserId: userId,
            userLanguages: setUserLanguages,
          };
          await dispatch(updateUserLanguages(answerToServer));
          dispatch(getUserLanguages(userId));
        }
      }
    },
    [formValue, userId, dispatch, userLanguages, formValueInitial]
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
              Change
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
    initialValues[`${get(language, "Language.name")}`] = {
      value: language.myAssessment,
      label: options.filter(
        (option) => option.value === language.myAssessment
      )[0].label,
      id: language.id,
      LanguageId: get(language, "Language.id"),
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
