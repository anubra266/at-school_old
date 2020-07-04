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
    CardTitle,
    CardText
} from "reactstrap";
import notify from "../../../services/notify.js"
import className from "classnames";
import UserService from "../../../services/user.service";

const Tests = ({history, educator, slug, match, location}) => {

    const [theoryTests,
        settheoryTests] = useState(null);
    const [objectiveTests,
        setobjectiveTests] = useState(null);

    const [noobjective,
        setnoobjective] = useState(null);
    const [notheory,
        setnotheory] = useState(null);

        const updatetheorytests = ()=>{
            UserService
            .gettheorytests(slug)
            .then(response => {
                if (response.data.length < 1) {
                    setnotheory(true);
                    settheoryTests([]);
                } else {
                    settheoryTests(response.data);
                    setnotheory(false);
                }

            });
        }
        const updateobjectivetests = ()=>{
            UserService
            .getobjectivetests(slug)
            .then(response => {
                if (response.data.length < 1) {
                    setnoobjective(true);
                    setobjectiveTests([]);
                } else {
                    setobjectiveTests(response.data);
                    setnoobjective(false);
                }
            });
        }
    useEffect(() => {
            updateobjectivetests();
            const updateobj = setInterval(()=>{
            updateobjectivetests();
        },25000);
        updatetheorytests();
        return () => clearInterval(updateobj);

    }, []); 
    window
    .Echo
    .channel('at_school_database_tests')
    .listen('UpdateTheoryTests', e => {
        updatetheorytests();
    })
    

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
    const taketest = (type, id) => {
        if (type === "objective") {
            history.push("/in/test/" + slug + "/objective/" + id);
        } else {
            history.push("/in/test/" + slug + "/theory/" + id);
        }
    }
    const [activeTab,
        setActiveTab] = useState('1');

    const toggletype = tab => {
        if (activeTab !== tab) 
            setActiveTab(tab);
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

                            <Nav tabs>
                                <NavItem>
                                    <NavLink
                                        style={{
                                        cursor: "pointer"
                                    }}
                                        className={activeTab === '1'
                                        ? "testtab_active"
                                        : ''}
                                        onClick={() => {
                                        toggletype('1');
                                    }}>
                                        Theory
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        style={{
                                        cursor: "pointer"
                                    }}
                                        className={activeTab === '2'
                                        ? "testtab_active"
                                        : ''}
                                        onClick={() => {
                                        toggletype('2');
                                    }}>
                                        Objective
                                    </NavLink>
                                </NavItem>
                            </Nav>
                            <TabContent activeTab={activeTab}>
                                <TabPane tabId="1">
                                    <Row>
                                        {theoryTests
                                            ? theoryTests.filter(theory => new Date(theory.deadline) > new Date()).map((test) => {
                                                return (
                                                    <Col sm="4">
                                                        <Card body>
                                                            <CardTitle>
                                                                <strong>{test.title}</strong>
                                                            </CardTitle>
                                                            <CardTitle>
                                                                <strong>Created:{" "}</strong>
                                                                {new Date(test.created_at).toLocaleString()}</CardTitle>
                                                            <CardTitle>
                                                                <strong>Deadline:{" "}</strong>
                                                                {new Date(test.deadline).toLocaleString()}</CardTitle>
                                                            <Button
                                                                tag="label"
                                                                color="info"
                                                                onClick={() => taketest('theory', test.id)}
                                                                size="sm">View</Button>
                                                        </Card>
                                                    </Col>
                                                )
                                            })
                                            :  <Col sm="12"><div><span className="text-info">Wait...</span></div> </Col>}
                                            {notheory
                                                ? <Col sm="12"><div>
                                                        <span className="text-info">No Pending Theory Tests!{" "}</span>
                                                        They'll be here when available.</div> </Col>
                                                : ''}
                                    </Row>
                                </TabPane>
                                <TabPane tabId="2">
                                    <Row>
                                        {objectiveTests
                                            ? objectiveTests.filter(objective => (new Date(objective.deadline) > new Date()) && (new Date(objective.starttime) <= new Date())).map((test) => {
                                                return (

                                                    <Col sm="4">
                                                        <Card body>
                                                            <CardTitle>
                                                                <strong>{test.title}</strong>
                                                            </CardTitle>
                                                            <CardTitle>
                                                                <strong>Created:{" "}</strong>
                                                                {new Date(test.created_at).toLocaleString()}</CardTitle>
                                                            <CardTitle>
                                                                <strong>Deadline:{" "}</strong>
                                                                {new Date(test.deadline).toLocaleString()}</CardTitle>
                                                            <CardTitle>
                                                                <strong>Duration:{" "}</strong>
                                                                {test.duration + " "}Minutes</CardTitle>
                                                            <CardTitle>{test.objectivequestions.length + " "}Questions</CardTitle>
                                                            <Button
                                                                tag="label"
                                                                color="info"
                                                                onClick={() => taketest('objective', test.id)}
                                                                size="sm">View</Button>
                                                        </Card>
                                                    </Col>
                                                )
                                            })
                                            : <Col sm="12"><div><span className="text-info">Wait...</span></div> </Col>}
                                            {noobjective
                                                ? <Col sm="12"><div>
                                                        <span className="text-info">No Pending Objective Tests!{" "}</span>
                                                        They'll be here when available.</div> </Col>
                                                : objectiveTests&&objectiveTests.filter(objective => (new Date(objective.deadline) > new Date()) && (new Date(objective.starttime) <= new Date())).length<1?<Col sm="12"><div>
                                                <span className="text-info">There are upcoming Tests{" "}</span>
                                                Be patient please.</div> </Col>:''}
                                    </Row>
                                </TabPane>
                            </TabContent>

                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    );

}

export default Tests;