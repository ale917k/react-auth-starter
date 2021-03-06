import React, { useState, useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { AppContext } from "../../../context/context";
import Container from "../Container";
import "./styles.scss";
import { ReactComponent as LogoSvg } from "../../../assets/logo.svg";
import UserTypes from "../../../context/user/types";

/**
 * Main App's Header.
 * @return - Logo and Menu elements.
 */
const Header: React.FC = () => {
  const location = useLocation();

  // Context for retrieving User state from AppContext and dispatching updates if User logs out
  const { state, dispatch } = useContext(AppContext);

  // Used for toggling mobile menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    isMenuOpen && setIsMenuOpen(false);
  }, [location]);

  // Toggle mobile menu function
  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Logout User from App
  const logout = () => {
    dispatch({
      type: UserTypes.Clear,
      payload: null,
    });

    // Remove session token
    window.localStorage.removeItem("token");
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

        <div className="mobile-menu" onClick={toggleMobileMenu}>
          <div className="burger-menu"></div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
