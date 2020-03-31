/**
 *
 * Form Error
 *
 */
import React from 'react';
import PropTypes from 'prop-types';

const FormError = ({ touched, message }) => {
  if (!touched) {
    return <p className="from-message invalid"></p>;
  }
  if (message) {
    return <p className="from-message invalid">{message}</p>;
  }
  return <p className="from-message valid">all good</p>;
};

FormError.defaultProps = {
  touched: false,
  message: '',
};

FormError.propTypes = {
  touched: PropTypes.bool,
  message: PropTypes.string,
};

export default FormError;

