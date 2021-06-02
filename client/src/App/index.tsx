import React, { useContext, lazy, Suspense, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { loginUserWithToken, retrieveUser } from "../api/users.api";
import { AppContext } from "../context/context";

import Header from "../components/global/Header";
import Footer from "../components/global/Footer";
import Spinner from "../components/global/Spinner";

import "./styles.scss";

// Lazy loaded pages
const Landing = lazy(() => import("../pages/Landing"));
const Home = lazy(() => import("../pages/Home"));
const Register = lazy(() => import("../pages/Register"));
const Login = lazy(() => import("../pages/Login"));
const Account = lazy(() => import("../pages/Account"));
const PageNotFound = lazy(() => import("../pages/PageNotFound"));

// Lazy loaded routes
const routes = [
  {
    path: "/register",
    Component: Register,
    requireAuth: false,
  },
  { path: "/login", Component: Login, requireAuth: false },
  { path: "/account", Component: Account, requireAuth: true },
];

/**
 * Main App component containing Header, Footer and lazy loaded routing.
 * @return - Header, Footer and main content of the App.
 */
const App: React.FC = () => {
  // Context for retrieving User state from AppContext
  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    // Check if any localStorage token already exist
    const token = window.localStorage.getItem("token");

    token &&
      loginUserWithToken(token)
        .then((userId) => (userId ? retrieveUser(userId, dispatch) : Promise.reject(userId)))
        .catch((err) => console.log(err));
  }, [dispatch]);

  return (
    <>
      <Header />

      <main className="main">
        <Switch>
          <Route exact path="/">
            <Suspense fallback={<Spinner />}>{state.user ? <Home /> : <Landing />}</Suspense>
          </Route>

          {routes.map(({ path, Component, requireAuth }) => (
            <Route key={path} exact path={path}>
              {path === "/register" || path === "/login" ? (
                <>
                  {state.user ? (
                    <Redirect to="/" />
                  ) : (
                    <Suspense fallback={<Spinner />}>
                      <Component />
                    </Suspense>
                  )}
                </>
              ) : requireAuth && !state.user ? (
                <Redirect to="/login" />
              ) : (
                <Suspense fallback={<Spinner />}>
                  <Component />
                </Suspense>
              )}
            </Route>
          ))}

          <Route
            path="*"
            render={() => (
              <Suspense fallback={<Spinner />}>
                <PageNotFound />
              </Suspense>
            )}
          />
        </Switch>
      </main>

      <Footer />
    </>
  );
};

export default App;
