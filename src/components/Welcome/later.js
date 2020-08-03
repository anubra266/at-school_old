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
						<Row>
							<Col md="12">
								<Card className="welct">
									<CardHeader>
										<h5 className="title">What would you like to do?</h5>
									</CardHeader>
								</Card>
							</Col>
						</Row>
						<PracticeStud />
						<Row>
							{/*<Col md="3">
								<Student />
								<Card className="card-user">
									<CardBody>
										<div className="author">
											<div className="block block-one" />
											<div className="block block-one" />
											<div className="block block-one" />
											<div className="block block-one" />
											<div className="block block-two" />
											<div className="block block-three" />
											<div className="block block-four" />

											<h3>You're a Student</h3>
											<hr />
											<h4>You only need a Classroom Code</h4>
										</div>
									</CardBody>
								</Card>
	</Col>*/}
							<Col md="3">
								<EduHead />
								<Card className="card-user">
									<CardBody>
										<div className="author">
											<div className="block block-one" />
											<div className="block block-two" />
											<div className="block block-three" />
											<div className="block block-three" />
											<div className="block block-three" />
											<div className="block block-four" />
											<h3>Educator / Department Head</h3>
											<hr />
											<h4>You only need your Organization or Environ Code</h4>
										</div>
									</CardBody>
								</Card>
							</Col>
							<Col md="3">
								<OrgAdmin />
								<Card className="card-user">
									<CardBody>
										<div className="author">
											<div className="block block-one" />
											<div className="block block-two" />
											<div className="block block-three" />
											<div className="block block-four" />
											<div className="block block-four" />
											<h3>Organization Admin</h3>
											<hr />
											<h4>You would start the cycle of Knowledge</h4>
										</div>
									</CardBody>
								</Card>
							</Col>
						</Row>
					</div>
					<Footer fluid />
				</div>
			</div>
		</div>
	);
};

export default Welcome;
