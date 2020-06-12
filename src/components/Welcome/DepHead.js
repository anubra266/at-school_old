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

const DepHead = (props) => {
    const [modal,
        setModal] = useState(false);

    const toggle = () => setModal(!modal);

    const [name,
        setname] = useState('');
    const [code,
        setcode] = useState('');
    const [loading,
        setloading] = useState(false);
        const createenviron = (e)=>{
            e.preventDefault();
            setloading(true);
            UserService.createenviron(name,code,true).then(response => {

                notify.user('Create an Environ', 'Environ Created Successfully!', 'success');
                notify.user('Create an Environ', 'Redirecting you...!', 'info');
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
                notify.user('Create an Environ', errMsg, 'danger');
                setloading(false);

            })
        }
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

                    <form onSubmit={createenviron}>
                        <FormGroup>
                            <Label for="name">Environ Name</Label>
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
                                placeholder="Computer Science Dept / SS1"/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="code">Organization Code</Label>
                            <Input
                                style={{
                                color: "black"
                            }}
                                type="text"
                                name="code"
                                id="code"
                                value={code}
                                required
                                onChange={(e) => setcode(e.target.value)}
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
export default withRouter(DepHead);