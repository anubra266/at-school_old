import React, {useState, useEffect} from "react";
import {withRouter} from "react-router-dom";
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
    Pagination, PaginationItem, PaginationLink
} from "reactstrap";
import notify from "../../../services/notify.js"
import UserService from "../../../services/user.service";

const EducatorResults = ({slug, history}) => {
    const [activeTab,
        setActiveTab] = useState('1');

    const toggletype = tab => {
        if (activeTab !== tab) 
            setActiveTab(tab);
        }
    
    const [theoryTests,
        settheoryTests] = useState(null);
    const pageSize = 3;
    const [TheoryPagesCount,
        setTheoryPagesCount] = useState(0);
    const [currentTheoryPage,
        setcurrentTheoryPage] = useState(0);

    const [notheory,
        setnotheory] = useState(null);

    const updatetheorytests = () => {
        UserService
            .getalltheorytests(slug)
            .then(response => {
                if (response.data.length < 1) {
                    setnotheory(true);
                    settheoryTests([]);
                } else {
                    settheoryTests(response.data);
                    setnotheory(false);
                }
                setTheoryPagesCount(Math.ceil(response.data.length / pageSize))
            });
    }

    const [objectiveTests,
        setobjectiveTests] = useState(null);
    const [ObjectivePagesCount,
        setObjectivePagesCount] = useState(0);
    const [currentObjectivePage,
        setcurrentObjectivePage] = useState(0);

    const [noobjective,
        setnoobjective] = useState(null);
        const updateobjectivetests = () => {
            UserService
                .getallobjectivetests(slug)
                .then(response => {
                    if (response.data.length < 1) {
                        setnoobjective(true);
                        setobjectiveTests([]);
                    } else {
                        setobjectiveTests(response.data);
                        setnoobjective(false);
                    }
                    setObjectivePagesCount(Math.ceil(response.data.length / pageSize))
                });
        }
    useEffect(() => {
        updatetheorytests();
        updateobjectivetests();
    }, []); 

    const handleTheoryClick = (e,index)=>{
        e.preventDefault();
        setcurrentTheoryPage(index);
    }

    const handleObjectiveClick = (e,index)=>{
        e.preventDefault();
        setcurrentObjectivePage(index);
    }


    const viewclasstheoryresult = (id) => {
        history.push("/in/classroom/" + slug + "/viewtresult/" + id);
    } 

    const viewclassobjectiveresult = (id) => {
        history.push("/in/classroom/" + slug + "/vieworesult/" + id);
    } 

    return (
        <div>

            <CardBody className="all-icons">

                <Nav tabs>
                    <NavItem>
                        <NavLink
                            style={{
                            cursor: "pointer"
                        }}
                            className={activeTab === '1'
                            ? "testtab_active"
                            : ''}
                            onClick={() => {
                            toggletype('1');
                        }}>
                            Theory
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            style={{
                            cursor: "pointer"
                        }}
                            className={activeTab === '2'
                            ? "testtab_active"
                            : ''}
                            onClick={() => {
                            toggletype('2');
                        }}>
                            Objective
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={activeTab}>
                    <TabPane tabId="1">
                    <Row>
                    {theoryTests
                        ? theoryTests.slice(
                            currentTheoryPage * pageSize,
                            (currentTheoryPage + 1) * pageSize
                          ).map((test) => {
                            return (
                                <Col md="4">
                                    <Card body>
                                        <CardTitle>
                                            <strong>{test.title}</strong>
                                        </CardTitle>
                                        <CardTitle>
                                            <strong>Created:{" "}</strong>
                                            {notify.date(test.created_at)}</CardTitle>
                                        <CardTitle>
                                            <strong>Deadline:{" "}</strong>
                                            {notify.date(test.deadline)}</CardTitle>
                                        <Button
                                            tag="label"
                                            color="info"
                                            onClick={() => viewclasstheoryresult(test.id)}
                                            size="sm">View</Button>
                                    </Card>
                                </Col>
                            )
                        })
                        :  <Col md="12"><div><span className="text-info">Wait...</span></div> </Col>}
                        {notheory
                            ? <Col md="12"><div>
                                    <span className="text-info">No Theory Tests!{" "}</span>
                                    Create one and Check again.</div> </Col>
                            : ''}
                </Row>
                
                <div className="pagination-wrapper">

                <Pagination aria-label="Page navigation example">

                    <PaginationItem disabled={currentTheoryPage <= 0}>

                        <PaginationLink
                            onClick={e => handleTheoryClick(e, currentTheoryPage - 1)}
                            previous
                            href="#"/>

                    </PaginationItem>

                    {[...Array(TheoryPagesCount)].map((page, i) => <PaginationItem active={i === currentTheoryPage} key={i} className="pag">
                        <PaginationLink onClick={e => handleTheoryClick(e, i)} href="#">
                            {i + 1}
                        </PaginationLink>
                    </PaginationItem>)}

                    <PaginationItem disabled={currentTheoryPage >= TheoryPagesCount - 1}>

                        <PaginationLink
                            onClick={e => handleTheoryClick(e, currentTheoryPage + 1)}
                            next
                            href="#"/>

                    </PaginationItem>

                </Pagination>

            </div>
                    </TabPane>



                    <TabPane tabId="2">
                       <Row>
                    {objectiveTests
                        ? objectiveTests.slice(
                            currentObjectivePage * pageSize,
                            (currentObjectivePage + 1) * pageSize
                          ).map((test) => {
                            return (
                                <Col md="4">
                                    <Card body>
                                        <CardTitle>
                                            <strong>{test.title}</strong>
                                        </CardTitle>
                                        <CardTitle>
                                            <strong>Created:{" "}</strong>
                                            {notify.date(test.created_at)}</CardTitle>
                                        <CardTitle>
                                            <strong>Deadline:{" "}</strong>
                                            {notify.date(test.deadline)}</CardTitle>
                                        <Button
                                            tag="label"
                                            color="info"
                                            onClick={() => viewclassobjectiveresult(test.id)}
                                            size="sm">View</Button>
                                    </Card>
                                </Col>
                            )
                        })
                        :  <Col md="12"><div><span className="text-info">Wait...</span></div> </Col>}
                        {noobjective
                            ? <Col md="12"><div>
                                    <span className="text-info">No Objective Tests!{" "}</span>
                                    Create one and check again.</div> </Col>
                            : ''}
                </Row>
                <div className="pagination-wrapper">

                <Pagination aria-label="Page navigation example">

                    <PaginationItem disabled={currentObjectivePage <= 0}>

                        <PaginationLink
                            onClick={e => handleObjectiveClick(e, currentObjectivePage - 1)}
                            previous
                            href="#"/>

                    </PaginationItem>

                    {[...Array(ObjectivePagesCount)].map((page, i) => <PaginationItem active={i === currentObjectivePage} key={i} className="pag">
                        <PaginationLink onClick={e => handleObjectiveClick(e, i)} href="#">
                            {i + 1}
                        </PaginationLink>
                    </PaginationItem>)}

                    <PaginationItem disabled={currentObjectivePage >= ObjectivePagesCount - 1}>

                        <PaginationLink
                            onClick={e => handleObjectiveClick(e, currentObjectivePage + 1)}
                            next
                            href="#"/>

                    </PaginationItem>

                </Pagination>

            </div>
                    </TabPane>
                </TabContent>

            </CardBody>
        </div>
    );
}
export default withRouter(EducatorResults);