import React from "react";
import {Route, Switch } from "react-router-dom";

import Dashboard from "./Dashboard.js";
import Classroom from "./Classroom.js"; 
import Test from "./Test.js"; 

import ClassroomRoute from "../routes/HOC/ClassroomRoute.js"

 

const PrivateRoutes = ({user})=>{

    return (
        <Switch>
            <Route path="/in/dashboard" render={(props)=>(<Dashboard {...props} user={user} />)} />
            <ClassroomRoute path="/in/classroom/:slug" component={Classroom} user={user} />
            <ClassroomRoute path="/in/test/:slug/:test_type/:test_id" component={Test} user={user} />
            <Route render={(props)=>(<h1>404 error</h1>)} />
        </Switch>
    )
}
export default PrivateRoutes