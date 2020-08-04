import React, { useState } from "react";
import { Link } from "react-router-dom";
import notify from "../../services/notify";
import AuthService from "../../services/auth.service";

const ForgotPassword = ({ location, history }, props) => {
	const [email, setemail] = useState("");
	const [loading, setloading] = useState(false);
	const [emailsent, setemailsent] = useState(false);

	const resetpassword = (e) => {
		e.preventDefault();
		setloading(true);
		AuthService.passwordcreate(email, window.location.host).then(
			(response) => {
				notify.user("Reset password", response.data.message, "success");
				setloading(false);
				setemailsent(true);
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
						<div className="col-sm-7 col-lg-5">
							<div className="wrap-login100 login-mg p-t-50 p-b-90">
								<form
									onSubmit={resetpassword}
									className="login100-form validate-form flex-sb flex-w"
								>
									<span className="login100-form-title p-b-51">
										Forgot Password
									</span>
									{emailsent ? (
										<h3 className="theuser text-center">
											Check your Mail for Reset Link! It expires in 10 minutes
											<span role="img" aria-label="smile">
												😄
											</span>
										</h3>
									) : (
										<React.Fragment>
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

											<div className="row justify-content-between">
												<div className="col-4">
													<Link to="/login" className="txt1">
														Login
													</Link>
												</div>
												<div className="col-4">
													<Link to="/register" className="txt1">
														Sign Up
													</Link>
												</div>
											</div>
										</React.Fragment>
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
