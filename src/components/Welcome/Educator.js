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
import notify from "../../services/notify.js"
import UserService from "../../services/user.service";

const Educator = (props) => {
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
                notify.user('Create a Classroom', 'Redirecting you...!', 'info');
                setTimeout(() => {
                    props
                        .history
                        .push("/in/home");
                    window
                        .location
                        .reload();
                }, 3000);
            }, error => {
                const errMsg = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                notify.user('Create a Classroom', errMsg, 'danger');
                setloading(false);

            })
    }
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
                                onChange={(e)=>setname(e.target.value)}
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
                                onChange={(e)=>setcode(e.target.value)}
                                placeholder="17633-2673-383"/>
                        </FormGroup>
                        <ModalFooter>
                            <Button color="primary" disabled={loading} type="submit">Create</Button>{' '}
                            <Button color="secondary" onClick={toggle}>Cancel</Button>
                        </ModalFooter>

                    </form>

                </ModalBody>
            </Modal>
        </Card>
    );
}
export default withRouter(Educator);