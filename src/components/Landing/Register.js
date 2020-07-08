/*!

=========================================================
* Black Dashboard React v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 
*/
import React, {useState, useRef} from "react";
import AvatarEditor from 'react-avatar-editor'

import Navbar from "../Navbar.js";
// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardText,
    FormGroup,
    Form,
    Input,
    Row,
    Col,
    CustomInput
} from "reactstrap";
import ReactPhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/bootstrap.css';
import PasswordInput from "../PasswordStrength/Password-Input";
import AuthService from "../../services/auth.service";
import notify from "../../services/notify";

const Register = ({location, history}) => {
  
    const [firstName,
        setfirstName] = useState(''); 
    const [middleName,
        setmiddleName] = useState('');
    const [lastName,
        setlastName] = useState('');
    const [email,
        setemail] = useState('');
    const [telephone,
        settelephone] = useState('');
    const [dateOfBirth,
        setdateOfBirth] = useState('');
    const [password,
        setpassword] = useState('');
    const [confirmpassword,
        setconfirmpassword] = useState('');
    const [profile_image,
        setprofile_image] = useState(null);
    const [src,
        setsrc] = useState(null);
    const [image_name,
        setimage_name] = useState('');
    const [scale,
        setscale] = useState(1.2);
    const [loading,
        setloading] = useState(false);
    const editor = useRef(null);
    const passwordchange = (e) => {
        setpassword(e.target.value);
    }
    const checkfile = image => {

        if (!image) {

            if (src) {
                image = profile_image;
                return false;
            }
            notify.user('Upload Profile Picture🖼', "No file uploaded!", 'danger')

            return false;
        }
        if (!(image.type === "image/jpeg")) {

            notify.user('Upload Profile Picture🖼', "Invalid Image format. Upload JPEG/JPG!", 'danger')

            return false;
        }
        const isLt2M = image.size / 1024 / 1024 < 6;
        if (!isLt2M) {
            notify('Upload Profile Picture🖼', "Picture too large. Shouldn't be more than 5mb!", 'danger')

            return false;
        }

        const reader = new FileReader();
        reader.addEventListener('load', () => {
            setsrc(reader.result);
            setprofile_image(reader.result);

        }, false)
        reader.readAsDataURL(image)
        setimage_name(image.name);
    }
    const upload_profile_image = (e) => {
        let image = e.target.files[0];
        checkfile(image);
        setscale(1.2)
    }
    const updateimage = () => {
        if (editor) {
            // This returns a HTMLCanvasElement, it can be made into a data URL or a blob,
            // drawn on another canvas, or added to the DOM.
            const canvas = editor
                .current
                .getImage()
                .toDataURL()
            setprofile_image(canvas)
            fetch(canvas)
                .then(res => res.blob())
                .then(blob => {
                    // ?Convert blob to image file var imagefile = new File([blob],
                    // profile_image.name, {     type: "image/jpeg",     lastModified: Date.now()
                    // }); setprofile_image(imagefile); ?send new image url
                });
        }
    }
    const handleRegister = (e) => {
        e.preventDefault();
        setloading(true)
        if (image_name==="default-avatar.png") {
            notify.user('Registration', 'Upload another Image!', 'danger')
            setloading(false)
        } else {
            AuthService
                .register(firstName, middleName, lastName, email, telephone, dateOfBirth, password, profile_image)
                .then(response => {
                    notify.user('Registration', 'Registration was succssful 🤜', 'success')
                    notify.user('Registration', 'Logging you in... 🚶', 'info')
                    AuthService
                        .login(email, password)
                        .then(() => {
                            history.push("/in/welcome");
                            window
                                .location
                                .reload();
                        }, () => {
                            notify.user('Registration', 'Sorry! an error occured, try again ❗️', 'danger')
                            setloading(false)

                        });
                }, error => {
                    const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                    notify.user('Register', resMessage, 'danger');
                    setloading(false)

                })
        }
    }
    return (
        <div>
        <Navbar location={location}/>
        <div className="limiter">
            <div className="container-login100">
            <div className="">
            <Form onSubmit={handleRegister} encType="multipart/form-data">
              <Row>
                  <Col md="8">
                      <Card>
                          <CardHeader>
                              <h5 className="title">Register</h5>
                          </CardHeader>
                          <CardBody>
                              <Row>
                                  <Col className="pr-md-1" md="4">
                                      <FormGroup>
                                          <label>First Name</label>
                                          <Input
                                              placeholder="Doe"
                                              type="text"
                                              required
                                              value={firstName}
                                              onChange={(e) => {
                                              setfirstName(e.target.value)
                                          }}/>
                                      </FormGroup>
                                  </Col>
                                  <Col className="px-md-1" md="4">
                                      <FormGroup>
                                          <label>Middle Name</label>
                                          <Input
                                              placeholder="Smith"
                                              type="text"
                                              required
                                              value={middleName}
                                              onChange={(e) => {
                                              setmiddleName(e.target.value)
                                          }}/>
                                      </FormGroup>
                                  </Col>
                                  <Col className="pl-md-1" md="4">
                                      <FormGroup>
                                          <label>Last Name</label>
                                          <Input
                                              placeholder="John"
                                              type="text"
                                              required
                                              value={lastName}
                                              onChange={(e) => {
                                              setlastName(e.target.value)
                                          }}/>
                                      </FormGroup>
                                  </Col>
                              </Row>
                              <Row>
                                  <Col className="pr-md-1" md="6">
                                      <FormGroup>
                                          <label>Email</label>
                                          <Input
                                              placeholder="john_doe@skul.xyz"
                                              type="email"
                                              required
                                              value={email}
                                              onChange={(e) => {
                                              setemail(e.target.value)
                                          }}/>
                                      </FormGroup>
                                  </Col>
                                  <Col className="pl-md-1" md="6">
                                      <FormGroup>
                                          <label>Telephone</label>
                                          <ReactPhoneInput
                                              country={'ng'}
                                              defaultCountry={'ngn'}
                                              inputProps={{
                                              name: 'telephone',
                                              required: true
                                          }}
                                              value={telephone}
                                              onChange={phone => settelephone(phone)}/>
                                      </FormGroup>
                                  </Col>
                              </Row>
                              <Row>
                                  <Col md="12">
                                      <FormGroup>
                                          <label>Date Of Birth</label>
                                          <Input
                                              type="date"
                                              required
                                              value={dateOfBirth}
                                              onChange={(e) => {
                                              setdateOfBirth(e.target.value)
                                          }}/>
                                      </FormGroup>
                                  </Col>
                              </Row>
                              <Row>
                                  <Col className="pr-md-1" md="6">
                                      <FormGroup>
                                          <label>Password</label>
                                          <PasswordInput
                                              value={password}
                                              placeholder='********'
                                              handleChanges={passwordchange}/>
                                      </FormGroup>
                                  </Col>
                                  <Col className="px-md-1" md="6">
                                      <FormGroup>

                                          <label>Confirm Password</label>
                                          <div>
                                              <Input
                                                  placeholder="********"
                                                  type="password"
                                                  required
                                                  value={confirmpassword}
                                                  onChange={(e) => {
                                                  setconfirmpassword(e.target.value);
                                              }}/>
                                              <label
                                                  style={{
                                                  color: "red",
                                                  margin: "0 0"
                                              }}>
                                                  {password === confirmpassword
                                                      ? ''
                                                      : "Passwords don't match 😡"}
                                              </label>
                                          </div>
                                      </FormGroup>
                                  </Col>
                              </Row>

                          </CardBody>
                      </Card>
                  </Col>
                  <Col md="4">
                      <Card className="card-user">
                          <CardBody>
                              <CardText/>
                              <div className="author">
                                  <div className="block block-one"/>
                                  <div className="block block-two"/>
                                  <div className="block block-three"/>
                                  <div className="block block-four"/>

                                  <div
                                      className="upload-butn-wrapper"
                                      style={{
                                      cursor: "pointer"
                                  }}>
                                      <AvatarEditor
                                          image={src
                                          ? src
                                          : require("assets/img/default-avatar.png")}
                                          border={20}
                                          color={[255, 255, 255, 0.6]}
                                          scale={parseInt(scale)}
                                          rotate={0}
                                          width={150}
                                          height={150}
                                          borderRadius={75}
                                          ref={editor}
                                          onPositionChange={() => updateimage()}
                                          onImageReady={() => updateimage()}
                                          className="avatar"/>

                                      <input
                                          accept="image/jpeg"
                                          type="file"
                                          onChange={(e) => upload_profile_image(e)}/>
                                      <br/>
                                      <label>
                                          {src
                                              ? <FormGroup>
                                                      <label htmlFor="zoom">Zoom in or Out</label>
                                                      <CustomInput
                                                          min={1}
                                                          max={5}
                                                          step={0.2}
                                                          value={scale}
                                                          onChange={(e) => {
                                                          setscale(e.target.value);
                                                          updateimage()
                                                      }}
                                                          type="range"
                                                          id="zoom"
                                                          name="customRange"/>
                                                  </FormGroup>
                                              : ""}
                                          {src
                                              ? <span>
                                                      <strong>{profile_image.name}</strong><br/>
                                                      Click picture center to change, drag from bottom to adjust</span>
                                              : <span>Click center above to Upload Profile Picture</span>
}

                                      </label>
                                  </div>
                                  <h5 className="title">{firstName + " "} {middleName === ""
                                          ? ""
                                          : middleName.charAt(0) + ". "}
                                      {lastName}</h5>
                                  <p className="description">{email}</p>
                                  <p className="description">{telephone === ""
                                          ? ""
                                          : "+" + telephone}</p>
                                  <p className="description">{dateOfBirth === ""
                                          ? ""
                                          : notify.date(dateOfBirth)}</p>
                                  <Button disabled={loading} className="btn-fill" color="primary" type="submit">
                                      Submit
                                  </Button>
                              </div>
                          </CardBody>

                      </Card>
                  </Col>

              </Row>
          </Form>



          </div>
            </div>
        </div>
    </div>
    );
}

export default Register;
