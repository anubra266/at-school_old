import axios from "axios";

const API_URL = "http://localhost:8000/api/";

class AuthService {
  login(email, password) {
    return axios
      .post(API_URL + "login", {
        email,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("cbt-app", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("cbt-app");
  }

  register(firstName, middleName, lastName, email, password, role, country, telephone, dateOfBirth) {
    return axios.post(API_URL + "register", {
      firstName,
      middleName,
      lastName,
      email,
      password,
      role,
      country,
      telephone,
      dateOfBirth
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('cbt-app'));;
  }
}

export default new AuthService();