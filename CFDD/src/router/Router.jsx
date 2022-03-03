import { useState, useEffect } from "react";

// Router
import {
  BrowserRouter as AppRouter,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

// Routes
import { Routes } from "./routes";

// Layouts
import VerticalLayout from "../layout/VerticalLayout";
import FullLayout from "../layout/FullLayout";

// Components
import Error404 from "../view/pages/errors/404";
import Login from "../view/pages/authentication/login";
import { isAuth } from "./isAuth";

export default function Router() {
  // Default Layout
  const DefaultLayout = null; // FullLayout or VerticalLayout

  // All of the available layouts
  const Layouts = { VerticalLayout, FullLayout };

  const currentUserRole = sessionStorage.getItem("currentUserRole") || "";

  // Return Filtered Array of Routes & Paths
  const LayoutRoutesAndPaths = (layout) => {
    const LayoutRoutes = [];
    const LayoutPaths = [];
    if (Routes) {
      // Checks if Route layout or Default layout matches current layout
      Routes.filter(
        (route) =>
          (route.layout === layout || DefaultLayout === layout) &&
          route.role === currentUserRole &&
          (LayoutRoutes.push(route), LayoutPaths.push(route.path))
      );
    }

    return { LayoutRoutes, LayoutPaths };
  };

  const [isAutheticated, setisAutheticated] = useState(false);
  useEffect(() => {
    setisAutheticated(isAuth());
  }, []);
  // Return Route to Render
  const ResolveRoutes = () => {
    return Object.keys(Layouts).map((layout, index) => {
      const { LayoutRoutes, LayoutPaths } = LayoutRoutesAndPaths(layout);
      const LayoutTag = Layouts[layout];

      return (
        <Route path={LayoutPaths} key={index}>
          <LayoutTag>
            <Switch>
              {LayoutRoutes.map((route) => {
                return (
                  <Route
                    key={route.path}
                    path={route.path}
                    exact={route.exact === true}
                    render={(props) => {
                      return (
                        // <Suspense fallback={null}>
                        isAutheticated ? (
                          <route.component {...props} />
                        ) : (
                          <Redirect to="/" />
                        )
                        // </Suspense>
                      );
                    }}
                  />
                );
              })}
            </Switch>
          </LayoutTag>
        </Route>
      );
    });
  };
  console.log(currentUserRole, isAutheticated);
  return (
    <AppRouter>
      <Switch>
        {ResolveRoutes()}

        {/* Home Page */}
        <Route
          exact
          path={"/"}
          render={() => {
            return !isAutheticated ? (
              <Layouts.FullLayout>
                <Login />
              </Layouts.FullLayout>
            ) : currentUserRole === "ENTITY_ADMIN" ? (
              <Redirect to="/onboarding-unit" />
            ) : currentUserRole === "L1" ? (
              <Redirect to="/user-compliance-repository" />
            ) : (
              <Redirect to="/dashboard" />
            );
          }}
        />

        {/* NotFound */}
        <Route path="*">
          <Error404 />
        </Route>
      </Switch>
    </AppRouter>
  );
}
