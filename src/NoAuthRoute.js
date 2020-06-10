import React,{useState, useEffect} from "react";
import {Route, Redirect} from "react-router-dom";
import AuthService from "./services/auth.service";
import UserService from "./services/user.service";

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
                pathname: '/in'
            }}/>)}/>
    );
};

export default NoAuthRoute;