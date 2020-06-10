import React from 'react';
import {Route, Switch} from "react-router-dom";
import Landing from '../components/Landing/Landing.js';
import Login from '../components/Login.js';
import Register from '../components/Register.js';

const PublicRoutes = ({match}) => (
    <div>
        <Switch>
            <Route path={`${match.path}register`} component={Register}/>
            <Route path={`${match.path}Login`} component={Login}/>
            <Route path={`${match.path}`} exact component={Landing}/>
            <Route render={(props) => (<h1>404 page</h1>)}/>
        </Switch>
    </div>
);

export default PublicRoutes;