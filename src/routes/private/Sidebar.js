/*eslint-disable*/
import React from "react";
import {NavLink, Link} from "react-router-dom";
// nodejs library to set properties for components
import {PropTypes} from "prop-types";

// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

// reactstrap components
import {Nav, NavLink as ReactstrapNavLink} from "reactstrap";
import {uniqBy} from 'lodash';
import rolesConfig from '../../config/roles.js';
var ps;

class InSidebar extends React.Component {
    constructor(props) {
        super(props);
        this
            .activeRoute
            .bind(this);
    }
    // verifies if routeName is the one active (in browser input)
    activeRoute(routeName) {
        return this
            .props
            .location
            .pathname
            .indexOf(routeName) > -1
            ? "active"
            : "";
    }
    componentDidMount() {
        console.log(this.props.routes)
        if (navigator.platform.indexOf("Win") > -1) {
            ps = new PerfectScrollbar(this.refs.sidebar, {
                suppressScrollX: true,
                suppressScrollY: false
            });
        }
    }
    componentWillUnmount() {
        if (navigator.platform.indexOf("Win") > -1) {
            ps.destroy();
        }
    }
    linkOnClick = () => {
        document
            .documentElement
            .classList
            .remove("nav-open");
    };

    render() {
        const {bgColor, routes, user, thislayout} = this.props;
        const user_roles = user.roles;
        const user_roles_arr = user_roles.reduce((acc, nxt) => {
            acc.push(nxt.role);
            return acc;
        }, []);

        // user roles
        const roles = [...user_roles_arr];
        let allowedRoutes = roles.reduce((acc, role) => {
            return [
                ...acc,
                ...rolesConfig[role].routes
            ]
        }, []);
        allowedRoutes = uniqBy(allowedRoutes, 'component');

        return (
            <div className="sidebar" data={bgColor}>
                <div className="sidebar-wrapper" ref="sidebar">

                    <Nav>
                        {allowedRoutes.map((prop, key) => {
                            if (prop.layout === thislayout) {

                                if (prop.redirect) 
                                    return null;
                                return (
                                    <li
                                        className={this.activeRoute(prop.url) + (prop.pro
                                        ? " active-pro"
                                        : "")}
                                        key={key}>
                                        <NavLink
                                            to={prop.layout + prop.url}
                                            className="nav-link"
                                            activeClassName="active"
                                            onClick={this.props.toggleSidebar}>
                                            <i className={prop.icon}/>
                                            <p>{prop.name}</p>
                                        </NavLink>
                                    </li>
                                );
                            }

                        })}
                        <li>
                            <a href="/" onClick={this.props.logout}>
                                <i className="tim-icons icon-button-power"/>
                                <p>Logout</p>
                            </a>
                        </li>
                    </Nav>
                </div>
            </div>
        );
    }
}

InSidebar.defaultProps = {
    rtlActive: false,
    bgColor: "primary",
    routes: [{}]
};

InSidebar.propTypes = {
    // if true, then instead of the routes[i].name, routes[i].rtlName will be
    // rendered insde the links of this component
    rtlActive: PropTypes.bool,
    bgColor: PropTypes.oneOf(["primary", "blue", "green"]),
    routes: PropTypes.arrayOf(PropTypes.object),
    logo: PropTypes.shape({
        // innerLink is for links that will direct the user within the app it will be
        // rendered as <Link to="...">...</Link> tag
        innerLink: PropTypes.string,
        // outterLink is for links that will direct the user outside the app it will be
        // rendered as simple <a href="...">...</a> tag
        outterLink: PropTypes.string,
        // the text of the logo
        text: PropTypes.node,
        // the image src of the logo
        imgSrc: PropTypes.string
    })
};

export default InSidebar;
