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
import React, {useState, useEffect} from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts reactstrap components
import {
    Button,
    ButtonGroup,
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    //CardImg, CardSubtitle, CardText,
    Row,
    Col,
    Table,
    FormGroup,
    Label,
    Input,
    UncontrolledTooltip,
    TabContent,
    TabPane,
    Alert
} from "reactstrap";

import UserService from "../../../services/user.service.js";
import AuthService from "../../../services/auth.service";

const Dashboard = () => {
    const user = AuthService.getCurrentUser();
    const loader = <div className="loader"/>;
    const [usersdata,
        setusersdata] = useState('student');
    const [students,
        setstudents] = useState([]);
    const [studentsmessage,
        setstudentsmessage] = useState(loader);
    const clearerror = () => {
        setstudentsmessage('');
    }
    useEffect(() => {
        UserService
            .getStudents()
            .then(response => {
                setstudents(response.data);
                setstudentsmessage('')
            }, error => {
               
                    setstudentsmessage(
                        <Alert color="danger">
                            {(error.response && error.response.data && error.response.data.message) || error.message || error.toString()}
                        </Alert>
                    );
                    setTimeout(clearerror, 3000);


            });

    }, [students]);
    const [teachers,
        setteachers] = useState([]);
    const [teachersmessage,
        setteachersmessage] = useState(loader);
    useEffect(() => {
        UserService
            .getTeachers()
            .then(response => {
                
                setteachers(response.data);
                setteachersmessage('');
            }, error => {
                    setteachersmessage(
                        <Alert color="danger">
                            {(error.response && error.response.data && error.response.data.message) || error.message || error.toString()}
                        </Alert>
                    );
                

            });

    }, [teachers]);
    const toggle = tab => {
        if (usersdata !== tab) {
            if (!(tab === 'teacher' && user.role === 'teacher')) {
                setusersdata(tab);
            }
        }
    }

    return (
        <div className="content">

            <Row>
                <Col xs="12">
                    <Card className="card-chart">
                        <CardHeader>
                            <Row>
                                <Col className="text-left" sm="6">
                                    <h5 className="card-category">Users</h5>
                                    <CardTitle tag="h2">Details</CardTitle>
                                </Col>

                                <Col sm="6">

                                    <ButtonGroup className="btn-group-toggle float-right" data-toggle="buttons">
                                        <Button
                                            tag="label"
                                            className={classNames("btn-simple", {
                                            active: usersdata === "student"
                                        })}
                                            color="info"
                                            id="0"
                                            size="sm"
                                            onClick={() => {
                                            toggle('student');
                                        }}>
                                            <input defaultChecked className="d-none" name="options" type="radio"/>
                                            <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                                                Students
                                            </span>
                                            <span className="d-block d-sm-none">
                                                <i className="tim-icons icon-coins"/>
                                            </span>
                                        </Button>

                                        <Button
                                            color="info"
                                            id="1"
                                            size="sm"
                                            tag="label"
                                            className={classNames("btn-simple", {
                                            active: usersdata === "teacher"
                                        })}
                                            onClick={() => {
                                            toggle('teacher');
                                        }}
                                            disabled=
                                            {(user.role === 'teacher')}>
                                            <input className="d-none" name="options" type="radio"/>
                                            <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                                                Teachers
                                            </span>
                                            <span className="d-block d-sm-none">
                                                <i className="tim-icons icon-coins"/>
                                            </span>
                                        </Button>
                                    </ButtonGroup>
                                </Col>
                            </Row>
                        </CardHeader>
                        <CardBody>
                            <Col className="text-left" sm="12">
                                <FormGroup></FormGroup>
                            </Col>

                            <TabContent activeTab={usersdata}>
                                <TabPane tabId="student">
                               
                                Students

                                </TabPane>

                                <TabPane tabId="teacher">
                                   
                                Teachers
                                </TabPane>
                            </TabContent>
                        </CardBody>
                    </Card>
                </Col>
            </Row>

        </div>

    );

}

export default Dashboard;
