
import Home from "./layouts/Home.js";
import Environs from "./layouts/Environs.js";
import Classrooms from "./layouts/Classrooms.js";

import AuthService from "services/auth.service";
const user = AuthService.getCurrentUser();


var routes = [
  {
    path: "/home",
    name: "Home",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: Home,
    layout: "/in"
  },
  
  {
    path: "/environs",
    name: "Environs",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: Environs,
    layout: "/in"
  },
  
  {
    path: "/classrooms",
    name: "Classrooms",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: Classrooms,
    layout: "/in"
  },
  
];

    if(user&&user.role!=='principal'){
        routes.splice(1,1);
    }


export default routes;
 