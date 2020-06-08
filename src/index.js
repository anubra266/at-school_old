import React from "react";
import ReactDOM from "react-dom";
import {createBrowserHistory} from "history";
import {Router, Route, Switch, Redirect} from "react-router-dom";
import ReactNotifications from 'react-notifications-component';

import InLayout from "layouts/In/In.js";
import Landing from "layouts/Welcome/Landing.js";
import Classroom from "layouts/Classroom/Index.js";
import Test from "layouts/Test/Index.js";
import AuthService from "./services/auth.service";

//HOC to prevent anuthenticated user from trying stuff...
const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        AuthService.getCurrentUser() !== null
        ? <Component {...props} />
        : <Redirect to={{
            pathname: '/',
            state: { from: props.location }
          }} />
    )} />
);   

const hist = createBrowserHistory();

ReactDOM.render(
    <div>
    <ReactNotifications /> 
    <Router history={hist}>
    <Switch>
        <Route exact path="/" render={props => <Landing {...props}/>}/>
        <PrivateRoute path="/in" component={InLayout}/> 
        <PrivateRoute path="/classroom/:classroomId" component={Classroom}/>
        <PrivateRoute path="/test/:classroomId/:type/:testId/" component={Test}/>   
    </Switch>
</Router></div>, document.getElementById("root"));
