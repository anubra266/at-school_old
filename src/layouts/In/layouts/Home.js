import React from "react";

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

import UserService from "services/user.service";
import AuthService from "services/auth.service";

const Home = () => {
    const user = AuthService.getCurrentUser();

    return (
        <div className="content">
            <Row>
                <Col md="3">
                    <Card>
                        <CardHeader>
                           <h3>4</h3>
                        </CardHeader>
                        <CardBody>
                        <h3>Environs</h3>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    );

}

export default Home;