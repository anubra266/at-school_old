import React from "react";
import Login from "./subLogin.js"
// reactstrap components
import {Row, Col} from "reactstrap";

class MainPage extends React.Component {
    render() {
        return (
            <div className="content">
                <Row>
                    <Col md="6">
                        <h1>Here</h1>
                    </Col>
                    <Col md="6">
                        <Login {...this.props} />
                    </Col>
                </Row>
            </div>
        );
    }
}

export default MainPage;