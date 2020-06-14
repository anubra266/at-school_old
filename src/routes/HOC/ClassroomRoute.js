import React, {useState, useEffect} from "react";
import {Route, Redirect, withRouter} from "react-router-dom";
import UserService from "../../services/user.service";

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