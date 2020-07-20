import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
// import classNames from "classnames"; reactstrap components
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
    Pagination,
    PaginationItem,
    PaginationLink,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from "reactstrap";
import notify from "../../../services/notify.js";
//import className from "classnames";
import UserService from "../../../services/user.service";
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from "@diasraphael/ck-editor5-base64uploadadapter";
import {/*OutTable, */
    ExcelRenderer
} from 'react-excel-renderer';
import {uniqBy} from 'lodash';
import className from "classnames";

// var parse = require('html-react-parser');

const Questiona = ({match, history}) => {
    const [warning,
        setwarning] = useState(false);
    const togglewarning = () => setwarning(!warning);

    const pageSize = 1;
    const [QuestionsCount,
        setQuestionsCount] = useState(0);
    const [CurrentQuestion,
        setCurrentQuestion] = useState(0);
    const [togo,
        settogo] = useState(0);
    const changepage = (index) => {
        if (index === test.objectivequestions.length - 1) {
            questioneditor.setData(initialdata);
            setquestion('')
            setoption1('')
            setoption2('')
            setoption3('')
            setoption4('')
        } else {

            questioneditor.setData(test.objectivequestions[index].question);
            if(solutioneditor){
                if(test.objectivequestions[index].objectivesolutions.length > 0){
                    solutioneditor.setData((test.objectivequestions[index].objectivesolutions[0]).solution)
                    setsolution((test.objectivequestions[index].objectivesolutions[0]).solution)
                }else{
                    solutioneditor.setData(initialsolution)
                    setsolution('')
                }
            }
            setquestion(test.objectivequestions[index].question)
            setoption1(test.objectivequestions[index].objectiveoptions[0].option)
            setoption2(test.objectivequestions[index].objectiveoptions[1].option)
            setoption3(test.objectivequestions[index].objectiveoptions[2].option)
            setoption4(test.objectivequestions[index].objectiveoptions[3].option)
        }
        setCurrentQuestion(index);
        setwarning(false);
    }
    const handleQuestionChange = (e, index) => {
        e.preventDefault();
        if (CurrentQuestion === test.objectivequestions.length - 1) {
            if (question.trim() !== '') {
                settogo(index);
                togglewarning()
            } else {
                changepage(index);
            }
        } else {
            var thisquestion = test.objectivequestions[CurrentQuestion].question;
            var thisoptions = test.objectivequestions[CurrentQuestion].objectiveoptions;
            if (thisquestion !== question || thisoptions[0].option !== option1 || thisoptions[1].option !== option2 || thisoptions[2].option !== option3 || thisoptions[3].option !== option4) {
                settogo(index);
                togglewarning()
            } else {
                changepage(index);
            }

        }
    }
    var initialdata = '<h2><span style="color:rgb(0,0,0);">Insert your question here</span><span style=' +
            '"color:rgb(224,175,104);">😄</span><span style="color:rgb(169,177,214);">.</span' +
            '></h2>';
    const [test,
        settest] = useState(null);
    const [loading,
        setloading] = useState(null);
    const updatetest = () => {
        UserService
            .getobjectivetest(match.params.test)
            .then(response => {
                response
                    .data
                    .objectivequestions
                    .push({});
                settest(response.data);
                setCurrentQuestion(response.data.objectivequestions.length - 1);
                setQuestionsCount(Math.ceil(response.data.objectivequestions.length / pageSize));
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
    const [solutioneditor,
        setsolutioneditor] = useState(null);
    const [solutionmodal,
        setsolutionmodal] = useState('');
    const [solution,
        setsolution] = useState('');
    var initialsolution = '<p>Solution Here</p>';
    const togglesolution = () => setsolutionmodal(!solutionmodal);
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
    const editquestion = () => {
        setloading(true);
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
                    .updateobjectivequestion(test.objectivequestions[CurrentQuestion].id, this_question, options)
                    .then(response => {
                        notify.user("Modify Test Question", response.data, 'success');
                        setloading(false);
                        changepage(test.objectivequestions.length - 1)
                    }, error => {
                        const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                        notify.user("Modify Test Question", resMessage, 'danger');
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
    const [loadingsolution,
        setloadingsolution] = useState(false);
    const savesolution = (e) => {
        e.preventDefault();
        setloadingsolution(true)
        if (!(test.objectivequestions[CurrentQuestion].objectivesolutions.length > 0)) {

            UserService
                .addobjectivetestsolution(test.objectivequestions[CurrentQuestion].id, solution)
                .then(response => {
                    notify.user('Set Test Solution', 'Solution Saved Successfully', 'success');
                    setloadingsolution(false);
                }, error => {
                    notify.user('Set Test Solution', "Solution is required", 'danger');
                    setloadingsolution(false);
                });
        } else {
            UserService
                .updateobjectivetestsolution(test.objectivequestions[CurrentQuestion].objectivesolutions[0].id, solution)
                .then(response => {
                    notify.user('Modify Test Solution', 'Solution Saved Successfully', 'success');
                    setloadingsolution(false);
                }, error => {
                    notify.user('Modify Test Solution', "Solution is required", 'danger');
                    setloadingsolution(false);
                });
        }

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
                                            <Link to={"/in/classroom/" + match.params.slug + "/tests"}>Tests {CurrentQuestion}</Link>
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
                                <Col sm="12">
                                    <ButtonGroup className="btn-group-toggle float-right" data-toggle="buttons">
                                        <Button type="submit" onClick={togglesolution} color="info" size="sm">Answer Explanation</Button>
                                    </ButtonGroup>
                                    <Modal
                                        unmountOnClose={false}
                                        isOpen={solutionmodal}
                                        toggle={togglesolution}
                                        className={className + ""}>
                                        <ModalHeader toggle={togglesolution}>Solution for {test.title}
                                            No. {CurrentQuestion + 1}
                                            <br/>
                                            <span className="text-danger">NB: This is optional</span>
                                        </ModalHeader>
                                        <ModalBody>
                                            <form onSubmit={savesolution}>
                                                <FormGroup>
                                                    <CKEditor
                                                        editor={ClassicEditor}
                                                        onFocus={(event, solutiondata) => {
                                                        const data = solutiondata.getData();
                                                        if (data === initialsolution) {
                                                            solutiondata.setData('')
                                                        }
                                                    }}
                                                        onInit={solutiondata => {
                                                        setsolutioneditor(solutiondata);
                                                        solutiondata.setData(test.objectivequestions[CurrentQuestion].objectivesolutions.length > 0
                                                            ? test.objectivequestions[CurrentQuestion].objectivesolutions[0].solution
                                                            : initialsolution);
                                                    }}
                                                        onChange={(event, solutiondata) => {
                                                        const data = solutiondata.getData();
                                                        setsolution(data)
                                                    }}/>
                                                </FormGroup>
                                                <ModalFooter>
                                                    <Button color="primary" disabled={loadingsolution} type="submit">Save</Button>{' '}
                                                    <Button color="secondary" onClick={togglesolution}>Cancel</Button>
                                                </ModalFooter>
                                            </form>
                                        </ModalBody>
                                    </Modal>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm="4">
                                    <p className="title">
                                        Count: {test.objectivequestions.length - 1 + " "}
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
                                        <figure className="table">
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
                                        <span className="text-danger">First Row will be Ignored, as it is considered header.</span>
                                    </Label>

                                </FormGroup>

                                {test
                                    .objectivequestions
                                    .slice(CurrentQuestion * pageSize, (CurrentQuestion + 1) * pageSize)
                                    .map((objquestion, key) => {
                                        return (

                                            <span key={key}>
                                                <FormGroup>
                                                    <p className="">
                                                        <strong>{CurrentQuestion + 1 + ". "}</strong>
                                                        <strong>Type your Question Here</strong>{" "}
                                                        <label>
                                                            - You can{" "}
                                                            <strong>paste from word</strong>, insert
                                                            <strong>{" "}pictures</strong>
                                                            {" "}and
                                                            <strong>{" "}tables.</strong>😊{" "}
                                                        </label>
                                                    </p>
                                                    <CKEditor
                                                        editor={ClassicEditor}
                                                        onFocus={(event, editor) => {
                                                        const data = editor.getData();
                                                        if (data === initialdata) {
                                                            editor.setData('')
                                                        }
                                                    }}
                                                        onInit={editor => {
                                                        setquestioneditor(editor);
                                                        editor.setData(objquestion.question || initialdata)
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
                                            </span>

                                        );
                                    })}

                                <FormGroup>
                                    <div className="pagination-wrapper">

                                        <Pagination aria-label="Page navigation example">

                                            <PaginationItem disabled={CurrentQuestion <= 0}>

                                                <PaginationLink
                                                    onClick={e => handleQuestionChange(e, CurrentQuestion - 1)}
                                                    previous
                                                    href="#"/>

                                            </PaginationItem>

                                            {[...Array(QuestionsCount)].map((page, i) => <PaginationItem active={i === CurrentQuestion} key={i} className="pag">
                                                <PaginationLink onClick={e => handleQuestionChange(e, i)} href="#">
                                                    {i + 1}
                                                </PaginationLink>
                                            </PaginationItem>)}

                                            <PaginationItem disabled={CurrentQuestion >= QuestionsCount - 1}>

                                                <PaginationLink
                                                    onClick={e => handleQuestionChange(e, CurrentQuestion + 1)}
                                                    next
                                                    href="#"/>

                                            </PaginationItem>

                                        </Pagination>

                                    </div>
                                </FormGroup>
                                <FormGroup>
                                    {CurrentQuestion === test.objectivequestions.length - 1
                                        ? <Button color="info" size="sm" disabled={loading}>Add Question</Button>
                                        : <Button
                                            color="info"
                                            onClick={e => {
                                            editquestion()
                                        }}
                                            size="sm"
                                            disabled={loading}>Save Question</Button>}
                                    {test.objectivequestions.length > 0
                                        ? <ButtonGroup className="btn-group-toggle float-right" data-toggle="buttons">
                                                <Link to={"/in/classroom/" + match.params.slug + "/tests/"}>
                                                    <Button color="info" size="sm">Finish</Button>
                                                </Link>
                                            </ButtonGroup>
                                        : ''}
                                </FormGroup>
                                <Modal isOpen={warning} toggle={togglewarning} className={className + ""}>
                                    <ModalHeader toggle={togglewarning}>Hey!</ModalHeader>
                                    <ModalBody>
                                        <div className="aftertest">

                                            <p className="info">
                                                You've made changes. Save first, or you'll lose your changes!</p>
                                        </div>
                                    </ModalBody>
                                    <ModalFooter>

                                        <Button
                                            color="primary"
                                            disabled={loading}
                                            onClick={e => {
                                            editquestion()
                                        }}>Save</Button>
                                        <Button
                                            color="secondary"
                                            onClick={e => {
                                            changepage(togo);
                                        }}>Discard</Button>
                                    </ModalFooter>
                                </Modal>
                            </Form>
                        </CardBody>
                    </Card>}
                </Col>
            </Row>
        </div>
    );

}

export default Questiona;