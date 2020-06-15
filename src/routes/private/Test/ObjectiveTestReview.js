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
    CustomInput,
    Button, ButtonGroup
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
                response
                    .data
                    .objectivequestions
                    .forEach((question) => {
                        question
                            .objectiveoptions
                            .sort((a, b) => 0.5 - Math.random());
                    });
                settest(response.data);
            });
        UserService
            .getobjectivetestresult(match.params.test)
            .then(response => {
                const user_result = response
                    .data
                    .reduce((acc, nxt, index) => {
                        const dquestion = nxt.objective_question_id;
                        const danswer = nxt.option_id
                        acc[dquestion] = danswer;
                        return acc;
                    }, {})
                setresult(user_result);
                console.log(user_result)
                console.log(response.data)
            });
    }, []);
    const pat = match.path;
    const patharr = pat.split('/');
    const slug = patharr[3];
    const back=()=>{
        history.push('/in/classroom/'+slug+"/tests");
    }
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
                    {test && result && <div>
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
                                                            return (
                                                                <Row><Col><CustomInput
                                                                    type="radio"
                                                                    id={option.id + option}
                                                                    name={question.id}
                                                                    value={option.id}
                                                                    label={option.option}
                                                                    valid={option.is_correct === 1}
                                                                    invalid={(option.id === result[question.id]) && option.is_correct === 0}/></Col><Col>
                                                                    {option.is_correct === 1&&(option.id === result[question.id])?"✔️":''}
                                                                    {(option.id === result[question.id]) && option.is_correct === 0?"❌":''}
                                                                    </Col>
                                                                    </Row>
                                                            )
                                                        })}

                                                </div>
                                            </FormGroup>
                                        </CardBody>
                                    </Card>
                                )
                            })
                        }
                        <Row>
                        <Col md="10"></Col>
                        <Col md="2">
                            <ButtonGroup className="btn-group-toggle float-right" data-toggle="buttons">
                                <Button
                                    onClick={back}
                                    tag="label"
                                    color="info"
                                    size="sm">Finish</Button>
                            </ButtonGroup>
                        </Col>
                    </Row>
                    </div>}

                </Col>
            </Row>
        </div>
    );

}

export default ObjectiveTestReview;