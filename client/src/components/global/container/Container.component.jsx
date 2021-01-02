import React from "react";
import PropTypes from "prop-types";

import "./Container.styles.scss";

/**
 * Content Container used as main content wrapper.
 * @param {Object} children - Wrapped children elements.
 * @param {string} className - Additional class names parsed.
 * @return {children} - Parsed children elements.
 */
const Container = ({ children, className }) => {
  return <div className={`container${className ? " " + className : ""}`}>{children}</div>;
};

Container.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Container;
