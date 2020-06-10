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

const Student = () => {
    const [modal,
        setModal] = useState(false);

    const toggle = () => setModal(!modal);
    return (
        <Card className="welct">
            <CardHeader onClick={toggle}>
                <h5 className="title ee">Join a Classroom</h5>
            </CardHeader>
            <Modal
                unmountOnClose={false}
                isOpen={modal}
                toggle={toggle}
                className={className + ""}>
                <ModalHeader toggle={toggle}>Join a Classroom</ModalHeader>
                <ModalBody>

                    <form>
                        <FormGroup>
                            <Label for="code">Classroom Code</Label>
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
                        <Button color="primary" type="submit">Join</Button>{' '}
                        <Button color="secondary" onClick={toggle}>Cancel</Button>
                    </ModalFooter>

                    </form>

                </ModalBody>
            </Modal>
        </Card>
    );
}
export default withRouter(Student);