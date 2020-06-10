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

const DepHead = () => {
    const [modal,
        setModal] = useState(false);

    const toggle = () => setModal(!modal);
    return (
        <Card className="welct">
            <CardHeader onClick={toggle}>
                <h5 className="title ee">Create an Environ</h5>
            </CardHeader>
            <Modal
                unmountOnClose={false}
                isOpen={modal}
                toggle={toggle}
                className={className + ""}>
                <ModalHeader toggle={toggle}>Create an Environ</ModalHeader>
                <ModalBody>

                <form>
                <FormGroup>
                    <Label for="name">Environ Name</Label>
                    <Input
                        style={{
                        color: "black"
                    }}
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Computer Science Dept / SS1"/>
                </FormGroup>
                <FormGroup>
                    <Label for="code">Organization Code</Label>
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
export default withRouter(DepHead);