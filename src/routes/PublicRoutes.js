import React from "react";
import { Route, Switch } from "react-router-dom";
import loadable from "@loadable/component";
import Loading from "../components/Loading.js";



import Landing from "../components/Landing/Landing.js";
import Login from "../components/Landing/Login.js";
import ForgotPassword from "../components/Landing/ForgotPassword.js";

import Register from "../components/Landing/Register.js"; 
const error404 = loadable(() => import("./error404.js"), {
  fallback: <Loading></Loading>,
});

const PublicRoutes = ({ match }) => (
  <div>
    <Switch>
      <Route path={`${match.path}register`} component={Register} />
      <Route path={`${match.path}Login`} component={Login} />
      <Route path={`${match.path}ForgotPassword`} component={ForgotPassword} />
      <Route path={`${match.path}`} exact component={Landing} />
      <Route component={error404} />
    </Switch>
  </div>
);

export default PublicRoutes;
