import React from "react";
import {Route, Redirect} from "react-router-dom";
import AuthService from "../../services/auth.service";

const NoAuthRoute = ({
    component: Component,
    ...rest
}) => {
    return (
        <Route
            {...rest}
            render={(props) => (AuthService.getCurrentUser() === null
            ? <Component {...props}/>
            : <Redirect to={{
                pathname: '/in/dashboard/'
            }}/>)}/>
    );
};

export default NoAuthRoute;