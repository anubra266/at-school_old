import React, {useState, useEffect} from 'react';
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Alert,
    Card,
    CardBody,
    Row,
    Col
} from 'reactstrap';

import AuthService from "../../services/auth.service";

const Register = (props) => {
    const [name,
        setname] = useState('');
    const [email,
        setemail] = useState('');
    const [password,
        setpassword] = useState('');
    const [role,
        setrole] = useState('');
    const [message,
        setmessage] = useState('');
    const [loading,
        setloading] = useState(false);
    const [registerbutton,
        setregisterbutton] = useState('Register');

    const clearmessage = () => {
        setmessage('');
    }
    const handleRegister = (e) => {
        e.preventDefault();
        setloading(true);
        setregisterbutton('Wait...');
        AuthService
            .register(name, email, password, role.toLowerCase())
            .then(response => {
                setmessage(
                    <Alert color="success">
                        Account Creation Successful, Login now.
                    </Alert>
                );
                setTimeout(clearmessage, 3000);

                setloading(false);
                setregisterbutton('Register');

                setname('');
                setemail('');
                setpassword('');
                setrole('');
            }, error => {
                const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

                setmessage(
                    <Alert color="danger">
                        {resMessage}
                    </Alert>
                );
                setTimeout(clearmessage, 3000);

                setloading(false);
                setregisterbutton('Register');

            });

    }

    return (
        <Card className="card-stats">
            <CardBody>
                <Row>
                    <Col md="12" xs="12">
                        <div>
                            <Form onSubmit={handleRegister}>
                                <h1>Register</h1>
                                <FormGroup>
                                    <Label for="name">First Name</Label>
                                    <Input
                                        required
                                        type="text"
                                        name="name"
                                        id="name"
                                        value={name}
                                        onChange={(e) => setname(e.target.value)}
                                        placeholder="John Doe"/>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="name">Full Name</Label>
                                    <Input
                                        required
                                        type="text"
                                        name="name"
                                        id="name"
                                        value={name}
                                        onChange={(e) => setname(e.target.value)}
                                        placeholder="John Doe"/>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="email">Email</Label>
                                    <Input
                                        required
                                        type="email"
                                        name="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setemail(e.target.value)}
                                        placeholder="somone@example.com"/>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="role">Role</Label>
                                    <Input
                                        required
                                        type="text"
                                        name="role"
                                        id="role"
                                        value={role}
                                        onChange={(e) => setrole(e.target.value)}
                                        placeholder="student"/>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="password">Password</Label>
                                    <Input
                                        required
                                        type="password"
                                        name="password"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setpassword(e.target.value)}
                                        minLength="6"
                                        placeholder="*********"/>
                                </FormGroup>
                                {message}
                                <Button disabled={loading}>{registerbutton}</Button>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    );
}

export default Register;