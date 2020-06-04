import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8000/api/';

class UserService {

    getStudents() {
        return axios.get(API_URL + 'students', {
            headers: authHeader()
        });
    }
    getTeachers() {
        return axios.get(API_URL + 'teachers', {
            headers: authHeader()
        });
    }

    createenvirons(name, organization) {
        return axios({
            method: 'POST',
            url: API_URL + 'environ',
            data: {
                name: name,
                organization: organization
            },
            headers: authHeader()
        }, );
    }
    getenvirons() {
        return axios.get(API_URL + 'environ', {
            headers: authHeader()
        });
    }
    createclassroom(name, code) {

        return axios({
            method: 'POST',
            url: API_URL + 'classroom',
            data: {
                name: name,
                code: code
            },
            headers: authHeader()
        });

    }
    getclassrooms() {
        return axios.get(API_URL + 'classroom', {
            headers: authHeader()
        });
    }
    joinclassroom(code) {

        return axios({
            method: 'POST',
            url: API_URL + 'classroom/join',
            data: {
                code: code
            },
            headers: authHeader()
        });

    }
    getclassroomsjoined() {
        return axios.get(API_URL + 'classroom/joined', {
            headers: authHeader()
        });
    }

    checkclassroommember(user, classroom) {
        return axios({
            method: 'POST',
            url: API_URL + 'classroom/' + classroom + "/check",
            data: {
                user: user
            },
            headers: authHeader()
        });

    }
    createnewtest(classroom, title, instruction, duration, deadline) {
        return axios({
            method: 'POST',
            url: API_URL + 'classroom/' + classroom + '/tests',
            data: {
                title: title,
                instruction: instruction,
                duration: duration,
                deadline: deadline
            },
            headers: authHeader()
        });
    }
    gettest(test) {
        return axios.get(API_URL + 'test/'+test, {
            headers: authHeader()
        });
    }
    addquestion(test, question, options) {
        return axios({
            method: 'POST',
            url: API_URL + 'test/' + test + '/question',
            data: {
                question: question,
                options: options
            },
            headers: authHeader()
        });
    }
}

export default new UserService();