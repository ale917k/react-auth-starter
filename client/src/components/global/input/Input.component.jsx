import React from "react";
import PropTypes from "prop-types";

import "./Input.styles.scss";

/**
 * Standard Input component, reusable for both Inputs and Textareas.
 * @param {Object} props - Props passed from parent component containing input attributes.
 * @return {JSX} - Controlled input element.
 */
const Input = (props) => {
  // Check if value entered is a valid email. Ref: http://emailregex.com/
  let emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;

  // Updates handleChange parent function and checks for deep email validation
  const handleChange = (event) => {
    props.onChange(event);

    if (event.target.type === "email" && !emailPattern.test(event.target.value)) {
      event.target.setCustomValidity("Please select a valid email address.");
    } else {
      event.target.setCustomValidity("");
    }
  };

  return (
    <div className="input">
      <input placeholder=" " {...props} onChange={handleChange} minLength={props.type === "password" ? 8 : undefined} />
      <label>
        {props.label}
        {props.required && " *"}
      </label>
    </div>
  );
};

Input.propTypes = {
  onChange: PropTypes.func,
  type: PropTypes.string,
  label: PropTypes.string,
  required: PropTypes.bool,
};

export default Input;
