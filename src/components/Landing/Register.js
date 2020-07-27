import React, {useState, useRef} from "react";
import {Link} from "react-router-dom";
import notify from "../../services/notify";
import AuthService from "../../services/auth.service";
import AvatarEditor from 'react-avatar-editor'
import ReactPhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/bootstrap.css';
import PasswordInput from "../PasswordStrength/Password-Input";
import {
    Row,
    Col,
    FormGroup,
    CustomInput,
    Card,
    CardBody,
    CardText,
    Input
} from "reactstrap";

const Register = ({
    location,
    history
}, props) => {
    const [page,
        setpage] = useState(1);
    const validateEmail = (testemail) => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(testemail)) {
            return (true)
        }
        return (false)
    }
    const move = (topage) => {
        if (page > topage) {
            setpage(topage)
        } else {
            switch (topage) {
                case 2:
                    if (firstName.trim() !== "" && middleName.trim() !== "" && lastName.trim() !== "") {
                        setpage(topage)
                    } else {
                        notify.user('Register', 'All fields are required', 'warning')

                    };
                    break;
                case 3:
                    if (!validateEmail(email)) {
                        notify.user('Register', 'Input Valid Email', 'warning')

                    } else if (email.trim() !== "" && telephone.trim() !== "" && dateOfBirth !== "") {
                        setpage(topage)
                    }else{
                        notify.user('Register', 'All fields are required', 'warning')
                    }
                    break;
                case 4:
                    if(password===confirmpassword&&password.length>=6){
                        setpage(topage);
                    }else{
                        notify.user('Register', 'Input Matching Passwords (at least 6 characters)', 'warning')
                    }
                    break;
                default:
                    break;
            }
        }
    }

    const [firstName,
        setfirstName] = useState('');
    const [middleName,
        setmiddleName] = useState('');
    const [lastName,
        setlastName] = useState('');
    const [gender,
        setgender] = useState('male');

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
    const passwordchange = (e) => {
        setpassword(e.target.value);
    }
    const handleRegister = (e) => {
        e.preventDefault();
        setloading(true)
        if (image_name === "default-avatar.png") {
            notify.user('Registration', 'Upload another Image!', 'danger')
            setloading(false)
        } else {
            AuthService
                .register(firstName, middleName, lastName, gender, email, telephone, dateOfBirth, password, profile_image)
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
        <div className="limiter">
          <div className="container-login100">
            <header
              className="site-navbar py-4 js-sticky-header site-navbar-target"
              role="banner"
            >
              <div className="container-fluid">
                <div className="d-flex align-items-center">
                  <div className="site-logo mr-auto w-30">
                    <a href="/">at-School</a>
                  </div>
                </div>
              </div>
            </header>
            <div className="row ceent">
              <div className="col-lg-4 col-md-6 col-sm-4">
                <div className="wrap-login100 p-t-50 p-b-90">
                  <form
                    onSubmit={handleRegister}
                    className="login100-form validate-form flex-sb flex-w"
                  >
                    <span className="login100-form-title p-b-51">Register</span>

                    {page === 1 ? (
                      <span>
                        <div className="wrap-input100  m-b-16">
                          <Input
                            className="input100"
                            required
                            type="text"
                            name="firstName"
                            value={firstName}
                            onChange={(e) => {
                              setfirstName(e.target.value);
                            }}
                            placeholder="First Name"
                          />
                          <span className="focus-input100"></span>
                        </div>
                        <div className="wrap-input100  m-b-16">
                          <Input
                            className="input100"
                            required
                            type="text"
                            name="middleName"
                            value={middleName}
                            onChange={(e) => {
                              setmiddleName(e.target.value);
                            }}
                            placeholder="Middle Name"
                          />
                          <span className="focus-input100"></span>
                        </div>
                        <div className="wrap-input100  m-b-16">
                          <Input
                            className="input100"
                            required
                            type="text"
                            name="lastName"
                            value={lastName}
                            onChange={(e) => {
                              setlastName(e.target.value);
                            }}
                            placeholder="Last Name"
                          />
                          <span className="focus-input100"></span>
                        </div>
                        <Row>
                          <Col>
                            <label className="radiocontainer">
                              Male
                              <Input
                                onChange={(e) => {
                                  setgender(e.target.value);
                                }}
                                value="male"
                                type="radio"
                                checked={gender === "male"}
                                name="gender"
                              />
                              <span className="checkmark"></span>
                            </label>
                          </Col>
                          <Col>
                            <label className="radiocontainer">
                              Female
                              <Input
                                onChange={(e) => {
                                  setgender(e.target.value);
                                }}
                                value="female"
                                type="radio"
                                checked={gender === "female"}
                                name="gender"
                              />
                              <span className="checkmark"></span>
                            </label>
                          </Col>
                        </Row>
                      </span>
                    ) : (
                      ""
                    )}

                    {page === 2 ? (
                      <span>
                        <div className="wrap-input100  m-b-16">
                          <Input
                            className="input100"
                            required
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => {
                              setemail(e.target.value);
                            }}
                            placeholder="Email"
                          />
                          <span className="focus-input100"></span>
                        </div>
                        <div className="wrap-input100  m-b-16">
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
                          <span className="focus-input100"></span>
                        </div>
                        <div className="wrap-input100  m-b-16">
                          <Input
                            className="input100"
                            required
                            type="date"
                            name="dateOfBirth"
                            value={dateOfBirth}
                            onChange={(e) => {
                              setdateOfBirth(e.target.value);
                            }}
                            placeholder="Date Of Birth"
                          />
                          <span className="focus-input100"></span>
                        </div>
                        <label>Date of Birth</label>
                      </span>
                    ) : (
                      ""
                    )}

                    {page === 3 ? (
                      <span>
                        <label>Must be more than 6 Characters*</label>
                        <PasswordInput
                          value={password}
                          placeholder="Password"
                          handleChanges={passwordchange}
                        />

                        <div className="wrap-input100  m-b-1">
                          <Input
                            className="input100"
                            required
                            type="password"
                            name="confirmpassword"
                            value={confirmpassword}
                            onChange={(e) => {
                              setconfirmpassword(e.target.value);
                            }}
                            placeholder="Confirm Password"
                          />
                          <span className="focus-input100"></span>
                        </div>
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
                      </span>
                    ) : (
                      ""
                    )}

                    {page === 4 ? (
                      <Card className="card-user">
                        <CardBody>
                          <CardText />
                          <div className="author">
                            <div
                              className="upload-butn-wrapper"
                              style={{
                                cursor: "pointer",
                              }}
                            >
                              <AvatarEditor
                                image={
                                  src
                                    ? src
                                    : require("assets/img/default-avatar.png")
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
                                onImageReady={() => updateimage()}
                                className="avatar"
                              />

                              <Input
                                accept="image/jpeg"
                                type="file"
                                onChange={(e) => upload_profile_image(e)}
                              />
                              <br />
                              <label>
                                {src ? (
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
                                {src ? (
                                  <span>
                                    <strong>{profile_image.name}</strong>
                                    <br />
                                    Click picture center to change, drag from
                                    bottom to adjust
                                  </span>
                                ) : (
                                  <span>
                                    Click center above to Upload Profile Picture
                                  </span>
                                )}
                              </label>
                            </div>
                          </div>
                        </CardBody>
                      </Card>
                    ) : (
                      ""
                    )}

                    <Row>
                      <Col>
                        <div className="container-login100-form-btn m-t-1">
                          <span
                            onClick={(e) => {
                              page > 1 && move(page - 1);
                            }}
                            disabled={page < 2}
                            className="login100-form-btn"
                          >
                            Prev
                          </span>
                        </div>
                      </Col>
                      <Col>
                        {page > 3 ? (
                          <div className="container-login100-form-btn m-t-1">
                            <button
                              disabled={loading}
                              className="login100-form-btn"
                            >
                              {loading ? "Wait..." : "Finish"}
                            </button>
                          </div>
                        ) : (
                          <div className="container-login100-form-btn m-t-1">
                            <span
                              onClick={(e) => {
                                page < 4 && move(page + 1);
                              }}
                              disabled={page > 3}
                              className="login100-form-btn"
                            >
                              Next
                            </span>
                          </div>
                        )}
                      </Col>
                    </Row>
                    {page < 2 ? (
                      <div className="flex-sb-m w-full p-t-3 p-b-24">
                        <Link to="/login" className="txt1">
                          You have an account? Login
                        </Link>
                      </div>
                    ) : (
                      ""
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Register;
