import React,{useState, useEffect} from "react";

// import classNames from "classnames";

// reactstrap components
import {
    Button,
    ButtonGroup,
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Row,
    Col,
    Jumbotron, Container
  } from "reactstrap";


import { Line, Bar } from "react-chartjs-2";
import classNames from "classnames";
import notify from "../../../services/notify.js"
// import className from "classnames";
import UserService from "../../../services/user.service"; 
var home; 
const orderhome=()=>{
  UserService
          .gethomeinfo()
          .then(response => {
              home = response.data;
          });
}
orderhome();

const Home = ({user}) => {

  const [HomeInfo,setHomeInfo] = useState(home);

     const [bigChartData, setbigChartData] = useState(HomeInfo.theoryTests[1].length>1?'theory':'objective')

     const setBgChartData = name => {
          setbigChartData(name)
      };
    const user_roles = user.roles;
    const user_roles_arr = user_roles.reduce((acc, nxt) => {
      acc.push(nxt.role);
      return acc;
  }, []);
    const roles = user_roles_arr.filter((a, b) => user_roles_arr.indexOf(a) === b);
    const role_level = roles.length;
    var role;
    switch (role_level){
      case 1:
        role = 'student';
        break;
      case 2:
        role = 'educator';
        break;
      case 3:
        role = "dephead";
        break;
      case 4:
        role = "orgadmin";
        break;
      default:
        role = 'student';
    }
    var cards = [
      {
        header:"Classrooms Joined",
        icon:"icon-group",
        value:HomeInfo.classroomsJoined[0],
        content:"Classrooms Joined",
        color:"text-info",
        show:()=>{
          return true;
        }
      },
      {
        header:"Theory Tests Taken",
        icon:"icon-group",
        value:HomeInfo.theoryTests[0],
        content:"Theory Tests Taken",
        color:"text-primary",
        show:()=>{
          return true;
        }
      },
      {
        header:"Objective Tests Taken",
        icon:"icon-group",
        value:HomeInfo.objectiveTests[0],
        content:"Objective Tests Taken",
        color:"text-warning",
        show:()=>{
          return true;
        }
      },
      {
        header:"Classroom Students",
        icon:"icon-group",
        value:HomeInfo.classroomStudents,
        content:"Classroom Students",
        color:"text-info",
        show:()=>{
          return role_level===2
        }
      },
      {
        header:"Classrooms Created",
        icon:"icon-group",
        value:HomeInfo.classroomsCreated[0],
        content:"Classrooms Created",
        color:"text-warning",
        show:()=>{
          return role_level>1
        }
      },
      {
        header:"Classroom Tests",
        icon:"icon-group",
        value:HomeInfo.classroomTests,
        content:"Classroom Tests",
        color:"text-danger",
        show:()=>{
          return role_level>1
        }
      },
      {
        header:"Environs Created",
        icon:"icon-group",
        value:HomeInfo.environs[0],
        content:"Environs Created",
        color:"text-danger",
        show:()=>{
          return role_level>2
        }
      },
      {
        header:"Environ Educators",
        icon:"icon-group",
        value:HomeInfo.environEducators,
        content:"Environ Educators",
        color:"text-primary",
        show:()=>{
          return role_level===3
        }
      },
      {
        header:"Environ Students",
        icon:"icon-group",
        value:HomeInfo.environStudents,
        content:"Environ Students",
        color:"text-info",
        show:()=>{
          return role_level===3
        }
      },
      {
        header:"Organizations",
        icon:"icon-group",
        value:HomeInfo.organizations[0],
        content:"Organizations",
        color:"text-warning",
        show:()=>{
          return role_level>3
        }
      },
      {
        header:"Organization Students",
        icon:"icon-group",
        value:HomeInfo.organizationStudents,
        content:"Organization Students",
        color:"text-info",
        show:()=>{
          return role_level===4
        }
      },
      {
        header:"Organization Educators",
        icon:"icon-group",
        value:HomeInfo.organizationEducators,
        content:"Organization Educators",
        color:"text-warning",
        show:()=>{
          return role_level===4
        }
      },
    ]
    return (
        <>
        <div className="content">
          <Row>
          {cards.filter(card=>{return card.show()&&card.value>0}).length<2
            ?<Col xs="12">
            <Jumbotron>
            <h1 className="display-3">Welcome!</h1>
            <p className="lead">If you are seeing this, then you are just starting with at-School.</p>
            <hr className="my-2" />
            <p>As you progress, all your activities will be summarised here, so you can always have a quick look at your stats<span aria-label="welcome smile" role="img">😁</span></p>
          </Jumbotron>
            </Col>:''}
          

            {HomeInfo.objectiveTests[1].length>1||HomeInfo.theoryTests[1].length>1
              ?<Col xs="12">
              <Card className="card-chart">
                <CardHeader>


                <Row>
                    <Col className="text-left" sm="6">
                      <h5 className="card-category">Tests</h5>
                      <CardTitle tag="h2">Performance</CardTitle>
                    </Col>
                    <Col sm="6">
                      <ButtonGroup
                        className="btn-group-toggle float-right"
                        data-toggle="buttons"
                      >
                      {HomeInfo.theoryTests[1].length>1
                        ?<Button
                          tag="label"
                          className={classNames("btn-simple", {
                            active: bigChartData === "theory"
                          })}
                          color="info"
                          id="0"
                          size="sm"
                          onClick={() => setBgChartData("theory")}
                        >
                          <input
                            defaultChecked
                            className="d-none"
                            name="options"
                            type="radio"
                          />
                          <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                            Theory
                          </span>
                          <span className="d-block d-sm-none">
                            <i className="icon-sticky-note-o" />
                          </span>
                        </Button>:''}
                        {HomeInfo.objectiveTests[1].length>1
                        ?<Button
                          color="info"
                          id="1"
                          size="sm"
                          tag="label"
                          className={classNames("btn-simple", {
                            active: bigChartData === "objective"
                          })}
                          onClick={() => setBgChartData("objective")}
                        >
                          <input
                            className="d-none"
                            name="options"
                            type="radio"
                          />
                          <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                            Objective
                          </span>
                          <span className="d-block d-sm-none">
                            <i className="icon-th-list" />
                          </span>
                        </Button>:''}
                      </ButtonGroup>
                    </Col>
                  </Row>
                          

                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <Line
                      data={notify.chart(bigChartData,HomeInfo.theoryTests[1],HomeInfo.objectiveTests[1])}
                      options={notify.chartoptions()}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>:''}
          </Row>
          <Row>

            {cards.filter(card=>{return card.show()&&card.value>0}).map((card=>{
              return (
                <Col lg="4">
                <Card className="card-chart">
                  <CardHeader>
                    <h5 className="card-category">{card.header}</h5>
                    <CardTitle tag="h3">
                      <i className={`${card.icon} ${card.color}`} />{" "}
                      {card.value}
                    </CardTitle>
                    <h5 className={`card-category ${card.color}`}>{card.content}</h5>
                    </CardHeader>
                    <CardBody></CardBody>
                </Card>
              </Col>
              );
            }))}


          </Row>


        </div>
      </>
    );

}

export default Home;