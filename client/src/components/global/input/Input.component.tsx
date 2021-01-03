import React from "react";
import "./Input.styles.scss";

interface IProps {
  onChange: (event: React.SyntheticEvent) => void;
  type: string;
  label: string;
  required: boolean;
}

/**
 * Standard Input component, reusable for both Inputs and Textareas.
 * @param {Object} props - Props passed from parent component containing input attributes.
 * @return - Controlled input element.
 */
const Input: React.FC<IProps> = ({ onChange, type, label, required, ...rest }: IProps) => {
  // Check if value entered is a valid email. Ref: http://emailregex.com/
  const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;

  // Updates handleChange parent function and checks for deep email validation
  const handleChange = (event: React.SyntheticEvent) => {
    const { type, value, setCustomValidity } = event.target as HTMLInputElement;
    onChange(event);

    if (type === "email" && !emailPattern.test(value)) {
      setCustomValidity("Please select a valid email address.");
    } else {
      setCustomValidity("");
    }
  };

  return (
    <div className="input">
      <input placeholder=" " {...rest} onChange={handleChange} minLength={type === "password" ? 8 : undefined} />
      <label>
        {label}
        {required && " *"}
      </label>
    </div>
  );
};

export default Input;
