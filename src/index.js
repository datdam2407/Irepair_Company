import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "assets/scss/light-bootstrap-dashboard-pro-react.scss?v=2.0.0";
import "assets/css/demo.css";
import UserProfile from "./components/Sidebar/UserProfile";
import Login from "components/Login/Login";
import AuthLayout from "layouts/Auth.js";
import AdminLayout from "layouts/Admin.js";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
      <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
      <Route exact path="/login" component={Login}/>
      {/* <Route path="/admin/profile" component={UserProfile} /> */}
      <Redirect from="/" to="/login" />
      <Redirect from="/admin/dashboard" to="/admin/dashboard" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
