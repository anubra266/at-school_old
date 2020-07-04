import React from "react";
import ReactDOM from "react-dom";
import {createBrowserHistory} from "history";
import {Router, Switch} from "react-router-dom";
import ReactNotifications from 'react-notifications-component';

import "assets/scss/black-dashboard-react.scss";
import "assets/demo/demo.css";
import "assets/css/nucleo-icons.css";

import PublicRoutes from "./routes/PublicRoutes";
import PrivateRoutes from "./routes/PrivateRoutes";

import NoAuthRoute from "./routes/HOC/NoAuthRoute.js";
import PrivateRoute from "./routes/HOC/PrivateRoute.js";

import Echo from "laravel-echo"
window.io = require('socket.io-client');
window.Echo = new Echo({broadcaster: 'socket.io', host: 'https://api.at-school.xyz:6001'});

const hist = createBrowserHistory();

ReactDOM.render(
    <div>
    <ReactNotifications/>
    <Router history={hist}>
        <Switch>
            {/*//?Do not change the arrangement of the routes, remember what it did to you😂😂🤣*/}
            <PrivateRoute path="/in" component={PrivateRoutes}/>
            <NoAuthRoute path="/" component={PublicRoutes}/>
        </Switch>
    </Router>
</div>, document.getElementById("root"));
