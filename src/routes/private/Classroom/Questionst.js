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
    Modal
} from "reactstrap";
import notify from "../../../services/notify.js";
import className from "classnames";
import UserService from "../../../services/user.service";
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from "@diasraphael/ck-editor5-base64uploadadapter";

const Questiona = ({match, history}) => {
    //const user = AuthService.getCurrentUser();
    const [test,
        settest] = useState(null);
    const [disabled,
        setdisabled] = useState(null);
    useEffect(() => {
        UserService
            .gettheorytest(match.params.test)
            .then(response => {
                settest(response.data);
            });
    }, []);
    const [question,
        setquestion] = useState('');
    const [questioneditor,
        setquestioneditor] = useState();
    const addquestions = (e) => {
        e.preventDefault();
        setdisabled(true);
        UserService
            .addtheoryquestion(test.id, question)
            .then(response => {
                notify.user('Create New Test', 'Test Saved Successfully', 'success');
                history.push("/in/classroom/" + match.params.slug + "/tests/");
                setdisabled(false);
            }, error => {
                notify.user('Create New Test', 'You must edit the Question field!', 'danger');
                setdisabled(false);

            });
    }
    return (
        <div className="content">
            <Row>
                <Col md="12">
                    {test && <Card>
                        <CardHeader>
                            <Row>
                                <Col md="10">
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
                                {console.log('render')}
                            </Row>
                        </CardHeader>
                        <CardBody className="all-icons">
                            <Row>
                                <Col sm="4">
                                    <p className="title">
                                        Deadline:{" " + new Date(test.deadline).toLocaleString()}
                                    </p>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm="10">

                                    <Form method="POST" onSubmit={addquestions}>

                                        <FormGroup><br/>
                                            <p className="title">
                                                <strong>Insert Questions Here</strong>{" - "}
                                                Click the 🖼️ icon to insert pictures.
                                            </p>
                                            <CKEditor
                                                editor={ClassicEditor}
                                                onInit={editor => {
                                                setquestioneditor(editor);
                                                editor.setData('<h1><u>' + test.title + '</u></h1><br /><h3><span style="color:hsl(0,75%,60%);">Deadline: ' + new Date(test.deadline).toLocaleString() + '</span></h3><br /> You can continue here... Edit it to your taste😋');
                                            }}
                                                onChange={(event, editor) => {
                                                const data = editor.getData();
                                                setquestion(data)
                                            }}/>

                                        </FormGroup>
                                        <Row>
                                            <Col md="10"></Col>
                                            <Col md="2">
                                                <ButtonGroup className="btn-group-toggle float-right" data-toggle="buttons">
                                                    <Button disabled={disabled} type="submit" color="info" size="sm">Save Test</Button>
                                                </ButtonGroup>
                                            </Col>
                                        </Row>
                                    </Form>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>}
                </Col>
            </Row>
        </div>
    );

}

export default Questiona;