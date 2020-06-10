import React, {useState} from "react";
import {withRouter} from "react-router-dom";
import {
    Card,
    CardHeader,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Input,
    Label,
    FormGroup,
    Button
} from "reactstrap";
import className from "classnames";

const Educator = () => {
    const [modal,
        setModal] = useState(false);

    const toggle = () => setModal(!modal);
    return (
        <Card className="welct">
            <CardHeader onClick={toggle}>
                <h5 className="title ee">Create a Classroom</h5>
            </CardHeader>
            <Modal
                unmountOnClose={false}
                isOpen={modal}
                toggle={toggle}
                className={className + ""}>
                <ModalHeader toggle={toggle}>Create a Classroom</ModalHeader>
                <ModalBody>

                    <form>
                        <FormGroup>
                            <Label for="name">Classroom Name</Label>
                            <Input
                                style={{
                                color: "black"
                            }}
                                type="text"
                                name="name"
                                id="name"
                                placeholder="MTH 101"/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="code">Environ Code</Label>
                            <Input
                                style={{
                                color: "black"
                            }}
                                type="number"
                                name="code"
                                id="code"
                                placeholder="17633-2673-383"/>
                        </FormGroup>
                        <ModalFooter>
                        <Button color="primary" type="submit">Create</Button>{' '}
                        <Button color="secondary" onClick={toggle}>Cancel</Button>
                    </ModalFooter>

                    </form>

                </ModalBody>
            </Modal>
        </Card>
    );
}
export default withRouter(Educator);