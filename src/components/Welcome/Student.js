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

const Student = (props) => {
    const [modal,
        setModal] = useState(false);

    const toggle = () => setModal(!modal);
    const [code,
        setcode] = useState('');
    const [loading,
        setloading] = useState(false);
    const joinclassroom = (e) => {
        e.preventDefault();
        setloading(true);
        UserService
            .joinclassroom(code, true)
            .then(response => {
                notify.user('Join a Classroom', response.data, 'success');
                notify.user('Join a Classroom', 'Redirecting you...!', 'info');
                setTimeout(() => {
                    props
                        .history
                        .push("/in/dashboard/classes");
                    window
                        .location
                        .reload();
                }, 3000);
            }, error => {
                const errMsg = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                notify.user('Join a Classroom', errMsg, 'danger');
                setloading(false);

            })
    }
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

                    <form onSubmit={joinclassroom}>
                        <FormGroup>
                            <Label for="code">Classroom Code</Label>
                            <Input
                                style={{
                                color: "black"
                            }}
                                type="text"
                                name="code"
                                id="code"
                                value={code}
                                onChange={(e)=>setcode(e.target.value)}
                                required
                                placeholder="17633-2673-383"/>
                        </FormGroup>
                        <ModalFooter>
                        <Button color="primary" disabled={loading} type="submit">Join</Button>{' '}
                        <Button color="secondary" onClick={toggle}>Cancel</Button>
                    </ModalFooter>

                    </form>

                </ModalBody>
            </Modal>
        </Card>
    );
}
export default withRouter(Student);