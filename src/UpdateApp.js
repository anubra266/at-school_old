import React, { useState, useEffect, Fragment } from "react";
import * as registerServiceWorker from "./registerServiceWorker";
import notify from "./services/notify.js";

const UpdateApp = (props) => {
	const [newVersionAvailable, setnewVersionAvailable] = useState(false);
	const [waitingWorker, setwaitingWorker] = useState({});

	const onServiceWorkerUpdate = (registration) => {
		setwaitingWorker(registration && registration.waiting);
		setnewVersionAvailable(true);
		newVersionAvailable &&
			registration &&
			registration.postMessage({ type: "SKIP_WAITING" });
	};

	const updateServiceWorker = () => {
		// waitingWorker && waitingWorker.postMessage({ type: "SKIP_WAITING" });
		setnewVersionAvailable(false);
		window.location.reload();
	};

	useEffect(() => {
		console.log("why na");
		//if (process.env.NODE_ENV === "production") {
		registerServiceWorker.register({
			onUpdate: onServiceWorkerUpdate(),
		});
		//}

		if (newVersionAvailable)
			notify.user(
				"Site Update",
				"Update Available for the Site. Please refresh.",
				"info"
			);
		// updateServiceWorker()
	});
	return (
		<Fragment>
			<h1>Hey</h1>
		</Fragment>
	);
};
export default UpdateApp;
