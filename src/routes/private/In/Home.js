import React, {useState, useEffect} from "react";

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

const Home = ({user}) => {
    //const user = AuthService.getCurrentUser();
    const [message,
        setmessage] = useState('');
    window
        .Echo
        .channel('at_school_database_chat')
        .listen('TestSocketsMessage', e => {

            console.log(e['chatMessage'])
            setmessage(e['chatMessage'])
        })
    return (
        <div className="content">
            <Row>
                <Col md="12">
                    <Card>
                        <CardHeader>
                            <Row>
                                <Col md="10">
                                    Home {message}
                                </Col>
                                <Col md="2"></Col>
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