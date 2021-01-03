import React from "react";
import "./Alert.styles.scss";

type PropsType = {
  severity: string;
  message: string;
};

/**
 * Alert message component.
 * @param {string} severity - Severity of alert message (info | success | warning | error).
 * @param {string} message - Alert message to display.
 * @return - Alert message with appropriate styles.
 */
const Alert: React.FC<PropsType> = ({ severity, message }: PropsType) => {
  return <div className={`alert ${severity}`}>{message}</div>;
};

export default Alert;
