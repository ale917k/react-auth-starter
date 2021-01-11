import React from "react";
import "./styles.scss";

type PropsType = {
  children: React.ReactNode;
  className?: string;
};

/**
 * Content Container used as main content wrapper.
 * @param {Object} children - Wrapped children elements.
 * @param {string} className - Additional class names parsed.
 * @return - Parsed children elements.
 */
const Container: React.FC<PropsType> = ({ children, className }: PropsType) => {
  return <div className={`container${className ? " " + className : ""}`}>{children}</div>;
};

export default Container;
