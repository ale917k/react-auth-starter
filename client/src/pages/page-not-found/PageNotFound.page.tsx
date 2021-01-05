import React from "react";

import "./PageNotFound.styles.scss";

/**
 * Basic fallback page when no page is found on selected route.
 * @return - PageNotFound message.
 */
const PageNotFound: React.FC = () => {
  return <div className="page-not-found">404 | Page Not Found</div>;
};

export default PageNotFound;
