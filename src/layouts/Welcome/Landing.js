import React from "react";
// import { Link, Route, Switch, Redirect } from "react-router-dom"; javascript
// plugin used to create scrollbars on windows
import Login from "./Login.js";
import Register from "./Register.js";
import Footer from "components/Footer/Footer.js";

import {
    Collapse,
    Navbar,
    NavbarBrand,
    Nav,
    NavbarText,
    Container,
    Row,
    Col
} from 'reactstrap';
var ps;

const pageStyle = {
    position: "absolute",
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70%'
};
class Landing extends React.Component {

    render() {
        return (
            <div className="wrapper">

                <div className="main-panel" ref="mainPanel">
                    <Navbar color="dark" dark expand="md">
                        <NavbarBrand href="/">
                            <strong></strong>{" "}
                            CBT System</NavbarBrand>

                        <Collapse navbar>
                            <Nav className="mr-auto" navbar></Nav>
                            <NavbarText>Nigerian Navy Secondary Schools, Abeokuta</NavbarText>
                        </Collapse>
                    </Navbar>
                    <div style={pageStyle}>
                        <Container>
                            <Row>
                                <Col xs="12">
                                    <Login {...this.props}></Login>
                                </Col>
                                
                            </Row>
                            <Footer fluid/>
                        </Container>
                    </div>
                </div>

            </div>
        );
    }
}

export default Landing;