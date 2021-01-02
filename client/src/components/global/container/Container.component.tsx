import React from "react";
import "./Container.styles.scss";

interface IProps {
  children: React.ReactNode;
  className: string;
}

/**
 * Content Container used as main content wrapper.
 * @param {Object} children - Wrapped children elements.
 * @param {string} className - Additional class names parsed.
 * @return {children} - Parsed children elements.
 */
const Container = ({ children, className }: IProps): React.ReactNode => {
  return <div className={`container${className ? " " + className : ""}`}>{children}</div>;
};

export default Container;
