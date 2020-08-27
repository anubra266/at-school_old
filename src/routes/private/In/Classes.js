import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";

// reactstrap components
import {
    Card,
    CardHeader,
    CardBody,
    Row,
    Col,
    Button,
    ButtonGroup,
    Table,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Input,
    Label,
    FormGroup
} from "reactstrap";

import UserService from "../../../services/user.service";
import notify from "../../../services/notify.js"
import className from "classnames";
var tclassrooms;
var noclass;
const orderclasses = () => {
    UserService
        .getjoinedclassrooms()
        .then(response => {
            if (response.data.length < 1) {
                noclass = (true)
            } else {
                tclassrooms = (response.data);
                noclass = (false)
            }
        });
}
orderclasses();

const Classes = ({user}) => {
    const [classrooms,
        setclassrooms] = useState(tclassrooms);
    const [noclassrooms,
        setnoclassrooms] = useState(noclass);
    const updateclasses = () => {
        UserService
            .getjoinedclassrooms()
            .then(response => {
                if (response.data.length < 1) {
                    setnoclassrooms(true)
                } else {
                    setclassrooms(response.data);
                    setnoclassrooms(false)
                }
            });
    }
    useEffect(()=>{
        updateclasses();
    },[]);
    window.Echo.channel("at_school_database_classes").listen(
      "UpdateClasses",
      (e) => {
        updateclasses();
      }
    );
    const [modal,
        setModal] = useState(false);

    const toggle = () => setModal(!modal);
    const [code,
        setcode] = useState('');
    const [loading,
        setloading] = useState(false);
    const joinclassroom = (e) => {
        e.preventDefault();
        setloading(true);
        UserService
            .joinclassroom(code, true)
            .then(response => {
                notify.user('Join a Classroom', response.data, 'success');
                setcode('')
                toggle()
                setloading(false);
            }, error => {
                const errMsg = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                notify.user('Join a Classroom', errMsg, 'danger');
                setloading(false);

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
                                    Classes
                                </Col>
                                <Col md="2">
                                    <ButtonGroup className="btn-group-toggle float-right" data-toggle="buttons">
                                        <Button onClick={toggle} tag="label" color="info" size="sm">Join New Classroom</Button>
                                    </ButtonGroup>
                                    <Modal
                                        unmountOnClose={false}
                                        isOpen={modal}
                                        toggle={toggle}
                                        className={className + ""}>
                                        <ModalHeader toggle={toggle}>Join a Classroom</ModalHeader>
                                        <ModalBody>

                                            <form onSubmit={joinclassroom}>
                                                <FormGroup>
                                                    <Label for="code">Classroom Code</Label>
                                                    <Input
                                                        style={{
                                                        color: "black"
                                                    }}
                                                        type="text"
                                                        name="code"
                                                        id="code"
                                                        value={code}
                                                        onChange={(e) => setcode(e.target.value)}
                                                        required
                                                        placeholder="17633-2673-383"/>
                                                </FormGroup>
                                                <ModalFooter>
                                                    <Button color="primary" disabled={loading} type="submit">Join</Button>{' '}
                                                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                                                </ModalFooter>

                                            </form>
                                        </ModalBody>
                                    </Modal>
                                </Col>
                            </Row>
                        </CardHeader>
                        <CardBody className="all-icons">
                            <Row>
                                <Col md="12">
                                    {classrooms
                                        ? <Table hover>
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Name</th>
                                                        <th>Members</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {classrooms.map((classroom, key) => {
                                                        return (
                                                            <tr>
                                                                <th scope="row">{key + 1}</th>
                                                                <td>
                                                                    <Link to={"/in/classroom/" + classroom.slug + "/assessments"}>
                                                                        {classroom.name}
                                                                    </Link>
                                                                </td>
                                                                <td>{classroom.users.length}</td>
                                                            </tr>
                                                        )
                                                    })}
                                                </tbody>
                                            </Table>

                                        : !noclassrooms&&<div>
                                            <span className="text-info">wait...</span>
                                        </div>}

                                    {noclassrooms
                                        ? <div>
                                                <span className="text-info">No Classes Found!{" "}</span>
                                                Join a New Classroom to see class here.</div>
                                        : ''}
                                </Col>

                            </Row>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    );

}

export default Classes;