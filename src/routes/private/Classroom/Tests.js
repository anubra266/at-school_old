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
    CardText,
    CardTitle
} from "reactstrap";
import notify from "../../../services/notify.js"
import className from "classnames";
import UserService from "../../../services/user.service";
var alltests;

const Tests = ({history, educator, slug, match,location}) => {
    const [theoryTests,
        settheoryTests] = useState(null);
    const [objectiveTests,
        setobjectiveTests] = useState(null);
    useEffect(() => {
        UserService
            .gettheorytests(slug)
            .then(response => {
                settheoryTests(response.data);
            });
        UserService
            .getobjectivetests(slug)
            .then(response => {
                setobjectiveTests(response.data);
                if (theoryTests && objectiveTests) {
                    alltests = theoryTests.concat(objectiveTests)
                }
            });
    }, [theoryTests, objectiveTests]);

    const [createtest,
        setcreatetest] = useState(false);

    const toggle = () => setcreatetest(!createtest);
    const [title,
        settitle] = useState('');
    const [duration,
        setduration] = useState('');
    const [starttime,
        setstarttime] = useState('');
    const [deadline,
        setdeadline] = useState('');
    const [test_type,
        settest_type] = useState('theory');
    const [disabled,
        setdisabled] = useState(false);

    const handlecreatetest = (e) => {
        e.preventDefault()
        setdisabled(true);
        if (test_type === 'theory') {
            UserService
                .createtheorytest(slug, title, deadline)
                .then(response => {
                    const test = response.data;
                    notify.user('Create New Test', 'Test Created Successfully', 'success');
                    history.push("/in/classroom/" + slug + "/tests/questionst/" + test.id);
                    setdisabled(false);
                }, error => {

                    setdisabled(false);
                });
        } else {
            UserService
                .createobjecivetest(slug, title, duration, starttime, deadline)
                .then(response => {
                    const test = response.data;
                    notify.user('Create New Test', 'Test Created Successfully', 'success');
                    history.push("/in/classroom/" + slug + "/tests/questionso/" + test.id);
                    setdisabled(false);
                }, error => {

                    setdisabled(false);
                });
        }
    }
    const taketest=(type,id)=>{
        if(type==="objective"){
            history.push("/in/test/" + slug + "/objective/" + id);
        }else{
            history.push("/in/test/" + slug + "/theory/" + id);
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
                                {educator
                                    ? <Col md="2">
                                            <ButtonGroup className="btn-group-toggle float-right" data-toggle="buttons">
                                                <Button onClick={toggle} tag="label" color="info" size="sm">Create New Test</Button>
                                            </ButtonGroup>
                                            <Modal isOpen={createtest} toggle={toggle} className={className + ""}>
                                                <ModalBody>
                                                    <h3
                                                        style={{
                                                        color: "black"
                                                    }}>
                                                        Create New Test
                                                    </h3>
                                                    <Form onSubmit={handlecreatetest} action="POST">
                                                        <FormGroup>
                                                            <Label for="title">Test Title
                                                            </Label>
                                                            <Input
                                                                style={{
                                                                color: "black"
                                                            }}
                                                                type="text"
                                                                name="title"
                                                                id="title"
                                                                placeholder="Accounting Assignment"
                                                                value={title}
                                                                onChange={(e) => settitle(e.target.value)}
                                                                required/>
                                                        </FormGroup>
                                                        <FormGroup>
                                                            <Label for="exampleCustomSelect">Custom Select</Label>
                                                            <Input
                                                                style={{
                                                                color: "black"
                                                            }}
                                                                onChange={(e) => settest_type(e.target.value)}
                                                                required
                                                                type="select"
                                                                id="exampleCustomSelect"
                                                                name="test_type">
                                                                <option value="theory">Theory</option>
                                                                <option value="objective">Objective</option>
                                                            </Input>

                                                        </FormGroup>
                                                        {test_type === "objective"
                                                            ? <div>
                                                                    <FormGroup>
                                                                        <Label for="duration">Duration (Minutes)
                                                                        </Label>
                                                                        <Input
                                                                            style={{
                                                                            color: "black"
                                                                        }}
                                                                            type="number"
                                                                            name="Duration"
                                                                            id="Duration"
                                                                            placeholder="60"
                                                                            value={duration}
                                                                            onChange={(e) => setduration(e.target.value)}
                                                                            required/>
                                                                    </FormGroup>
                                                                    <FormGroup>
                                                                        <Label for="starttime">Startime (Date-Time) - Time it becomes visible.
                                                                        </Label>
                                                                        <Input
                                                                            style={{
                                                                            color: "black"
                                                                        }}
                                                                            type="datetime-local"
                                                                            name="starttime"
                                                                            id="starttime"
                                                                            value={starttime}
                                                                            onChange={(e) => setstarttime(e.target.value)}
                                                                            required/>

                                                                    </FormGroup>
                                                                </div>
                                                            : ''}
                                                        <FormGroup>
                                                            <Label for="deadline">Deadline (Date-Time)
                                                            </Label>
                                                            <Input
                                                                style={{
                                                                color: "black"
                                                            }}
                                                                type="datetime-local"
                                                                name="deadline"
                                                                id="deadline"
                                                                value={deadline}
                                                                onChange={(e) => setdeadline(e.target.value)}
                                                                required/>

                                                        </FormGroup>

                                                        <Button disabled={disabled}>Submit</Button>
                                                    </Form>
                                                </ModalBody>
                                            </Modal>
                                        </Col>

                                    : ''}
                            </Row>
                        </CardHeader>
                        <CardBody className="all-icons">

                            <Row>
                                {alltests && alltests.map((test) => {
                                    return (
                                        <Col sm="4">
                                            <Card body>
                                                <CardTitle>
                                                    <strong>{test.title}</strong>
                                                </CardTitle>
                                                <CardText>
                                                    {test.starttime
                                                        ? <p>
                                                                Duration:{" " + test.duration}<br/>
                                                                Opens:{" " + new Date(test.starttime).toLocaleString()}<br/>
                                                                Closes:{" " + new Date(test.deadline).toLocaleString()}<br/>
                                                                <strong>Objective Test</strong>
                                                            </p>
                                                        : <p>
                                                            Deadline: {new Date(test.deadline).toLocaleString()}
                                                            <strong><br/>Theory Test</strong>
                                                        </p>
}
                                                </CardText>
                                                <Button type="submit" color="info" size="sm" onClick={taketest(test.starttime?'objective':'theory',test.id)}>View Test</Button>
                                            </Card>
                                        </Col>
                                    )
                                })}
                            </Row>

                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    );

}

export default Tests;