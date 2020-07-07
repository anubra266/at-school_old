import React, {useState, useEffect} from "react";

// reactstrap components
import {
    Card,
    CardHeader,
    CardBody,
    Row,
    Col,
    Button,
    CardTitle
} from "reactstrap";
import notify from "../../../services/notify.js"
import className from "classnames";
import UserService from "../../../services/user.service";

const Assessments = ({history, educator, slug, match, location}) => {

    const [theoryTests,
        settheoryTests] = useState(null);

    const [notheory,
        setnotheory] = useState(null);

        const updatetheorytests = ()=>{
            UserService
            .getalltheorytests(slug)
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
    useEffect(() => {
        updatetheorytests();
    }, []); 

    window
    .Echo
    .channel('at_school_database_tests')
    .listen('UpdateTheoryTests', e => {
        updatetheorytests();
    })
    

    const testsubmissions = (id) => {
            history.push("/in/classroom/" + slug + "/submissions/" + id);
    } 
    return (
        <div className="content">

            <Row>
                <Col md="12">
                    <Card>
                        <CardHeader>
                            <Row>
                                <Col md="10">
                                    Assessments 
                                </Col> 
                                 
                            </Row>
                        </CardHeader>
                        <CardBody className="all-icons">

                                    <Row>
                                        {theoryTests
                                            ? theoryTests.map((test) => {
                                                return (
                                                    <Col md="4">
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
                                                                onClick={() => testsubmissions(test.id)}
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

                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    );

}

export default Assessments;