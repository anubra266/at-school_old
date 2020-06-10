import React, {useState, useEffect} from "react";
import {Route, Redirect} from "react-router-dom";
import AuthService from "./services/auth.service";
import UserService from "./services/user.service";

const PrivateRoute = ({
    component: Component,
    ...rest
}) => {
    const [user,
        setuser] = useState({});
    useEffect(() => {
        UserService
            .getUser()
            .then(response => {
                setuser(response.data);
            });
    },[]);

    return (
        <Route
            {...rest}
            render={(props) => (AuthService.getCurrentUser() !== null
            ? <Component {...props} user={user}/>
            : <Redirect
                to={{
                pathname: '/login',
                state: {
                    from: props.location
                }
            }}/>)}/>
    );
}

export default PrivateRoute;