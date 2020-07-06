import React, {useState, useEffect} from "react";

// import classNames from "classnames";

// reactstrap components
import {
    Card,
    CardHeader,
    CardBody,
    Row,
    Col,
    Button,
    ButtonGroup,
    Form,
    FormGroup
} from "reactstrap";
import notify from "../../../services/notify.js"
// import className from "classnames";
import UserService from "../../../services/user.service";
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from "@diasraphael/ck-editor5-base64uploadadapter";
var parse = require('html-react-parser');

const TheoryTest = ({user, match, history}) => {
    const [test,
        settest] = useState(null);
    const [disabled,
        setdisabled] = useState(null);
    const [answer,
        setanswer] = useState('');
    const [answered,
        setanswered] = useState(false);
    // const [answereditor,
    //     setanswereditor] = useState();
    useEffect(() => {
        UserService
            .gettheorytest(match.params.test)
            .then(response => {
                settest(response.data);  
                setanswered(response.data.theoryquestion.theoryanswer.length > 0)
            });
    }, []);
    const pat = match.path;
    const patharr = pat.split('/');
    const slug = patharr[3];
    const submitTest = (e) => {
        setdisabled(true);
        e.preventDefault();
        const question_id = test.theoryquestion.id;
        if (answer === '') {
            notify.user('Submit Test', 'You have not modified the Answer Input', 'warning');
            setdisabled(false);

        } else {

            if (!answered) {

                UserService
                    .submittheorytest(question_id, answer)
                    .then(response => {
                        notify.user('Submit Test', 'Test Submitted Successfully', 'success');
                        history.push('/in/classroom/' + slug + "/tests");
                    }, error => {
                        const errMsg = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                        notify.user('Submit Test', errMsg, 'danger');
                        setdisabled(false);
                    })
            } else {
                UserService
                    .updatetheorytest(test.theoryquestion.theoryanswer[0].id, answer)
                    .then(response => {
                        notify.user('Submit Test', 'Test Modified Successfully', 'success');
                        history.push('/in/classroom/' + slug + "/tests");
                    }, error => {
                        const errMsg = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                        notify.user('Submit Test', errMsg, 'danger');
                        setdisabled(false);
                    })
            }
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
                                    TheoryTest
                                </Col>
                            </Row>
                        </CardHeader>
                        {test && <CardBody className="all-icons">
                            {parse(test.theoryquestion.question)}
                            <Form method="POST" onSubmit={submitTest}>

                                <FormGroup><br/>
                                    <p className="title">
                                        <strong>Paste your answers Here</strong>{" - "}
                                        Click the 🖼️ icon to insert pictures.
                                    </p>
                                    <CKEditor
                                        editor={ClassicEditor}
                                        onInit={editor => {
                                        // setanswereditor(editor);
                                        editor.setData(answered
                                            ? test.theoryquestion.theoryanswer[0].answer
                                            : '<b><u>' + test.title + '</u></b><br /><h5><span style="color:hsl(0,75%,60%);">Submitted: ' + new Date().toLocaleDateString() + '</span></h5><br /> Edit this to your taste😋');
                                    }}
                                        onChange={(event, editor) => {
                                        const data = editor.getData();
                                        setanswer(data)
                                    }}/>

                                </FormGroup>
                                <Row>
                                    <Col md="10"></Col>
                                    <Col md="2">
                                        <ButtonGroup className="btn-group-toggle float-right" data-toggle="buttons">
                                            <Button disabled={disabled} type="submit" color="info" size="sm">Submit Test</Button>
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

export default TheoryTest;