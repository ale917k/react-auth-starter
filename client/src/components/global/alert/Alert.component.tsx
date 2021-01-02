import React from "react";
import "./Alert.styles.scss";

interface IProps {
  severity: string;
  message: string;
}

/**
 * Alert message component.
 * @param {string} severity - Severity of alert message (info | success | warning | error).
 * @param {string} message - Alert message to display.
 * @return {ReactNode} - Alert message with appropriate styles.
 */
const Alert = ({ severity, message }: IProps): React.ReactNode => {
  return <div className={`alert ${severity}`}>{message}</div>;
};

export default Alert;
