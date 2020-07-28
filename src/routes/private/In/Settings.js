import React, { useState, useEffect } from "react";

import notify from "../../../services/notify.js";
import className from "classnames";
import AuthService from "../../../services/auth.service.js";


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
  const [firstName, setfirstName] = useState(user.firstName);
  const [middleName, setmiddleName] = useState(user.middleName);
  const [lastName, setlastName] = useState(user.lastName);
  const [gender, setgender] = useState(user.gender);

  const [email, setemail] = useState(user.email);
  const [telephone, settelephone] = useState(user.telephone);
  const [dateOfBirth, setdateOfBirth] = useState(user.dateOfBirth);

  const [school, setschool] = useState(user.school);
  const [school_town, setschool_town] = useState(user.school_town);

  const saveprofile = (e) => {
    e.preventDefault();
    setloading(true);

    AuthService.update_user_profile(
      notify.capf(firstName),
      notify.capf(middleName),
      notify.capf(lastName),
      gender,
      email,
      telephone,
      dateOfBirth,
      school,
      school_town,
    ).then(
      (response) => {
        notify.user("Update Profile", response.data, "success");
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        notify.user("Register", resMessage, "danger");
        setloading(false);
      }
    );

    setloading(false);
  };

  const [password, setpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");

  return (
    <div className="content">
      <Row>
        <Col md="8">
          <Form action="#" onSubmit={saveprofile}>
            <Card>
              <CardHeader>
                <h5 className="title">Edit Profile</h5>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col className="pr-md-1" md="4">
                    <FormGroup>
                      <label>First Name {firstName}</label>
                      <Input
                        required
                        value={firstName}
                        placeholder="First Name"
                        type="text"
                        onChange={(e) => {
                          setfirstName(e.target.value);
                        }}
                      />
                    </FormGroup>
                  </Col>
                  <Col className="pr-md-1" md="4">
                    <FormGroup>
                      <label>Middle Name</label>
                      <Input
                        required
                        value={middleName}
                        placeholder="Middle Name"
                        type="text"
                        onChange={(e) => {
                          setmiddleName(e.target.value);
                        }}
                      />
                    </FormGroup>
                  </Col>
                  <Col className="pr-md-1" md="4">
                    <FormGroup>
                      <label>Last Name</label>
                      <Input
                        required
                        value={lastName}
                        placeholder="Last Name"
                        type="text"
                        onChange={(e) => {
                          setlastName(e.target.value);
                        }}
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
                            <Input
                              value="male"
                              type="radio"
                              name="gender"
                              checked={gender === "male"}
                              onChange={(e) => {
                                setgender(e.target.value);
                              }}
                            />
                            <span className="checkmark"></span>
                          </label>
                        </Col>
                        <Col>
                          <label className="radiocontainer">
                            Female
                            <Input
                              value="female"
                              type="radio"
                              name="gender"
                              checked={gender === "female"}
                              onChange={(e) => {
                                setgender(e.target.value);
                              }}
                            />
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
                      <Input
                        required
                        value={email}
                        placeholder="Email"
                        type="email"
                        onChange={(e) => {
                          setemail(e.target.value);
                        }}
                      />
                    </FormGroup>
                  </Col>
                  <Col className="pl-md-1" md="6">
                    <FormGroup>
                      <label>Telephone</label>
                      <Input
                        required
                        value={telephone}
                        placeholder="Telephone"
                        type="tel"
                        onChange={(e) => {
                          settelephone(e.target.value);
                        }}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="12">
                    <FormGroup>
                      <label>School</label>
                      <Input
                        required
                        value={school}
                        placeholder={school === "" ? "Not set" : "School"}
                        type="text"
                        onChange={(e) => {
                          setschool(e.target.value);
                        }}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col className="pr-md-1" md="6">
                    <FormGroup>
                      <label>Town</label>
                      <Input
                        required
                        value={school_town}
                        placeholder={school_town === "" ? "Not set" : "Town"}
                        type="text"
                        onChange={(e) => {
                          setschool_town(e.target.value);
                        }}
                      />
                    </FormGroup>
                  </Col>
                  <Col className="px-md-1" md="6">
                    <FormGroup>
                      <label>Date of Birth</label>
                      <Input
                        required
                        value={dateOfBirth}
                        placeholder="Date of Birth"
                        type="date"
                        onChange={(e) => {
                          setdateOfBirth(e.target.value);
                        }}
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
          </Form>
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
                  <Button color="info" disabled={loading} type="submit">
                    Save
                  </Button>{" "}
                  <Button color="secondary" onClick={togglechangepassword}>
                    Cancel
                  </Button>
                </ModalFooter>
              </form>



            </ModalBody>
          </Modal>
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
                    {firstName + " "} {middleName.charAt(0) + ". "}
                    {lastName}
                  </h5>
                </a>

                <p className="description">{email}</p>
                <p className="description">{"+" + telephone}</p>
                <p className="description">{notify.date(dateOfBirth)}</p>
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
