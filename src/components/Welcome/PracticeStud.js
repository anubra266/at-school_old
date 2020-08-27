import React,{useState} from "react";

const PracticeStud = () => {
	const [loading, setloading] = useState(true);
	return (
		<div className="wrap-login100 p-t-50 m-b-25 p-b-90">
			<form className="login100-form validate-form flex-sb flex-w">
				<h4 className="title text-center">Personal Practice</h4>
 
				<div className="row justify-content-left">
					<div className="col-sm-12">
						<div className="container-login100-form-btn m-t-1 m-b-16">
							<button className="login100-form-btn" disabled={loading}>Proceed</button>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
};
export default PracticeStud;
