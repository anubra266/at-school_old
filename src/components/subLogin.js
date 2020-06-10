
import React, {useState} from "react";
import { withRouter } from "react-router-dom";
import notify from "./notify";
import AuthService from "../services/auth.service";

import Navbar from "./Navbar.js";
import Footer from "./Footer.js";
// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Label,
    FormGroup,
    Form,
    Input,
    Row,
    Col
} from "reactstrap";

const Login = (props) => {
    const [email,
        setemail] = useState('');
    const [password,
        setpassword] = useState('');
    const [loading,
        setloading] = useState(false);
    const handleLogin = (e) => {
        e.preventDefault();
        setloading(true);

        AuthService
            .login(email, password)
            .then(() => {
                notify.user('Login', 'Login successful. Redirecting you...', 'success')
                props.history.push("/in");
                window
                    .location
                    .reload();
            }, error => {
                const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                setloading(true);
                notify.user('Login', resMessage, 'danger')
                setloading(false);
                setpassword('');

            });
    }
    return (
        <div>

            <div className="content">
                <Row>
                    <Col md="8">

                        <Card className="card-user">
                            <CardHeader className="author">
                                <div className="block block-one"/>
                                <div className="block block-three"/>
                                <h5 className="title">Login</h5>
                            </CardHeader>
                            <CardBody>
                                <Form onSubmit={handleLogin}>
                                    <Row>
                                        <Col md="10">
                                            <FormGroup>
                                                <Label for="email">Email</Label>
                                                <Input
                                                    type="email"
                                                    name="email"
                                                    value={email}
                                                    onChange={(e) => setemail(e.target.value)}
                                                    id="email"
                                                    required
                                                    placeholder="student@anubra.tech"/>
                                            </FormGroup>
                                        </Col>
                                        <Col md="10">
                                            <FormGroup>
                                                <Label for="passwod">Password</Label>
                                                <Input
                                                    type="password"
                                                    name="password"
                                                    value={password}
                                                    onChange={(e) => setpassword(e.target.value)}
                                                    id="password"
                                                    required
                                                    placeholder="**********"/>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Button disabled={loading} className="btn-fill" color="primary" type="submit">
                                        Login
                                    </Button>
                                </Form>
                            </CardBody>
                            <CardFooter></CardFooter>
                        </Card>
                    </Col>
                </Row>
            </div>

        </div>
    );
}

export default withRouter(Login);
