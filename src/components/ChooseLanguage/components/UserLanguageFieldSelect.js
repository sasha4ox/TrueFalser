import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";
import get from "lodash/get";
import { useSelector } from "react-redux";
import property from "lodash/property";

import style from "./UserLanguageFieldSelect.module.scss";

function UserLanguageFieldSelect({ input, options, label, name }) {
  const formValue = useSelector(property("form.language.values"));

  return (
    <div className={style.group}>
      <Select
        name={name}
        defaultValue={get(formValue, `${label}`) || options[0]}
        options={options}
        onChange={(value) => input.onChange(value)}
        onBlur={(event) => event.preventDefault()}
        // inputProps={{ readOnly: true }}
        isSearchable={false}
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
