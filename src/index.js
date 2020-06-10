import React from "react";
import ReactDOM from "react-dom";
import {createBrowserHistory} from "history";
import {Router, Route, Switch, Redirect} from "react-router-dom";
import ReactNotifications from 'react-notifications-component';

import "assets/scss/black-dashboard-react.scss";
import "assets/demo/demo.css";
import "assets/css/nucleo-icons.css";

import AuthService from "./services/auth.service";
import UserService from "./services/user.service";
import PublicRoutes from "./routes/PublicRoutes";
import PrivateRoutes from "./routes/PrivateRoutes";
import Welcome from "./components/Welcome/Welcome.js"

const user = UserService
    .getUser()
    .then(response => {
        return response.data;
    }, error => {
        if (AuthService.getCurrentUser() !== null) {
            return error.message;
        }
    });
//HOC to prevent anuthenticated user from trying stuff...
const PrivateRoute = ({
    component: Component,
    ...rest
}) => (
    <Route
        {...rest}
        render={(props) => (AuthService.getCurrentUser() !== null
        ? user.roles
            ? <Component {...props} user={AuthService.getCurrentUser()}/>
            : <Redirect to={{
                    pathname: '/welcome'
                }}/>
        : <Redirect
            to={{
            pathname: '/login',
            state: {
                from: props.location
            }
        }}/>)}/>
);
const WelcomeRoute = ({
    component: Component,
    ...rest
}) => (
    <Route
        {...rest}
        render={(props) => (AuthService.getCurrentUser() !== null
        ? !user.roles
            ? <Component {...props} user={AuthService.getCurrentUser()}/>
            : <Redirect to={{
                    pathname: '/in'
                }}/>
        : <Redirect
            to={{
            pathname: '/login',
            state: {
                from: props.location
            }
        }}/>)}/>
);
const NoAuthRoute = ({
    component: Component,
    ...rest
}) => {
    return (
        <Route
            {...rest}
            render={(props) => (AuthService.getCurrentUser() === null
            ? <Component {...props}/>
            : <Redirect to={{
                pathname: '/in'
            }}/>)}/>
    );
};

const hist = createBrowserHistory();

ReactDOM.render(
    <div>
    <ReactNotifications/>
    <Router history={hist}>
        <Switch>
            {/*//?Do not change the arrangement of the routes, remember what it did to you😂😂🤣*/}
            <PrivateRoute path="/in" component={PrivateRoutes}/>
            <WelcomeRoute path="/welcome" component={Welcome}/>
            <NoAuthRoute path="/" component={PublicRoutes}/>
        </Switch>
    </Router>
</div>, document.getElementById("root"));
