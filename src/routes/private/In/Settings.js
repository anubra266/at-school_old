import React, { useState, useRef, useEffect } from "react";

import notify from "../../../services/notify.js";
import className from "classnames";
import AuthService from "../../../services/auth.service.js";
import ReactPhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import PasswordInput from "../../../components/PasswordStrength/Password-Input";
import AvatarEditor from "react-avatar-editor";

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
  CustomInput,
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

  const focusinput = (e) => e.target.select();
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
      school_town
    ).then(
      (response) => {
        notify.user("Update Profile", response.data, "success");
        setloading(false);
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
  };

  const passwordchange = (e) => {
    setpassword(e.target.value);
  };
  const [oldpassword, setoldpassword] = useState("");
  const [password, setpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");

  const updatepassword = (e) => {
    e.preventDefault();
    setloading(true);
    if (password === confirmpassword && password.length >= 6) {
      AuthService.update_password(oldpassword, password).then(
        (response) => {
          notify.user("Update Password", response.data, "success");
          setloading(false);
          setoldpassword("");
          setpassword("");
          setconfirmpassword("");
          togglechangepassword();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.toString();
          notify.user("Register", resMessage, "danger");
          setoldpassword("");
          setloading(false);
        }
      );
    } else {
      notify.user(
        "Change Password",
        "Input Matching Passwords (at least 6 characters)",
        "warning"
      );
      setloading(false);
    }
  };
  const editor = useRef(null);

  const [scale, setscale] = useState(1.2);
  const [profile_image, setprofile_image] = useState(null);
  const [image_name, setimage_name] = useState("");
  const initpic = notify.APP_URL() + "storage/images/" + user.profile_image;
  const [src, setsrc] = useState(initpic);
  const checkfile = (image) => {
    if (!image) {
      if (src) {
        image = profile_image;
        return false;
      }
      notify.user("Update Profile Picture🖼", "No file uploaded!", "danger");

      return false;
    }
    if (!(image.type === "image/jpeg")) {
      notify.user(
        "Update Profile Picture🖼",
        "Invalid Image format. Upload JPEG/JPG!",
        "danger"
      );

      return false;
    }
    const isLt2M = image.size / 1024 / 1024 < 6;
    if (!isLt2M) {
      notify(
        "Update Profile Picture🖼",
        "Picture too large. Shouldn't be more than 5mb!",
        "danger"
      );

      return false;
    }

    const reader = new FileReader();
    reader.addEventListener(
      "load",
      () => {
        setsrc(reader.result);
        setprofile_image(reader.result);
      },
      false
    );
    reader.readAsDataURL(image);
    setimage_name(image.name);
  };
  const upload_profile_image = (e) => {
    let image = e.target.files[0];
    checkfile(image);
    setscale(1.2);
  };
  const updateimage = () => {
    if (!(src === initpic)) {
      if (editor) {
        const canvas = editor.current.getImage().toDataURL();
        setprofile_image(canvas);
      }
    }
  };
  const update_profile_image = () => {
    setloading(true);

    if (profile_image) {
      AuthService.update_profile_image(profile_image).then(
        (response) => {
          notify.user("Update Profile Picture", response.data, "success");
          setloading(false);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.toString();
          notify.user("Update Profile Image", resMessage, "danger");
          setloading(false);
        }
      );
    } else {
      notify.user("Update Profile Image", "You must select an Image", "danger");
      setloading(false);
    }
  };

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
                      <label>First Name</label>
                      <Input
                        required
                        value={firstName}
                        placeholder="First Name"
                        type="text"
                        onChange={(e) => {
                          setfirstName(e.target.value);
                        }}
                        onFocus={focusinput}
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
                        onFocus={focusinput}
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
                        onFocus={focusinput}
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
                        onFocus={focusinput}
                      />
                    </FormGroup>
                  </Col>
                  <Col className="pl-md-1" md="6">
                    <label>Telephone</label>
                    <ReactPhoneInput
                      country={"ng"}
                      defaultCountry={"ngn"}
                      inputProps={{
                        name: "telephone",
                        required: true,
                      }}
                      value={telephone}
                      onChange={(phone) => settelephone(phone)}
                    />
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
                        onFocus={focusinput}
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
                        onFocus={focusinput}
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
                  <Col md="2">
                    <FormGroup>
                      <input
                        defaultValue="Change password"
                        type="button"
                        className="btn btn-sm btn-secondary mt-4"
                        onClick={togglechangepassword}
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
              <Form action="#" method="POST" onSubmit={updatepassword}>
                <Row>
                  <Col md="12">
                    <FormGroup>
                      <label>Old Password</label>
                      <Input
                        required
                        style={{ color: "black" }}
                        placeholder="Old Password"
                        type="password"
                        onChange={(e) => {
                          setoldpassword(e.target.value);
                        }}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="12">
                    <FormGroup>
                      <label>New Password</label>
                      <PasswordInput
                        value={password}
                        placeholder="Password"
                        handleChanges={passwordchange}
                        settings={true}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="12">
                    <FormGroup>
                      <label>Confirm New Password</label>
                      <Input
                        required
                        style={{ color: "black" }}
                        placeholder="Confirm New Password"
                        type="password"
                        onChange={(e) => {
                          setconfirmpassword(e.target.value);
                        }}
                      />
                      <label
                        style={{
                          color: "red",
                          margin: "0 0",
                        }}
                      >
                        {password === confirmpassword
                          ? ""
                          : "Passwords don't match 😡"}
                      </label>
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
              </Form>
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
                <span>
                  <div
                    className="upload-butn-wrapper"
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    <AvatarEditor
                      image={
                        src ? src : require("assets/img/default-avatar.png")
                      }
                      border={20}
                      color={[255, 255, 255, 0.6]}
                      scale={parseInt(scale)}
                      rotate={0}
                      width={150}
                      height={150}
                      borderRadius={75}
                      ref={editor}
                      onPositionChange={() => updateimage()}
                      onImageReady={() =>
                        src === initpic ? "" : updateimage()
                      }
                      className="avatar"
                    />

                    <Input
                      accept="image/jpeg"
                      type="file"
                      onChange={(e) => upload_profile_image(e)}
                    />
                    <br />
                    <label>
                      {src !== initpic ? (
                        <FormGroup>
                          <label htmlFor="zoom">Zoom in or Out</label>
                          <CustomInput
                            min={1}
                            max={5}
                            step={0.2}
                            value={scale}
                            onChange={(e) => {
                              setscale(e.target.value);
                              updateimage();
                            }}
                            type="range"
                            id="zoom"
                            name="customRange"
                          />
                        </FormGroup>
                      ) : (
                        ""
                      )}
                      <strong>{profile_image && profile_image.name}</strong>
                      <br />
                      Click picture center to change.
                      {src !== initpic ? (
                        <React.Fragment>
                          {" "}
                          Drag from bottom to adjust.
                          <p>
                            <button
                              onClick={update_profile_image}
                              className="btn btn-sm btn-info"
                              disabled={loading}
                            >
                              Save
                            </button>
                          </p>
                        </React.Fragment>
                      ) : (
                        ""
                      )}
                    </label>
                  </div>

                  <h5 className="title">
                    {firstName + " "} {middleName.charAt(0) + ". "}
                    {lastName}
                  </h5>
                </span>

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
