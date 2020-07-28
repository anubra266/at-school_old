import React, { useState, useEffect } from "react";

import notify from "../../../services/notify.js";
import className from "classnames";
import UserService from "../../../services/user.service";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardText,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from "reactstrap";

const Settings = ({ user }) => {
  const [changepassword, setchangepassword] = useState(false);

  const togglechangepassword = () => setchangepassword(!changepassword);
  const [loading, setloading] = useState(false);

  return (
    <div className="content">
      <Row>
        <Col md="8">
          <Card>
            <CardHeader>
              <h5 className="title">Edit Profile</h5>
            </CardHeader>
            <CardBody>
              <Form>
                <Row>
                  <Col className="pr-md-1" md="4">
                    <FormGroup>
                      <label>First Name</label>
                      <Input
                        defaultValue=""
                        placeholder="First Name"
                        type="text"
                      />
                    </FormGroup>
                  </Col>
                  <Col className="pr-md-1" md="4">
                    <FormGroup>
                      <label>Middle Name</label>
                      <Input
                        defaultValue=""
                        placeholder="Middle Name"
                        type="text"
                      />
                    </FormGroup>
                  </Col>
                  <Col className="pr-md-1" md="4">
                    <FormGroup>
                      <label>Last Name</label>
                      <Input
                        defaultValue=""
                        placeholder="Last Name"
                        type="text"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col className="pr-md-1" md="6">
                    <FormGroup>
                      <label>Gender</label>
                      <Row>
                        <Col>
                          <label className="radiocontainer">
                            Male
                            <Input value="male" type="radio" name="gender" />
                            <span className="checkmark"></span>
                          </label>
                        </Col>
                        <Col>
                          <label className="radiocontainer">
                            Female
                            <Input value="female" type="radio" name="gender" />
                            <span className="checkmark"></span>
                          </label>
                        </Col>
                      </Row>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col className="pr-md-1" md="6">
                    <FormGroup>
                      <label>Email</label>
                      <Input defaultValue="" placeholder="Email" type="email" />
                    </FormGroup>
                  </Col>
                  <Col className="pl-md-1" md="6">
                    <FormGroup>
                      <label>Telephone</label>
                      <Input
                        defaultValue=""
                        placeholder="Telephone"
                        type="tel"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="12">
                    <FormGroup>
                      <label>School</label>
                      <Input defaultValue="" placeholder="School" type="text" />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col className="pr-md-1" md="6">
                    <FormGroup>
                      <label>Town</label>
                      <Input defaultValue="" placeholder="Town" type="text" />
                    </FormGroup>
                  </Col>
                  <Col className="px-md-1" md="6">
                    <FormGroup>
                      <label>Date of Birth</label>
                      <Input
                        defaultValue=""
                        placeholder="Date of Birth"
                        type="date"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="4">
                    <FormGroup>
                      <input
                        defaultValue="Change"
                        type="button"
                        className="btn btn-secondary mt-4"
                        onClick={togglechangepassword}
                      />
                    </FormGroup>

                    <Modal
                      unmountOnClose={false}
                      isOpen={changepassword}
                      toggle={togglechangepassword}
                      className={className + ""}
                    >
                      <ModalHeader toggle={togglechangepassword}>
                        Change Password
                      </ModalHeader>
                      <ModalBody>
                        <form>
                          <Row>
                            <Col md="12">
                              <FormGroup>
                                <label>Old Password</label>
                                <Input
                                  style={{ color: "black" }}
                                  placeholder="Old Password"
                                  type="password"
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col md="12">
                              <FormGroup>
                                <label>New Password</label>
                                <Input
                                  style={{ color: "black" }}
                                  placeholder="New Password"
                                  type="password"
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col md="12">
                              <FormGroup>
                                <label>Confirm New Password</label>
                                <Input
                                  style={{ color: "black" }}
                                  placeholder="Confirm New Password"
                                  type="password"
                                />
                              </FormGroup>
                            </Col>
                          </Row>

                          <ModalFooter>
                            <Button
                              color="info"
                              disabled={loading}
                              type="submit"
                            >
                              Save
                            </Button>{" "}
                            <Button
                              color="secondary"
                              onClick={togglechangepassword}
                            >
                              Cancel
                            </Button>
                          </ModalFooter>
                        </form>
                      </ModalBody>
                    </Modal>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <label>Password</label>
                      <Input
                        disabled
                        defaultValue="passwordhere"
                        placeholder="Password"
                        type="password"
                      />
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <label>Confirm Password</label>
                      <Input
                        disabled
                        defaultValue="passwordhere"
                        placeholder="Password"
                        type="password"
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </Form>
            </CardBody>
            <CardFooter>
              <Button
                className="btn-fill"
                color="info"
                type="submit"
                disabled={loading}
              >
                Save
              </Button>
            </CardFooter>
          </Card>
        </Col>
        <Col md="4">
          <Card className="card-user">
            <CardBody>
              <CardText />
              <div className="author">
                <div className="block block-one" />
                <div className="block block-two" />
                <div className="block block-three" />
                <div className="block block-four" />
                <a href="#at-school" onClick={(e) => e.preventDefault()}>
                  <img
                    alt="..."
                    className="avatar"
                    src={
                      notify.APP_URL() + "storage/images/" + user.profile_image
                    }
                  />
                  <h5 className="title">
                    {user.firstName + " "} {user.middleName.charAt(0) + ". "}
                    {user.lastName}
                  </h5>
                </a>

                <p className="description">{user.email}</p>
                <p className="description">{"+" + user.telephone}</p>
                <p className="description">{notify.date(user.dateOfBirth)}</p>
              </div>
              <div className="card-description welct"></div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Settings;
