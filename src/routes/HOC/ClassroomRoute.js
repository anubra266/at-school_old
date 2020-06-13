import React, {useState, useEffect} from "react";
import {Route, Redirect, withRouter} from "react-router-dom";
import AuthService from "../../services/auth.service";
import UserService from "../../services/user.service";
import Loading from "../../components/Loading";

const ClassroomRoute = ({
    match,location,
    user,
    component: Component,
    ...rest
}) => {
    const [status,
        setstatus] = useState(null);
        const url = location.pathname;
        const slug = url.split('/')[3]
    useEffect(() => {
        UserService.checkclassroomstatus(slug).then(response=>{
            setstatus(response.data);
            console.log(response.data);
        });
    }, []);

    return (
        <div>
        {status&&
            <Route
                {...rest}
                render={(props) => (status!=='alien'
                ? <Component {...props} user={user} />
                : <Redirect
                    to={{
                    pathname: '/in',
                    state: {
                        from: props.location
                    }
                }}/>)}/>
            }
        </div>

    );
}

export default withRouter(ClassroomRoute);