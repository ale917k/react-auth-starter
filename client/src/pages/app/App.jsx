import React, { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";

import Header from "../../components/global/header/Header.component";
import Footer from "../../components/global/footer/Footer.component";

import "./App.styles.scss";

const Landing = lazy(() => import("../landing/Landing.page"));
const Home = lazy(() => import("../home/Home.page"));
const PageNotFound = lazy(() => import("../page-not-found/PageNotFound.page"));

// Lazy loaded App routes
const routes = [
  { path: "/", name: "Landing", Component: Landing },
  { path: "/home", name: "Home", Component: Home },
  // { path: "/register", name: "Register", Component: Register },
];

/**
 * Main App component containing Header, Footer and lazy loaded routing.
 * @return {JSX} - Header, Footer and main content of the App.
 */
export default function App() {
  // Group all path names for available route paths
  const mappedRoutes = routes.map(({ path }) => path);
  const availableRoutes = mappedRoutes
    .join() // Join all path in unique string
    .replace(/[/]/g, "|") // Replace '/' with '|'
    .replace(/,/g, "") // Remove commas created joining array elements (paths)
    .replace(/\|\|/g, "|"); // Replace first '|' occurence to be single instead of '||'

  return (
    <div className="App">
      <Switch>
        <Route exact path={`/(${availableRoutes})`}>
          <Header />
          {routes.map(({ path, Component }) => (
            <Suspense key={path} fallback={<div></div>}>
              <Route exact path={path}>
                <main className="main">
                  <Component />
                </main>
              </Route>
            </Suspense>
          ))}
          <Footer />
        </Route>

        <Suspense fallback={<div></div>}>
          <Route path="*" component={PageNotFound} />
        </Suspense>
      </Switch>
    </div>
  );
}
