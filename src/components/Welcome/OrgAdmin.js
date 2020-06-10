import React from "react";
import {withRouter} from "react-router-dom";
import {Card, CardBody} from "reactstrap";
const orgAdmin = () => {

    return (
        <Card className="card-user">
            <CardBody>
                <div className="author">
                    <div className="block block-one"/>
                    <div className="block block-two"/>
                    <div className="block block-three"/>
                    <div className="block block-four"/>
                    <div className="block block-four"/>
                    <h3>Organization Admin</h3><hr/>
                    <h4>You would start the cycle of Knowledge</h4>
                </div>
            </CardBody>

        </Card>
    );
}
export default withRouter(orgAdmin);