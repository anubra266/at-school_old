import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import notify from "../../services/notify";
import AuthService from "../../services/auth.service";


const Login = ({ location, history }, props) => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setloading] = useState(false);
  const { from } = location.state || {
    from: {
      pathname: "/in/dashboard",
    },
  };
  useEffect(() => {
    from.pathname !== "/in/dashboard"
      ? notify.user("Login", "You are logged out! Login to continue", "info")
      : console.log("");
  }, [from.pathname]);
  const handleLogin = (e) => {
    e.preventDefault();
    setloading(true);

    AuthService.login(email, password).then(
      () => {
        notify.user("Login", "Login successful. Redirecting you...", "success");
        window.location.replace(from.pathname);
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setloading(true);
        notify.user("Login", resMessage, "danger");
        setloading(false);
        setpassword("");
      }
    );
  };
  return (
    <div>
      <div className="limiter">
        <div className="container-login100">
          <header
            className="site-navbar py-4 js-sticky-header site-navbar-target"
            role="banner"
          >
            <div className="container-fluid">
              <div className="d-flex align-items-center">
                <div className="site-logo mr-auto w-30">
                  <a href="/">at-School</a>
                </div>
              </div>
            </div>
          </header>
          <div className="row ceent">
            <div className="col-lg-4 col-md-6 col-sm-4">
              <div className="wrap-login100 p-t-50 p-b-90">
                <form
                  className="login100-form validate-form flex-sb flex-w"
                  onSubmit={handleLogin}
                >
                  <span className="login100-form-title p-b-51">Login</span>

                  <div className="wrap-input100  m-b-16">
                    <input
                      className="input100"
                      required
                      value={email}
                      onChange={(e) => setemail(e.target.value)}
                      type="email"
                      name="email"
                      placeholder="Email"
                    />
                    <span className="focus-input100"></span>
                  </div>

                  <div className="wrap-input100  m-b-16">
                    <input
                      className="input100"
                      required
                      value={password}
                      onChange={(e) => setpassword(e.target.value)}
                      type="password"
                      name="pass"
                      placeholder="Password"
                    />
                    <span className="focus-input100"></span>
                  </div>

                  <div className="row justify-content-left">
                    <div className="col-sm-6">
                      <div className="container-login100-form-btn m-t-1 m-b-16">
                        <button
                          disabled={loading}
                          className="login100-form-btn"
                        >
                          Login
                        </button>
                      </div>
                    </div> 
                  </div>

                  <div className="row justify-content-between">
                    <div className="col-4">
                      <Link to="/forgotpassword" className="txt1">
                        Forgot?
                      </Link>
                    </div>
                    <div className="col-4">
                      <Link to="/register" className="txt1">
                        Sign Up
                      </Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
