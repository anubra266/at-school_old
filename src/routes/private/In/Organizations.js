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
var torganizations;
var tnoorganizations;
const orderorganizations = () => {
    UserService
        .getcreatedorganizations()
        .then(response => {
            if (response.data.length < 1) {
                tnoorganizations = true;
            } else {
                torganizations = (response.data);
            }
        });
}
orderorganizations();

const Organizations = ({user, history}) => {

    const [organizations,
        setorganizations] = useState(torganizations);
    const [noorganizations,
        setnoorganizations] = useState(tnoorganizations);
    const updateorganizations = () => {

        UserService
            .getcreatedorganizations()
            .then(response => {
                if (response.data.length < 1) {
                    setnoorganizations(true);
                } else {
                    setorganizations(response.data);
                    setnoorganizations(false);
                }
            });
    }
    useEffect(()=>{
        updateorganizations();
    },[]);
    window
        .Echo
        .channel('at_school_database_organizations')
        .listen('UpdateOrganizations', e => {
            updateorganizations()
        })
    const [modal,
        setModal] = useState(false);

    const toggle = () => setModal(!modal);
    const [loading,
        setloading] = useState(false);
    const [name,
        setname] = useState('');
    const [address,
        setaddress] = useState('');

    const createorganization = (e) => {
        e.preventDefault();
        setloading(true);
        UserService
            .createorganization(name, address, true)
            .then(response => {
                setloading(false);
                notify.user('Register an Organization', 'Organization Registered Successfully!', 'success');
                setname('');
                setaddress('');
            }, error => {
                const errMsg = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                notify.user('Register an Organization', errMsg, 'danger');
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
                                    Organizations
                                </Col>
                                <Col md="2">
                                    <ButtonGroup className="btn-group-toggle float-right" data-toggle="buttons">
                                        <Button onClick={toggle} tag="label" color="info" size="sm">Add New Organization</Button>
                                    </ButtonGroup>
                                    <Modal
                                        unmountOnClose={false}
                                        isOpen={modal}
                                        toggle={toggle}
                                        className={className + ""}>
                                        <ModalHeader toggle={toggle}>Register an Organization</ModalHeader>
                                        <ModalBody>

                                            <form onSubmit={createorganization}>
                                                <FormGroup>
                                                    <Label for="name">Organization Name</Label>
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
                                                        placeholder="Birtong University"/>
                                                </FormGroup>

                                                <FormGroup>
                                                    <Label for="address">Organization Address</Label>
                                                    <Input
                                                        style={{
                                                        color: "black"
                                                    }}
                                                        type="text"
                                                        name="address"
                                                        id="address"
                                                        value={address}
                                                        required
                                                        onChange={(e) => setaddress(e.target.value)}
                                                        placeholder="44, Raspet Estate, Bilfol, Murkey"/>
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
                                    {organizations
                                        ? <Table hover>
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Name</th>
                                                        <th>Address</th>
                                                        <th>Code</th>
                                                        <th>Environs</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {organizations.map((organization, key) => {
                                                        return (
                                                            <tr>
                                                                <th scope="row">{key + 1}</th>
                                                                <td>
                                                                    {organization.name}
                                                                </td>
                                                                <td>{organization.address}</td>
                                                                <td>{organization.code}</td>
                                                                <td>{organization.environs.length}</td>
                                                            </tr>
                                                        )
                                                    })}
                                                </tbody>
                                            </Table>

                                        : <div>
                                            <span className="text-info"></span>
                                        </div>}

                                    {noorganizations
                                        ? <div>
                                                <span className="text-info">No Organizations Found!{" "}</span>
                                                Add a New Organization to see it here.</div>
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

export default Organizations;