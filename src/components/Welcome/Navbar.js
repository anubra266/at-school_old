import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
import {Link} from "react-router-dom";
import notify from "../notify.js"
import AuthService from "../../services/auth.service.js"
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
    // this function is to open the Search modal
    toggleModalSearch = () => {
        this.setState({
            modalSearch: !this.state.modalSearch
        });
    };
    logout = () => {
        AuthService.logout();
        window.location.reload();
    }
    render() {
        return (
            <div>
                <Navbar className={classNames("navbar-absolute", this.state.color)} expand="lg">
                    <Container fluid>
                        <div className="navbar-wrapper">
                            <div
                                className={classNames("navbar-toggle d-inline", {toggled: this.props.sidebarOpened})}>
                                <button
                                    className="navbar-toggler"
                                    type="button"
                                    onClick={this.props.toggleSidebar}>
                                    <span className="navbar-toggler-bar bar1"/>
                                    <span className="navbar-toggler-bar bar2"/>
                                    <span className="navbar-toggler-bar bar3"/>
                                </button>
                            </div>
                            <NavbarBrand href="#pablo" onClick={e => e.preventDefault()}>
                                {notify.appname()}
                            </NavbarBrand>
                        </div>
                        <button
                            aria-expanded={false}
                            aria-label="Toggle navigation"
                            className="navbar-toggler"
                            data-target="#navigation"
                            data-toggle="collapse"
                            id="navigation"
                            type="button"
                            onClick={this.toggleCollapse}>
                            <span className="navbar-toggler-bar navbar-kebab"/>
                            <span className="navbar-toggler-bar navbar-kebab"/>
                            <span className="navbar-toggler-bar navbar-kebab"/>
                        </button>
                        <Collapse navbar isOpen={this.state.collapseOpen}>
                            <Nav className="ml-auto" navbar>

                                <Button
                                    onClick={() => this.logout()}
                                    className="btn-fill"
                                    color="primary"
                                    type="submit">
                                    Logout
                                </Button>

                                <li className="separator d-lg-none"/>
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>

            </div>
        );
    }
}

export default LandingNavbar;
