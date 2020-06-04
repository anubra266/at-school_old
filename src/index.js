import React from "react";
import ReactDOM from "react-dom";
import {createBrowserHistory} from "history";
import {Router, Route, Switch} from "react-router-dom";
import ReactNotifications from 'react-notifications-component';

import InLayout from "layouts/In/In.js";
import Landing from "layouts/Welcome/Landing.js";
import Classroom from "layouts/Classroom/Index.js";


const hist = createBrowserHistory();

ReactDOM.render(
    <div>
    <ReactNotifications />
    <Router history={hist}>
    <Switch>
        <Route exact path="/" render={props => <Landing {...props}/>}/>
        <Route path="/in" render={props => <InLayout {...props}/>}/> 
        <Route path="/classroom/:classroomId" render={props => <Classroom {...props}/>}/>
    </Switch>
</Router></div>, document.getElementById("root"));
