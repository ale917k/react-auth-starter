import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../../context/context";

import Container from "../container/Container.component";

import "./Header.styles.scss";
import { ReactComponent as LogoSvg } from "../../../assets/logo.svg";

/**
 * Main App's Header.
 * @return {JSX} - Logo and Menu elements.
 */
export default function Header() {
  // Context for retrieving User state from AppContext and dispatching updates if User logs out
  const { state, dispatch } = useContext(AppContext);

  // Used for toggling mobile menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle mobile menu function
  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Logout User from App
  const logout = () => {
    dispatch({
      type: "SET_USER",
      payload: null,
    });
  };

  return (
    <header className={`header${isMenuOpen ? " mobile-open" : ""}`}>
      <Container>
        <Link className="logo" to="/">
          <LogoSvg className="svg" />
          <span>Logo</span>
        </Link>

        <ul className="menu">
          <li>
            <Link to="/">Home</Link>
          </li>
          {state.user ? (
            <>
              <li>
                <Link to="/account">Account</Link>
              </li>
              <li>
                <Link to="/" onClick={logout}>
                  Logout
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/register">Register</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </>
          )}
        </ul>

        <div className="mobile-menu" onClick={() => toggleMobileMenu()}>
          <div className="burger-menu"></div>
        </div>
      </Container>
    </header>
  );
}
