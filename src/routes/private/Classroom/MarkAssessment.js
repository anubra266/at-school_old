import React, {useState, useEffect} from "react";

// import classNames from "classnames"; reactstrap components
import {
    Card,
    CardHeader,
    CardBody,
    Row,
    Col,
    Button,
    ButtonGroup,
    Form,
    FormGroup,
    Input
} from "reactstrap";
import notify from "../../../services/notify.js"
// import className from "classnames";
import UserService from "../../../services/user.service";
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from "@diasraphael/ck-editor5-base64uploadadapter";
var parse = require('html-react-parser');

const MarkAssessment = ({slug, match, history}) => {
    const [score,
        setscore] = useState('0');

    const [test,
        settest] = useState(null);
    const [answer,
        setanswer] = useState('');
    const [disabled,
        setdisabled] = useState(true);
    useEffect(() => {
        UserService
            .marktestdetails(match.params.test, match.params.user)
            .then(response => {
                settest(response.data);
                setanswer(response.data.answer.answer);
                setdisabled(false);
            });

    }, []);
    const finishmarktest = (e)=>{
        e.preventDefault()
        setdisabled(true);
        UserService
                    .finishmarktest(test.answer.id, answer, test.id, score)
                    .then(response => {
                        notify.user('Mark Test', 'Saved Successfully', 'success');
                        setdisabled(false);
                        history.push('/in/classroom/' + slug + "/submissions/"+test.id);
                    }, error => {
                        const errMsg = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                        notify.user('Mark Test', errMsg, 'danger');
                        setdisabled(false);
                    })
    }
    return (
        <div className="content">
            <Row>
                <Col md="12">
                    <Card>
                        <CardHeader>
                            <Row>
                                <Col md="10">
                                    Mark Assessment
                                </Col>
                            </Row>
                        </CardHeader>
                        {test && <CardBody className="all-icons">
                            <Row>
                                <Col md="10">
                                    {(test.user.firstName) + " " + (test.user.middleName).charAt(0) + ". " + test.user.lastName}
                                    {test
                                        .user
                                        .lastName
                                        .split('').pop() === 's'
                                        ? ''
                                        : "'s"}
                                    {" submission for " + test.title + " Test."}
                                </Col>
                            </Row>
                            {parse(test.question.question)}
                            <Form method="POST" onSubmit={finishmarktest}>

                                <FormGroup><br/>
                                    <p className="title">
                                        <strong>Submitted Answer below</strong>
                                    </p>
                                    <CKEditor
                                        editor={ClassicEditor}
                                        onInit={editor => {
                                        editor.setData('<span style="color:hsl(0,75%,60%);">NB: You can pick the red color for distinct ' +
                                                'test corrections.</span><br />' + test.answer.answer);
                                    }}
                                        onChange={(event, editor) => {
                                        const data = editor.getData();
                                        setanswer(data)
                                    }}/>

                                </FormGroup>
                                <Row>
                                    <Col md="12">
                                        <FormGroup>
                                        <label>Enter Score here:</label>
                                            <Input
                                                style={{
                                                color: "black"
                                            }}
                                                max={test.total}
                                                value={score}
                                                onChange={(e) => setscore(e.target.value)}
                                                type="number"
                                                placeholder="Input Score Here"/>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="10"></Col>
                                    <Col md="2">
                                        <ButtonGroup className="btn-group-toggle float-right" data-toggle="buttons">
                                            <Button disabled={disabled} type="submit" color="info" size="sm">Finish Marking</Button>
                                        </ButtonGroup>
                                    </Col>
                                </Row>
                            </Form>
                        </CardBody>}
                    </Card>
                </Col>
            </Row>
        </div>
    );

}

export default MarkAssessment;