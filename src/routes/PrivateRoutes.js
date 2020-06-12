import React from "react";
import {Route, Switch, Redirect} from "react-router-dom";

import Dashboard from "./Dashboard.js";
import Classroom from "./Classroom.js";

import "assets/scss/black-dashboard-react.scss";
import "assets/demo/demo.css";
import "assets/css/nucleo-icons.css";


const PrivateRoutes = ({user})=>{

    return (
        <Switch>
            <Route path="/in/dashboard" render={(props)=>(<Dashboard {...props} user={user} />)} />
            <Route path="/in/classroom/:slug" render={(props)=>(<Classroom {...props} user={user} />)} />
        </Switch>
    )
}
export default PrivateRoutes