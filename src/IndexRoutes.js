import React from "react";

import PublicRoutes from "./routes/PublicRoutes";
import PrivateRoutes from "./routes/PrivateRoutes";

import NoAuthRoute from "./routes/HOC/NoAuthRoute.js";
import PrivateRoute from "./routes/HOC/PrivateRoute.js";

// import notify from "./services/notify.js";
import Heyoffline from "../node_modules/heyoffline/dist/heyoffline.esm.js";

const IndexRoutes = () => {
    var offline = new Heyoffline();
    var offline_content = offline.options.text.offline;
    offline_content.heading="You've gone offline"; 
    offline_content.desc="Reconnect or avoid filling forms"; 
    

    return (
        <>
            {/*//?Do not change the arrangement of the routes, remember what it did to you😂😂🤣*/}
            <PrivateRoute path="/in" component={PrivateRoutes}/>
            <NoAuthRoute path="/" component={PublicRoutes}/>
        </>
    );
}
export default IndexRoutes;