
import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import "assets/scss/black-dashboard-react.scss";
import "assets/demo/demo.css";
import "assets/css/nucleo-icons.css";

// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

// core components
import AdminNavbar from "../In/InNavbar.js";
import Footer from "../In/InFooter.js";
import Sidebar from "./ClassroomSidebar.js";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";

import Test from "./Sections/Test.js";


import routes from "./routes.js";

import logo from "assets/img/react-logo.png";
import AuthService from "../../services/auth.service.js";
import UserService from "../../services/user.service.js";
var ps;

class Classroom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: "blue",
      sidebarOpened:
        document.documentElement.className.indexOf("nav-open") !== -1,
        currentUser: AuthService.getCurrentUser(),
        classroom: this.props.match.params.classroomId
    };
  }
  componentWillMount(){
console.log(this.props.match.params.classroomId); 
    //?Check if user is authenticated
    if(this.state.currentUser==null){
      this.props.history.push('/');
                      window
                    .location
                    .reload();
    }
    //?Check if user is a member/creator of this class
    UserService
    .checkclassroommember(this.state.currentUser.id,this.state.classroom)
    .then((response) => {
      console.log(response.data);
    }, error => {
      this.props.history.push('/in');
      window
    .location
    .reload();
  });
  }
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      document.documentElement.className += " perfect-scrollbar-on";
      document.documentElement.classList.remove("perfect-scrollbar-off");
      ps = new PerfectScrollbar(this.refs.mainPanel, { suppressScrollX: true });
      let tables = document.querySelectorAll(".table-responsive");
      for (let i = 0; i < tables.length; i++) {
        ps = new PerfectScrollbar(tables[i]);
      }
    } 
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
      document.documentElement.className += " perfect-scrollbar-off";
      document.documentElement.classList.remove("perfect-scrollbar-on");
    }
  }
  componentDidUpdate(e) {
    if (e.history.action === "PUSH") {
      if (navigator.platform.indexOf("Win") > -1) {
        let tables = document.querySelectorAll(".table-responsive");
        for (let i = 0; i < tables.length; i++) {
          ps = new PerfectScrollbar(tables[i]);
        }
      }
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      this.refs.mainPanel.scrollTop = 0;
    }
  }
  // this function opens and closes the sidebar on small devices
  toggleSidebar = () => {
    document.documentElement.classList.toggle("nav-open");
    this.setState({ sidebarOpened: !this.state.sidebarOpened });
  };
  getRoutes = routes => {
    const user  = this.state.currentUser;
    return routes.map((prop, key) => {
    
      if (prop.layout === "/classroom") {
           return (
                <Route
                exact
                  path={prop.layout+'/:classroomId' + prop.path}
                  component={prop.component}
                  key={key}
                />
              );
          
      } else {
        return null;
      }
    });
  };
  handleBgClick = color => {
    this.setState({ backgroundColor: color });
  };
  getBrandText = path => {
    for (let i = 0; i < routes.length; i++) {
      if (
        this.props.location.pathname.indexOf(
          routes[i].layout + routes[i].path
        ) !== -1
      ) {
        return routes[i].name;
      }
    }
    return "Classroom";
  };
  logOut() {
    AuthService.logout();
  }
  render() {
    const { currentUser } = this.state;
    return (
      <div>
        <div className="wrapper">
          <Sidebar
            {...this.props}
            routes={routes}
            bgColor={this.state.backgroundColor}
            logo={{
              text: currentUser.name
            }}
            toggleSidebar={this.toggleSidebar}
            data={currentUser}
            logout={this.logOut}
            user={currentUser}
            classroom={this.state.classroom}
          />
          <div
            className="main-panel"
            ref="mainPanel"
            data={this.state.backgroundColor}
          >
            <AdminNavbar
              {...this.props} 
              brandText={this.getBrandText(this.props.location.pathname)}
              toggleSidebar={this.toggleSidebar}
              sidebarOpened={this.state.sidebarOpened}
              user={currentUser}
              logout={this.logOut}
              
            />
            <Switch>
              {this.getRoutes(routes)}
              <Route
              path={'/classroom/:classroomId/tests/test/:testId'}
              component={Test}
            />
              {currentUser.role==='student'?<Redirect from="*" to={"/classroom/"+this.state.classroom+"/home"}/>:<Redirect from="*" to={"/classroom/"+this.state.classroom+"/users"}/>}
              
            </Switch>
            {// we don't want the Footer to be rendered on map page
            this.props.location.pathname.indexOf("maps") !== -1 ? null : (
              <Footer fluid />
            )}
          </div>
        </div>
        <FixedPlugin
          bgColor={this.state.backgroundColor}
          handleBgClick={this.handleBgClick}
        />
      </div>

      
    );
  }
}

export default Classroom;
