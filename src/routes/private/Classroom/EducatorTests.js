import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
// reactstrap components
import {
  Card,
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
} from "reactstrap";
import notify from "../../../services/notify.js";
import UserService from "../../../services/user.service";

const EducatorResults = ({ slug, history, boss }) => {
  const [activeTab, setActiveTab] = useState("1");

  const toggletype = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const [theoryTests, settheoryTests] = useState(null);
  const pageSize = 3;
  const [TheoryPagesCount, setTheoryPagesCount] = useState(0);
  const [currentTheoryPage, setcurrentTheoryPage] = useState(0);

  const [notheory, setnotheory] = useState(null);

  const updatetheorytests = () => {
    UserService.getalltheorytests(slug).then((response) => {
      if (response.data.length < 1) {
        setnotheory(true);
        settheoryTests([]);
      } else {
        settheoryTests(response.data);
        setnotheory(false);
      }
      setTheoryPagesCount(Math.ceil(response.data.length / pageSize));
    });
  };

  const [objectiveTests, setobjectiveTests] = useState(null);
  const [ObjectivePagesCount, setObjectivePagesCount] = useState(0);
  const [currentObjectivePage, setcurrentObjectivePage] = useState(0);

  const [noobjective, setnoobjective] = useState(null);
  const updateobjectivetests = () => {
    UserService.getallobjectivetests(slug).then((response) => {
      if (response.data.length < 1) {
        setnoobjective(true);
        setobjectiveTests([]);
      } else {
        setobjectiveTests(response.data);
        setnoobjective(false);
      }
      setObjectivePagesCount(Math.ceil(response.data.length / pageSize));
    });
  };
  useEffect(() => {
    updatetheorytests();
    updateobjectivetests();
  }, []);

  const handleTheoryClick = (e, index) => {
    e.preventDefault();
    setcurrentTheoryPage(index);
  };

  const handleObjectiveClick = (e, index) => {
    e.preventDefault();
    setcurrentObjectivePage(index);
  };

  const editobjectivetest = (id, marked) => {
    marked
      ? notify.user(
          "Edit Test", 
          "You can't edit tests that have been taken.",
          "info"
        )
      : history.push("/in/classroom/" + slug + "/tests/questionso/" + id);
  };
  const testsubmissions = (id) => {
    history.push("/in/classroom/" + slug + "/submissions/" + id);
  };
  const edittheorytest = (id, marked) => {
    marked
      ? notify.user(
          "Edit Test",
          "You can't edit test after Marking starts.",
          "info"
        )
      : history.push("/in/classroom/" + slug + "/tests/questionst/" + id);
  };

  window.Echo.channel("at_school_database_classes")
		.listen("UpdateTheoryTests", (e) => {
			updatetheorytests();
		})
		.listen("UpdateObjectiveTests", (e) => {
			updatetheorytests();
		});

  return (
    <div>
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
                  .map((test, key) => {
                    return (
                      <Col key={key+'col'} md="4">
                        <Card body>
                          <CardTitle>
                            <strong>{test.title}</strong>
                          </CardTitle>
                          <CardTitle>
                            <strong>Start-Time: </strong>
                            {notify.date(test.starttime)}
                          </CardTitle>
                          <CardTitle>
                            <strong>Deadline: </strong>
                            {notify.date(test.deadline)}
                          </CardTitle>
                          {!boss&&<Row>
                            <Col>
                              <Button
                                tag="label"
                                color="Warning"
                                onClick={() =>
                                  edittheorytest(test.id, test.marked)
                                }
                                style={{ width: "100%" }}
                                size="sm"
                              >
                                Edit
                              </Button>
                            </Col>
                            <Col>
                              <Button
                                tag="label"
                                color="info"
                                onClick={() => testsubmissions(test.id)}
                                style={{ width: "100%" }}
                                size="sm"
                              >
                                Mark
                              </Button>
                            </Col>
                          </Row>}
                        </Card>
                      </Col>
                    );
                  })
              ) : (
                <Col md="12">
                  <div>
                    <span className="text-info">Wait...</span>
                  </div>
                </Col>
              )}
              {notheory ? (
                <Col md="12">
                  <div>
                    <span className="text-info">No Theory Assessments! </span>
                    Create one and Check again.
                  </div>
                </Col>
              ) : (
                ""
              )}
            </Row>

            <div className="pagination-wrapper">
              <Pagination aria-label="Page navigation example">
                <PaginationItem disabled={currentTheoryPage <= 0}>
                  <PaginationLink
                    onClick={(e) => handleTheoryClick(e, currentTheoryPage - 1)}
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
                    onClick={(e) => handleTheoryClick(e, currentTheoryPage + 1)}
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
                  .map((test, key) => {
                    return (
                      <Col key={key+'obj'} md="4">
                        <Card body>
                          <CardTitle>
                            <strong>{test.title}</strong>
                          </CardTitle>
                          <CardTitle>
                            <strong>Created: </strong>
                            {notify.date(test.created_at)}
                          </CardTitle>
                          <CardTitle>
                            <strong>Deadline: </strong>
                            {notify.date(test.deadline)}
                          </CardTitle>

                          {!boss&&<Button
                            tag="label"
                            color="info"
                            onClick={() =>
                              editobjectivetest(test.id, test.marked)
                            }
                            size="sm"
                          >
                            Edit
                          </Button>}
                        </Card>
                      </Col>
                    );
                  })
              ) : (
                <Col md="12">
                  <div>
                    <span className="text-info">Wait...</span>
                  </div>
                </Col>
              )}
              {noobjective ? (
                <Col md="12">
                  <div>
                    <span className="text-info">
                      No Objective Assessments!{" "}
                    </span>
                    Create one and check again.
                  </div>
                </Col>
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
                  disabled={currentObjectivePage >= ObjectivePagesCount - 1}
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
    </div>
  );
};
export default withRouter(EducatorResults);
