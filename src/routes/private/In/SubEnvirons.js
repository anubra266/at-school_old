import React from "react";
// reactstrap components
import { UncontrolledCollapse } from "reactstrap";
import SubClassrooms from "./SubClassrooms.js";
const SubEnvirons = ({ environs, orgkey }) => {
	return (
		environs.length > 0 && (
			<tr>
				<UncontrolledCollapse toggler={orgkey} tag="td" colSpan="5">
					<strong>Environs</strong>
					<table>
						<thead>
							<tr>
								<th>#</th>
								<th>Environ Name</th>
								<th>Code</th>
								<th>Classrooms</th>
							</tr>
						</thead>
						<tbody>
							{environs.map((environ, key) => {
								return (
									<React.Fragment>
										<tr key={`env-${key}`} id={`env-${key}`}>
											<th scope="row">{key + 1}</th>
											<td>
												<span className="theuser">{environ.name}</span>
											</td>
											<td>{environ.code}</td>
											<td>{environ.classrooms.length}</td>
										</tr>
										<SubClassrooms
											classrooms={environ.classrooms}
											envkey={`env-${key}`}
										/>
									</React.Fragment>
								);
							})}
						</tbody>{" "}
					</table>
				</UncontrolledCollapse>{" "}
			</tr>
		)
	);
};

export default SubEnvirons;
