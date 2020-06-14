import React, {useState, useEffect} from "react";
import notify from "../../services/notify";
import AuthService from "../../services/auth.service";

import Navbar from "../Navbar.js";
import Footer from "../Footer.js";
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

const Login = ({
    location,
    history
}, props) => {
    const [email,
        setemail] = useState('');
    const [password,
        setpassword] = useState('');
    const [loading,
        setloading] = useState(false);
    const {from} = location.state || {
        from: {
            pathname: '/in'
        }
    }
    useEffect(() => {
        from.pathname !== "/in"
            ? notify.user('Login', 'You are logged out! Login to continue', 'info')
            : console.log("");
    },[from.pathname]);
    const handleLogin = (e) => {
        e.preventDefault();
        setloading(true);

        AuthService
            .login(email, password)
            .then(() => {
                notify.user('Login', 'Login successful. Redirecting you...', 'success')
                from
                    ? history.push(from)
                    : history.push("/in");
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
            <div className="wrapper">
                <div className="main-panel">
                    <Navbar location={location}/>
                    <div className="content">
                        <Row>
                            <Col md="8">

                                <Card className="card-user">
                                    <CardHeader className="author">
                                        <div className="block block-one"/>
                                        <div className="block block-two"/>
                                        <div className="block block-three"/>
                                        <div className="block block-four"/>
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
                    <Footer fluid/>
                </div>
            </div>
        </div>
    );
}

export default Login;
