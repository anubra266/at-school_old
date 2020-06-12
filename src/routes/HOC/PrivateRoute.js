import React, {useState, useEffect} from "react";
import {Route, Redirect} from "react-router-dom";
import AuthService from "../../services/auth.service";
import UserService from "../../services/user.service";
import Loading from "../../components/Loading";
const PrivateRoute = ({
    component: Component,
    ...rest
}) => {
    const [user,
        setuser] = useState(null);
    useEffect(() => {
        UserService
            .getUser()
            .then(response => {
                setuser(response.data);
            });
    }, []);

    return (
        <div>
            <Route
                {...rest}
                render={(props) => (AuthService.getCurrentUser() !== null
                ? user
                    ? <Component {...props} user={user}/>
                    : <Loading />
                : <Redirect
                    to={{
                    pathname: '/login',
                    state: {
                        from: props.location
                    }
                }}/>)}/>
        </div>

    );
}

export default PrivateRoute;