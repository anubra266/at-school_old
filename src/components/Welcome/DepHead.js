import React, {useState} from "react";
import {withRouter} from "react-router-dom";
import notify from "../../services/notify.js"
import UserService from "../../services/user.service";

const DepHead = (props) => {

    const [name,
        setname] = useState('');
    const [code,
        setcode] = useState('');
    const [loading,
        setloading] = useState(false);
        const createenviron = (e)=>{ 
            e.preventDefault(); 
            setloading(true);
            UserService.createenviron(name,code,true).then(response => {

                notify.user('Create an Environ', 'Environ Created Successfully!', 'success');
                notify.user('Create an Environ', 'Redirecting you...!', 'info');
                setTimeout(() => {
                    props
                        .history
                        .push("/in/dashboard/home");
                    window
                        .location
                        .reload();
                }, 3000);
            }, error => {
                const errMsg = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                notify.user('Create an Environ', errMsg, 'danger');
                setloading(false);

            })
        }
    return (
			<div className="wrap-login100 m-b-25 p-t-50 p-b-90">
				<form
					className="login100-form validate-form flex-sb flex-w"
					onSubmit={createenviron}
				>
					<h4 className="title text-center">Create an Environ</h4>
					<div className="wrap-input100 m-b-16">
						<input
							className="input100"
							required
							type="text"
							name="name"
							id="name"
							value={name}
							onChange={(e) => setname(e.target.value)}
							placeholder="SS1, Computer Science Dept"
						/>
						<span className="focus-input100"></span>
					</div>
					<label>Environ Name</label>

					<div className="wrap-input100 m-b-16">
						<input
							className="input100"
							required
							type="text"
							name="code"
							id="code"
							value={code}
							onChange={(e) => setcode(e.target.value)}
							placeholder="17633-2673-383"
						/>
						<span className="focus-input100"></span>
					</div>
					<label>Organization Code</label>

					<div className="row justify-content-left">
						<div className="col-sm-12">
							<div className="container-login100-form-btn m-t-1 m-b-16">
								<button disabled={loading} className="login100-form-btn">
									Create
								</button>
							</div>
						</div>
					</div>
				</form>
			</div>
		);
}
export default withRouter(DepHead);