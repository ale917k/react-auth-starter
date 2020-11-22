import React from "react";

import "./Alert.styles.scss";

/**
 * Alert message component.
 * @param {string} severity - Severity of alert message (info | success | warning | error).
 * @param {string} message - Alert message to display.
 * @return {JSX} - Alert message with appropriate styles.
 */
export default function Alert({ severity, message }) {
  return <div className={`alert ${severity}`}>{message}</div>;
}
