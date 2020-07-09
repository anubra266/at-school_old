import axios from 'axios';
import authHeader from './auth-header';
import notify from "./notify";
const API_URL = notify.APP_URL() + 'api/';
// var url = window.location.pathname; 
// var arr = url.split('/');
// var tslug = arr[3];
class UserService {

    getUser() {
        return axios.get(API_URL + 'user', {headers: authHeader()});
    }
    gethomeinfo(id) {
        return axios.get(API_URL + 'homeinfo', {headers: authHeader()});
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
    getcreatedorganizations() {
        return axios.get(API_URL + 'organization', {headers: authHeader()});
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
    getcreatedenvirons() {
        return axios.get(API_URL + 'environ', {headers: authHeader()});
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
            url: API_URL + 'joinclassroom',
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
    getjoinedclassrooms() {
        return axios.get(API_URL + 'joinedclassrooms', {headers: authHeader()});
    }
    getclassroomrole(slug) {
        return axios({
            method: 'POST',
            url: API_URL + 'classroomrole',
            data: {
                slug
            },
            headers: authHeader()
        },);
    }
    checkclassroomstatus(slug) {
        return axios({
            method: 'POST',
            url: API_URL + 'classroomcheck',
            data: {
                slug
            },
            headers: authHeader()
        },);
    }
    createtheorytest(slug, title, deadline, total) {
        return axios({
            method: 'POST',
            url: API_URL + 'storetheorytest',
            data: {
                slug,
                title,
                deadline,
                total
            },
            headers: authHeader()
        },);
    }
    gettheorytest(id) {
        return axios.get(API_URL + 'theorytest/' + id, {headers: authHeader()});
    }
    gettheorytestdetails(id) {
        return axios.get(API_URL + 'theorytestdetails/' + id, {headers: authHeader()});
    }
    marktestdetails(test_id,user_id) {  
        return axios({
            method: 'POST',
            url: API_URL + 'marktestdetails/' + test_id,
            data: {
                user_id
            },
            headers: authHeader()
        },);

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
            url: API_URL + 'theorytests',
            data: {
                slug
            },
            headers: authHeader()
        },);
    }
    gettestsubmissions(test) {  
        return axios.get(API_URL + 'theorytestsubmissions/' + test, {
            headers: authHeader(),
        });
    }
    getalltheorytests(slug) {  
        return axios({
            method: 'POST',
            url: API_URL + 'alltheorytests',
            data: {
                slug
            },
            headers: authHeader()
        },);
    }
    getalltheorytestsresults(slug) {  
        return axios({
            method: 'POST',
            url: API_URL + 'alltheorytestsresults',
            data: {
                slug
            },
            headers: authHeader()
        },);
    }
    submittheorytest(question_id, answer) {
        return axios({
            method: 'POST',
            url: API_URL + 'submittheoryquestion/' + question_id,
            data: {
                answer
            },
            headers: authHeader()
        },);
    }
    updatetheorytest(answer_id, answer) {
        return axios({
            method: 'PUT',
            url: API_URL + 'updatetheoryanswer/'+answer_id,
            data: {
                answer
            },
            headers: authHeader()
        },);
    }
    finishmarktest(answer_id, answer, test_id, score) {
        return axios({
            method: 'POST',
            url: API_URL + 'finishmarktest/'+test_id,
            data: {
                answer_id,
                answer,
                score
            },
            headers: authHeader()
        },);
    }
    gettestresults(test) {
        return axios.get(API_URL + 'gettestresults/' + test, {
            headers: authHeader(),
        });
    }
    createobjecivetest(slug, title, duration, starttime, deadline) {
        return axios({
            method: 'POST',
            url: API_URL + 'objectivetest',
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
        return axios.get(API_URL + 'showobjectivetest/' + id, {
            headers: authHeader(),
        });
    }
    getallobjectivetests(slug) {  
        return axios({
            method: 'POST',
            url: API_URL + 'allobjectivetests',
            data: {
                slug
            },
            headers: authHeader()
        },);
    }
    getobjectivetestreview(id) {
        return axios.get(API_URL + 'objectivetestreview/' + id, {headers: authHeader()});
    }
    addobjectivequestion(test, question, options) {
        return axios({
            method: 'POST',
            url: API_URL + 'addtoobjectivetest/' + test + '/question',
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
            url: API_URL + 'importobjectivetest/' + test + '/excel',
            data: {
                datas: data
            },
            headers: authHeader()
        });
    }
    getobjectivetests(slug) {
        return axios({
            method: 'POST',
            url: API_URL + 'objectivetests',
            data: {
                slug
            },
            headers: authHeader()
        },);
    }
    submitobjectivestest(test, cbt) {
        return axios({
            method: 'POST',
            url: API_URL + 'submitobjectivetest/' + test,
            data: {
                cbt
            },
            headers: authHeader()
        },);
    }
    getobjectivetestresult(id) {
        return axios.get(API_URL + 'objectivetestresult/' + id, {headers: authHeader()});
    }
    getallobjectivetestsresults(slug) {  
        return axios({
            method: 'POST',
            url: API_URL + 'allobjectivetestsresults',
            data: {
                slug
            },
            headers: authHeader()
        },);
    }
    gettestoresults(test) {
        return axios.get(API_URL + 'gettestoresults/' + test, {
            headers: authHeader(),
        });
    }
    getmembers(slug) {
        return axios({
            method: 'POST',
            url: API_URL + 'classroommembers',
            data: {
                slug
            },
            headers: authHeader()
        },);
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
    //      url: API_URL + 'test/' + test + '/question',       data: { question:
    // question, options: options         }, headers: authHeader()     }); }
    // addfromexcel(test, data) {     return axios({ method: 'POST',         url:
    // API_URL + 'test/' + test + '/questionsfromexcel',  data: { datas:data },
    // headers: authHeader()   }); } gettests(classroom) {   return
    // axios.get(API_URL + 'tests/'+classroom, {      headers: authHeader() }); }
    // gettestcontent(testId) {     return axios.get(API_URL +
    // 'test/'+testId+'/questions', { headers: authHeader()     }); }
}

export default new UserService();