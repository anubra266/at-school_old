import React, {useState, useEffect} from "react";

import Timer from "./Timer.js"
// reactstrap components
import {
    Card,
    CardHeader,
    CardBody,
    Row,
    Col,
    Button,
    ButtonGroup,
    CardTitle,
    CardText,
    Label,
    FormGroup,
    CustomInput
} from "reactstrap";
import notify from "../../../services/notify.js"
import className from "classnames";
import UserService from "../../../services/user.service";
var parse = require('html-react-parser');

const ObjectiveTest = ({user, match}) => {
    const [test,
        settest] = useState(null);
    const [cbt,
        setcbt] = useState(null);
    const [answer,
        setanswer] = useState('');
    const [submitting,
        setsubmitting] = useState(false);
    useEffect(() => {
        UserService
            .getobjectivetest(match.params.test)
            .then(response => {
                settest(response.data);
                const init_result = response
                    .data
                    .objectivequestions
                    .reduce((acc, question) => {
                        const question_id = question.id;
                        const answer = null;
                        const total = {
                            question: question_id,
                            answer: answer
                        };
                        acc.push(total);
                        return acc
                    }, []);
                setcbt(init_result)
            });
    }, []);
    const handleanswer = (choice) => {
        const question = choice[0];
        const answer = choice[1];
        var new_cbt = cbt;
        cbt.reduce((acc,nxt,index)=>{
            const init_question = nxt.question;
            if(init_question===question){
                nxt.answer = answer;
                new_cbt[index] = nxt;
            }
        },{})
        setcbt(new_cbt);
    }
    const submitobjectivequestions = (e) => {
        setsubmitting(false);
        e.preventDefault()

    }
    return (
        <div className="content">
            {cbt && console.log(cbt)}
            <Row>
                <Col md="12">
                    <Card>
                        <CardHeader>
                            <Row>
                                <Col md="10">
                                    ObjectiveTest
                                </Col>
                                <Col md="2">
                                    <ButtonGroup className="btn-group-toggle float-right" data-toggle="buttons">
                                        <Button tag="label" color="info" size="sm">Timer</Button>
                                    </ButtonGroup>
                                </Col>
                            </Row>
                        </CardHeader>
                        <CardBody className="all-icons"></CardBody>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col>
                    <form method="POST" onSubmit={submitobjectivequestions}>
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
                                                                    onChange={(e) => handleanswer([question.id, option.id])}
                                                                    label={option.option}/>)
                                                            })}

                                                    </div>
                                                </FormGroup>
                                            </CardBody>
                                        </Card>
                                    )
                                })}
                            <Row>
                                <Col md="10"></Col>
                                <Col md="2">
                                    <ButtonGroup className="btn-group-toggle float-right" data-toggle="buttons">
                                        <Button disabled={submitting} type="submit" color="info" size="sm">Submit</Button>
                                    </ButtonGroup>
                                </Col>
                            </Row>
                        </div>
}

                    </form>
                </Col>
            </Row>
        </div>
    );

}

export default ObjectiveTest;