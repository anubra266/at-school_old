import React,{useState, useEffect} from "react";

import classNames from "classnames";

// reactstrap components
import {
    Card,
    CardHeader,
    CardBody,
    Row,
    Col,
    Button,
    ButtonGroup
} from "reactstrap";
import notify from "../../../services/notify.js"
import className from "classnames";
import UserService from "../../../services/user.service";
//import AuthService from "../../../services/auth.service";
import Echo from "laravel-echo"
window.io = require('socket.io-client');

window.Echo = new Echo({
    broadcaster: 'socket.io',
    host: window.location.hostname + ':6001' // this is laravel-echo-server host
});
const Home = ({user}) => {
    //const user = AuthService.getCurrentUser();

    return (
        <div className="content">
            <Row>
                <Col md="12">
                    <Card>
                        <CardHeader>
                            <Row>
                                <Col md="10">
                                    Home 
                                </Col>
                                <Col md="2">
                                   
                                </Col>
                            </Row>
                        </CardHeader>
                        <CardBody className="all-icons"></CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    );

}

export default Home;