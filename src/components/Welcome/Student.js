import React from "react";
import { Card, CardHeader } from "reactstrap";
import PracticeStud from "../Welcome/PracticeStud.js";
import JoinClassroom from "../Welcome/JoinClassroom.js";
const Student = () => {
	return (
		<React.Fragment>
			<div className="container">
				<div className="row justify-content-md-center">
					<div className="col-md-10">
						<Card className="welct">
							<CardHeader>
								<h5 className="title">What would you like to do?</h5>
							</CardHeader>
						</Card>
					</div>
				</div>
				<div className="row justify-content-md-center">
					<div className="col-md-5">
						<PracticeStud />
					</div>
					<div className="col-md-5">
						<JoinClassroom />
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};
export default Student;
