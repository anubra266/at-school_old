import React, {useState, useEffect} from "react";

// reactstrap components
import {
    Card,
    CardHeader,
    CardBody,
    Row,
    Col,
    Button,
    ButtonGroup,
    Label,
    FormGroup,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Progress,
    Input
} from "reactstrap";
import notify from "../../../services/notify.js"
// import className from "classnames";
import UserService from "../../../services/user.service";
var parse = require('html-react-parser');

const ObjectiveTest = ({user, match, history, className}) => {

    const [test,
        settest] = useState(null);
    const [cbt,
        setcbt] = useState(null);
    const [submitting,
        setsubmitting] = useState(false);
    useEffect(() => {
        UserService
            .getobjectivetest(match.params.test)
            .then(response => {
                response
                    .data
                    .objectivequestions
                    .forEach((question) => {
                        question
                            .objectiveoptions
                            .sort((a, b) => 0.5 - Math.random());
                    }); 
                response
                    .data
                    .objectivequestions
                    .sort((a, b) => 0.5 - Math.random());

                settest(response.data);
                // var timetodeadline = new Date(response.data.deadline).getSeconds() - new Date().getSeconds();
                // console.log(new Date().setSeconds(new Date().getSeconds() + (timetodeadline * 60)))
                setsecs(new Date().setSeconds(new Date().getSeconds() + (response.data.duration * 60)))
                const init_result = response
                    .data
                    .objectivequestions
                    .reduce((acc, question) => {
                        const question_id = question.id;
                        const answer = 0;
                        const total = {};
                        total[question_id] = answer;
                        acc.push(total);
                        return acc
                    }, []);
                setcbt(init_result)

            });
    }, []);
    const handleanswer = (choice) => {
        const question = choice[0];
        const answer = choice[1];
        var new_cbt = cbt;
        new_cbt.forEach(nquestion => {
            if (question in nquestion) {
                nquestion[question] = answer;
            }
        });
        setcbt(new_cbt);
    }
    const reviewtest = () => {
        history.push('/in/test/' + slug + "/objective/" + match.params.test + "/review");
    }
    const goback = () => {
        history.push('/in/classroom/' + slug + "/assessments");
    }
    const pat = match.path;
    const patharr = pat.split('/');
    const slug = patharr[3];
    const [score,
        setscore] = useState(null);
    const [total,
        settotal] = useState(null);
    const submitobjectivequestions = (e) => {
        setsubmitting(true);
        e === 'time_up'
            ? console.log('')
            : e.preventDefault()

        UserService
            .submitobjectivestest(match.params.test, cbt)
            .then(response => {
                const rscore = response.data[0];
                const rtotal = response.data[1];

                if (response.data[1]) {
                    setscore(rscore)
                    settotal(rtotal)
                    notify.user('Submit Test', 'Test Submitted Successfully', 'success');
                    if (e === 'time_up') {
                        setModalfinish(false);
                        setModal(true)
                    }

                }
            }, error => {
                const errMsg = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                notify.user('Submit Test', errMsg, 'danger');
                setsubmitting(false);
            })
    }
    const [modal,
        setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const [secs,
        setsecs] = useState(new Date().setSeconds(new Date().getSeconds() + (0)));

    const stoptest = () => {
        //*Show Time up modal
        if (!modalfinish) {
            setModalfinish(true);
        }
        // //*submit test submitobjectivequestions();
        submitobjectivequestions('time_up');
    }
    var start = 0;
    const calculateTimeLeft = (seconds_duration = secs) => {
        const duration_date = new Date();
        duration_date.setSeconds(duration_date.getSeconds() + seconds_duration);
        const difference = +secs - + new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            };
        }
        if (difference < 1 && start !== 0) {

            stoptest()
        }

        if (seconds_duration !== new Date().setSeconds(new Date().getSeconds() + (0)) && difference > 0) {
            start += 1
        }

        return timeLeft;
    };
    useEffect(() => {

        test && setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        //return clearTimeout(starttest)
    });
    const [modalfinish,
        setModalfinish] = useState(false);
    const togglefinish = () => setModalfinish(!modalfinish);
    const [timeLeft,
        setTimeLeft] = useState(calculateTimeLeft());

    const timerComponents = [];

    Object
        .keys(timeLeft)
        .forEach(interval => {
            if (!timeLeft[interval]) {
                // if (interval === "seconds" && !timeLeft["minutes"] && !timeLeft["hours"] &&
                // !timeLeft["days"]) {     setfinished(true); }
                return;
            }

            timerComponents.push(
                <span class={interval}>{timeLeft[interval]}</span>
            );
        });

    return (
        <div className="content">
            <Row>
                <Col md="12">
                    <Row>
                        <Card>
                            <CardHeader></CardHeader>
                            <CardBody className="all-icons">
                                <Row>

                                    <Col>
                                        <strong>{test && test.title}</strong>
                                    </Col>

                                    <Col>
                                        <strong>{test && test.duration + " minute(s)"}</strong>
                                    </Col>
                                </Row>

                            </CardBody>

                            <div class="timerr">
                                <label>Timer</label><br/> {timerComponents.length
                                    ? timerComponents
                                    : 'wait...'}
                                <Modal
                                    isOpen={modalfinish}
                                    toggle={togglefinish}
                                    className={className}
                                    backdrop={"static"}
                                    keyboard={false}>
                                    <ModalBody>
                                        <div className="aftertest">

                                            <p className="score">Time up!</p>
                                            <p className="percentage">Wait! Your Work is being submitted...</p>
                                            <p><Progress animated color="danger" value="75"/></p>
                                        </div>
                                    </ModalBody>
                                </Modal>
                            </div>
                        </Card>
                    </Row>

                </Col>
            </Row>
            <Row>
                <Col>
                    <form method="POST">
                        {test && <div>
                            {test
                                .objectivequestions
                                .map((question, key) => {
                                    return (
                                        <Card>
                                            <CardBody>
                                                <FormGroup>

                                                    <Label for="">
                                                        <strong>{key + 1}{". "}</strong>{parse(question.question)}</Label>
                                                    <div>
                                                        {question
                                                            .objectiveoptions
                                                            .map((option, key) => {
                                                                return (
                                                                    <label className="radiocontainer opptions">{option.option}
                                                                        <Input
                                                                            type="radio"
                                                                            id={option.id + option}
                                                                            name={question.id}
                                                                            value={option.id}
                                                                            onChange={(e) => handleanswer([question.id, option.id])}/>
                                                                        <span className="checkmark"></span>
                                                                    </label>
                                                                )
                                                            })}

                                                    </div>
                                                </FormGroup>
                                            </CardBody>
                                        </Card>
                                    )
                                })}
                            <Row>
                                <Col md="10"></Col>
                                <Col md="2">
                                    <ButtonGroup className="btn-group-toggle float-right" data-toggle="buttons">
                                        <Button
                                            disabled={submitting}
                                            onClick={toggle}
                                            tag="label"
                                            color="info"
                                            size="sm">Finish</Button>
                                    </ButtonGroup>
                                </Col>
                            </Row>
                        </div>}
                        <Modal
                            isOpen={modal}
                            toggle={toggle}
                            className={className}
                            backdrop={"static"}
                            keyboard={false}>
                            <ModalHeader>
                                {score
                                    ? "Submitted Successfuly. Click Review to see all answers"
                                    : "Are you sure you want to Submit?"}
                            </ModalHeader>
                            <ModalBody>

                                {score
                                    ? <div className="aftertest">

                                            <p className="info">You scored</p>
                                            <p className="score">{score}</p>
                                            <p className="percentage">{Math.round(eval(score / total * 100))}%</p>

                                        </div>
                                    : ''}
                            </ModalBody>
                            <ModalFooter>

                                {score
                                    ? <Button color="secondary" onClick={goback}>Finish</Button>
                                    : <Button
                                        color="primary"
                                        onClick={submitobjectivequestions}
                                        disabled={submitting}
                                        type="submit">Yes</Button>}{' '} {score
                                    ? <Button color="success" onClick={reviewtest}>Review Test</Button>
                                    : <Button color="secondary" onClick={toggle}>Cancel</Button>}
                            </ModalFooter>
                        </Modal>

                    </form>

                </Col>
            </Row>
        </div>
    );

}

export default ObjectiveTest;