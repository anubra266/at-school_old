import React, {useState, useEffect} from "react";
import notify from "../../../services/notify.js"
import className from "classnames";
import UserService from "../../../services/user.service";

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

const StudentTests = ({history, educator, slug}) => {

    const [theoryTests,
        settheoryTests] = useState(null);
    const [objectiveTests,
        setobjectiveTests] = useState(null);

    const [noobjective,
        setnoobjective] = useState(null);
    const [notheory,
        setnotheory] = useState(null);
    const updatetheorytests = () => {
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
    const updateobjectivetests = () => {
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
        const updateobj = setInterval(() => {
            updateobjectivetests();
        }, 25000);
        updatetheorytests();
        return () => clearInterval(updateobj);

    }, []);
    window
        .Echo
        .channel('at_school_database_tests')
        .listen('UpdateTheoryTests', e => {
            updatetheorytests();
        })

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
        window
        .Echo
        .channel('at_school_database_tests')
        .listen('UpdateTheoryTests', e => {
            updatetheorytests();
        })
    return (

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
                                <Col md="4">
                                    <Card body>
                                        <CardTitle>
                                            <strong>{test.title}</strong>
                                        </CardTitle>
                                        <CardTitle>
                                            <strong>Created:{" "}</strong>
                                            {notify.date(test.created_at)}</CardTitle>
                                        <CardTitle>
                                            <strong>Deadline:{" "}</strong>
                                            {notify.date(test.deadline)}</CardTitle>
                                        <Button
                                            tag="label"
                                            color="info"
                                            onClick={() => taketest('theory', test.id)}
                                            size="sm">View</Button>
                                    </Card>
                                </Col>
                            )
                        })
                        :  <Col md="12"><div><span className="text-info">Wait...</span></div> </Col>}
                        {notheory
                            ? <Col md="12"><div>
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

                                <Col md="4">
                                    <Card body>
                                        <CardTitle>
                                            <strong>{test.title}</strong>
                                        </CardTitle>
                                        <CardTitle>
                                            <strong>Created:{" "}</strong>
                                            {notify.date(test.created_at)}</CardTitle>
                                        <CardTitle>
                                            <strong>Deadline:{" "}</strong>
                                            {notify.date(test.deadline)}</CardTitle>
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
                        : <Col md="12"><div><span className="text-info">Wait...</span></div> </Col>}
                        {noobjective
                            ? <Col md="12"><div>
                                    <span className="text-info">No Pending Objective Tests!{" "}</span>
                                    They'll be here when available.</div> </Col>
                            : objectiveTests&&objectiveTests.filter(objective => (new Date(objective.deadline) > new Date()) && (new Date(objective.starttime) <= new Date())).length<1?<Col sm="12"><div>
                            <span className="text-info">There are upcoming Tests{" "}</span>
                            Be patient please.</div> </Col>:''}
                </Row>
            </TabPane>
        </TabContent>

    </CardBody>

    );
}
export default StudentTests;