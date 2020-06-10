import React, {useState, useEffect} from 'react';
import {Route, Link, Redirect} from "react-router-dom";
import {uniqBy} from 'lodash';
import rolesConfig from '../config/roles';
import * as Routes from './index';

// For removing duplicate entries.

const PrivateRoutes = ({
    match,
    user
},) => {

    const getRoutes = () => {

        const user_roles = user.roles;
        const new_roles = user_roles && user_roles.reduce((acc, nxt) => {
            acc.push(nxt.role);
            return acc;
        }, []);
        // user roles
        const roles = new_roles && [...[new_roles]];

        let allowedRoutes = roles && roles.reduce((acc, role) => {
            return [
                ...acc,
                ...rolesConfig[role].routes
            ]
        }, []);
        allowedRoutes = uniqBy(allowedRoutes, 'component');
        return allowedRoutes.map(({component, url}) => (<ReRoute
            key={component}
            path={`${match.path}${url}`}
            component={Routes[component]}/>))
    }

    const ReRoute = ({
        component: Component,
        ...rest
    }) => {
        return (
            <Route {...rest} render={(props) => (<Component {...props} user={user}/>)}/>
        );
    };

    return (
        <div>
            {getRoutes()}
        </div>
    )
};

export default PrivateRoutes;