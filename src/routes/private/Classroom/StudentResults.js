import React, {useState, useEffect} from "react";

// reactstrap components
import {
    CardBody,
    Col,
    TabContent,
    TabPane,
    Nav,
    NavItem,
    NavLink,
    Pagination, PaginationItem, PaginationLink,
    Table
} from "reactstrap";
import notify from "../../../services/notify.js"
// import className from "classnames";
import UserService from "../../../services/user.service";

const StudentResults = ({slug}) => {
    const [activeTab,
        setActiveTab] = useState('1');

    const toggletype = tab => {
        if (activeTab !== tab) 
            setActiveTab(tab);
        }
    
    
    const pageSize = 5
    const [TheorypagesCount,
        setTheorypagesCount] = useState(0);
    const [ObjectivepagesCount,
        setObjectivepagesCount] = useState(0);
    const [currentTheoryPage,
        setcurrentTheoryPage] = useState(0);
    const [currentObjectivePage,
        setcurrentObjectivePage] = useState(0);

    const [theoryTests,
        settheoryTests] = useState(null);
    const [notheory,
        setnotheory] = useState(null);

    const [objectiveTests,
        setobjectiveTests] = useState(null);
    const [noobjective,
        setnoobjective] = useState(null);


    const updatetheorytests = () => {
        UserService
            .getalltheorytestsresults(slug)
            .then(response => {
                if (response.data.length < 1) {
                    setnotheory(true);
                    settheoryTests([]);
                } else {
                    settheoryTests(response.data);
                    setnotheory(false);
                }
                setTheorypagesCount(Math.ceil(response.data.length / pageSize))
            });
    }
    const updateobjectivetests = () => {
        UserService
            .getallobjectivetestsresults(slug)
            .then(response => {
                if (response.data.length < 1) {
                    setnoobjective(true);
                    setobjectiveTests([]);
                } else {
                    setobjectiveTests(response.data);
                    setnoobjective(false);
                }
                setObjectivepagesCount(Math.ceil(response.data.length / pageSize))
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
                    
                    {theoryTests
                        ? <span>
                        {!notheory
                            ?<Table hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Test</th>
                                <th>Submitted</th>
                                <th>Marked</th>
                                <th>Score(Percentage)</th>
                            </tr>
                        </thead>
                        <tbody>
                        
                        {theoryTests.slice(
                            currentTheoryPage * pageSize,
                            (currentTheoryPage + 1) * pageSize
                          ).map((test,key) => {
                            return (
                               
                                <tr key={key}> 
                                <td>{key+1}</td>
                                <td>{test.title}</td>
                                <td>{notify.date(test.submitted.created_at)}</td>
                                <td>{notify.date(test.theoryresult.updated_at)}</td>
                                <td>{test.theoryresult.score+"/"+test.total+" "}({Math.round(100*((test.theoryresult.score)/(test.theoryresult.total)))})%</td>
                                </tr>
                            )
                        })}
                        </tbody>
                        </Table>:''}</span>
                        :  <Col md="12"><div><span className="text-info">Wait...</span></div> </Col>}
                        {notheory
                            ? <Col md="12"><div>
                                    <span className="text-info">No Theory Tests!{" "}</span>
                                    They'll be here when your submissions are marked.</div> </Col>
                            : ''}
                            

                <div className="pagination-wrapper">

        <Pagination aria-label="Page navigation example">

            <PaginationItem disabled={currentTheoryPage <= 0}>

                <PaginationLink
                    onClick={e => handleTheoryClick(e, currentTheoryPage - 1)}
                    previous
                    href="#"/>

            </PaginationItem>

            {[...Array(TheorypagesCount)].map((page, i) => <PaginationItem active={i === currentTheoryPage} key={i} className="pag">
                <PaginationLink onClick={e => handleTheoryClick(e, i)} href="#">
                    {i + 1}
                </PaginationLink>
            </PaginationItem>)}

            <PaginationItem disabled={currentTheoryPage >= TheorypagesCount - 1}>

                <PaginationLink onClick={e => handleTheoryClick(e, currentTheoryPage + 1)} next href="#"/>

            </PaginationItem>

        </Pagination>

    </div>
                    </TabPane>
                    <TabPane tabId="2">
                    {objectiveTests
                        ? <span>
                        {!noobjective
                            ?<Table hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Test</th>
                                <th>Taken</th>
                                <th>Score(Percentage)</th>
                            </tr>
                        </thead>
                        <tbody>
                        {objectiveTests.slice(
                            currentObjectivePage * pageSize,
                            (currentObjectivePage + 1) * pageSize
                          ).map((test,key) => {
                            return (
                               
                                <tr key={key}> 
                                <td>{key+1}</td>
                                <td>{test.title}</td>
                                <td>{notify.date(test.cbtresult.created_at)}</td>
                                <td>{test.cbtresult.score+"/"+test.cbtresult.total+" "}({Math.round(100*((test.cbtresult.score)/(test.cbtresult.total)))})%</td>
                                </tr>
                            )
                        })}
                        </tbody>
                        </Table>:''}</span>
                        :  <Col md="12"><div><span className="text-info">Wait...</span></div> </Col>}
                        {noobjective
                            ? <Col md="12"><div>
                                    <span className="text-info">No Taken Objective Tests!{" "}</span>
                                    Take one to see its result here.</div> </Col>
                            : ''}
                            

                <div className="pagination-wrapper">

        <Pagination aria-label="Page navigation example">

            <PaginationItem disabled={currentObjectivePage <= 0}>

                <PaginationLink
                    onClick={e => handleTheoryClick(e, currentObjectivePage - 1)}
                    previous
                    href="#"/>

            </PaginationItem>

            {[...Array(ObjectivepagesCount)].map((page, i) => <PaginationItem active={i === currentObjectivePage} key={i} className="pag">
                <PaginationLink onClick={e => handleObjectiveClick(e, i)} href="#">
                    {i + 1}
                </PaginationLink>
            </PaginationItem>)}

            <PaginationItem disabled={currentObjectivePage >= ObjectivepagesCount - 1}>

                <PaginationLink onClick={e => handleObjectiveClick(e, currentObjectivePage + 1)} next href="#"/>

            </PaginationItem>

        </Pagination>

    </div>
                    </TabPane>
                </TabContent>

            </CardBody>
        </div>
    );
}
export default StudentResults