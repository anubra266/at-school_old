import React, { useState, useEffect } from "react";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Button,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  CardTitle,
  Pagination,
  PaginationItem,
  PaginationLink,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import notify from "../../../services/notify.js";
import UserService from "../../../services/user.service";
import className from "classnames";
var parse = require("html-react-parser");

const Solutions = ({ history, educator, slug }) => {
  const [theoryview, settheoryview] = useState(null);
  const [objectiveview, setobjectiveview] = useState(null);
  const [theoryTests, settheoryTests] = useState(null);
  const [objectiveTests, setobjectiveTests] = useState(null);

  const [noobjective, setnoobjective] = useState(null);
  const [notheory, setnotheory] = useState(null);
  const pageSize = 3;
  const [TheoryPagesCount, setTheoryPagesCount] = useState(0);
  const [currentTheoryPage, setcurrentTheoryPage] = useState(0);
  const [ObjectivePagesCount, setObjectivePagesCount] = useState(0);
  const [currentObjectivePage, setcurrentObjectivePage] = useState(0);

  const objviewpageSize = 1;
  const [objviewsCount, setobjviewsCount] = useState(0);
  const [currentobjview, setcurrentobjview] = useState(0);

  const [theorysolution, settheorysolution] = useState(false);
  const toggletheorysolution = () => settheorysolution(!theorysolution);

  const [objectivesolution, setobjectivesolution] = useState(false);
  const toggleobjectivesolution = () =>
    setobjectivesolution(!objectivesolution);

  const handleTheoryClick = (e, index) => {
    e.preventDefault();
    setcurrentTheoryPage(index);
  };

  const handleObjectiveClick = (e, index) => {
    e.preventDefault();
    setcurrentObjectivePage(index);
  };
  const handleobjviewClick = (e, index) => {
    e.preventDefault();
    setcurrentobjview(index);
  };
  const updatetheorytests = () => {
    UserService.gettheorysolutions(slug).then((response) => {
      if (response.data.length < 1) {
        setnotheory(true);
        settheoryTests([]);
      } else {
        settheoryTests(response.data);
        setnotheory(false);
        setTheoryPagesCount(Math.ceil(response.data.length / pageSize));
      }
    });
  };
  const updateobjectivetests = () => {
    UserService.getobjectivesolutions(slug).then((response) => {
      if (response.data.length < 1) {
        setnoobjective(true);
        setobjectiveTests([]);
      } else {
        setobjectiveTests(response.data);
        setnoobjective(false);
        setObjectivePagesCount(Math.ceil(response.data.length / pageSize));
      }
    });
  };
  useEffect(() => {
    updateobjectivetests();
    updatetheorytests();
  }, []);
  window.Echo.channel("at_school_database_tests").listen(
    "UpdateTheoryTests",
    (e) => {
      updatetheorytests();
    }
  );

  const viewsolution = (type, id) => {
    if (type === "objective") {
      history.push("/in/test/" + slug + "/objective/" + id);
    } else {
      history.push("/in/test/" + slug + "/theory/" + id);
    }
  };
  const [activeTab, setActiveTab] = useState("1");

  const toggletype = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  window.Echo.channel("at_school_database_solutions").listen(
    "UpdateSolutions",
    (e) => {
      updatetheorytests();
      updateobjectivetests();
    }
  );

  return (
    <div className="content">
      <Row>
        <Col md="12">
          <Card>
            <CardHeader>
              <Row>
                <Col md="10">Solutions</Col>
              </Row>
            </CardHeader>
            <CardBody className="all-icons">
              <Nav tabs>
                <NavItem>
                  <NavLink
                    style={{
                      cursor: "pointer",
                    }}
                    className={activeTab === "1" ? "testtab_active" : ""}
                    onClick={() => {
                      toggletype("1");
                    }}
                  >
                    Theory
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    style={{
                      cursor: "pointer",
                    }}
                    className={activeTab === "2" ? "testtab_active" : ""}
                    onClick={() => {
                      toggletype("2");
                    }}
                  >
                    Objective
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                  <Row>
                    {theoryTests ? (
                      theoryTests
                        .slice(
                          currentTheoryPage * pageSize,
                          (currentTheoryPage + 1) * pageSize
                        )
                        .map((test) => {
                          return (
                            <Col md="4">
                              <Card body>
                                <CardTitle>
                                  <strong>{test.title}</strong>
                                </CardTitle>
                                <CardTitle>
                                  <strong>Submitted: </strong>
                                  {notify.date(test.answer.updated_at)}
                                </CardTitle>
                                <CardTitle>
                                  <strong>Marked: </strong>
                                  {notify.date(test.result.updated_at)}
                                </CardTitle>
                                <Button
                                  tag="label"
                                  color="info"
                                  onClick={() => {
                                    settheoryview(test);
                                    toggletheorysolution();
                                  }}
                                  size="sm"
                                >
                                  View
                                </Button>
                                {theoryview && (
                                  <Modal
                                    size="lg"
                                    unmountOnClose={false}
                                    isOpen={theorysolution}
                                    toggle={toggletheorysolution}
                                    className={className + ""}
                                  >
                                    <ModalHeader toggle={toggletheorysolution}>
                                      {" "}
                                      &nbsp;
                                    </ModalHeader>
                                    <ModalBody>
                                      <p className="title">
                                        <strong>Question</strong>
                                      </p>
                                      <div className="solutionmodalstud">
                                        {parse(theoryview.question.question)}
                                      </div>
                                      <p className="title">
                                        <strong>Solution</strong>
                                      </p>
                                      <div className="solutionmodalstud">
                                        {parse(theoryview.solution.solution)}
                                      </div>

                                      <ModalFooter>
                                        <Button
                                          onClick={toggletheorysolution}
                                          color="secondary"
                                        >
                                          Cancel
                                        </Button>
                                      </ModalFooter>
                                    </ModalBody>
                                  </Modal>
                                )}
                              </Card>
                            </Col>
                          );
                        })
                    ) : (
                      <Col md="12">
                        <div>
                          <span className="text-info">Wait...</span>
                        </div>{" "}
                      </Col>
                    )}
                    {notheory ? (
                      <Col md="12">
                        <div>
                          <span className="text-info">No Solutions yet! </span>
                          They'll be here when available.
                        </div>{" "}
                      </Col>
                    ) : (
                      ""
                    )}
                  </Row>
                  <div className="pagination-wrapper">
                    <Pagination aria-label="Page navigation example">
                      <PaginationItem disabled={currentTheoryPage <= 0}>
                        <PaginationLink
                          onClick={(e) =>
                            handleTheoryClick(e, currentTheoryPage - 1)
                          }
                          previous
                          href="#"
                        />
                      </PaginationItem>

                      {[...Array(TheoryPagesCount)].map((page, i) => (
                        <PaginationItem
                          active={i === currentTheoryPage}
                          key={i}
                          className="pag"
                        >
                          <PaginationLink
                            onClick={(e) => handleTheoryClick(e, i)}
                            href="#"
                          >
                            {i + 1}
                          </PaginationLink>
                        </PaginationItem>
                      ))}

                      <PaginationItem
                        disabled={currentTheoryPage >= TheoryPagesCount - 1}
                      >
                        <PaginationLink
                          onClick={(e) =>
                            handleTheoryClick(e, currentTheoryPage + 1)
                          }
                          next
                          href="#"
                        />
                      </PaginationItem>
                    </Pagination>
                  </div>
                </TabPane>
                <TabPane tabId="2">
                  <Row>
                    {objectiveTests ? (
                      objectiveTests
                        .slice(
                          currentObjectivePage * pageSize,
                          (currentObjectivePage + 1) * pageSize
                        )
                        .map((test) => {
                          return (
                            <Col md="4">
                              <Card body>
                                <CardTitle>
                                  <strong>{test.title}</strong>
                                </CardTitle>
                                <CardTitle>
                                  <strong>Taken: </strong>
                                  {notify.date(test.taken)}
                                </CardTitle>
                                <CardTitle>
                                  {test.solutions + " "}Solutions
                                </CardTitle>
                                <Button
                                  tag="label"
                                  color="info"
                                  onClick={() => {
                                    setobjviewsCount(
                                      Math.ceil(
                                        test.newquestions.length / objviewpageSize
                                      )
                                    );
                                    setobjectiveview(test);
                                    toggleobjectivesolution();
                                  }}
                                  size="sm"
                                >
                                  View
                                </Button>
                                {objectiveview && (
                                  <Modal
                                    size="lg"
                                    unmountOnClose={false}
                                    isOpen={objectivesolution}
                                    toggle={toggleobjectivesolution}
                                    className={className + ""}
                                  >
                                    <ModalHeader
                                      toggle={toggleobjectivesolution}
                                    >
                                      {" "}
                                      &nbsp;
                                    </ModalHeader>
                                    <ModalBody>
                                      {objectiveview.newquestions
                                        .slice(
                                          currentobjview * objviewpageSize,
                                          (currentobjview + 1) * objviewpageSize
                                        )
                                        .map((question) => {
                                          return (
                                            <React.Fragment>
                                              <p className="title">
                                                <strong>Question</strong>
                                              </p>
                                              <div className="solutionmodalstud">
                                                {parse(question.question)}
                                              </div>
                                              <p className="title">
                                                <strong>Solution</strong>
                                              </p>
                                              <div className="solutionmodalstud">
                                                {parse(
                                                  question.objectivesolutions[0]
                                                    .solution
                                                )}
                                              </div>
                                            </React.Fragment>
                                          );
                                        })}

                                      <div className="pagination-wrapper">
                                        <Pagination aria-label="Page navigation example">
                                          <PaginationItem
                                            disabled={currentobjview <= 0}
                                          >
                                            <PaginationLink
                                              onClick={(e) =>
                                                handleobjviewClick(
                                                  e,
                                                  currentobjview - 1
                                                )
                                              }
                                              previous
                                              href="#"
                                            />
                                          </PaginationItem>

                                          {[...Array(objviewsCount)].map(
                                            (page, i) => (
                                              <PaginationItem
                                                active={i === currentobjview}
                                                key={i}
                                                className="pag"
                                              >
                                                <PaginationLink
                                                  onClick={(e) =>
                                                    handleobjviewClick(e, i)
                                                  }
                                                  href="#"
                                                >
                                                  {i + 1}
                                                </PaginationLink>
                                              </PaginationItem>
                                            )
                                          )}

                                          <PaginationItem
                                            disabled={
                                              currentobjview >=
                                              objviewsCount - 1
                                            }
                                          >
                                            <PaginationLink
                                              onClick={(e) =>
                                                handleobjviewClick(
                                                  e,
                                                  currentobjview + 1
                                                )
                                              }
                                              next
                                              href="#"
                                            />
                                          </PaginationItem>
                                        </Pagination>
                                      </div>
                                      <ModalFooter>
                                        <Button
                                          onClick={toggleobjectivesolution}
                                          color="secondary"
                                        >
                                          Cancel
                                        </Button>
                                      </ModalFooter>
                                    </ModalBody>
                                  </Modal>
                                )}
                              </Card>
                            </Col>
                          );
                        })
                    ) : (
                      <Col md="12">
                        <div>
                          <span className="text-info">Wait...</span>
                        </div>{" "}
                      </Col>
                    )}
                    {noobjective ? (
                      <Col md="12">
                        <div>
                          <span className="text-info">No Solutions yet! </span>
                          They'll be here when available.
                        </div>{" "}
                      </Col>
                    ) : objectiveTests &&
                      objectiveTests.filter(
                        (objective) =>
                          new Date(objective.deadline) > new Date() &&
                          new Date(objective.starttime) <= new Date()
                      ).length < 1 ? (
                      <Col sm="12"> </Col>
                    ) : (
                      ""
                    )}
                  </Row>
                  <div className="pagination-wrapper">
                    <Pagination aria-label="Page navigation example">
                      <PaginationItem disabled={currentObjectivePage <= 0}>
                        <PaginationLink
                          onClick={(e) =>
                            handleObjectiveClick(e, currentObjectivePage - 1)
                          }
                          previous
                          href="#"
                        />
                      </PaginationItem>

                      {[...Array(ObjectivePagesCount)].map((page, i) => (
                        <PaginationItem
                          active={i === currentObjectivePage}
                          key={i}
                          className="pag"
                        >
                          <PaginationLink
                            onClick={(e) => handleObjectiveClick(e, i)}
                            href="#"
                          >
                            {i + 1}
                          </PaginationLink>
                        </PaginationItem>
                      ))}

                      <PaginationItem
                        disabled={
                          currentObjectivePage >= ObjectivePagesCount - 1
                        }
                      >
                        <PaginationLink
                          onClick={(e) =>
                            handleObjectiveClick(e, currentObjectivePage + 1)
                          }
                          next
                          href="#"
                        />
                      </PaginationItem>
                    </Pagination>
                  </div>
                </TabPane>
              </TabContent>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Solutions;
