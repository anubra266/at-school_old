import React from "react";
import { Link } from "react-router-dom";

// reactstrap components
import { UncontrolledCollapse } from "reactstrap";
const SubClassrooms = ({ classrooms, envkey }) => {
	return (
		classrooms.length > 0 && (
			<tr>
				<UncontrolledCollapse toggler={envkey} tag="td" colSpan="4">
					<strong>Classrooms</strong>
					<table>
						<thead>
							<tr>
								<th>#</th>
								<th>Classroom Name</th>
								<th>Code</th>
								<th>Students</th>
							</tr>
						</thead>
						<tbody>
							{classrooms.map((classroom, key) => {
								return (
									<React.Fragment>
										<tr key={`clm-${key}`} id={`clm-${key}`}>
											<th scope="row">{key + 1}</th>
											<td>
												<Link
													to={
														"/in/classroom/" + classroom.slug + "/assessments"
													}
												>
													{classroom.name}
												</Link>
											</td>
											<td>{classroom.code}</td>
											<td>{classroom.users.length}</td>
										</tr>
									</React.Fragment>
								);
							})}
						</tbody>{" "}
					</table>
				</UncontrolledCollapse>
			</tr>
		)
	);
};

export default SubClassrooms;
