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
 * @return - Alert message with appropriate styles.
 */
const Alert: React.FC<IProps> = ({ severity, message }: IProps) => {
  return <div className={`alert ${severity}`}>{message}</div>;
};

export default Alert;
