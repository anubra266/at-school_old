import React from "react";

// reactstrap components
import {
    Card,
    CardHeader,
    Row,
    Col,
    ButtonGroup
} from "reactstrap";
import StudentResults from "./StudentResults";
import EducatorResults from "./EducatorResults";

const Tests = ({history, educator, slug, match, location}) => {

    return (
        <div className="content">

            <Row>
                <Col md="12">
                    <Card>
                        <CardHeader>
                            <Row>
                                <Col md="10">
                                    Results
                                </Col>
                                {educator
                                    ? <Col md="2">
                                            <ButtonGroup className="btn-group-toggle float-right" data-toggle="buttons">
                                            </ButtonGroup>
                                        </Col>

                                    : ''}
                            </Row>
                        </CardHeader>

                        {educator
                            ? <EducatorResults slug={slug}></EducatorResults>

                            : <StudentResults slug={slug}></StudentResults>}

                    </Card>
                </Col>
            </Row>
        </div>
    );

}

export default Tests;