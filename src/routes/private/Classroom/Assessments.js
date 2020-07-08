import React, {useState, useEffect} from "react";

// reactstrap components
import {
    Card,
    CardHeader,
    CardBody,
    Row,
    Col,
    Button,
    CardTitle,
    Pagination, PaginationItem, PaginationLink
} from "reactstrap";
import notify from "../../../services/notify.js"
import UserService from "../../../services/user.service";

const Assessments = ({history, educator, slug, match, location}) => {



    const [theoryTests,
        settheoryTests] = useState(null);
    const pageSize = 3;
    const [pagesCount,
            setpagesCount] = useState(0);
    const [currentPage,
            setcurrentPage] = useState(0);

    const [notheory,
        setnotheory] = useState(null);

        const updatetheorytests = ()=>{
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
                setpagesCount(Math.ceil(response.data.length / pageSize))
            });
        }
    useEffect(() => {
        updatetheorytests();
    }, []); 

    const handleClick = (e,index)=>{
        e.preventDefault();
        setcurrentPage(index);
    }

    window
    .Echo
    .channel('at_school_database_tests')
    .listen('UpdateTheoryTests', e => {
        updatetheorytests();
    })
    

    const testsubmissions = (id) => {
            history.push("/in/classroom/" + slug + "/submissions/" + id);
    } 
    return (
        <div className="content">
 
                    <Card>
                        <CardHeader>
                            <Row>
                                <Col md="10">
                                    Assessments 
                                </Col> 
                                 
                            </Row>
                        </CardHeader>
                        <CardBody className="all-icons"> 

                                    <Row>
                                        {theoryTests
                                            ? theoryTests.slice(
                                                currentPage * pageSize,
                                                (currentPage + 1) * pageSize
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
                                                                onClick={() => testsubmissions(test.id)}
                                                                size="sm">View</Button>
                                                        </Card>
                                                    </Col>
                                                )
                                            })
                                            :  <Col md="12"><div><span className="text-info">Wait...</span></div> </Col>}
                                            {notheory
                                                ? <Col md="12"><div>
                                                        <span className="text-info">No Pending Theory Tests!{" "}</span>
                                                        They'll be here when available.</div> </Col>
                                                : ''}
                                    </Row>
                                    <div className="pagination-wrapper">

                            <Pagination aria-label="Page navigation example">

                                <PaginationItem disabled={currentPage <= 0}>

                                    <PaginationLink
                                        onClick={e => handleClick(e, currentPage - 1)}
                                        previous
                                        href="#"/>

                                </PaginationItem>

                                {[...Array(pagesCount)].map((page, i) => <PaginationItem active={i === currentPage} key={i} className="pag">
                                    <PaginationLink onClick={e => handleClick(e, i)} href="#">
                                        {i + 1}
                                    </PaginationLink>
                                </PaginationItem>)}

                                <PaginationItem disabled={currentPage >= pagesCount - 1}>

                                    <PaginationLink onClick={e => handleClick(e, currentPage + 1)} next href="#"/>

                                </PaginationItem>

                            </Pagination>

                        </div>
                        </CardBody>
                    </Card>
        </div>
    );

}

export default Assessments;