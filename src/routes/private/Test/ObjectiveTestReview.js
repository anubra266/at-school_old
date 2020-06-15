import React, {useState, useEffect} from "react";

import Timer from "./Timer.js"
// reactstrap components
import {
    Card,
    CardHeader,
    CardBody,
    Row,
    Col,
    Label,
    FormGroup,
    CustomInput
} from "reactstrap";
import notify from "../../../services/notify.js"
import UserService from "../../../services/user.service";
var parse = require('html-react-parser');

const ObjectiveTestReview = ({user, match, history}) => {
    const [test,
        settest] = useState(null);
    const [result,
        setresult] = useState(null);
    useEffect(() => {
        UserService
            .getobjectivetestreview(match.params.test)
            .then(response => {
                settest(response.data);
            });
        UserService
            .getobjectivetestresult(match.params.test)
            .then(response => {
                setresult(response.data);
            });
    }, []);
    const pat = match.path;
    const patharr = pat.split('/');
    const slug = patharr[3];

    return (
        <div className="content">
            <Row>
                <Col md="12">
                    <Row>
                        <Card>
                            <CardHeader>Review</CardHeader>
                            <CardBody className="all-icons">
                                <strong>{test && test.title}</strong>
                            </CardBody>
                        </Card>
                    </Row>

                </Col>
            </Row>
            <Row>
                <Col>
                    {test && <div>
                        {test
                            .objectivequestions
                            .map((question, key) => {
                                return (
                                    <Card>
                                        <CardBody>
                                            <FormGroup>
                                                <Label for="">
                                                    <strong>{key + 1}{". "}</strong>{parse(question.question)}</Label>
                                                <div>
                                                    {question
                                                        .objectiveoptions
                                                        .map((option, key) => {
                                                            return (<CustomInput
                                                                type="radio"
                                                                id={option.id + option}
                                                                name={question.id}
                                                                value={option.id}
                                                                label={option.option}
                                                                valid={option.is_correct}
                                                                />)
                                                        })}

                                                </div>
                                            </FormGroup>
                                        </CardBody>
                                    </Card>
                                )
                            })}
                    </div>}

                </Col>
            </Row>
        </div>
    );

}

export default ObjectiveTestReview;