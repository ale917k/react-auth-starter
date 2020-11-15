import React, { useContext, lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Store } from "../../context/Store";

import Header from "../../components/global/header/Header.component";
import Footer from "../../components/global/footer/Footer.component";
import Spinner from "../../components/global/spinner/Spinner.component";

import "./App.styles.scss";

// Lazy loaded pages
const Landing = lazy(() => import("../landing/Landing.page"));
const Home = lazy(() => import("../home/Home.page"));
const Register = lazy(() => import("../register/Register.page"));
const Login = lazy(() => import("../login/Login.page"));
const PageNotFound = lazy(() => import("../page-not-found/PageNotFound.page"));

// Lazy loaded App routes
const routes = [
  { path: "/register", name: "Register", Component: Register },
  { path: "/login", name: "Login", Component: Login },
];

/**
 * Main App component containing Header, Footer and lazy loaded routing.
 * @return {JSX} - Header, Footer and main content of the App.
 */
export default function App() {
  // Context for retrieving User state from Store
  const { state } = useContext(Store);

  return (
    <div className="App">
      <Header />

      <main className="main">
        <Switch>
          <Route exact path="/">
            <Suspense fallback={<Spinner />}>
              {state.user ? <Home /> : <Landing />}
            </Suspense>
          </Route>

          {routes.map(({ path, Component }) => (
            <Route key={path} exact path={path}>
              <Suspense fallback={<Spinner />}>
                {(path === "/register" || path === "/login") && state.user ? (
                  <Redirect to="/" />
                ) : (
                  <Component />
                )}
              </Suspense>
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
