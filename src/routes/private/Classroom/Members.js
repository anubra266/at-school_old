import React, { useState, useEffect, useRef } from "react";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Button,
  Table,
  Modal,
  ModalBody,
  CardText,
  Input,
  FormGroup,
  ButtonGroup,
  CustomInput,
  Label,
} from "reactstrap";
import { PDFExport } from "@progress/kendo-react-pdf";
import Workbook from "react-excel-workbook";
import UserService from "../../../services/user.service";
import notify from "../../../services/notify.js";
import className from "classnames";

const Members = ({ user, slug, educator }) => {
  const [members, setmembers] = useState(null);
  const [nomembers, setnomembers] = useState(null);
  const [name, setname] = useState(true);
  const [gender, setgender] = useState(true);
  const [email, setemail] = useState(false);
  const [school, setschool] = useState(false);
  const [school_town, setschool_town] = useState(false);
  const [telephone, settelephone] = useState(false);
  const [dateofbirth, setdateofbirth] = useState(false);
  const [classroom, setclassroom] = useState(null);
  const updatemembers = () => {
    UserService.getmembers(slug).then((response) => {
      if (response.data.length < 1) {
        setnomembers(true);
      } else {
        setmembers(response.data);
        setnomembers(false);
      }
    });
  };
  const checkclassroom = () => {
    UserService.checkclassroom(slug).then((response) => {
      setclassroom(response.data);
    });
  };
  useEffect(() => {
    checkclassroom();
    updatemembers();
  }, []);
  window.Echo.channel("at_school_database_classes").listen(
    "UpdateMembers",
    (e) => {
      updatemembers();
    }
  );
  const [showmember, setshowmember] = useState(false);
  const [view, setview] = useState(null);
  const [search, setsearch] = useState("");

  const toggle = () => setshowmember(!showmember);

  const searchmember = (member) => {
    return notify.searchresult(member, search);
  };
  const [showexport, setshowexport] = useState(false);
  const toggleexport = () => setshowexport(!showexport);

  const pdf = useRef();
  const exportpdf = () => {
    pdf.current.save();
  };

  const exceldata = (members) => {
    var data = [];
    for (var i = 0; i < members.length; i++) {
      var result = members[i];
      var obj = {};
      obj.name =
        result.firstName +
        " " +
        result.middleName.charAt(0) +
        ". " +
        result.lastName;
      obj.gender = result.gender;
      obj.email = result.email;
      obj.telephone = result.telephone;
      obj.dateofbirth = result.dateOfBirth;
      obj.school = result.school;
      obj.school_town = result.school_town;
      data.push(obj);
    }
    return data;
  };
  const excelfields = [
    { show: name, label: "Full Name", value: "name" },
    { show: email, label: "Email", value: "email" },
    { show: gender, label: "Gender", value: "gender" },
    { show: telephone, label: "Telephone", value: "telephone" },
    { show: dateofbirth, label: "Date Of Birth", value: "dateofbirth" },
    { show: school, label: "School", value: "school" },
    { show: school_town, label: "Town", value: "school_town" },
  ];
  return (
    <div className="content">
      <Row>
        <Col md="12">
          <Card>
            <CardHeader>
              <Row>
                <Col md="10">Members</Col>

                {members && educator && (
                  <Col md="2">
                    <ButtonGroup
                      className="btn-group-toggle float-right"
                      data-toggle="buttons"
                    >
                      <Button
                        tag="label"
                        color="info"
                        size="sm"
                        onClick={() => toggleexport()}
                      >
                        Export Members
                      </Button>
                    </ButtonGroup>
                    <Modal
                      isOpen={showexport}
                      toggle={toggleexport}
                      className={className + ""}
                    >
                      <ModalBody>
                        <Row>
                          <Col md="12" style={{ textAlign: "center" }}>
                            <h3
                              style={{
                                color: "black",
                              }}
                            >
                              Choose Format
                            </h3>
                          </Col>
                        </Row>
                        <Row>
                          <Col
                            onClick={exportpdf}
                            md="6"
                            style={{ textAlign: "center", cursor: "pointer" }}
                          >
                            <i
                              style={{ fontSize: 50 }}
                              class="icon-file-pdf-o"
                            ></i>
                            <br />
                            <h3
                              style={{
                                color: "black",
                              }}
                            >
                              PDF
                            </h3>
                          </Col>
                          <Col
                            md="6"
                            style={{ textAlign: "center", cursor: "pointer" }}
                          >
                            <Workbook
                              filename={
                                classroom && classroom.name + "-members.xlsx"
                              }
                              element={
                                <span>
                                  <i
                                    style={{ fontSize: 50 }}
                                    class="icon-file-excel-o"
                                  ></i>
                                  <br />
                                  <h3
                                    style={{
                                      color: "black",
                                    }}
                                  >
                                    Excel
                                  </h3>
                                </span>
                              }
                            >
                              <Workbook.Sheet
                                data={exceldata(members)}
                                name={classroom && classroom.name + "-members"}
                              >
                                {excelfields
                                  .filter((field) => field.show)
                                  .map((field, key) => {
                                    return (
                                      <Workbook.Column
                                        key={key + "excel"}
                                        label={field.label}
                                        value={field.value}
                                      />
                                    );
                                  })}
                              </Workbook.Sheet>
                            </Workbook>
                          </Col>
                        </Row>
                      </ModalBody>
                    </Modal>
                  </Col>
                )}
              </Row>
            </CardHeader>
            <CardBody className="all-icons">
              <Row>
                <Col md="12">
                  <FormGroup>
                    <Input
                      style={{
                        color: "black",
                      }}
                      value={search}
                      onChange={(e) => setsearch(e.target.value)}
                      type="text"
                      placeholder={`Search Members by Name'${
                        educator ? ", Email, Gender, Tel, Birthday, etc." : ""
                      }`}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="12">
                  {members ? (
                    <span>
                      {members.filter((member) => searchmember(member)).length >
                      0 ? (
                        <React.Fragment>
                          {educator && (
                            <FormGroup>
                              <Label>Filter Table</Label>
                              <div>
                                <CustomInput
                                  id="name"
                                  type="checkbox"
                                  checked={name}
                                  onChange={(e) => setname(!name)}
                                  label="Name"
                                  inline
                                />
                                <CustomInput
                                  id="email"
                                  type="checkbox"
                                  checked={email}
                                  onChange={(e) => setemail(!email)}
                                  label="Email"
                                  inline
                                />
                                <CustomInput
                                  id="gender"
                                  type="checkbox"
                                  checked={gender}
                                  onChange={(e) => setgender(!gender)}
                                  label="Gender"
                                  inline
                                />
                                <CustomInput
                                  id="telephone"
                                  type="checkbox"
                                  checked={telephone}
                                  onChange={(e) => settelephone(!telephone)}
                                  label="Telephone"
                                  inline
                                />
                                <CustomInput
                                  id="dateofbirth"
                                  type="checkbox"
                                  checked={dateofbirth}
                                  onChange={(e) => setdateofbirth(!dateofbirth)}
                                  label="Date of Birth"
                                  inline
                                />
                                <CustomInput
                                  id="school"
                                  type="checkbox"
                                  checked={school}
                                  onChange={(e) => setschool(!school)}
                                  label="School"
                                  inline
                                />
                                <CustomInput
                                  id="school_town"
                                  type="checkbox"
                                  checked={school_town}
                                  onChange={(e) => setschool_town(!school_town)}
                                  label="Town"
                                  inline
                                />
                              </div>
                            </FormGroup>
                          )}
                          <PDFExport
                            paperSize={"Letter"}
                            fileName={
                              classroom && classroom.name + "-members.pdf"
                            }
                            title={"Members  "}
                            subject=""
                            keywords=""
                            ref={pdf}
                          >
                            <div
                              style={{
                                padding: "20px 40px",
                                overflowX: "hidden",
                                overflowY: "hidden",
                                fontSize: "1em",
                              }}
                            >
                              <Table hover>
                                <thead>
                                  <tr>
                                    <th>#</th>
                                    {name ? <th>Name</th> : ""}
                                    {email ? <th>Email</th> : ""}
                                    {gender ? <th>Gender</th> : ""}
                                    {telephone ? <th>Telephone</th> : ""}
                                    {dateofbirth ? <th>Date Of Birth</th> : ""}
                                    {school ? <th>School</th> : ""}
                                    {school_town ? <th>Town</th> : ""}
                                  </tr>
                                </thead>
                                <tbody>
                                  {members
                                    .filter((member) => searchmember(member))
                                    .map((member, key) => {
                                      return (
                                        <tr
                                          key={member.id}
                                          class={
                                            user.id === member.id
                                              ? "theuser"
                                              : ""
                                          }
                                          onClick={() => {
                                            toggle();
                                            setview(member);
                                          }}
                                        >
                                          <th scope="row">{key + 1}</th>
                                          {name ? (
                                            <td>
                                              {member.firstName +
                                                " " +
                                                member.middleName.charAt(0) +
                                                ". " +
                                                member.lastName}
                                            </td>
                                          ) : (
                                            ""
                                          )}
                                          {email ? <td>{member.email}</td> : ""}
                                          {gender ? (
                                            <td>
                                              {member.gender
                                                .charAt(0)
                                                .toUpperCase() +
                                                member.gender.slice(1)}
                                            </td>
                                          ) : (
                                            ""
                                          )}
                                          {telephone ? (
                                            <td>+{member.telephone}</td>
                                          ) : (
                                            ""
                                          )}
                                          {dateofbirth ? (
                                            <td>{member.dateOfBirth}</td>
                                          ) : (
                                            ""
                                          )}
                                          {school ? (
                                            <td>{member.school}</td>
                                          ) : (
                                            ""
                                          )}
                                          {school_town ? (
                                            <td>{member.school_town}</td>
                                          ) : (
                                            ""
                                          )}
                                        </tr>
                                      );
                                    })}
                                </tbody>
                                <Modal
                                  isOpen={showmember && educator}
                                  toggle={toggle}
                                  className={className + ""}
                                >
                                  <ModalBody>
                                    <Row>
                                      <Col md="4">
                                        <h3
                                          style={{
                                            color: "black",
                                          }}
                                        >
                                          User Details
                                        </h3>
                                      </Col>
                                      <Col md="8">
                                        <span
                                          className="btn-group-toggle float-right"
                                          data-toggle="buttons"
                                        >
                                          <Button
                                            tag="button"
                                            color="warning"
                                            disabled
                                            size="sm"
                                          >
                                            Block Member
                                          </Button>
                                        </span>
                                      </Col>
                                    </Row>

                                    <Row>
                                      <Col md="12">
                                        {view ? (
                                          <div className="card-user">
                                            <CardText />
                                            <div className="author">
                                              <div
                                                className="upload-butn-wrapper"
                                                style={{
                                                  cursor: "pointer",
                                                }}
                                              >
                                                <img
                                                  alt={
                                                    view.firstName +
                                                    "-" +
                                                    view.lastName +
                                                    "'s profile picture"
                                                  }
                                                  src={
                                                    /*notify.APP_URL() + 'storage/images/' + view.profile_image ||*/
                                                    require("assets/img/default-avatar.png")
                                                  }
                                                  height="150"
                                                />
                                                <br />
                                              </div>
                                              <p className="description">
                                                {view.firstName + " "}{" "}
                                                {view.middleName + " "}
                                                {view.lastName}
                                              </p>

                                              <p className="description">
                                                {view.email}
                                              </p>
                                              <p className="description">
                                                {view.gender}
                                              </p>
                                              <p className="description">
                                                {"+" + view.telephone}
                                              </p>
                                              <p className="description">
                                                {new Date(
                                                  view.dateOfBirth
                                                ).toLocaleDateString()}
                                              </p>
                                            </div>
                                          </div>
                                        ) : (
                                          ""
                                        )}
                                      </Col>
                                    </Row>
                                  </ModalBody>
                                </Modal>
                              </Table>
                            </div>
                          </PDFExport>
                        </React.Fragment>
                      ) : (
                        <div>
                          <span className="text-info">No results! </span>
                          Try something else.
                        </div>
                      )}
                    </span>
                  ) : (
                    <div>
                      <span className="text-info">
                        {nomembers ? "" : "wait..."}
                      </span>
                    </div>
                  )}

                  {nomembers ? (
                    <div>
                      <span className="text-info">No Members Found! </span>
                      Invite students to see them here.
                    </div>
                  ) : (
                    ""
                  )}
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Members;
