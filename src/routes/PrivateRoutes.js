import React from "react";
import {Route, Switch, Redirect} from "react-router-dom";

import Dashboard from "./Dashboard.js";
import Classroom from "./Classroom.js"; 

import ClassroomRoute from "../routes/HOC/ClassroomRoute.js"

 

const PrivateRoutes = ({user})=>{

    return (
        <Switch>
            <Route path="/in/dashboard" render={(props)=>(<Dashboard {...props} user={user} />)} />
            <ClassroomRoute path="/in/classroom/:slug" component={Classroom} user={user} />
            {/*<Route path="/in/classroom/:slug" render={(props)=>(<Classroom {...props} user={user} />)} />*/}
        </Switch>
    )
}
export default PrivateRoutes