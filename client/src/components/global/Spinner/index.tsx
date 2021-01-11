import React from "react";
import "./styles.scss";

/**
 * Spinner component, used when lazy loading pages / components.
 * @return - Spinner animated through css keyframes.
 */
const Spinner: React.FC = () => {
  return (
    <div className="spinner-background">
      <div className="spinner"></div>
    </div>
  );
};

export default Spinner;
