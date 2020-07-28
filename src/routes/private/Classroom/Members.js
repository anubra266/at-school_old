import React, {useState, useEffect} from "react";

// reactstrap components
import {
    Card,
    CardHeader,
    CardBody,
    Row,
    Col,
    Button,
    Table,
    Modal,
    ModalBody,
    CardText,
    Input,
    FormGroup
} from "reactstrap";

import UserService from "../../../services/user.service";
// import notify from "../../../services/notify.js"
import className from "classnames";

const Members = ({user, slug}) => {

    const [members,
        setmembers] = useState(null);
    const [nomembers,
        setnomembers] = useState(null);
    const updatemembers = () => {

        UserService
            .getmembers(slug)
            .then(response => {
                if (response.data.length < 1) {
                    setnomembers(true);
                } else {
                    setmembers(response.data);
                    setnomembers(false);
                }
            });
    }
    useEffect(() => {
        updatemembers();
    }, []);
    window
        .Echo
        .channel('at_school_database_classes')
        .listen('UpdateMembers', e => {
            updatemembers()
        })
    const [showmember,
        setshowmember] = useState(false);
    const [view,
        setview] = useState(null);
    const [search,
        setsearch] = useState('');

    const toggle = () => setshowmember(!showmember);

    const searchmember = (member) => {
        var fname = member
            .firstName
            .toLowerCase()
            .indexOf(search.toLowerCase()) > -1;
        var mname = member
            .middleName
            .toLowerCase()
            .indexOf(search.toLowerCase()) > -1;
        var lname = member
            .lastName
            .toLowerCase()
            .indexOf(search.toLowerCase()) > -1;
        var gender = member
            .gender
            .toLowerCase()
            .indexOf(search.toLowerCase()) > -1;
        var email = member
            .email
            .toLowerCase()
            .indexOf(search.toLowerCase()) > -1;
        var telephone = member
            .telephone
            .toLowerCase()
            .indexOf(search.toLowerCase()) > -1;
        var dob = (new Date(member.dateOfBirth))
            .toLocaleDateString()
            .indexOf(search.toLowerCase()) > -1;
        var result = fname || mname || lname || gender || email || telephone || dob;
        return result;
    }
    return (
        <div className="content">
            <Row>
                <Col md="12">
                    <Card>
                        <CardHeader>
                            <Row>
                                <Col md="10">
                                    Members
                                </Col>
                                <Col md="2">
                                    {/*<ButtonGroup className="btn-group-toggle float-right" data-toggle="buttons">
                                        <Button tag="label" color="info" size="sm">Add New Organization</Button>/ButtonGroup>*/}
                                </Col>
                            </Row>
                        </CardHeader>
                        <CardBody className="all-icons">
                            <Row>
                                <Col md="12">
                                    <FormGroup>
                                        <Input
                                            style={{
                                            color: "black"
                                        }}
                                            value={search}
                                            onChange={(e) => setsearch(e.target.value)}
                                            type="text"
                                            placeholder="Search Members by Name, Email, Gender, Tel or Birthday"/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="12">
                                    {members
                                        ? <span>
                                                {members
                                                    .filter(member => searchmember(member))
                                                    .length > 0
                                                    ? <Table hover>
                                                            <thead>
                                                                <tr>
                                                                    <th>#</th>
                                                                    <th>Name</th>
                                                                    <th>Email</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {members
                                                                    .filter(member => searchmember(member))
                                                                    .map((member, key) => {
                                                                        return (
                                                                            <tr
                                                                                key={member.id}
                                                                                class={user.id === member.id
                                                                                ? "theuser"
                                                                                : ""}
                                                                                onClick={() => {
                                                                                toggle();
                                                                                setview(member)
                                                                            }}>
                                                                                <th scope="row">{key + 1}</th>
                                                                                <td >
                                                                                    {(member.firstName) + " " + (member.middleName).charAt(0) + ". " + member.lastName}
                                                                                </td>
                                                                                <td>{member.email}</td>
                                                                            </tr>
                                                                        )
                                                                    })}
                                                            </tbody>
                                                            <Modal isOpen={showmember} toggle={toggle} className={className + ""}>
                                                                <ModalBody>
                                                                    <Row>
                                                                        <Col md="4">
                                                                            <h3
                                                                                style={{
                                                                                color: "black"
                                                                            }}>
                                                                                User Details
                                                                            </h3>
                                                                        </Col>
                                                                        <Col md="8">
                                                                            <span className="btn-group-toggle float-right" data-toggle="buttons">
                                                                                <Button tag="button" color="warning" disabled size="sm">Block Member</Button>
                                                                            </span>
                                                                        </Col>
                                                                    </Row>

                                                                    <Row>
                                                                        <Col md="12">
                                                                            {view
                                                                                ? <div className="card-user">
                                                                                        <CardText/>
                                                                                        <div className="author">
                                                                                            <div
                                                                                                className="upload-butn-wrapper"
                                                                                                style={{
                                                                                                cursor: "pointer"
                                                                                            }}>
                                                                                                <img
                                                                                                    alt={view.firstName + "-" + view.lastName + "'s profile picture"}
                                                                                                    src={/*notify.APP_URL() + 'storage/images/' + view.profile_image ||*/
                                                                                                require("assets/img/default-avatar.png")}
                                                                                                    height="150"/>
                                                                                                <br/>
                                                                                            </div>
                                                                                            <p className="description">{view.firstName + " "} {view.middleName + " "}
                                                                                                {view.lastName}</p>

                                                                                            <p className="description">{view.email}</p>
                                                                                            <p className="description">{view.gender}</p>
                                                                                            <p className="description">{"+" + view.telephone}</p>
                                                                                            <p className="description">{new Date(view.dateOfBirth).toLocaleDateString()}</p>
                                                                                        </div>

                                                                                     </div>
                                                                                : ''}
                                                                        </Col>
                                                                    </Row>
                                                                </ModalBody>
                                                            </Modal>
                                                        </Table>
                                                    : <div>
                                                        <span className="text-info">No results!{" "}</span>
                                                        Try something else.</div>
}
                                            </span>

                                        : <div>
                                            <span className="text-info">{nomembers?'':"wait..."}</span>
                                        </div>}

                                    {nomembers
                                        ? <div>
                                                <span className="text-info">No Members Found!{" "}</span>
                                                Invite students to see them here.</div>
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

export default Members;