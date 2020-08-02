import React from "react";
import Footer from "../Footer.js";

// reactstrap components
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import NavBar from "./Navbar.js";

import OrgAdmin from "./OrgAdmin.js";
import EduHead from "./EduHead.js";
import Student from "./Student.js";
import PracticeStud from "./PracticeStud.js";
//import UserService from "../../services/user.service.js"
const Welcome = (props) => {
	const user = props.user;

	return (
		<div>
			<div className="wrapper">
				<div className="main-panel">
					<NavBar user={user} />
					<div className="content enlarge">
						<div className="container">
							<div className="row justify-content-md-center">
								<Col md="9">
									<Card className="welct">
										<CardHeader>
											<h5 className="title">What would you like to do?</h5>
										</CardHeader>
									</Card>
								</Col>
							</div>
							<PracticeStud />
						</div>
					</div>
					<Footer fluid />
				</div>
			</div>
		</div>
	);
};

export default Welcome;
