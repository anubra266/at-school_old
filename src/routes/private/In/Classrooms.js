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
const orderclassrooms=()=>{
    UserService
            .getcreatedclassrooms()
            .then(response => {
                if (response.data.length < 1) {
                    noclass = true;
                } else {
                    tclassrooms = (response.data);
                    noclass = false;
                }
            });
}
orderclassrooms();

const Classrooms = ({user}) => {
    const [classrooms,
        setclassrooms] = useState(tclassrooms);
    const [noclassrooms,
        setnoclassrooms] = useState(noclass);

        const updateclassrooms = ()=>{
            UserService
            .getcreatedclassrooms()
            .then(response => {
                if (response.data.length < 1) {
                    setnoclassrooms(true);
                } else {
                    setclassrooms(response.data);
                    setnoclassrooms(false);

                }
            });
        }
        useEffect(()=>{
            updateclassrooms();
        },[]);
        window
        .Echo
        .channel('at_school_database_classrooms')
        .listen('UpdateClassrooms', e => {
            updateclassrooms();
        })
    const [modal,
        setModal] = useState(false);

    const toggle = () => setModal(!modal);
    const [name,
        setname] = useState('');
    const [code,
        setcode] = useState('');
    const [loading,
        setloading] = useState(false);
    const createclassroom = (e) => {
        e.preventDefault();
        setloading(true);
        UserService
            .createclassroom(name, code, true)
            .then(response => {
                notify.user('Create a Classroom', 'Classroom Created Successfully!', 'success');
                setloading(false);
                setname('');
                setcode('');
            }, error => {
                const errMsg = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                notify.user('Create a Classroom', errMsg, 'danger');
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
                                    Classrooms
                                </Col>
                                <Col md="2">
                                    <ButtonGroup className="btn-group-toggle float-right" data-toggle="buttons">
                                        <Button onClick={toggle} tag="label" color="info" size="sm">Create New Classroom</Button>
                                    </ButtonGroup>
                                    <Modal
                                        unmountOnClose={false}
                                        isOpen={modal}
                                        toggle={toggle}
                                        className={className + ""}>
                                        <ModalHeader toggle={toggle}>Create a Classroom</ModalHeader>
                                        <ModalBody>

                                            <form onSubmit={createclassroom}>
                                                <FormGroup>
                                                    <Label for="name">Classroom Name</Label>
                                                    <Input
                                                        style={{
                                                        color: "black"
                                                    }}
                                                        type="text"
                                                        name="name"
                                                        id="name"
                                                        required
                                                        value={name}
                                                        onChange={(e) => setname(e.target.value)}
                                                        placeholder="MTH 101"/>
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label for="code">Environ Code</Label>
                                                    <Input
                                                        style={{
                                                        color: "black"
                                                    }}
                                                        type="text"
                                                        name="code"
                                                        id="code"
                                                        required
                                                        value={code}
                                                        onChange={(e) => setcode(e.target.value)}
                                                        placeholder="17633-2673-383"/>
                                                </FormGroup>
                                                <ModalFooter>
                                                    <Button color="primary" disabled={loading} type="submit">Create</Button>{' '}
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
                                                        <th>Code</th>
                                                        <th>Members</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {classrooms.map((classroom, key) => {
                                                        return (
                                                            <tr key={key}>
                                                                <th scope="row">{key + 1}</th>
                                                                <td>
                                                                    <Link to={"/in/classroom/" + classroom.slug+"/tests"}>
                                                                        {classroom.name}
                                                                    </Link>
                                                                </td>
                                                                <td>{classroom.code}</td>
                                                                <td>{classroom.users.length}</td>
                                                            </tr>
                                                        )
                                                    })}
                                                </tbody>
                                            </Table>

                                        : <div>
                                            <span className="text-info"></span>
                                        </div>}

                                    {noclassrooms
                                        ? <div>
                                                <span className="text-info">No Classrooms Found!{" "}</span>
                                                Create a New Classroom to see it here.</div>
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

export default Classrooms;