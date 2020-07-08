import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import classNames from "classnames";
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
    InputGroupAddon,
    Modal,
    ModalHeader,
    ModalBody
} from "reactstrap";
import notify from "../../../services/notify.js";
//import className from "classnames";
import UserService from "../../../services/user.service";
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from "@diasraphael/ck-editor5-base64uploadadapter";
import {/*OutTable, */ ExcelRenderer} from 'react-excel-renderer';
import {uniqBy} from 'lodash';

var parse = require('html-react-parser');

const Questiona = ({match, history}) => {
    const [preview,
        setpreview] = useState(false);

    const togglepreview = () => setpreview(!preview);
    const [test,
        settest] = useState(null);
    const [loading,
        setloading] = useState(null);
    const updatetest = () => {
        UserService
            .getobjectivetest(match.params.test)
            .then(response => {
                settest(response.data);
            });
    }
    useEffect(() => {
        updatetest();
    }, []);
    window
        .Echo
        .channel('at_school_database_tests')
        .listen('UpdateTestQuestions', e => {
            updatetest();
        })
    const [questioneditor,
        setquestioneditor] = useState(null);
    const [question,
        setquestion] = useState('');
    const [option1,
        setoption1] = useState('');
    const [option2,
        setoption2] = useState('');
    const [option3,
        setoption3] = useState('');
    const [option4,
        setoption4] = useState('');
    const addquestion = (e) => {
        setloading(true);
        e.preventDefault();
        if (question === "") {
            notify.user("Add Questions to Test", 'Fill all fields', 'danger');
            setloading(false);
        } else {
            var this_question = {
                "question": question
            };
            var options = [
                {
                    "option": option1,
                    "is_correct": true
                }, {
                    "option": option2,
                    "is_correct": false
                }, {
                    "option": option3,
                    "is_correct": false
                }, {
                    "option": option4,
                    "is_correct": false
                }
            ];
            //?No option should be the same
            options = uniqBy(options, 'option');
            if (options.length < 4) {
                notify.user("Add Questions to Test", 'Two options cannot have same value!', 'danger');

                setloading(false);
            } else {
                UserService
                    .addobjectivequestion(match.params.test, this_question, options)
                    .then(response => {
                        notify.user("Add Questions to Test", response.data, 'success');
                        setquestion("");
                        setoption1("");
                        setoption2("");
                        setoption3("");
                        setoption4("");
                        if (questioneditor) {
                            questioneditor.setData("");
                        }
                        setloading(false);
                    }, error => {
                        const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                        notify.user("Add Questions to Test", resMessage, 'danger');
                        setloading(false);
                    })
            }
        }
    }
    let randomString = Math
        .random()
        .toString(36);
    const [uploadkey,
        setuploadkey] = useState(randomString);
    const [wait,
        setwait] = useState(false);
    const fileHandler = (fileObj) => {
        if (!fileObj) {

            notify.user('Upload Excel File', "No file uploaded!", 'danger')
            setwait(false)

            return false;
        }
        if (!(fileObj.type === "application/vnd.ms-excel" || fileObj.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")) {
            notify.user('Upload Excel File', "Unknown file format. Only Excel files are uploaded!", 'danger')
            setwait(false)
            return false;
        }
        const isLt2M = fileObj.size / 1024 / 1024 < 6;
        if (!isLt2M) {
            notify.user('Upload Excel File', "File can't be more than 5mb!", 'danger')
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
                        if (row && row !== "undefined" && row.length !== 0) {
                            //newRows.push({key: index, name: row[0], age: row[1], gender: row[2]});
                            newRows.push({
                                question: {
                                    "question": row[0]
                                },
                                options: [
                                    {
                                        "option": row[1],
                                        "is_correct": true
                                    }, {
                                        "option": row[2],
                                        "is_correct": false
                                    }, {
                                        "option": row[3],
                                        "is_correct": false
                                    }, {
                                        "option": row[4],
                                        "is_correct": false
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
                        .addfromexcel(match.params.test, newRows)
                        .then((response) => {
                            notify.user("Add Questions to Test", response.data, 'success');
                            setuploadkey(randomString)
                            setwait(false)
                            return true;

                        }, error => {
                            const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                            notify.user("Add Questions to Test", resMessage + ' - Make sure no cell is empty', 'danger');
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
                    {test && <Card>
                        <CardHeader>
                            <Row>
                                <Col md="12">
                                    <Breadcrumb
                                        style={{
                                        backgroundColor: "white"
                                    }}>
                                        <BreadcrumbItem>
                                            <Link to={"/in/classroom/" + match.params.slug + "/tests"}>Tests</Link>
                                        </BreadcrumbItem>
                                        <BreadcrumbItem active>Test</BreadcrumbItem>
                                        <BreadcrumbItem active>
                                            {test.title}</BreadcrumbItem>
                                    </Breadcrumb>
                                </Col>
                            </Row>
                        </CardHeader>
                        <CardBody className="all-icons">
                            <Row>
                                <Col sm="4">
                                    <p className="title">
                                        Count: {test.objectivequestions.length + " "}
                                        Question(s)
                                    </p>
                                </Col>
                                <Col sm="4">
                                    <p className="title">
                                        Duration:{" " + test.duration + " "}
                                        Minutes
                                    </p>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm="4">
                                    <p className="title">
                                        Start-Time:{" " + notify.date(test.starttime)}
                                    </p>
                                </Col>
                                <Col sm="4">
                                    <p className="title">
                                        Deadline:{" " + notify.date(test.deadline)}
                                    </p>
                                </Col>
                            </Row>

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
                                        Question, OptionA (Correct Option), OptionB, OptionC, OptionD. E.g:
                                        <figure class="table">
                                            <table>
                                                <tbody>
                                                    <tr>
                                                        <td>1 + 1 equals?</td>
                                                        <td>2</td>
                                                        <td>4</td>
                                                        <td>3</td>
                                                        <td>8</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </figure>
                                        First Row will be Ignored, as it is considered header.
                                    </Label>

                                </FormGroup>
                                <FormGroup>
                                    <p className="">
                                        <strong>{test.objectivequestions.length + 1 + ". "}</strong>
                                        <strong>Type your Question Here</strong>{" "}
                                        <label>
                                            - You can{" "}
                                            <strong>paste from word</strong>, insert
                                            <strong>{" "}pictures</strong>
                                            {" "}and
                                            <strong>{" "}tables.</strong>😊{" "}
                                            <Button onClick={togglepreview} color="primary" size="sm">Preview</Button>
                                        </label>
                                        <Modal isOpen={preview} toggle={togglepreview} className={classNames}>
                                            <ModalHeader toggle={togglepreview}>Question Preview</ModalHeader>
                                            <ModalBody>
                                                <div
                                                    style={{
                                                    color: "black"
                                                }}>
                                                    {parse(question)}</div>
                                            </ModalBody>
                                        </Modal>
                                    </p>
                                    <CKEditor
                                        editor={ClassicEditor}
                                        onInit={editor => {
                                        setquestioneditor(editor);
                                        editor.setData('<p> </p><h2><span style="color: rgb(0, 0, 0);">Insert your question here</span><' +
                                                'span style="color: rgb(224, 175, 104);">😄</span><span style="color: rgb(169, 17' +
                                                '7, 214);">.</span></h2><p><span style="color: rgb(169, 177, 214);">Hit preview, ' +
                                                'Up </span><span style="color: rgb(224, 175, 104);">👆 to see the result.</span><' +
                                                '/p>');
                                        setquestion('<p> </p><h2><span style="color: rgb(0, 0, 0);">Insert your question here</span><' +
                                                'span style="color: rgb(224, 175, 104);">😄</span><span style="color: rgb(169, 17' +
                                                '7, 214);">.</span></h2><p><span style="color: rgb(169, 177, 214);">Hit preview, ' +
                                                'Up </span><span style="color: rgb(224, 175, 104);">👆 to see the result.</span><' +
                                                '/p>')
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
                                    {test.objectivequestions.length>0
                                        ? <ButtonGroup className="btn-group-toggle float-right" data-toggle="buttons">
                                        <Link to={"/in/classroom/" + match.params.slug + "/tests/"}>
                                            <Button color="info" size="sm">Finish</Button>
                                        </Link>
                                    </ButtonGroup>:''}
                                </FormGroup>
                            </Form>
                        </CardBody>
                    </Card>}
                </Col>!
            </Row>
        </div>
    );

}

export default Questiona;