/*!

=========================================================
* Black Dashboard React v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Home from "views/Home.js";
import Users from "views/Users.js";
import Tests from "views/Tests.js";

import Icons from "views/Icons.js";
import Notifications from "views/Notifications.js";
import TableList from "views/TableList.js";
import Typography from "views/Typography.js";
import UserProfile from "views/UserProfile.js";
import AuthService from "./services/auth.service";

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
    path: "/icons",
    name: "Icons",
    rtlName: "الرموز",
    icon: "tim-icons icon-atom",
    component: Icons,
    layout: "/in"
  },
  {
    path: "/tests",
    name: "Tests",
    rtlName: "خرائط",
    icon: "tim-icons icon-laptop",
    component: Tests,
    layout: "/in"
  },
  {
    path: "/results",
    name: "Results",
    rtlName: "إخطارات",
    icon: "tim-icons icon-notes",
    component: Notifications,
    layout: "/in"
  },
  {
    path: "/reading-materials",
    name: "Reading Materials",
    rtlName: "قائمة الجدول",
    icon: "tim-icons icon-single-copy-04",
    component: TableList,
    layout: "/in"
  },
  {
    path: "/profile",
    name: "Profile",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "tim-icons icon-single-02",
    component: UserProfile,
    layout: "/in"
  },
  {
    path: "/settings",
    name: "Settings",
    rtlName: "طباعة",
    icon: "tim-icons icon-settings-gear-63",
    component: Typography,
    layout: "/in"
  }
  
];
const users = {
  path: "/users",
  name: "Users",
  rtlName: "لوحة القيادة",
  icon: "tim-icons icon-satisfied",
  component: Users,
  layout: "/in"
}
if(user&&user.role!=='student'){
  routes.splice(0,1,users)
}
export default routes;
 