import React from "react";
import loadable from "@loadable/component";
import Loading from "../Loading.js";
import {
    Card,
    CardHeader,
} from "reactstrap";
const Educator = loadable(() => import("./Educator.js"), {
	fallback: <Loading></Loading>,
});
const DepHead = loadable(() => import("./DepHead.js"), {
	fallback: <Loading></Loading>,
});
const EduHead = () => {
    return (
			<React.Fragment>
				<div className="container">
					<div className="row justify-content-md-center">
						<div className="col-md-10">
							<Card className="welct">
								<CardHeader>
									<h5 className="title">You're joining an Organization. What would you like to do?</h5>
								</CardHeader>
							</Card>
						</div>
					</div>
					<div className="row justify-content-md-center">
						<div className="col-md-5">
							<Educator />
						</div>
						<div className="col-md-5">
							<DepHead />
						</div>
					</div>
				</div>
			</React.Fragment>
		);
}
export default EduHead;