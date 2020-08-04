import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import notify from "../../services/notify";
import AuthService from "../../services/auth.service";
import PasswordInput from "../PasswordStrength/Password-Input";
import Loading from "../Loading.js";
import { Input } from "reactstrap";

const ForgotPassword = ({ location, history, match }, props) => {
	const [validtoken, setvalidtoken] = useState(false);
	const [user, setuser] = useState(null);
	const [password, setpassword] = useState("");
	const [confirmpassword, setconfirmpassword] = useState("");
	const passwordchange = (e) => {
		setpassword(e.target.value);
	};

	const [loading, setloading] = useState(false);

	const checktoken = (token) => {
		AuthService.checkresettoken(token).then(
			(response) => {
				setuser(response.data);
				setvalidtoken(true);
			},
			(error) => {
				setuser({ query: "finished" });
				setvalidtoken(false);
			}
		);
	};

	const resetpassword = (e) => {
		e.preventDefault();
		setloading(true);
		if (password === confirmpassword && password.length >= 6) {
			AuthService.resetpassword(user.token, user.email, password).then(
				(response) => {
					notify.user("Reset password", response.data.message, "success");
					notify.user("Reset password", "You can login now", "info");
					setloading(false);
					history.push("/login");
				},
				(error) => {
					const errMsg =
						(error.response &&
							error.response.data &&
							error.response.data.message) ||
						error.message ||
						error.toString();
					notify.user("Reset Password", errMsg, "danger");
					setloading(false);
				}
			);
		} else {
			notify.user(
				"Reset Password",
				"Input Matching Passwords (at least 6 characters)",
				"info"
			);
		}
	};
	useEffect(() => {
		match.params.token&&checktoken(match.params.token);
	}, []);
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
						<div className="col-sm-7 col-lg-5">
							<div className="wrap-login100 login-mg p-t-50 p-b-90">
								<form
									onSubmit={resetpassword}
									className="login100-form validate-form flex-sb flex-w"
								>
									<span className="login100-form-title p-b-51">
										Reset Password
									</span>
									{user ? (
										<React.Fragment>
											{validtoken ? (
												<React.Fragment>
													<label>Must be more than 6 Characters*</label>
													<PasswordInput
														value={password}
														placeholder="Password"
														handleChanges={passwordchange}
													/>

													<div className="wrap-input100  m-b-1">
														<Input
															className="input100"
															required
															type="password"
															name="confirmpassword"
															value={confirmpassword}
															onChange={(e) => {
																setconfirmpassword(e.target.value);
															}}
															placeholder="Confirm Password"
														/>
														<span className="focus-input100"></span>
													</div>
													<label
														style={{
															color: "red",
															margin: "0 0",
														}}
													>
														{password === confirmpassword
															? ""
															: "Passwords don't match 😡"}
													</label>

													<div className="row justify-content-left">
														<div className="col-sm-12">
															<div className="container-login100-form-btn m-t-1 m-b-16">
																<button
																	disabled={loading}
																	className="login100-form-btn"
																>
																	Reset
																</button>
															</div>
														</div>
													</div>
												</React.Fragment>
											) : (
												<h3 className="text-center">
													<Link to="/forgotpassword" className="theuser ">
														The Link is Expired. Try again{" "}
														<span role="img" aria-label="frown">
															🙁
														</span>
													</Link>
												</h3>
											)}
										</React.Fragment>
									) : (
										<Loading />
									)}
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ForgotPassword;
