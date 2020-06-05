import React, {useState, useEffect} from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';
// reactstrap components
import {
    Card,
    CardHeader,
    CardBody,
    Row,
    Col,
    Button,
    ButtonGroup,
    CardTitle,
    Table,
    FormGroup,
    Label,
    Input,
    UncontrolledTooltip,
    Modal,
    Form,
    UncontrolledAlert,
    Alert,
    UncontrolledCollapse
} from "reactstrap";

import UserService from "services/user.service";
import AuthService from "services/auth.service";

const Environs = (props) => {
    const notify = (title, message, type)=>{
        store.addNotification({
            title: title,
            message: message,
            type: type,                         // 'default', 'success', 'info', 'warning'
            insert: "top",                             // where to add the notification to another
            container: 'bottom-right',                // where to position the notifications
            animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
            animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
            dismiss: {
              duration: 3000 
            }
          })
    }
    const user = AuthService.getCurrentUser();
    const loader = <div className="loader"/>;

    const [noenvirons,
        setnoenvirons] = useState(loader);
    const [environslist,
        setenvironslist] = useState([]);
    useEffect(() => {
        UserService
            .getenvirons()
            .then(response => {
                if (Object.keys(response.data).length === 0) {
                    setnoenvirons(
                        <Alert color="warning">
                            You've not created any environment.
                        </Alert>
                    )

                    setenvironslist([]);
                } else {
                    setenvironslist(response.data);
                    setnoenvirons('');
                }
            }, []);

    });
    const {className} = props;
    const [createform,
        setcreateform] = useState(false);
    const [name,
        setname] = useState('');
    const [organization,
        setorganization] = useState('');
    const [disabled,
        setdisabled] = useState(false);
    
    const togglecreate = () => setcreateform(!createform);
    const createenvironment = (e) => {
        e.preventDefault();
        setdisabled(true);
        UserService
            .createenvirons(name, organization)
            .then(response => {
                notify('Create environment', response.data, 'success')
                setdisabled(false);
                setname('');
                setorganization('');

            }, error => {
                const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                notify('Create environment', resMessage, 'danger')

                setdisabled(false);

            });
    }
    const deleteenvironment = (id) => {
        alert(id)
    }
    return (
        <div className="content">
        <SkeletonTheme color="rgba(100,100,250, 0.6)" highlightColor="#444">
            <Row>
                <Col md="12">
                    <Card>
                        <CardHeader>
                            <Row>
                                <Col className="text-left" md="10">
                                    <h5 className="card-category">Environment</h5>
                                    <CardTitle tag="h2">Details</CardTitle>
                                </Col>

                                <Col md="2">
                                    <ButtonGroup className="btn-group-toggle float-right" data-toggle="buttons">
                                        <Button onClick={togglecreate} tag="label" color="info" size="sm">Create New Environment</Button>
                                    </ButtonGroup>
                                    <Modal
                                        isOpen={createform}
                                        toggle={togglecreate}
                                        className={className + " modals"}>
                                        <Card>
                                            <CardBody>
                                                <h3>
                                                    Create New Environment
                                                </h3>

                                                <Form onSubmit={createenvironment} action="POST">
                                                    <FormGroup>
                                                        <Label for="name">Name</Label>
                                                        <Input
                                                            type="text"
                                                            name="name"
                                                            id="name"
                                                            placeholder="Computer Science Dept."
                                                            value={name}
                                                            onChange={(e) => setname(e.target.value)}/>
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <Label for="organization">Organization</Label>
                                                        <Input
                                                            type="text"
                                                            name="organization"
                                                            id="organization"
                                                            placeholder="Anubra University"
                                                            value={organization}
                                                            onChange={(e) => setorganization(e.target.value)}/>
                                                    </FormGroup>
                                                    
                                                    <Button disabled={disabled}>Submit</Button>
                                                </Form>
                                            </CardBody>
                                        </Card>
                                    </Modal>
                                </Col>
                            </Row>
                        </CardHeader>
                        <CardBody className="all-icons">
                            {environslist.map((environment, key) => {
                                return (
                                    <div>
                                        <Table>
                                            <tbody>
                                                <tr
                                                    key={key}
                                                    style={{
                                                    cursor: "pointer"
                                                }}
                                                    id={"env-" + environment.code}>
                                                    <td></td>
                                                    <td>
                                                        <p className="title">{environment.name}</p>
                                                        <p className="text-muted">
                                                            {environment.organization}
                                                        </p>
                                                    </td>
                                                    <td>
                                                        <p className="title">
                                                            Code: {environment.code}</p>
                                                    </td>
                                                    <td className="td-actions text-right">

                                                        <Button color="link" id="edit-user-1" title="" type="button">
                                                            <i className="tim-icons icon-pencil"/>
                                                        </Button>
                                                        <UncontrolledTooltip delay={0} target="edit-user-1" placement="right">
                                                            Edit Environment
                                                        </UncontrolledTooltip>
                                                        <Button
                                                            onClick={() => deleteenvironment(environment.id)}
                                                            color="link"
                                                            id="delete-user-1"
                                                            title=""
                                                            type="submit">
                                                            <i className="tim-icons icon-trash-simple"/>
                                                        </Button>
                                                        <UncontrolledTooltip delay={0} target="delete-user-1" placement="right">
                                                            Delete Environment
                                                        </UncontrolledTooltip>

                                                    </td>
                                                </tr>

                                            </tbody>
                                        </Table>

                                        <UncontrolledCollapse
                                            toggler={"env-" + environment.code}
                                            style={{
                                            marginLeft: "3em"
                                        }}>

                                            <Row>
                                                <Col sm="4" key={key}>

                                                    {environment.classrooms.length}
                                                    Classroom(s)
                                                </Col>

                                            </Row>
                                            <Row>
                                                {environment
                                                    .classrooms
                                                    .map((classroom, key) => {
                                                        return (

                                                            <Col sm="4" key={key}>
                                                                <Card>
                                                                    <CardBody>
                                                                        <a href={"/classroom/" + classroom.id}>
                                                                            <p className="title">{classroom.name}</p>
                                                                            <p className="text-muted">
                                                                                {classroom.users.length}
                                                                                {" "}Member(s)
                                                                            </p>
                                                                        </a>
                                                                        <p className="title">Code: {classroom.code}</p>
                                                                    </CardBody>
                                                                </Card>
                                                            </Col>
                                                        )
                                                    })}

                                            </Row>
                                        </UncontrolledCollapse>
                                    </div>
                                )
                            })}
                            {noenvirons}
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            </SkeletonTheme>
        </div>
    );

}

export default Environs;