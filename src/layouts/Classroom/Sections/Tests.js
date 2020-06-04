import React, {useEffect, useState} from "react";
import classNames from "classnames";
import {store} from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';
// reactstrap components
import {
    Card,
    CardHeader,
    CardBody,
    Row,
    Col,
    Button,
    ButtonGroup,
    Modal,
    Form,
    FormGroup,
    Label,
    Input
} from "reactstrap";

import UserService from "../../../services/user.service";
import AuthService from "../../../services/auth.service";

const Tests = ({
    match,
    className,
    history
}, props) => {
    const notify = (title, message, type) => {
        store.addNotification({
            title: title, message: message, type: type, // 'default', 'success', 'info', 'warning'
            insert: "top", // where to add the notification to another
            container: 'bottom-right', // where to position the notifications
            animationIn: [
                "animated", "fadeIn"
            ], // animate.css classes that's applied
            animationOut: [
                "animated", "fadeOut"
            ], // animate.css classes that's applied
            dismiss: {
                duration: 3000
            }
        })
    }
    const user = AuthService.getCurrentUser();
    const checkusertype = () => {
        UserService
            .checkclassroommember(user.id, classroomId)
            .then((response) => {
                setusertype(response.data);
            })
    }
    const {params: {
            classroomId
        }} = match;
    const [usertype,
        setusertype] = useState(() => {
        checkusertype()
    });
    const [createtest,
        setcreatetest] = useState(false);

    const toggle = () => setcreatetest(!createtest);

    const [title,
        settitle] = useState('');
    const [instruction,
        setinstruction] = useState('Answer all Questions');
    const [duration,
        setduration] = useState('');
    const [deadline,
        setdeadline] = useState('');
    const [disabled,
        setdisabled] = useState(false);
    const classroom = match.params.classroomId;
    const checkdate = () => {
        var dateString = deadline;
        var myDate = new Date(dateString);
        var today = new Date();
        if (myDate < today) {
            notify('Create Test', 'You can\'t Insert a previous Date', 'danger');
            return false;
        }
        return true;

    }
    const handlecreatetest = (e) => {

        e.preventDefault();
        if (checkdate() === true) {
            setdisabled(true);
            return UserService
                .createnewtest(classroom, title, instruction, duration, deadline)
                .then((response) => {
                    notify('Create New Test', response.data.message, 'success');
                    //?push to questions section
                    history.push("/classroom/" + classroomId + "/tests/test/" + response.data.test);
                }, error => {
                    const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                    notify('Create New Test', resMessage, 'danger')
                    setdisabled(false);
                });
        }
    }
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

                                {usertype === 'creator'
                                    ? <Col md="2">
                                            <ButtonGroup className="btn-group-toggle float-right" data-toggle="buttons">
                                                <Button onClick={toggle} tag="label" color="info" size="sm">Create New Test</Button>
                                            </ButtonGroup>
                                            <Modal isOpen={createtest} toggle={toggle} className={className + " modals"}>
                                                <Card>
                                                    <CardBody>
                                                        <h3>
                                                            Create New Test
                                                        </h3>

                                                        <Form onSubmit={handlecreatetest} action="POST">
                                                            <FormGroup>
                                                                <Label for="title">Test Title
                                                                </Label>
                                                                <Input
                                                                    type="text"
                                                                    name="title"
                                                                    id="title"
                                                                    placeholder="Accounting Assignment"
                                                                    value={title}
                                                                    onChange={(e) => settitle(e.target.value)}
                                                                    required/>
                                                            </FormGroup>
                                                            <FormGroup>
                                                                <Label for="instruction">Test Instruction
                                                                </Label>
                                                                <Input
                                                                    type="text"
                                                                    name="instruction"
                                                                    id="instruction"
                                                                    placeholder="Answer all Questions"
                                                                    value={instruction}
                                                                    onChange={(e) => setinstruction(e.target.value)}
                                                                    required/>
                                                            </FormGroup>
                                                            <FormGroup>
                                                                <Label for="duration">Duration (Minutes)
                                                                </Label>
                                                                <Input
                                                                    type="number"
                                                                    name="Duration"
                                                                    id="Duration"
                                                                    placeholder="60"
                                                                    value={duration}
                                                                    onChange={(e) => setduration(e.target.value)}
                                                                    required/>
                                                            </FormGroup>
                                                            <FormGroup>
                                                                <Label for="deadline">Deadline (Date-Time)
                                                                </Label>
                                                                <Input
                                                                    type="datetime-local"
                                                                    name="deadline"
                                                                    id="deadline"
                                                                    value={deadline}
                                                                    onChange={(e) => setdeadline(e.target.value)}
                                                                    required/>

                                                            </FormGroup>

                                                            <Button disabled={disabled}>Submit</Button>
                                                        </Form>
                                                    </CardBody>
                                                </Card>
                                            </Modal>
                                        </Col>
                                    : ""}

                            </Row>
                        </CardHeader>
                        <CardBody>

                            <Row>
                                <Col className="font-icon-list col-xs-6 col-xs-6" lg="3" md="4" sm="4">
                                    <div
                                        className="font-icon-detail"
                                        style={{
                                        cursor: "pointer"
                                    }}>
                                        Financial Accounting<br/>
                                        20 Minutes<br/>
                                        02/10/20
                                        <p>Objective Test</p>
                                    </div>
                                </Col>

                            </Row>

                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    );

}

export default Tests;