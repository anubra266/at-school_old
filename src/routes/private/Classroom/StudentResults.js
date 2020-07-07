import React, {useState, useEffect} from "react";

// reactstrap components
import {
    Card,
    CardHeader,
    CardBody,
    Row,
    Col,
    Button,
    ButtonGroup,
    Input,
    FormGroup,
    Label,
    Modal,
    ModalBody,
    Form,
    TabContent,
    TabPane,
    Nav,
    NavItem,
    NavLink,
    CardTitle
} from "reactstrap";
import notify from "../../../services/notify.js"
import className from "classnames";
import UserService from "../../../services/user.service";

const StudentResults = () => {
    const [activeTab,
        setActiveTab] = useState('1');

    const toggletype = tab => {
        if (activeTab !== tab) 
            setActiveTab(tab);
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
                        
                        </Row>
                    </TabPane>
                    <TabPane tabId="2">
                        <Row>
                        
                        </Row>
                    </TabPane>
                </TabContent>

            </CardBody>
        </div>
    );
}
export default StudentResults