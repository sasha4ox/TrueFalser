import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './Alert.scss';

export default function AlertMessage({ message, view }) {
  let errorView;
  if (view === 'error') {
    errorView = 'danger';
  } else {
    errorView = view;
  }
  return (
    <div className="wrapperForAlert">
      <div
        className={classNames(`alert alert-${errorView}`, {
          error: view === 'error',
          success: view === 'success',
        })}
        role="alert"
      >
        <p>{message}</p>
      </div>
    </div>
  );
}
AlertMessage.propTypes = {
  message: PropTypes.string.isRequired,
  view: PropTypes.string,
};
AlertMessage.defaultProps = {
  view: 'success',
};
