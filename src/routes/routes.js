import React, {useState, useEffect} from 'react';
import {Route, Link, Redirect, Switch, withRouter} from "react-router-dom";
import {uniqBy} from 'lodash';
import rolesConfig from '../config/roles';
import * as Routes from './routes_list';

// For removing duplicate entries.

const TRoutes = ({
    match,
    user,
    thislayout
},) => {

    //*get roles from db
    const user_roles = user.roles;
    const user_roles_arr = user_roles.reduce((acc, nxt) => {
        acc.push(nxt.role);
        return acc;
    }, []);
    // user roles
    const roles = [...user_roles_arr];
    const getRoutes = () => {
        let allowedRoutes = roles.reduce((acc, role) => {
            return [
                ...acc,
                ...rolesConfig[role].routes
            ]
        }, []);

        allowedRoutes = uniqBy(allowedRoutes, 'component');
        return allowedRoutes.map(({layout, component, url}) => {
            if (layout === thislayout) {
                return (<ReRoute
                    key={component}
                    path={`${match.path}${url}`}
                    component={Routes[component]}/>)
            }
        })
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
        <Switch>
            {getRoutes()}
            {roles.indexOf('new') !== -1
                ? <Redirect to="/in/welcome"/>
                : <Redirect to="/in/home"/>}
        </Switch>
    )
};

export default withRouter(TRoutes);