import React, {useState, useEffect} from "react";

// reactstrap components
import {
    Card,
    CardHeader,
    CardBody,
    Row,
    Col,
    Table
} from "reactstrap";

import UserService from "../../../services/user.service";
// import className from "classnames";
import notify from "../../../services/notify.js"

const Submissions = ({slug, history, match}) => {

    const [test,
        settest] = useState(null);

    const [submissions,
        setsubmissions] = useState(null);
    const [nosubmissions,
        setnosubmissions] = useState(null);
    const updatesubmissions = () => {

        UserService
            .gettestsubmissions(match.params.test)
            .then(response => {
                if (response.data.length < 1) {
                    setnosubmissions(true);
                } else {
                    response.data.sort((a,b)=>{
                        return a.marked&&!b.marked? 1: -1;
                    })
                    setsubmissions(response.data);
                    setnosubmissions(false);
                }
            },error=>{
                const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                notify.user('Mark Test',resMessage,'info')
                //Redirect to edit page if there's no question yet
                history.push("/in/classroom/" + slug + "/tests/questionst/" + match.params.test)
            });
    }
    useEffect(() => {
        UserService
            .gettheorytestdetails(match.params.test)
            .then(response => {
                settest(response.data);
            });

        updatesubmissions();

    }, []);
    window.Echo.channel("at_school_database_classes").listen(
      "UpdateSubmissions",
      (e) => {
        updatesubmissions();
      }
    );

        const marktest = (test, user) => {
            history.push("/in/classroom/" + slug + "/mark-assessment/" + test +"/"+ user);
    } 
    return (
        <div className="content">
            <Row>
                <Col md="12">
                    {test
                        ? <Card>
                                <CardHeader>
                                    <Row>
                                        <Col md="10">
                                            Submissions for
                                            <span
                                                style={{
                                                fontWeight: "bolder",
                                                color: "black"
                                            }}>{" " + test.title}</span>
                                        </Col>
                                    </Row>
                                </CardHeader>
                                <CardBody className="all-icons">
                                    <Row>
                                        <Col md="12">
                                            {submissions
                                                ? <Table hover>
                                                        <thead>
                                                            <tr>
                                                                <th>#</th>
                                                                <th>Student</th>
                                                                <th>Email</th>
                                                                <th>Submission Time</th>
                                                                <th>Marked</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {submissions.map((submission, key) => {
                                                                return (
                                                                    <tr onClick={() => marktest(match.params.test,submission.user.id)}>
                                                                        <th scope="row">{key + 1}</th>
                                                                        <td>
                                                                            {(submission.user.firstName) + " " + (submission.user.middleName).charAt(0) + ". " + submission.user.lastName}
                                                                        </td>
                                                                        <td>{submission.user.email}</td>
                                                                        <td>{notify.date(submission.updated_at)}</td>
                                                                        <td>{submission.marked?"✔️":''}</td>
                                                                    </tr>
                                                                )
                                                            })}
                                                        </tbody>
                                                    </Table>

                                                : <div>
                                                    <span className="text-info">{nosubmissions?"":"wait..."}</span>
                                                </div>}

                                            {nosubmissions
                                                ? <div>
                                                        <span className="text-info">No Submissions for this Test!{" "}</span>
                                                    </div>
                                                : ''}
                                        </Col>

                                    </Row>
                                </CardBody>
                            </Card>
                        : ''}
                </Col>
            </Row>
        </div>
    );

}

export default Submissions;