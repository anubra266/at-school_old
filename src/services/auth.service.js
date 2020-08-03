import axios from "axios";
import notify from "./notify";
import authHeader from "./auth-header";
const API_URL = notify.APP_URL() + "api/";

class AuthService {
	login(email, password) {
		return axios
			.post(API_URL + "login", { email, password })
			.then((response) => {
				if (response.data.accessToken) {
					localStorage.setItem("classrooms-app", JSON.stringify(response.data));
				}
				return response.data;
			});
	}

	logout() {
		localStorage.removeItem("classrooms-app");
	}

	register(
		firstName,
		middleName,
		lastName,
		gender,
		email,
		telephone,
		dateOfBirth,
		school,
		school_town,
		initialRole,
		password,
		profile_image
	) {
		return axios.post(API_URL + "register", {
			firstName,
			middleName,
			lastName,
			gender,
			email,
			telephone,
			dateOfBirth,
			school,
			school_town,
			initialRole,
			password,
			profile_image,
		});
	}
	update_user_profile(
		firstName,
		middleName,
		lastName,
		gender,
		email,
		telephone,
		dateOfBirth,
		school,
		school_town
	) {
		return axios({
			method: "POST",
			url: API_URL + "update_profile",
			data: {
				firstName,
				middleName,
				lastName,
				gender,
				email,
				telephone,
				dateOfBirth,
				school,
				school_town,
			},
			headers: authHeader(),
		});
	}
	update_password(oldpassword, password) {
		return axios({
			method: "POST",
			url: API_URL + "update_password",
			data: {
				oldpassword,
				password,
			},
			headers: authHeader(),
		});
	}

	update_profile_image(profile_image) {
		return axios({
			method: "POST",
			url: API_URL + "update_profile_image",
			data: {
				profile_image,
			},
			headers: authHeader(),
		});
	}

	getCurrentUser() {
		return JSON.parse(localStorage.getItem("classrooms-app"));
	}
}

export default new AuthService();
