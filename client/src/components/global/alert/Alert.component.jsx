import React from "react";
import PropTypes from "prop-types";

import "./Alert.styles.scss";

/**
 * Alert message component.
 * @param {string} severity - Severity of alert message (info | success | warning | error).
 * @param {string} message - Alert message to display.
 * @return {JSX} - Alert message with appropriate styles.
 */
const Alert = ({ severity, message }) => {
  return <div className={`alert ${severity}`}>{message}</div>;
};

Alert.propTypes = {
  severity: PropTypes.string,
  message: PropTypes.string,
};

export default Alert;
