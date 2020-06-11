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
import notify from "../notify.js"
import UserService from "../../services/user.service";
const OrgAdmin = (props) => {
    const [modal,
        setModal] = useState(false);
    const [loading,
        setloading] = useState(false);
    const [name,
        setname] = useState('');
    const [address,
        setaddress] = useState('');

    const toggle = () => setModal(!modal);

    const createorganization = (e) => {
        e.preventDefault();
        setloading(true);
        UserService
            .createorganization(name, address, true)
            .then(response => {

                notify.user('Register an Organization', 'Organization Registered Successfully!', 'success');
                notify.user('Register an Organization', 'Redirecting you...!', 'info');
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
                notify.user('Register an Organization', errMsg, 'danger');
                setloading(false);

            })
    }
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
        </Card>
    );
}
export default withRouter(OrgAdmin);