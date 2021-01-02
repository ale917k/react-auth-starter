import React, { useContext, lazy, Suspense, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { loginUserWithToken, retrieveUser } from "../../api/users.api";
import { AppContext } from "../../context/context";

import Header from "../../components/global/header/Header.component";
import Footer from "../../components/global/footer/Footer.component";
import Spinner from "../../components/global/spinner/Spinner.component";

import "./App.styles.scss";

// Lazy loaded pages
const Landing = lazy(() => import("../landing/Landing.page"));
const Home = lazy(() => import("../home/Home.page"));
const Register = lazy(() => import("../register/Register.page"));
const Login = lazy(() => import("../login/Login.page"));
const Account = lazy(() => import("../account/Account.page"));
const PageNotFound = lazy(() => import("../page-not-found/PageNotFound.page"));

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
 * @return {JSX} - Header, Footer and main content of the App.
 */
export default function App(): React.FC {
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
    <div className="App">
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
    </div>
  );
}
