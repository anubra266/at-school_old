import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// reactstrap components
import {
	Card,
	CardHeader,
	CardBody,
	Row,
	Col,
	Button,
	ButtonGroup,
	Breadcrumb,
	BreadcrumbItem,
	FormGroup,
	Form,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
} from "reactstrap";
import className from "classnames";
import notify from "../../../services/notify.js";
import UserService from "../../../services/user.service";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@diasraphael/ck-editor5-base64uploadadapter";
const Questiona = ({ match, history }) => {
	const [test, settest] = useState(null);
	const [disabled, setdisabled] = useState(null);
	const [questionset, setquestionset] = useState(false);
	useEffect(() => {
		UserService.gettheorytestdetails(match.params.test).then((response) => {
			settest(response.data);
			setquestionset(response.data.theoryquestions.length > 0);
			setsolutionset(response.data.theorysolution.length > 0);
		});
	}, []);
	const [question, setquestion] = useState("");

	const addquestions = (e) => {
		e.preventDefault();
		setdisabled(true);

		if (!questionset) {
			UserService.addtheoryquestion(test.id, question).then(
				(response) => {
					notify.user("Create New Test", "Test Saved Successfully", "success");
					history.push("/in/classroom/" + match.params.slug + "/assessments");
					setdisabled(false);
				},
				(error) => {
					notify.user(
						"Create New Test",
						"You must edit the Question field!",
						"danger"
					);
					setdisabled(false);
				}
			);
		} else {
			UserService.updatetheoryquestion(
				test.theoryquestions[0].id,
				question
			).then(
				(response) => {
					notify.user(
						"Set Test Question",
						"Test Modidfied Successfully",
						"success"
					);
					history.push("/in/classroom/" + match.params.slug + "/assessments");
					setdisabled(false);
				},
				(error) => {
					notify.user(
						"Set Test Question",
						"You must edit the Question field!",
						"danger"
					);
					setdisabled(false);
				}
			);
		}
	};
	const [modal, setModal] = useState(false);
	var initialquestion =
		test &&
		`<h2><u>${
			test.title
		}</u></h2><h3><span style="color:hsl(0,75%,60%);">${notify.date(
			test.deadline
		)}</span></h3><p>Edit this to your taste😁</p><p>&nbsp;</p>`;
	var initialsolution = "<p>Solution Here</p>";

	const toggle = () => setModal(!modal);
	const [solution, setsolution] = useState("");
	const [solutionset, setsolutionset] = useState(false);
	const [loading, setloading] = useState(false);
	const savesolution = (e) => {
		e.preventDefault();
		setloading(true);
		if (!solutionset) {
			UserService.addtheorytestsolution(test.id, solution).then(
				(response) => {
					notify.user(
						"Set Test Solution",
						"Solution Saved Successfully",
						"success"
					);
					setloading(false);
				},
				(error) => {
					notify.user("Set Test Solution", "Solution is required", "danger");
					setloading(false);
				}
			);
		} else {
			UserService.updatetheorytestsolution(
				test.theorysolution[0].id,
				solution
			).then(
				(response) => {
					notify.user(
						"Modify Test Solution",
						"Solution Saved Successfully",
						"success"
					);
					setloading(false);
				},
				(error) => {
					if (solution === "") {
						notify.user(
							"Modify Test Solution",
							"Solution is not modified",
							"danger"
						);
					} else {
						notify.user(
							"Modify Test Solution",
							"Solution is required",
							"danger"
						);
					}
					setloading(false);
				}
			);
		}
	};
	return (
		<div className="content">
			<Row>
				<Col md="12">
					{!test && "wait..."}{" "}
					{test && (
						<Card>
							<CardHeader>
								<Row>
									<Col md="10">
										<Breadcrumb
											style={{
												backgroundColor: "white",
											}}
										>
											<BreadcrumbItem>
												<Link
													to={
														"/in/classroom/" +
														match.params.slug +
														"/assessments"
													}
												>
													Tests
												</Link>
											</BreadcrumbItem>
											<BreadcrumbItem active>Test</BreadcrumbItem>
											<BreadcrumbItem active>{test.title}</BreadcrumbItem>
										</Breadcrumb>
									</Col>
								</Row>
							</CardHeader>
							<CardBody className="all-icons">
								<Row>
									<Col sm="4">
										<p className="title">
											Start-Time:{" " + notify.date(test.starttime)}
										</p>
									</Col>
									<Col sm="6">
										<ButtonGroup
											className="btn-group-toggle float-right"
											data-toggle="buttons"
										>
											<Button
												type="submit"
												onClick={toggle}
												color="info"
												size="sm"
											>
												Solution
											</Button>
										</ButtonGroup>
										<Modal
											size="lg"
											unmountOnClose={false}
											isOpen={modal}
											toggle={toggle}
											className={className + ""}
										>
											<ModalHeader toggle={toggle}>
												Solution for {test.title}
											</ModalHeader>
											<ModalBody>
												<form onSubmit={savesolution}>
													<FormGroup>
														<CKEditor
															editor={ClassicEditor}
															onFocus={(event, solutiondata) => {
																const data = solutiondata.getData();
																if (data === initialsolution) {
																	solutiondata.setData("");
																}
															}}
															onInit={(solutiondata) => {
																solutiondata.setData(
																	solutionset
																		? test.theorysolution[0].solution
																		: "Solution Here"
																);
															}}
															onChange={(event, solutiondata) => {
																const data = solutiondata.getData();
																setsolution(data);
															}}
														/>
													</FormGroup>
													<ModalFooter>
														<Button
															color="primary"
															disabled={loading}
															type="submit"
														>
															Save
														</Button>{" "}
														<Button color="secondary" onClick={toggle}>
															Cancel
														</Button>
													</ModalFooter>
												</form>
											</ModalBody>
										</Modal>
									</Col>
								</Row>
								<Row>
									<Col sm="4">
										<p className="title">
											Deadline:{" " + notify.date(test.deadline)}
										</p>
									</Col>
								</Row>
								<Row>
									<Col sm="10">
										<Form method="POST" onSubmit={addquestions}>
											<FormGroup>
												<br />
												<p className="title">
													<strong>Insert Questions Here</strong>
												</p>
												<CKEditor
													editor={ClassicEditor}
													onFocus={(event, editor) => {
														const data = editor.getData();
														if (data === initialquestion) {
															editor.setData("");
														}
													}}
													onInit={(editor) => {
														editor.setData(
															questionset
																? test.theoryquestions[0].question
																: initialquestion
														);
													}}
													onChange={(event, editor) => {
														const data = editor.getData();
														setquestion(data);
													}}
												/>
											</FormGroup>
											<Row>
												<Col md="10"></Col>
												<Col md="2">
													<ButtonGroup
														className="btn-group-toggle float-right"
														data-toggle="buttons"
													>
														<Button
															disabled={disabled}
															type="submit"
															color="info"
															size="sm"
														>
															Save Test
														</Button>
													</ButtonGroup>
												</Col>
											</Row>
										</Form>
									</Col>
								</Row>
							</CardBody>
						</Card>
					)}
				</Col>
			</Row>
		</div>
	);
};

export default Questiona;
