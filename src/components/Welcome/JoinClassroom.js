import React, { useState } from "react";
import notify from "../../services/notify.js";
import UserService from "../../services/user.service";

const Student = (props) => {
	const [code, setcode] = useState("");
	const [loading, setloading] = useState(false);
	const joinclassroom = (e) => {
		e.preventDefault();
		setloading(true);
		UserService.joinclassroom(code, true).then(
			(response) => {
				notify.user("Join a Classroom", response.data, "success");
				notify.user("Join a Classroom", "Redirecting you...!", "info");
				setTimeout(() => {
					props.history.push("/in/dashboard/classes");
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
				notify.user("Join a Classroom", errMsg, "danger");
				setloading(false);
			}
		);
	};
	return (
		<div className="wrap-login100 p-t-50 p-b-90">
			<form
				className="login100-form validate-form flex-sb flex-w"
				onSubmit={joinclassroom}
			>
				<h4 className="title text-center">Join a Classroom</h4>

				<div className="wrap-input100 m-b-16">
					<input
						className="input100"
						required
						type="text"
						name="code"
						id="code"
						value={code}
						onChange={(e) => setcode(e.target.value)}
						placeholder="CRM-15377-89044"
					/>
					<span className="focus-input100"></span>
				</div>
				<label>Classroom Code</label>

				<div className="row justify-content-left">
					<div className="col-sm-12">
						<div className="container-login100-form-btn m-t-1 m-b-16">
							<button disabled={loading} className="login100-form-btn">
								Join
							</button>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
};
export default Student;
