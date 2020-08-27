import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import notify from "../../services/notify.js";
import UserService from "../../services/user.service";
const OrgAdmin = (props) => { 
	const [loading, setloading] = useState(false);
	const [name, setname] = useState("");
	const [address, setaddress] = useState("");


	const createorganization = (e) => {
		e.preventDefault();
		setloading(true);
		UserService.createorganization(name, address, true).then(
			(response) => {
				notify.user(
					"Register an Organization",
					"Organization Registered Successfully!",
					"success"
				);
				notify.user("Register an Organization", "Redirecting you...!", "info");
				setTimeout(() => {
					props.history.push("/in/dashboard/home");
					window.location.reload();
				}, 3000);
			},
			(error) => {
				const errMsg =
					(error.response &&
						error.response.data &&
						error.response.data.message) ||
					error.message ||
					error.toString();
				notify.user("Register an Organization", errMsg, "danger");
				setloading(false);
			}
		);
	};
	return (
		<div className="row justify-content-md-center">
			<div className="col-md-5">
				<div className="wrap-login100 m-b-25 p-t-50 p-b-90">
					<form
						className="login100-form validate-form flex-sb flex-w"
						onSubmit={createorganization}
					>
						<h4 className="title text-center">Register an Organization</h4>
						<div className="wrap-input100 m-b-16">
							<input
								className="input100"
								required
								type="text"
								name="name"
								id="name"
								value={name}
								onChange={(e) => setname(e.target.value)}
								placeholder="Birtong University"
							/>
							<span className="focus-input100"></span>
						</div>
						<label>Organization Name</label>

						<div className="wrap-input100 m-b-16">
							<input
								className="input100"
								required
								type="text"
								name="address"
								id="address"
								value={address}
								onChange={(e) => setaddress(e.target.value)}
								placeholder="44, Raspet Estate, Bilfol, Murkey"
							/>
							<span className="focus-input100"></span>
						</div>
						<label>Organization Address</label>

						<div className="row justify-content-left">
							<div className="col-sm-12">
								<div className="container-login100-form-btn m-t-1 m-b-16">
									<button disabled={loading} className="login100-form-btn">
										Register
									</button>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};
export default withRouter(OrgAdmin);
