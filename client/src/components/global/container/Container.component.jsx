import React from "react";

import "./Container.styles.scss";

/**
 * Content Container used as main content wrapper.
 * @param {Object} children - Wrapped children elements.
 * @param {string} className - Additional class names parsed.
 * @return {children} - Parsed children elements.
 */
export default function Container({ children, className }) {
  return (
    <div className={`container${className ? " " + className : ""}`}>
      {children}
    </div>
  );
}
