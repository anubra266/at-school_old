import React from "react";
import {Route, Switch, Redirect} from "react-router-dom";

import "assets/scss/black-dashboard-react.scss";
import "assets/demo/demo.css";
import "assets/css/nucleo-icons.css";

// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

// core components
import AdminNavbar from "./private/Navbar.js";
import Footer from "./private/Footer.js"; 
import Sidebar from "./private/Sidebar.js";

import TRoutes from "./routes.js";
import routes from "../roles/roles.js"
import logo from "assets/img/react-logo.png";
import AuthService from "../services/auth.service";
var ps;

class In extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            backgroundColor: "blue",
            sidebarOpened: document 
                .documentElement
                .className
                .indexOf("nav-open") !== -1,
            currentUser: this.props.user
        };
    }

    componentDidMount() {
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

            if (prop.layout === "/in") {
                return (<Route path={prop.layout + prop.path} component={prop.component} key={key}/>);

            } else {
                return null;
            }
        });
    };
    handleBgClick = color => {
        this.setState({backgroundColor: color});
    };
    getBrandText = path => {

        return "Classrooms";
    };
    logOut() {
        AuthService.logout();
    }
    render() {
        const {currentUser} = this.state;
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
                        data={currentUser}
                        logout={this.logOut}
                        routes={routes}
                        user={currentUser}
                        thislayout="/in"/>
                    <div className="main-panel" ref="mainPanel" data={this.state.backgroundColor}>
                        <AdminNavbar
                            {...this.props}
                            brandText={this.getBrandText(this.props.location.pathname)}
                            toggleSidebar={this.toggleSidebar}
                            sidebarOpened={this.state.sidebarOpened}
                            user={currentUser}
                            logout={this.logOut}/>

                        <TRoutes user={currentUser} thislayout="/in" />

                        <Footer fluid/>
                    </div>
                </div>
            </div>

        );
    }
}

export default In;
