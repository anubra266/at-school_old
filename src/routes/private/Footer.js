
/*eslint-disable*/
import React from "react";
// used for making the prop types of this component
import PropTypes from "prop-types";

// reactstrap components
import { Container, Row, Nav, NavItem, NavLink } from "reactstrap";

class InFooter extends React.Component {
  render() {
    return (
      <footer className="footer">
        <Container fluid>
          
          <div className="copyright">
            © {new Date().getFullYear()} made with{" "}
            <i className="icon-heart" /> by{" "}
            <a
              href="https://www.linkedin.com/in/anuoluwapo-abraham-91a311194/"
              target="_blank"
            >
              Abraham A. Aremu
            </a>{" "}
            to ease lockdown learning.
          </div>
        </Container>
      </footer>
    );
  }
}

export default InFooter;
