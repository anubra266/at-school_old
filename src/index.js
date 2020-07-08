import React from "react";
import ReactDOM from "react-dom";
import {createBrowserHistory} from "history";
import {Router, Switch} from "react-router-dom";
import ReactNotifications from 'react-notifications-component';

import "assets/scss/black-dashboard-react.scss";
import "assets/demo/demo.css";
import "assets/css/nucleo-icons.css";

import IndexRoutes from "./IndexRoutes";

import Echo from "laravel-echo"
window.io = require('socket.io-client');
var host;
var url = window.location.hostname;
if (url === 'localhost') {
    host = 'http://localhost:6001';
} else {
    host = 'https://api.at-school.xyz:6001';
}
window.Echo = new Echo({broadcaster: 'socket.io', host: host});

const hist = createBrowserHistory();

ReactDOM.render(
    <div>
    <ReactNotifications/>
    <Router history={hist}>
        <Switch>
            <IndexRoutes></IndexRoutes>
        </Switch>
    </Router>
</div>, document.getElementById("root"));
