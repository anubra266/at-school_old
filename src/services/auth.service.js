import axios from "axios";

const API_URL = "http://localhost:8000/api/";

class AuthService {
    login(email, password) {
        return axios
            .post(API_URL + "login", {email, password})
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem("classrooms-app", JSON.stringify(response.data));
                }
                return response.data;
            });
    }

    logout() {
        localStorage.removeItem("classrooms-app");
    }

    register(firstName, middleName, lastName, email, telephone, dateOfBirth, password, profile_image) {
        return axios.post(API_URL + "register", {
            firstName,
            middleName,
            lastName,
            email,
            telephone,
            dateOfBirth,
            password,
            profile_image
        });
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('classrooms-app'));;
    }
}

export default new AuthService();