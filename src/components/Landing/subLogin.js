import React, {useState} from "react";
import {withRouter} from "react-router-dom";
import notify from "../../services/notify";
import AuthService from "../../services/auth.service";

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
                props
                    .history
                    .push("/in/dashboard/home");
                window
                    .location
                    .reload();
            }, error => {
                const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                setloading(true);
                notify.user('Login', resMessage, 'danger')

                setloading(false);
                setpassword('');
                props
                    .history
                    .push("/login");

            });
    }
    return (
        <div className="col-lg-5 ml-auto" data-aos="fade-up" data-aos-delay="500">
            <form onSubmit={handleLogin} method="post" className="form-box">
                <h3 className="h4 text-black mb-4">Log In</h3>
                <div className="form-group">
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setemail(e.target.value)}
                        className="form-control"
                        placeholder="Email Addresss"/>
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setpassword(e.target.value)}
                        className="form-control"
                        placeholder="Password"/>
                </div>
                <div className="form-group">
                    <button type="submit" disabled={loading} className="btn btn-primary btn-pill">Log In
                    </button>
                </div>
            </form>

        </div>

    );
}

export default withRouter(Login);
