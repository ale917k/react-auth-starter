import React from "react";

import "./Spinner.styles.scss";

/**
 * Spinner component, used when lazy loading pages / components.
 * @return {JSX} - Spinner animated through css keyframes.
 */
const Spinner = () => {
  return (
    <div className="spinner-background">
      <div className="spinner"></div>
    </div>
  );
};

export default Spinner;
