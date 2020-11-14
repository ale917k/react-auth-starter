import React from "react";

import Container from "../container/Container.component";

import "./Footer.styles.scss";

/**
 * Main App's Footer.
 * @return {JSX} - Copyright infos.
 */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <Container className="footer-container">
        <div className="copyright">
          <p>@{year} CompanyName. All rights reserved</p>
        </div>
        <div className="created-by">
          Design and Development:{" "}
          <a
            href="https://www.alessiopetrin.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            AP
          </a>
        </div>
      </Container>
    </footer>
  );
}
