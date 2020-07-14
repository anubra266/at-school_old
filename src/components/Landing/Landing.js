
import React from "react";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

// core components
import Navbar from "../Navbar.js";
import Footer from "../Footer.js";
import MainPage from "./MainPage.js";

import "../../assets/landingfonts/icomoon/style.css";
import  "../../assets/landingcss/style.css";

var ps;

class Admin extends React.Component {
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

    handleBgClick = color => {
        this.setState({backgroundColor: color});
    };

    render() {
        return (
            <div data-spy="scroll" data-target=".site-navbar-target" data-offset="300">
                <div className="site-wrap">
                    <div ref="mainPanel">
                        <Navbar {...this.props}/>

                        <MainPage/>
 
                        <Footer fluid/>

                    </div>
                </div>
            </div>
        );
    }
}

export default Admin;
