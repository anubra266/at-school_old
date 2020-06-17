import React from 'react';
import {Route, Switch} from "react-router-dom";
import Landing from '../components/Landing/Landing.js';
import Login from '../components/Landing/Login.js';
import Register from '../components/Landing/Register.js';
import error404 from './error404.js';

const PublicRoutes = ({match}) => (
    <div>
        <Switch>
            <Route path={`${match.path}register`} component={Register}/>
            <Route path={`${match.path}Login`} component={Login}/>
            <Route path={`${match.path}`} exact component={Landing}/>
            <Route component={error404}/>
        </Switch>
    </div>
);

export default PublicRoutes;