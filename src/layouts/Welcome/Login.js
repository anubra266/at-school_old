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

const Login = (props) => {

    const [email,
        setemail] = useState('');
    const [password,
        setpassword] = useState('');
    const [message,
        setmessage] = useState('');
    const [loading,
        setloading] = useState(false);
    const [loginbutton,
        setloginbutton] = useState('Login');
    const [user] = useState(AuthService.getCurrentUser());
    useEffect(() => {
        if (user) {
            props
                .history
                .push('/in');
            window
                .location
                .reload();
        }
    });
    const clearloginerror = () => {
        setmessage('');
    }
    const handleLogin = (e) => {
        e.preventDefault();
        setloginbutton('Wait...');
        setloading(true);

        AuthService
            .login(email, password)
            .then(() => {
                props
                    .history
                    .push("/in");
                window
                    .location
                    .reload();
            }, error => {
                const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                setloginbutton('Wait...');
                setloading(true);
                setmessage(
                    <Alert color="danger">
                        {resMessage}
                    </Alert>
                );
                setTimeout(clearloginerror, 3000);
                setloading(false);
                setloginbutton('Login');
                setpassword('');

            });
    }

    return (
        <Card className="card-stats">
            <CardBody>
                <Row>
                    <Col md="12" xs="12">
                        <div>
                            <Form onSubmit={handleLogin}>
                                <h3>Login</h3>
                                <FormGroup>
                                    <Label for="loginemail">Email</Label>
                                    <Input
                                        required
                                        type="email"
                                        name="email"
                                        value={email}
                                        onChange={(e) => setemail(e.target.value)}
                                        id="loginemail"
                                        placeholder="somone@example.com"/>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="loginpassword">Password</Label>
                                    <Input
                                        required
                                        type="password"
                                        name="password"
                                        value={password}
                                        onChange={(e) => setpassword(e.target.value)}
                                        id="loginpassword"
                                        placeholder="*********"/>
                                </FormGroup>
                                {message}

                                <Button className="nav-link d-lg-block" disabled={loading}>{loginbutton}</Button>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </CardBody>
        </Card>

    );
}

export default Login;