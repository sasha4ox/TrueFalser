import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";

import style from "./UserLanguageFieldSelect.module.scss";

function UserLanguageFieldSelect({ input, options, label, name }) {
  return (
    <div className={style.group}>
      <Select
        name={name}
        defaultValue={options[0]}
        options={options}
        onChange={(value) => input.onChange(value)}
        onBlur={(event) => event.preventDefault()}
      />

      <label htmlFor={name}>{label}</label>
    </div>
  );
}

UserLanguageFieldSelect.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    })
  ),
  input: PropTypes.object.isRequired,
};
UserLanguageFieldSelect.defaultProps = {
  name: "input",
};

export default UserLanguageFieldSelect;
