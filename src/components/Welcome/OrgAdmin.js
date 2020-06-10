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

const OrgAdmin = () => {
    const [modal,
        setModal] = useState(false);

    const toggle = () => setModal(!modal);
    return (
        <Card className="welct">
            <CardHeader onClick={toggle}>
                <h5 className="title ee">Register an Organization</h5>
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
                    <Label for="name">Organization Name</Label>
                    <Input
                        style={{
                        color: "black"
                    }}
                        type="text"
                        name="name"
                        id="name"
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
                        placeholder="44, Raspet Estate, Bilfol, Murkey"/>
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
export default withRouter(OrgAdmin);