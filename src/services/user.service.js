import axios from 'axios';
import authHeader from './auth-header';
import notify from "./notify";
const API_URL = notify.APP_URL() + 'api/';

class UserService {

    getUser() {
        return axios.get(API_URL + 'user', {headers: authHeader()});
    }
    createorganization(name, address, first_time) {
        return axios({
            method: 'POST',
            url: API_URL + 'organization',
            data: {
                name,
                address,
                first_time
            },
            headers: authHeader()
        },);
    }
    createenviron(name, code, first_time) {
        return axios({
            method: 'POST',
            url: API_URL + 'environ',
            data: {
                name,
                code,
                first_time
            },
            headers: authHeader()
        },);
    }
    createclassroom(name, code, first_time) {
        return axios({
            method: 'POST',
            url: API_URL + 'classroom',
            data: {
                name,
                code,
                first_time
            },
            headers: authHeader()
        },);
    }
    joinclassroom(code, first_time) {
        return axios({
            method: 'POST',
            url: API_URL + 'classroom/join',
            data: {
                code,
                first_time
            },
            headers: authHeader()
        },);
    }
    getcreatedclassrooms() {
        return axios.get(API_URL + 'classroom', {headers: authHeader()});
    }
    getclassroomrole(slug) {
        return axios({
            method: 'POST',
            url: API_URL + 'classroom/role',
            data: {
                slug
            },
            headers: authHeader()
        },);
    }
    checkclassroomstatus(slug){
        return axios({
            method: 'POST',
            url: API_URL + 'classroom/check',
            data: {
                slug
            },
            headers: authHeader()
        },);
    }
    createtheorytest(slug, title, deadline) {
        return axios({
            method: 'POST',
            url: API_URL + 'theorytest/',
            data: {
                slug,
                title,
                deadline
            },
            headers: authHeader()
        },);
    }
    gettheorytest(id) {
        return axios.get(API_URL + 'theorytest/' + id, {headers: authHeader()});
    }
    addtheoryquestion(test_id, question) {
        return axios({
            method: 'POST',
            url: API_URL + 'theoryquestion/' + test_id,
            data: {
                question
            },
            headers: authHeader()
        },);
    }
    gettheorytests(slug) {
        return axios({
            method: 'POST',
            url: API_URL + 'theorytest/all/',
            data: {
                slug
            },
            headers: authHeader()
        },);
    }
    submittherorytest(question_id,answer) {
        return axios({
            method: 'POST',
            url: API_URL + 'theoryquestion/answer/' + question_id,
            data: {
                answer
            },
            headers: authHeader()
        },);
    }
    createobjecivetest(slug, title, duration, starttime, deadline) {
        return axios({
            method: 'POST',
            url: API_URL + 'objectivetest/',
            data: {
                slug,
                title,
                duration,
                starttime,
                deadline
            },
            headers: authHeader()
        },);
    }
    getobjectivetest(id) {
        return axios.get(API_URL + 'objectivetest/' + id, {headers: authHeader()});
    }
    getobjectivetestreview(id) {
        return axios.get(API_URL + 'objectivetest/review/' + id, {headers: authHeader()});
    }
    addobjectivequestion(test, question,options){
        return axios({
            method: 'POST',
            url: API_URL + 'objectivetest/' + test + '/question',
            data: {
                question: question,
                options: options
            },
            headers: authHeader()
        },);
    }
    addfromexcel(test, data) {
        return axios({
            method: 'POST',
            url: API_URL + 'objectivetest/' + test + '/excel',
            data: {
                datas: data
            },
            headers: authHeader()
        });
    }
    getobjectivetests(slug) {
        return axios({
            method: 'POST',
            url: API_URL + 'objectivetest/all/',
            data: {
                slug
            },
            headers: authHeader()
        },);
    }
    submitobjectivestest(test,cbt){
        return axios({
            method: 'POST',
            url: API_URL + 'objectivetest/' + test,
            data: {
                cbt
            },
            headers: authHeader()
        },);
    }
    getobjectivetestresult(id) {
        return axios.get(API_URL + 'objectivetest/result/' + id, {headers: authHeader()});
    }
    // getStudents() {     return axios.get(API_URL + 'students', {         headers:
    // authHeader()     }); } getTeachers() {     return axios.get(API_URL +
    // 'teachers', {         headers: authHeader()     }); } createenvirons(name,
    // organization) {     return axios({         method: 'POST',         url:
    // API_URL + 'environ',         data: {             name: name, organization:
    // organization         },         headers: authHeader()     }, ); }
    // getenvirons() {     return axios.get(API_URL + 'environ', { headers:
    // authHeader()     }); } createclassroom(name, code) {     return axios({
    // method: 'POST',         url: API_URL + 'classroom', data: { name: name, code:
    // code         }, headers: authHeader()     }); } getclassrooms() { return
    // axios.get(API_URL + 'classroom', { headers: authHeader()     }); }
    // joinclassroom(code) {     return axios({    method: 'POST',         url:
    // API_URL + 'classroom/join',         data: {           code: code         },
    // headers: authHeader()     }); } getclassroomsjoined() {     return
    // axios.get(API_URL + 'classroom/joined', {        headers: authHeader() }); }
    // checkclassroommember(user, classroom) {  return axios({ method: 'POST', url:
    // API_URL + 'classroom/' + classroom + "/check",       data: {   user: user },
    // headers: authHeader()     }); } createnewtest(classroom, title, type,
    // instruction, duration, deadline) { return axios({ method: 'POST', url:
    // API_URL + 'classroom/' + classroom + '/tests',       data: { title: title,
    // type: type,             instruction: instruction,    duration: duration,
    // deadline: deadline         }, headers: authHeader()     }); } gettest(test) {
    //     return axios.get(API_URL + 'test/'+test, { headers: authHeader() }); }
    // addquestion(test, question, options) { return axios({        method: 'POST',
    //       url: API_URL + 'test/' + test + '/question',       data: { question:
    // question, options: options         }, headers: authHeader()     }); }
    // addfromexcel(test, data) {     return axios({ method: 'POST',         url:
    // API_URL + 'test/' + test + '/questionsfromexcel',  data: { datas:data },
    // headers: authHeader()   }); } gettests(classroom) {   return
    // axios.get(API_URL + 'tests/'+classroom, {      headers: authHeader() }); }
    // gettestcontent(testId) {     return axios.get(API_URL +
    // 'test/'+testId+'/questions', { headers: authHeader()     }); }
}

export default new UserService();