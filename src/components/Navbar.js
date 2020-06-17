import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";

import {Link} from "react-router-dom";
import notify from "../services/notify.js";
// reactstrap components
import {
    Button,
    Collapse,
    NavbarBrand,
    Navbar,
    Nav,
    Container
} from "reactstrap";

class LandingNavbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapseOpen: false,
            modalSearch: false,
            color: "navbar-transparent"
        };
    }
    componentDidMount() {
        window.addEventListener("resize", this.updateColor);
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.updateColor);
    }
    // function that adds color white/transparent to the navbar on resize (this is
    // for the collapse)
    updateColor = () => {
        if (window.innerWidth < 993 && this.state.collapseOpen) {
            this.setState({color: "bg-white"});
        } else {
            this.setState({color: "navbar-transparent"});
        }
    };
    // this function opens and closes the collapse on small devices
    toggleCollapse = () => {
        if (this.state.collapseOpen) {
            this.setState({color: "navbar-transparent"});
        } else {
            this.setState({color: "bg-white"});
        }
        this.setState({
            collapseOpen: !this.state.collapseOpen
        });
    };
    render() {
        return (
            <div>
                <div class="site-mobile-menu site-navbar-target">
                    <div class="site-mobile-menu-header">
                        <div class="site-mobile-menu-close mt-3">
                            <span class="icon-close2 js-menu-toggle"></span>
                        </div>
                    </div>
                    <div class="site-mobile-menu-body"></div>
                </div>

                <header
                    className="site-navbar py-4 js-sticky-header site-navbar-target"
                    role="banner">

                    <div className="container-fluid">
                        <div className="d-flex align-items-center">
                            <div className="site-logo mr-auto w-25">
                                <strong>
                                    {this.props.location.pathname === "/"
                                        ? <a href="#at-school">at-School</a>
                                        : <a
                                            href="#at-school"
                                            style={{
                                            color: "black"
                                        }}>at-School</a>}
                                </strong>
                            </div>

                            {this.props.location.pathname === "/"

                                ? <div className="mx-auto text-center">
                                        <nav className="site-navigation position-relative text-right" role="navigation">
                                            <ul
                                                className="site-menu main-menu js-clone-nav mx-auto d-none d-lg-block  m-0 p-0">
                                                <li>
                                                    <a href="#home-section" className="nav-link">Home</a>
                                                </li>
                                                <li>
                                                    <a href="#programs-section" className="nav-link">Features</a>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                : ''}

                            <div className="ml-auto w-25">
                                <nav className="site-navigation position-relative text-right" role="navigation">
                                    <ul
                                        className="site-menu main-menu site-menu-dark js-clone-nav mr-auto d-none d-lg-block m-0 p-0">
                                        <li className="cta">
                                            {this.props.location.pathname !== "/register"
                                                ? <Link to="/register" className="nav-link">
                                                        <span>Sign Up</span>
                                                    </Link>
                                                : <Link to="/login" className="nav-link">
                                                    <span>Login</span>
                                                </Link>}

                                        </li>
                                    </ul>
                                </nav>
                                <a
                                    href="#at-school"
                                    className="d-inline-block d-lg-none site-menu-toggle js-menu-toggle text-black float-right">
                                    <span className="icon-menu h3"></span>
                                </a>
                            </div>
                        </div>
                    </div>

                </header>

            </div>
        );
    }
}

export default LandingNavbar;
