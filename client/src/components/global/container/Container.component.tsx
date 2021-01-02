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
 * @return - Parsed children elements.
 */
const Container: React.FC<IProps> = ({ children, className }: IProps) => {
  return <div className={`container${className ? " " + className : ""}`}>{children}</div>;
};

export default Container;
