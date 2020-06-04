import React, {useEffect, useState, useRef} from "react";
import Skeleton, {SkeletonTheme} from "react-loading-skeleton";

import {Link} from "react-router-dom";
import classNames from "classnames";

import {store} from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import * as QuillTableUI from 'quill-table-ui'

// reactstrap components
import {
    Card,
    CardHeader,
    CardBody,
    Row,
    Col,
    Button,
    ButtonGroup,
    Breadcrumb,
    BreadcrumbItem,
    FormGroup,
    Form,
    Label,
    Input,
    InputGroup,
    InputGroupText,
    InputGroupAddon
} from "reactstrap";

import UserService from "../../../services/user.service";
import AuthService from "../../../services/auth.service";
var parse = require('html-react-parser');

Quill.register({
    'modules/tableUI': QuillTableUI
  }, true)
const Test = ({match, history}) => {
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

    const {
        params: {
            classroomId,
            testId
        }
    } = match;
    const checkusertype = () => {
        UserService
            .checkclassroommember(user.id, classroomId)
            .then((response) => {
                setusertype(response.data);
            })
    }
    const [usertype,
        setusertype] = useState(() => {
        checkusertype()
    });

    const [test,
        settest] = useState([]);

    useEffect(() => {
        if (usertype && usertype !== 'creator') {
            history.push("/");
        }
        UserService
            .gettest(testId)
            .then((response) => {
                settest(response.data);
            })
    });
    const [question,
        setquestion] = useState('');
    const modules = {
        // imageResize: {   displaySize: true },
        table: true,
        tableUI: true,
        toolbar: [
            [
                {
                    'header': '1'
                }, {
                    'header': '2'
                }, {
                    'font': []
                }
            ],
            [
                {
                    size: []
                }
            ],
            [
                {
                    'color': []
                }, {
                    'background': []
                }
            ],
            [
                'bold', 'italic', 'underline', 'strike', 'blockquote'
            ],
            [
                {
                    'script': 'sub'
                }, {
                    'script': 'super'
                }
            ],
            [
                {
                    'list': 'ordered'
                }, {
                    'list': 'bullet'
                }, {
                    'indent': '-1'
                }, {
                    'indent': '+1'
                }
            ],
            [
                'table', 'link', 'image', 'video'
            ],
            ['clean']
        ]
    }

    const formats = [
        'header',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'indent',
        'link',
        'image'
    ]
    const [option1,
        setoption1] = useState('');
    const [option2,
        setoption2] = useState('');
    const [option3,
        setoption3] = useState('');
    const [option4,
        setoption4] = useState('');
    const [answer,
        setanswer] = useState({"option": '', "answer": ''});
    const checkanswer = (option, optionvalue) => {
        if (answer.option === option) {
            setanswer('');
        }
    }

    const [loading,
        setloading] = useState(false);
    const addquestion = (e) => {
        e.preventDefault();
        setloading(true);
        if (question === "") {
            notify("Add Questions to Test", 'Fill all fields', 'danger');
        } else {
            var this_question = {
                "body": question
            };
            var options = [
                {
                    "body": option1,
                    "is_correct": true
                }, {
                    "body": option2,
                    "is_correct": false
                }, {
                    "body": option3,
                    "is_correct": false
                }, {
                    "body": option4,
                    "is_correct": false
                }
            ];

            UserService
                .addquestion(testId, this_question, options)
                .then((response) => {
                    notify("Add Questions to Test", response.data, 'success');
                    setquestion("");
                    setoption1("");
                    setoption2("");
                    setoption3("");
                    setoption4("");
                    setanswer('');
                }, error => {
                    const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                    notify("Add Questions to Test", resMessage, 'danger');
                    console.log(resMessage);
                })

        }
        setloading(false);
    }
    return (
        <div className="content">

            <Row>
                <Col md="12">
                    {test.instruction
                        ? <Card>
                                <CardHeader>
                                    <Row>
                                        <Col md="10">
                                            <Breadcrumb>
                                                <BreadcrumbItem>
                                                    <Link to={"/classroom/" + classroomId + "/tests"}>Tests</Link>
                                                </BreadcrumbItem>
                                                <BreadcrumbItem active>Test</BreadcrumbItem>
                                                <BreadcrumbItem active>
                                                    {test.title}</BreadcrumbItem>
                                            </Breadcrumb>
                                        </Col>
                                        <Col md="2">
                                            <ButtonGroup className="btn-group-toggle float-right" data-toggle="buttons">
                                                <Button tag="label" color="info" size="sm">Save Test</Button>
                                            </ButtonGroup>
                                        </Col>

                                    </Row>
                                </CardHeader>
                                <CardBody>
                                    <Row>
                                        <Col sm="4">
                                            <p className="title">
                                                Count: {test.questions.length + " "}
                                                Question(s)
                                            </p>
                                        </Col>
                                        <Col sm="4">
                                            <p className="title">
                                                Instruction:{" " + test.instruction}
                                            </p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm="4">
                                            <p className="title">
                                                Duration:{" " + test.duration + " "}
                                                Minutes
                                            </p>
                                        </Col>
                                        <Col sm="4">
                                            <p className="title">
                                                Deadline:{" " + test.deadline}
                                            </p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm="10">
                                            <Form method="POST" onSubmit={addquestion}>
                                                <FormGroup><br/>
                                                    <p className="title">{test.questions.length + 1}. Type your Question Here{" "}
                                                        <label>
                                                            - you can insert pictures
                                                        </label>
                                                    </p>
                                                    <ReactQuill
                                                        value={question}
                                                        onChange={setquestion}
                                                        modules={modules}
                                                        formats={formats}
                                                        placeholder={'Write something...'}></ReactQuill>
                                                </FormGroup>
                                                <FormGroup tag="fieldset">
                                                    <p className="title">Your Options{" "}

                                                        <label>
                                                            Insert correct answer in (A). Options would be shuffled during test</label>
                                                    </p>

                                                    <FormGroup>
                                                        <Label>
                                                            <InputGroup>
                                                                <InputGroupAddon addonType="prepend">
                                                                    <InputGroupText>A</InputGroupText>
                                                                </InputGroupAddon>

                                                                <Input
                                                                    style={{
                                                                    border: "solid 1px green",
                                                                    borderLeft: "solid 1px transparent"
                                                                }}
                                                                    type="text"
                                                                    value={option1}
                                                                    onChange={(e) => {
                                                                    setoption1(e.target.value);
                                                                    setanswer(e.target.value)
                                                                }}
                                                                    required
                                                                    placeholder="Option 1"/>
                                                            </InputGroup>
                                                        </Label>
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <Label>
                                                            <InputGroup>
                                                                <InputGroupAddon addonType="prepend">
                                                                    <InputGroupText>B</InputGroupText>
                                                                </InputGroupAddon>

                                                                <Input
                                                                    style={{
                                                                    border: "solid 1px red",
                                                                    borderLeft: "solid 1px transparent"
                                                                }}
                                                                    type="text"
                                                                    value={option2}
                                                                    onChange={(e) => setoption2(e.target.value)}
                                                                    required
                                                                    placeholder="Option 2"/>
                                                            </InputGroup>
                                                        </Label>
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <Label>
                                                            <InputGroup>
                                                                <InputGroupAddon addonType="prepend">
                                                                    <InputGroupText>C</InputGroupText>
                                                                </InputGroupAddon>

                                                                <Input
                                                                    style={{
                                                                    border: "solid 1px red",
                                                                    borderLeft: "solid 1px transparent"
                                                                }}
                                                                    type="text"
                                                                    value={option3}
                                                                    onChange={(e) => setoption3(e.target.value)}
                                                                    required
                                                                    placeholder="Option 3"/>
                                                            </InputGroup>
                                                        </Label>
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <Label>
                                                            <InputGroup>
                                                                <InputGroupAddon addonType="prepend">
                                                                    <InputGroupText>D</InputGroupText>
                                                                </InputGroupAddon>

                                                                <Input
                                                                    style={{
                                                                    border: "solid 1px red",
                                                                    borderLeft: "solid 1px transparent"
                                                                }}
                                                                    type="text"
                                                                    value={option4}
                                                                    onChange={(e) => setoption4(e.target.value)}
                                                                    required
                                                                    placeholder="Option 4"/>
                                                            </InputGroup>
                                                        </Label>
                                                    </FormGroup>
                                                </FormGroup>
                                                <FormGroup>
                                                    <Button color="info" size="sm" disabled={loading}>Add Question</Button>
                                                </FormGroup>
                                            </Form>
                                            {/*parse(question)*/}
                                        </Col>
                                    </Row>
                                </CardBody>

                            </Card>
                        : <Skeleton/>
}
                </Col>
            </Row>
        </div>
    );

}

export default Test;