import React, {useState, useEffect} from "react";

// reactstrap components
import {
    Card,
    CardHeader,
    CardBody,
    Row,
    Col,
    Button,
    ButtonGroup,
    Input,
    FormGroup,
    Label,
    Modal,
    ModalBody,
    Form,
    TabContent,
    TabPane,
    Nav,
    NavItem,
    NavLink,
    CardTitle
} from "reactstrap";
import notify from "../../../services/notify.js"
import className from "classnames";
import UserService from "../../../services/user.service";
import StudentResults from "./StudentResults";

const Tests = ({history, educator, slug, match, location}) => {

    return (
        <div className="content">

            <Row>
                <Col md="12">
                    <Card>
                        <CardHeader>
                            <Row>
                                <Col md="10">
                                    Tests 
                                </Col>
                                {educator
                                    ? <Col md="2">
                                            <ButtonGroup className="btn-group-toggle float-right" data-toggle="buttons">
                                                <Button tag="label" color="info" size="sm">Create New Test</Button>
                                            </ButtonGroup>
                                        </Col>

                                    : ''}
                            </Row>
                        </CardHeader>
                        {educator
                            ? <StudentResults ></StudentResults>

                            : ''}


                    </Card>
                </Col>
            </Row>
        </div>
    );

}

export default Tests;