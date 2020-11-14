import React from "react";

import "./PageNotFound.styles.scss";

/**
 * Basic fallback page when no page is found on selected route.
 * @return {JSX} - PageNotFound message.
 */
export default function PageNotFound() {
  return <div className="page-not-found">404 | Page Not Found</div>;
}
