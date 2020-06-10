import React, {useState} from "react";
import {withRouter} from "react-router-dom";
import {
    Card,
    CardBody,
    CardHeader,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Row,
    Col
} from "reactstrap";
import className from "classnames";
import Educator from "./Educator.js";
import DepHead from "./DepHead.js";
const EduHead = () => {
    const [modal,
        setModal] = useState(false);
    const toggle = () => setModal(!modal);
    return (
        <Card className="welct">
            <CardHeader onClick={toggle}>
                <h5 className="title ee">Join an Organization</h5>
            </CardHeader>
            <Modal isOpen={modal} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle}>Join an Organization</ModalHeader>
                <ModalBody>
                    <Row>
                        <Col md="6">
                            <Educator/>
                        </Col>
                        <Col md="6">
                            <DepHead/>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="6">
                            <Card className="card-user">
                                <CardBody>
                                    <div className="author">
                                        <div className="block block-one"/>
                                        <div className="block block-one"/>
                                        <div className="block block-one"/>
                                        <div className="block block-one"/>
                                        <div className="block block-two"/>
                                        <div className="block block-three"/>
                                        <div className="block block-four"/>

                                        <h3>You're an Educator</h3><hr/>
                                        <h4>You only need an Environment Code</h4>
                                    </div>
                                </CardBody>

                            </Card>
                        </Col>
                        <Col md="6">
                            <Card className="card-user">
                                <CardBody>

                                    <div className="author">
                                        <div className="block block-one"/>
                                        <div className="block block-one"/>
                                        <div className="block block-one"/>
                                        <div className="block block-one"/>
                                        <div className="block block-two"/>
                                        <div className="block block-three"/>
                                        <div className="block block-four"/>

                                        <h3>Departmental Head</h3><hr/>
                                        <h4>You only need an organization Code</h4>
                                    </div>
                                </CardBody>

                            </Card>
                        </Col>
                    </Row>

                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </Card>
    );
}
export default withRouter(EduHead);