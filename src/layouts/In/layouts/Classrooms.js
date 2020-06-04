import React, {useState, useEffect} from "react";

import classnames from "classnames";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';
// reactstrap components
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Row,
    Col,
    Button,
    ButtonGroup,
    FormGroup,
    Label,
    Input,
    Modal,
    Form,
    UncontrolledAlert,
    Alert, 
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane
} from "reactstrap";

import UserService from "services/user.service";
import AuthService from "services/auth.service";

const Classrooms = (props) => {
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
    const [activeTab,
        setActiveTab] = useState('1');
    const loader = <div className="loader"/>;
    
    const toggle = tab => {
        if (activeTab !== tab) 
            setActiveTab(tab);
        }
    const [noclassrooms,
        setnoclassrooms] = useState(loader);
    const [classroomslist,
        setclassroomslist] = useState([]);
    useEffect(() => {
        if (user.role !== 'student') {}
        UserService
            .getclassrooms()
            .then(response => {
                if (Object.keys(response.data).length === 0) {
                    setnoclassrooms(
                        <Alert color="warning">
                            No Classrooms Found
                        </Alert>
                    )

                    setclassroomslist([]);
                } else {
                    setclassroomslist(response.data);
                    setnoclassrooms('');
                }
            });
    }, [classroomslist]);

    const [noclassroomsjoined,
        setnoclassroomsjoined] = useState(loader);
    const [classroomslistjoined,
        setclassroomslistjoined] = useState([]);
    useEffect(() => {
        if (user.role === 'student') {
            toggle('2');
        }
        UserService
            .getclassroomsjoined()
            .then(response => {
                if (Object.keys(response.data).length === 0) {
                    setnoclassroomsjoined(
                        <Alert color="warning">
                            No Classrooms Found
                        </Alert>
                    )

                    setclassroomslistjoined([]);
                } else {
                    setclassroomslistjoined(response.data);
                    setnoclassroomsjoined('');
                }
            });

    }, [classroomslistjoined, user.role, toggle]);

    const {className} = props;
    const [createform,
        setcreateform] = useState(false);
    const [joinform,
        setjoinform] = useState(false);
    const [disabled,
        setdisabled] = useState(false);
    const [name,
        setname] = useState('');
    const [code,
        setcode] = useState('');

    const togglecreate = () => setcreateform(!createform);

    const createclassroom = (e) => {
        e.preventDefault();
        setdisabled(true);
        UserService
            .createclassroom(name, code)
            .then((response) => {

                if (response.error && response.error === 404) {
                notify('Create Classroom', response.data, 'danger')
                } else {
                notify('Create Classroom', response.data, 'success')
                    setdisabled(false);
                    setname('');
                    setcode('');
                }
            }, error => {
                const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                notify('Create Classroom', resMessage, 'danger')

                setdisabled(false);
                setcode('');

            });
    }

    const [joincode,
        setjoincode] = useState('');
   
    const [disabledcode,
        setdisabledcode] = useState(false);
    const togglejoin = () => setjoinform(!joinform);

    const joinclassroom = (e) => {
        e.preventDefault();
        setdisabledcode(true);
        UserService 
            .joinclassroom(joincode)
            .then((response) => {

                if (response.error && response.error === 404) {
                notify('Join Classroom', response.data, 'danger')
                } else {
                notify('Join Classroom', response.data, 'success')
                    setdisabledcode(false);
                    setjoincode('');
                }
            }, error => {
                const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                notify('Join Classroom', resMessage, 'danger')

                setdisabledcode(false);
                setjoincode('');

            });
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
                                    <h5 className="card-category">Classes</h5>
                                    <CardTitle tag="h2">List</CardTitle>
                                </Col>
                                <Col md="2">
                                    <ButtonGroup className="btn-group-toggle float-right" data-toggle="buttons">
                                        <Button onClick={togglejoin} tag="label" color="info" size="sm">Join New Classroom</Button>
                                        {user.role !== 'student'
                                            ? <Button onClick={togglecreate} tag="label" color="info" size="sm">Create New Classroom</Button>
                                            : ''}
                                    </ButtonGroup>
                                    {user.role !== 'student'
                                        ? <Modal
                                                isOpen={createform}
                                                toggle={togglecreate}
                                                className={className + " modals"}>
                                                <Card>
                                                    <CardBody>
                                                        <h3>
                                                            Create New Classroom
                                                        </h3>

                                                        <Form onSubmit={createclassroom} action="POST">
                                                            <FormGroup>
                                                                <Label for="name">Classroom Name</Label>
                                                                <Input
                                                                    type="text"
                                                                    name="name"
                                                                    id="name"
                                                                    placeholder="Mathematics"
                                                                    value={name}
                                                                    onChange={(e) => setname(e.target.value)}
                                                                    required/>
                                                            </FormGroup>
                                                            <FormGroup>
                                                                <Label for="name">Environment Code</Label>
                                                                <Input
                                                                    type="text"
                                                                    name="name"
                                                                    id="name"
                                                                    placeholder="111111-111"
                                                                    value={code}
                                                                    onChange={(e) => setcode(e.target.value)}
                                                                    required/>
                                                            </FormGroup>
 
                                                            <Button disabled={disabled}>Submit</Button>
                                                        </Form>
                                                    </CardBody>
                                                </Card>
                                            </Modal>
                                        : ''}
                                    <Modal isOpen={joinform} toggle={togglejoin} className={className + " modals"}>
                                        <Card>
                                            <CardBody>
                                                <h3>
                                                    Join Classroom
                                                </h3>

                                                <Form onSubmit={joinclassroom} action="POST">
                                                    <FormGroup>
                                                        <Label for="code">Classroom Code</Label>
                                                        <Input
                                                            type="text"
                                                            name="code"
                                                            id="code"
                                                            placeholder="111111-111"
                                                            value={joincode}
                                                            onChange={(e) => setjoincode(e.target.value)}
                                                            required/>
                                                    </FormGroup>

                                                    <Button disabled={disabledcode}>Submit</Button>
                                                </Form>
                                            </CardBody>
                                        </Card>
                                    </Modal>
                                </Col>

                            </Row>
                        </CardHeader>
                        <CardBody>
                            {user.role !== 'student'
                                ? <Nav
                                        tabs
                                        style={{
                                        cursor: "pointer"
                                    }}>
                                        <NavItem>
                                            <NavLink
                                                className={classnames({
                                                active: activeTab === '1'
                                            })}
                                                onClick={() => {
                                                toggle('1');
                                            }}>
                                                Created
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                className={classnames({
                                                active: activeTab === '2'
                                            })}
                                                onClick={() => {
                                                toggle('2');
                                            }}>
                                                Joined
                                            </NavLink>
                                        </NavItem>
                                    </Nav>
                                : ''}
                            <TabContent activeTab={activeTab}>
                                <TabPane tabId="1">
                                    <Row>
                                        <Col sm="12">

                                            <Row
                                                style={{
                                                marginTop: "14px"
                                            }}>
                                                {classroomslist.map((classroom, key) => {
                                                    return (

                                                        <Col sm="4" key={key}>
                                                            <Card>
                                                                <CardBody>
                                                                <a href={"/classroom/" + classroom.id}>
                                                                    <p className="title">{classroom.name}</p>
                                                                    <p className="text-muted">
                                                                        {classroom.users.length}{" "}
                                                                        Member(s)
                                                                    </p>
                                                                    <p className="title">Code: {classroom.code}</p>
                                                                    </a>
                                                                </CardBody>
                                                            </Card>
                                                        </Col>
                                                    )
                                                })}
                                            </Row>
                                            {noclassrooms}

                                        </Col>
                                    </Row>
                                </TabPane>
                                <TabPane tabId="2">
                                    <Row>
                                        <Col sm="12">
                                            <Row
                                                style={{
                                                marginTop: "14px"
                                            }}>

                                                {classroomslistjoined.map((classroom, key) => {
                                                    return (

                                                        <Col sm="4" key={key}>
                                                            <Card>
                                                                <CardBody>
                                                                    <a href={"/classroom/" + classroom.id}>
                                                                        <p className="title">{classroom.name}</p>
                                                                        <p className="text-muted">
                                                                            {classroom.users.length}{' '}
                                                                            Member(s)
                                                                        </p>
                                                                        <p className="title">Code: {classroom.code}</p>
                                                                    </a>
                                                                </CardBody>
                                                            </Card>
                                                        </Col>
                                                    )   
                                                })}
                                            </Row>
                                            {noclassroomsjoined}

                                        </Col>
                                    </Row>
                                </TabPane>
                            </TabContent>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            </SkeletonTheme>
        </div>
    );

}

export default Classrooms;