import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import Loading from "../components/Loading.js";
import Dashboard from "./Dashboard.js";
import loadable from "@loadable/component";

import ClassroomRoute from "../routes/HOC/ClassroomRoute.js";

const Classroom = loadable(() => import("./Classroom.js"), {
  fallback: <Loading></Loading>,
});
const Test = loadable(() => import("./Test.js"), {
  fallback: <Loading></Loading>,
});
const Welcome = loadable(() => import("../components/Welcome/Welcome.js"), {
  fallback: <Loading></Loading>,
});
const error404 = loadable(() => import("./error404.js"), {
  fallback: <Loading></Loading>,
});

const PrivateRoutes = ({ user }) => {
  const [newbie, setnewbie] = useState(null);
  useEffect(() => {
    if (user) {
      const currentUser = user;
      const user_roles = currentUser.roles;
      const user_roles_arr = user_roles.reduce((acc, nxt) => {
        acc.push(nxt.role);
        return acc;
      }, []);

      // user roles
      const roles = [...user_roles_arr];

      setnewbie(roles.indexOf("new"));
    }
  }, []);
  return (
    <div>
      {newbie && newbie === -1 ? (
        <Switch>
          <Route
            path="/in/dashboard"
            render={(props) => <Dashboard {...props} user={user} />}
          />
          <ClassroomRoute
            path="/in/classroom/:slug"
            component={Classroom}
            user={user}
          />
          <ClassroomRoute
            path="/in/test/:slug/:test_type/:test_id"
            component={Test}
            user={user}
          />
          <Route component={error404} />
        </Switch>
      ) : (
        <Switch>
          <Route
            path="/in/welcome"
            render={(props) => <Welcome {...props} user={user} />}
          />
          <Route render={(props) => <Welcome {...props} user={user} />} />
        </Switch>
      )}
    </div>
  );
};
export default PrivateRoutes;
