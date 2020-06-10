/*!

=========================================================
* Black Dashboard React v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import {Link} from "react-router-dom";
import Footer from "../Footer.js";
import classNames from "classnames";

// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    Row,
    Col
} from "reactstrap";
import NavBar from "./Navbar.js"

import OrgAdmin from "./OrgAdmin.js"
import EduHead from "./EduHead.js"
import Student from "./Student.js"

const Welcome = ({location}) => {

    return (
        <div>
            <div className="wrapper">
                <div className="main-panel">
                    <NavBar/>
                    <div className="content">
                        <Row>
                            <Col md="9">
                                <Card className="welct">

                                    <CardHeader>
                                        <h5 className="title">What would you like to do?</h5>

                                    </CardHeader>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="3">
                                <Student/>
                            </Col>
                            <Col md="3">
                                <EduHead/>
                            </Col>
                            <Col md="3">
                                <OrgAdmin/>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="3">
                                <Card className="card-user">
                                    <CardBody>

                                        <div className="author">
                                            <div className="block block-one"/>
                                            <div className="block block-one"/>
                                            <div className="block block-one"/>
                                            <div className="block block-one"/>
                                            <div className="block block-two"/>
                                            <div className="block block-three"/>
                                            <div className="block block-four"/>

                                            <h3>You're a Student</h3><hr/>
                                            <h4>You only need a Classroom Code</h4>
                                        </div>
                                    </CardBody>

                                </Card>
                            </Col>
                            <Col md="3">
                                <Card className="card-user">
                                    <CardBody>

                                        <div className="author">
                                            <div className="block block-one"/>
                                            <div className="block block-two"/>
                                            <div className="block block-three"/>
                                            <div className="block block-three"/>
                                            <div className="block block-three"/>
                                            <div className="block block-four"/>
                                            <h3>Educator / Department Head</h3><hr/>
                                            <h4>You only need your Organization or Environ Code</h4>
                                        </div>
                                    </CardBody>

                                </Card>
                            </Col>
                            <Col md="3">
                                <Card className="card-user">
                                    <CardBody>
                                        <div className="author">
                                            <div className="block block-one"/>
                                            <div className="block block-two"/>
                                            <div className="block block-three"/>
                                            <div className="block block-four"/>
                                            <div className="block block-four"/>
                                            <h3>Organization Admin</h3><hr/>
                                            <h4>You would start the cycle of Knowledge</h4>
                                        </div>
                                    </CardBody>

                                </Card>
                            </Col>
                        </Row>
                    </div>
                    <Footer fluid/>
                </div>
            </div>
        </div>
    );
}

export default Welcome;
