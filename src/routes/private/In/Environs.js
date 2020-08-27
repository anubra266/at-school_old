import React, {useState, useEffect} from "react";
import SubClassrooms from "./SubClassrooms.js";

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
var tenvirons;
var noenviron;
const orderenvirons = () => {
    UserService
        .getcreatedenvirons()
        .then(response => {
            if (response.data.length < 1) {
                noenviron = true;
            } else {
                tenvirons = (response.data);
                noenviron = false;

            }
        });
}
orderenvirons();

const Environs = ({user, history}) => {

    const [environs,
        setenvirons] = useState(tenvirons);
    const [noenvirons,
        setnoenvirons] = useState(noenviron);
    const updateenvirons = () => {
        UserService
            .getcreatedenvirons()
            .then(response => {
                if (response.data.length < 1) {
                    setnoenvirons(true);
                } else {
                    setenvirons(response.data);
                    setnoenvirons(false);

                }
            });
    }
    useEffect(()=>{
        updateenvirons();
    },[]);
    window.Echo.channel("at_school_database_classes")
			.listen("UpdateEnvirons", (e) => {
				updateenvirons();
			})
			.listen("UpdateClassrooms", (e) => {
				updateenvirons();
			});

    const [modal,
        setModal] = useState(false);

    const toggle = () => setModal(!modal);
    const [name,
        setname] = useState('');
    const [code,
        setcode] = useState('');
    const [loading,
        setloading] = useState(false);
    const createenviron = (e) => {
        e.preventDefault();
        setloading(true);
        UserService
            .createenviron(name, code, true)
            .then(response => {

                notify.user('Create an Environ', 'Environ Created Successfully!', 'success');
                setloading(false);
                setname('');
                setcode('');
            }, error => {
                const errMsg = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                notify.user('Create an Environ', errMsg, 'danger');
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
                                    Environs
                                </Col>
                                <Col md="2">
                                    <ButtonGroup className="btn-group-toggle float-right" data-toggle="buttons">
                                        <Button onClick={toggle} tag="label" color="info" size="sm">Create New Environ</Button>
                                    </ButtonGroup>
                                    <Modal
                                        unmountOnClose={false}
                                        isOpen={modal}
                                        toggle={toggle}
                                        className={className + ""}>
                                        <ModalHeader toggle={toggle}>Create an Environ</ModalHeader>
                                        <ModalBody>

                                            <form onSubmit={createenviron}>
                                                <FormGroup>
                                                    <Label for="name">Environ Name</Label>
                                                    <Input
                                                        style={{
                                                        color: "black"
                                                    }}
                                                        type="text"
                                                        name="name"
                                                        id="name"
                                                        value={name}
                                                        required
                                                        onChange={(e) => setname(e.target.value)}
                                                        placeholder="Computer Science Dept / SS1"/>
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label for="code">Organization Code</Label>
                                                    <Input
                                                        style={{
                                                        color: "black"
                                                    }}
                                                        type="text"
                                                        name="code"
                                                        id="code"
                                                        value={code}
                                                        required
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
                                    {environs
                                        ? <Table hover>
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Name</th>
                                                        <th>Code</th>
                                                        <th>Classrooms</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {environs.map((environ, key) => {
                                                        return (
                                                            <React.Fragment>
                                                            <tr id={`env-${key}`} key={`env-${key}`}>
                                                                <th scope="row">{key + 1}</th>
                                                                <td><span className="theuser">
                                                                    {environ.name} </span>
                                                                </td>
                                                                <td>{environ.code}</td>
                                                                <td>{environ.classrooms.length}</td>
                                                            </tr>
                                                            <SubClassrooms classrooms={environ.classrooms} envkey={`env-${key}`} />
                                                            </React.Fragment>
                                                        )
                                                    })}
                                                </tbody>
                                            </Table>

                                        : !noenvirons&&<div>
                                            <span className="text-info">wait...</span>
                                        </div>}

                                    {noenvirons
                                        ? <div>
                                                <span className="text-info">No Environs Found!{" "}</span>
                                                Create a New Environment to see it here.</div>
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

export default Environs;