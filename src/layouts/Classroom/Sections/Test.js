import React, {useEffect, useState, useRef} from "react";
import Skeleton, {SkeletonTheme} from "react-loading-skeleton";

import {Link} from "react-router-dom";
import classNames from "classnames";

import {store} from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';

import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from "@diasraphael/ck-editor5-base64uploadadapter";

// import ClassicEditor from '@ckeditor/ckeditor5-build-classic'; reactstrap
// components
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
    InputGroupAddon,
    Modal
} from "reactstrap";
import {OutTable, ExcelRenderer} from 'react-excel-renderer';

import UserService from "../../../services/user.service";
import AuthService from "../../../services/auth.service";
var parse = require('html-react-parser');
const loader = <Card>
    <CardHeader>
        <Row>
            <Col md="10">
                <Breadcrumb>
                    <BreadcrumbItem>
                        <a href="#">Tests</a>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>Test</BreadcrumbItem>
                    <BreadcrumbItem active>
                        Title</BreadcrumbItem>
                </Breadcrumb>
            </Col>

        </Row>
    </CardHeader>
    <CardBody>
        <Row>
            <Col sm="4">
                <p className="title">
                    Count: 3 Question(s)
                </p>
            </Col>
            <Col sm="4">
                <p className="title">
                    Instruction: Do this
                </p>
            </Col>
        </Row>
        <Row>
            <Col sm="4">
                <p className="title">
                    Duration: 5 Minutes
                </p>
            </Col>
            <Col sm="4">
                <p className="title">
                    Deadline: date
                </p>
            </Col>
        </Row>
        <Row>
            <Col sm="10">

                <Form>
                    <FormGroup tag="fieldset">
                        <div className="upload-butn-wrapper">
                            <div className="butn">Import from Excel</div>
                        </div><br/>
                        <Label>
                            <strong>Excel contents should be in order:{" "}</strong>
                            Question, Options (Correct Option first).
                            <br/>
                            First Row will be Ignored, as it is considered header.
                        </Label>

                    </FormGroup>
                    <FormGroup><br/>
                        <p className="title">1. Type your Question Here{" "}
                            <label>
                                - you can insert pictures and tables.😊{" "}
                                <Button color="primary" size="sm">Preview</Button>
                            </label>

                        </p>
                        <CKEditor editor={ClassicEditor}/>

                    </FormGroup>
                    <FormGroup tag="fieldset">
                        <p className="title">Your Options{" "}

                            <label>
                                Insert correct answer in (A). Options would be shuffled during test

                            </label>
                        </p>

                        <FormGroup>
                            <Label>
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>A</InputGroupText>
                                    </InputGroupAddon>

                                    <Input/>
                                </InputGroup>
                            </Label>
                        </FormGroup>
                        <FormGroup>
                            <Label>
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>B</InputGroupText>
                                    </InputGroupAddon>

                                    <Input/>
                                </InputGroup>
                            </Label>
                        </FormGroup>
                        <FormGroup>
                            <Label>
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>C</InputGroupText>
                                    </InputGroupAddon>

                                    <Input/>
                                </InputGroup>
                            </Label>
                        </FormGroup>
                        <FormGroup>
                            <Label>
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>D</InputGroupText>
                                    </InputGroupAddon>

                                    <Input/>
                                </InputGroup>
                            </Label>
                        </FormGroup>
                    </FormGroup>
                    <FormGroup>
                        <Button color="info" size="sm">Add Question</Button>
                    </FormGroup>
                </Form>
                {/*parse(question)*/}
            </Col>
        </Row>
    </CardBody>

</Card>;
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
    const [questioneditor,
        setquestioneditor] = useState();

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
                    questioneditor.setData("");
                    setloading(false);
                }, error => {
                    const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                    notify("Add Questions to Test", resMessage, 'danger');
                    console.log(resMessage);
                    setloading(false);
                });
        }

    }
    const [preview,
        setpreview] = useState(false);
    let randomString = Math
        .random()
        .toString(36);
    const [uploadkey,
        setuploadkey] = useState(randomString);
    const togglepreview = () => setpreview(!preview);
    const [wait,
        setwait] = useState(false);

    const fileHandler = fileObj => {

        if (!fileObj) {

            notify('Upload Excel File', "No file uploaded!", 'danger')
            setwait(false)

            return false;
        }
        console.log("fileObj.type:", fileObj.type);
        if (!(fileObj.type === "application/vnd.ms-excel" || fileObj.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")) {
            notify('Upload Excel File', "Unknown file format. Only Excel files are uploaded!", 'danger')
            setwait(false)

            return false;
        }
        const isLt2M = fileObj.size / 1024 / 1024 < 6;
        if (!isLt2M) {
            notify('Upload Excel File', "File can't be more than 5mb!", 'danger')
            setwait(false)

            return false;
        }
        //just pass the fileObj as parameter
        ExcelRenderer(fileObj, (err, resp) => {
            if (err) {
                console.log(err);
                setwait(false)

            } else {
                let newRows = [];
                resp
                    .rows
                    .slice(1)
                    .map((row, index) => {
                        if (row && row !== "undefined") {
                            //newRows.push({key: index, name: row[0], age: row[1], gender: row[2]});
                            newRows.push({
                                question: {
                                    body: row[0]
                                },
                                options: [
                                    {
                                        body: row[1],
                                        is_correct: true
                                    }, {
                                        body: row[2],
                                        is_correct: false
                                    }, {
                                        body: row[3],
                                        is_correct: false
                                    }, {
                                        body: row[4],
                                        is_correct: false
                                    }
                                ]
                            });
                        }
                    });
                if (newRows.length === 0) {
                    notify('Upload Excel File', "No data found in file!", 'danger')
                    setuploadkey(randomString)
                    setwait(false)

                    return false;
                } else {
                    // this.setState({cols: resp.cols, rows: newRows, errorMessage: null});
                    // setcols(resp.cols); console.log(resp.cols) setrows(newRows);
                    // console.log(newRows); seterrormessage(null);
                    console.log(newRows);

                    UserService
                        .addfromexcel(testId, newRows)
                        .then((response) => {
                            notify("Add Questions to Test", response.data, 'success');
                            console.log(response.data);
                            setuploadkey(randomString)
                            setwait(false)

                            return true;

                        }, error => {
                            const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                            notify("Add Questions to Test", resMessage + ' - Make sure no cell is empty', 'danger');
                            setuploadkey(randomString)
                            setwait(false)

                            return false;
                        });
                }
            }
        });
        return false;
    }
    const excelupload = (event) => {
        let fileObj = event.target.files[0];
        setwait(true)
        //just pass the fileObj as parameter
        fileHandler(fileObj);

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
                                                <FormGroup tag="fieldset">
                                                    <div className="upload-butn-wrapper">
                                                        {wait === true
                                                            ? <h1>Wait...</h1>
                                                            : <button className="butn">Import from Excel</button>}
                                                        <input
                                                            key={uploadkey}
                                                            type="file"
                                                            name="excelfile"
                                                            onChange={(e) => excelupload(e)}/>
                                                    </div><br/>
                                                    <Label>
                                                        <strong>Excel contents should be in order:{" "}</strong>
                                                        Question, Options (Correct Option first).
                                                        <br/>
                                                        First Row will be Ignored, as it is considered header.
                                                    </Label>

                                                </FormGroup>
                                                <FormGroup><br/>
                                                    <p className="title">{test.questions.length + 1}. Type your Question Here{" "}
                                                        <label>
                                                            - you can insert pictures and tables.😊{" "}
                                                            <Button onClick={togglepreview} color="primary" size="sm">Preview</Button>
                                                        </label>
                                                        <Modal
                                                            isOpen={preview}
                                                            toggle={togglepreview}
                                                            className={classNames + " modals"}>
                                                            <Card>
                                                                <CardBody>
                                                                    <h3>
                                                                        Question Preview
                                                                    </h3>
                                                                    {parse(question)}
                                                                </CardBody>
                                                            </Card>
                                                        </Modal>
                                                    </p>
                                                    <CKEditor
                                                        editor={ClassicEditor}
                                                        onInit={editor => {
                                                        setquestioneditor(editor);
                                                    }}
                                                        onChange={(event, editor) => {
                                                        const data = editor.getData();
                                                        setquestion(data)
                                                    }}/>

                                                </FormGroup>
                                                <FormGroup tag="fieldset">
                                                    <p className="title">Your Options{" "}

                                                        <label>
                                                            Insert correct answer in (A). Options would be shuffled during test

                                                        </label>
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
                                                    <ButtonGroup className="btn-group-toggle float-right" data-toggle="buttons">
                                                        <Link to={"/classroom/" + classroomId + "/tests"}>
                                                            <Button color="info" size="sm">Save Test</Button>
                                                        </Link>
                                                    </ButtonGroup>
                                                </FormGroup>
                                            </Form>
                                            {/*parse(question)*/}
                                        </Col>
                                    </Row>
                                </CardBody>

                            </Card>
                        : loader}

                </Col>
            </Row>
        </div>
    );

}

export default Test;