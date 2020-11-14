import React, { useState } from "react";
import { Link } from "react-router-dom";

import Container from "../container/Container.component";

import "./Header.styles.scss";
import { ReactComponent as LogoSvg } from "../../../assets/logo.svg";

/**
 * Main App's Header.
 * @return {JSX} - Logo and Menu elements.
 */
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={`header${isMenuOpen ? " mobile-open" : ""}`}>
      <Container>
        <Link className="logo" to="/">
          <LogoSvg className="svg" />
        </Link>

        <ul className="menu">
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>

        <div className="mobile-menu" onClick={() => toggleMobileMenu()}>
          <div className="burger-menu"></div>
        </div>
      </Container>
    </header>
  );
}
