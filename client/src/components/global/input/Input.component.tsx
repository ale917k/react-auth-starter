import React from "react";
import "./Input.styles.scss";

type PropsType = {
  onChange: (event: React.SyntheticEvent) => void;
  id: string;
  type: string;
  name: string;
  label: string;
  value: string;
  required: boolean;
};

/**
 * Standard Input component, reusable for both Inputs and Textareas.
 * @param {Object} props - Props passed from parent component containing input attributes.
 * @return - Controlled input element.
 */
const Input: React.FC<PropsType> = ({ id, onChange, type, label, required, ...rest }: PropsType) => {
  // Check if value entered is a valid email. Ref: http://emailregex.com/
  const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;

  // Updates handleChange parent function and checks for deep email validation
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { type, value } = event.target as HTMLInputElement;
    onChange(event);

    if (type === "email" && !emailPattern.test(value)) {
      event.target.setCustomValidity("Please select a valid email address.");
    } else {
      event.target.setCustomValidity("");
    }
  };

  return (
    <div className="input">
      <input
        id={id}
        type={type}
        placeholder=" "
        {...rest}
        onChange={handleChange}
        minLength={type === "password" ? 8 : undefined}
      />
      <label htmlFor={id}>
        {label}
        {required && " *"}
      </label>
    </div>
  );
};

export default Input;
