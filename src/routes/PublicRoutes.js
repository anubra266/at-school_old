import React from "react";
import { Route, Switch } from "react-router-dom";
import loadable from "@loadable/component";
import Loading from "../components/Loading.js";

import Landing from "../components/Landing/Landing.js";
import Login from "../components/Landing/Login.js";
const ForgotPassword = loadable(
	() => import("../components/Landing/ForgotPassword.js"),
	{
		fallback: <Loading></Loading>,
	}
);
const ResetPassword = loadable(
	() => import("../components/Landing/ResetPassword.js"),
	{
		fallback: <Loading></Loading>,
	}
);
const Register = loadable(() => import("../components/Landing/Register.js"), {
	fallback: <Loading></Loading>,
});
const error404 = loadable(() => import("./error404.js"), {
	fallback: <Loading></Loading>,
});

const PublicRoutes = ({ match }) => (
	<div>
		<Switch>
			<Route path={`${match.path}register`} component={Register} />
			<Route path={`${match.path}login`} component={Login} />
			<Route path={`${match.path}forgotpassword`} component={ForgotPassword} />
			<Route path={`${match.path}resetpassword/:token`} component={ResetPassword} />
			<Route path={`${match.path}`} exact component={Landing} />
			<Route component={error404} />
		</Switch>
	</div>
);

export default PublicRoutes;
