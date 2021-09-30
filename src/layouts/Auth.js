import React from "react";
import { Switch, Route } from "react-router-dom";
// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Container,
  Col,
} from "react-bootstrap";

import AuthNavbar from "components/Navbars/AuthNavbar.js";
import AuthFooter from "components/Footers/AuthFooter.js";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";

// dinamically create auth routes
import routes from "routes.js";

function Auth() {
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return getRoutes(prop.views);
      }
      if (prop.layout === "/auth") {
        return (
          <Route
            path={prop.layout + prop.path}
            key={key}
            component={prop.component}
          />
        );
      } else {
        return null;
      }
    });
  };
  return (
    <>
      <div className="wrapper wrapper-full-page">
        {/* Navbar */}
        <AuthNavbar />
        {/* End Navbar */}
        <Switch>{getRoutes(routes)}</Switch>
        <AuthFooter />
      </div>
      <FixedPlugin />
    </>
  );
}

export default Auth;
