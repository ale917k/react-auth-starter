import React, { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";

import Header from "../../components/global/header/Header.component";
import Footer from "../../components/global/footer/Footer.component";
import Spinner from "../../components/global/spinner/Spinner.component";

import "./App.styles.scss";

const Landing = lazy(() => import("../landing/Landing.page"));
const Home = lazy(() => import("../home/Home.page"));
const Register = lazy(() => import("../register/Register.page"));
const PageNotFound = lazy(() => import("../page-not-found/PageNotFound.page"));

// Lazy loaded App routes
const routes = [
  { path: "/", name: "Landing", Component: Landing },
  { path: "/home", name: "Home", Component: Home },
  { path: "/register", name: "Register", Component: Register },
];

/**
 * Main App component containing Header, Footer and lazy loaded routing.
 * @return {JSX} - Header, Footer and main content of the App.
 */
export default function App() {
  return (
    <div className="App">
      <Header />

      <main className="main">
        <Switch>
          {routes.map(({ path, Component }) => (
            <Route key={path} exact path={path}>
              <Suspense fallback={<Spinner />}>
                <Component />
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
