
/*eslint-disable*/
import React from "react";
// used for making the prop types of this component
import PropTypes from "prop-types";

// reactstrap components
import { Container, Row, Nav, NavItem, NavLink } from "reactstrap";

class Footer extends React.Component {
  render() {
    return (
			<footer className="footer">
				<Container fluid>
					<Nav>
						<NavItem>
							<NavLink href="https://www.anubra.tech" target="_blank">
								Anubra
							</NavLink>
						</NavItem>
						<NavItem>
							<NavLink href="https://blog.anubra.tech" target="_blank">
								Blog
							</NavLink>
						</NavItem>
					</Nav>
					<div className="copyright">
						© {new Date().getFullYear()} made with <i className="icon-heart" />{" "}
						by{" "}
						<a href="https://www.linkedin.com/in/anubra266" target="_blank">
							Anubra
						</a>{" "}
						for a better learning flow.
					</div>
				</Container>
			</footer>
		);
  }
}

export default Footer;
