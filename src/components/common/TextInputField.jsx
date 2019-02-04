import React from 'react';
import PropTypes from 'prop-types';

const TextInputField = ({ field, value, label, error, type, onChange, checkUserExists }) => {
  return (
    <div>
      <label className="control-label">{label}</label>
      <input
        onChange={onChange}
        onBlur={checkUserExists}
        value={value}
        type={type}
        name={field}
        className="form-control text-dark"
      />
      {error && <span className="help-block text-danger">{error}</span>}
    </div>  );
};

TextInputField.propTypes = {
  field: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  checkUserExists: PropTypes.func
};

TextInputField.defaultProps = {
  type: 'text'
};

export default TextInputField;