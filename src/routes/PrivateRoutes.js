import React from 'react';
import {Route, Link, Redirect} from "react-router-dom";
import {uniqBy} from 'lodash';
import rolesConfig from '../config/roles';
import * as Routes from './index';

// TODO: Replace hardcoded roles with redux, localStorage, or get from server.
const roles = [
    //user roles + concatinate common role
    ...[
        'headOfOperation', 'manager'
    ],
    'common'
];

let allowedRoutes = roles.reduce((acc, role) => {
    return [
        ...acc,
        ...rolesConfig[role].routes
    ]
}, []);

// For removing duplicate entries.
allowedRoutes = uniqBy(allowedRoutes, 'component');

const PrivateRoutes = ({
    match
}, props) => {
    const {user} = props;
    return (
        <div>
            {<h1> Header </h1>}
            <section>
                <div>
                    {user.roles === {}
                        ? <Redirect to="/welcome"/>

                        : allowedRoutes.map(({component, url}) => (<Route
                            key={component}
                            path={`${match.path}${url}`}
                            component={Routes[component]}/>))
}
                </div>
            </section>
            {/*<Footer> Footer </Footer>*/}
        </div>
    )
};

export default PrivateRoutes;