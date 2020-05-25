import React, {memo, useCallback, useEffect} from 'react';
import queryString from 'query-string';
import isEmpty from 'lodash/isEmpty';
import { useDispatch, useSelector } from 'react-redux';
import property from 'lodash/property';
import get from 'lodash/get';
import { Link, Redirect } from 'react-router-dom';

import { getUserDataFromGoogleCode } from '../../actions/authorization';
import Spinner from '../Spinner';

function ParseUrlPage() {
  const dispatch = useDispatch();
  const userData = useSelector(property('authorization.userData'));
  const code = window.location.search;
  const parsedCode = queryString.parse(code);
  console.info('ParseUrlPage!!!', code, parsedCode);
  useEffect(() => {
    if (!isEmpty(parsedCode) && isEmpty(userData)) {
      dispatch(getUserDataFromGoogleCode(get(parsedCode, 'code')))
    }
  }, [dispatch, parsedCode, userData]);
  return (
      isEmpty(userData) ? <div><Spinner/></div> : <Redirect to="/select-language" />
  );
}

export default memo(ParseUrlPage);