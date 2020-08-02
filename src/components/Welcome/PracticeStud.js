import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import {
	Card,
	Row,
	Col,
	CardHeader,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Input,
	Label,
	FormGroup,
	Button,
} from "reactstrap";
import className from "classnames";
import notify from "../../services/notify.js";
import UserService from "../../services/user.service";

const PracticeStud = (props) => {
	return (
		<div className="row justify-content-md-center">
			<Col md="9">
				<Card className="welct">
					<CardHeader>
						<h5 className="title ee">Personal Practice</h5>
					</CardHeader>
				</Card>
			</Col>
		</div>
	);
};
export default withRouter(PracticeStud);
