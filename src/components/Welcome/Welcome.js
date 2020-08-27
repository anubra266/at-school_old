import React from "react";
import loadable from "@loadable/component";
import Loading from "../Loading.js";

import Footer from "../Footer.js";

import NavBar from "./Navbar.js";

const Student = loadable(() => import("./Student.js"), {
	fallback: <Loading></Loading>,
});
const EduHead = loadable(() => import("./EduHead.js"), {
	fallback: <Loading></Loading>,
});
const OrgAdmin = loadable(() => import("./OrgAdmin.js"), {
	fallback: <Loading></Loading>,
});
//import UserService from "../../services/user.service.js"
const Welcome = (props) => {
	const user = props.user;

	return (
		<div>
			<div className="wrapper">
				<div className="main-panel" data={"blue"}>
					<NavBar user={user} />
					<div className="content enlarge">
						{user.initialRole === "student" && <Student />}
						{user.initialRole === "educator" && <EduHead />}
						{user.initialRole === "orgadmin" && <OrgAdmin />}
						{user.initialRole === "" && <Student />}
					</div>
					<Footer fluid />
				</div>
			</div>
		</div>
	);
};

export default Welcome;
