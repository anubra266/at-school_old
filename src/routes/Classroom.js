import React from "react";
import {Route, Switch, Redirect} from "react-router-dom";

import "assets/scss/black-dashboard-react.scss";
import "assets/demo/demo.css";
import "assets/css/nucleo-icons.css";

// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

// core components
import Navbar from "./private/Navbar.js";
import Footer from "./private/Footer.js";
import Sidebar from "./private/Classroom/Sidebar.js";

//import TRoutes from "./routes.js";
import routes from "../roles/roles.js"
import * as Routes from './routes_list';

import logo from "assets/img/react-logo.png";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";
import {uniqBy} from 'lodash';
//import rolesConfig from '../../roles/roles.js';
var ps;

class Classroom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            backgroundColor: "blue",
            sidebarOpened: document
                .documentElement
                .className
                .indexOf("nav-open") !== -1,
            currentUser: this.props.user,
            layout: "/in/classroom",
            educator:false
        };
    }

    componentDidMount() {
        UserService.getclassroomrole(this.props.match.params.slug).then(response=>{
            this.setState({educator:response.data})
        });
        if (navigator.platform.indexOf("Win") > -1) {
            document.documentElement.className += " perfect-scrollbar-on";
            document
                .documentElement
                .classList
                .remove("perfect-scrollbar-off");
            ps = new PerfectScrollbar(this.refs.mainPanel, {suppressScrollX: true});
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
            document
                .documentElement
                .classList
                .remove("perfect-scrollbar-on");
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
        document
            .documentElement
            .classList
            .toggle("nav-open");
        this.setState({
            sidebarOpened: !this.state.sidebarOpened
        });
    };
    getRoutes = routes => {
        return routes.map((prop, key) => {

            if (prop.layout === this.state.layout) {
                return (<Route path={prop.layout + prop.url} component={prop.component} key={key}/>);

            } else {
                return null;
            }
        });
    };
    handleBgClick = color => {
        this.setState({backgroundColor: color});
    };
    getBrandText = path => {
        const {currentUser} = this.state;
        const user_roles = currentUser.roles;
        const user_roles_arr = user_roles.reduce((acc, nxt) => {
            acc.push(nxt.role);
            return acc;
        }, []);

        // user roles
        const roles = [...user_roles_arr];
        let allowedRoutes = roles.reduce((acc, role) => {
            return [
                ...acc,
                ...routes[role].routes
            ]
        }, []);
        allowedRoutes = uniqBy(allowedRoutes, 'url');
        for (let i = 0; i < allowedRoutes.length; i++) {
            if (this.props.location.pathname.indexOf(allowedRoutes[i].layout + allowedRoutes[i].url) !== -1) {
                return allowedRoutes[i].name;
            }
        }
        return "";
    };
    logOut() {
        AuthService.logout();
        window
            .location
            .reload();
    }
    render() {
        const {currentUser} = this.state;
        const user_roles = currentUser.roles;
        const user_roles_arr = user_roles.reduce((acc, nxt) => {
            acc.push(nxt.role);
            return acc;
        }, []);

        // user roles
        const roles = [...user_roles_arr];
        let allowedRoutes = roles.reduce((acc, role) => {
            return [
                ...acc,
                ...routes[role].routes
            ]
        }, []);
        allowedRoutes = uniqBy(allowedRoutes, 'component');
        const ReRoute = ({
            component: Component,
            ...rest
        }) => {
            return (
                <Route exact
                    {...rest}
                    render={(props) => (<Component {...props} educator={this.state.educator} slug={this.props.match.params.slug} user={currentUser}/>)}/>
            );
        };
        const getRoutes = () => {
            return allowedRoutes.map(({layout, component, url}) => {
                if (layout === this.state.layout) {
                    return (<ReRoute
                        key={component}
                        path={`${this.props.match.path}${url}`}
                        component={Routes[component]}/>)
                }
            })
        }
         
        return (
            <div>
                <div className="wrapper">
                    <Sidebar
                        {...this.props}
                        bgColor={this.state.backgroundColor}
                        logo={{
                        text: currentUser.name
                    }}
                        toggleSidebar={this.toggleSidebar}
                        logout={this.logOut}
                        routes={routes}
                        user={currentUser}
                        allowedRoutes={allowedRoutes}
                        thislayout={this.state.layout}/>
                    <div className="main-panel" ref="mainPanel" data={this.state.backgroundColor}>
                        <Navbar
                            {...this.props}
                            brandText={this.getBrandText(this.props.location.pathname)}
                            toggleSidebar={this.toggleSidebar}
                            sidebarOpened={this.state.sidebarOpened}
                            user={currentUser}
                            thislayout={this.state.layout}
                            logout={this.logOut}/>

                        {getRoutes()}

                        <Footer fluid/>
                    </div>
                </div>
            </div>

        );
    }
}

export default Classroom;
