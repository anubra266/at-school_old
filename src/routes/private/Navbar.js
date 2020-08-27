import React from "react";
import { Link } from "react-router-dom";
// nodejs library that concatenates classes
import classNames from "classnames";
import UserService from "../../services/user.service";

// reactstrap components
import {
	Button,
	Collapse,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	UncontrolledDropdown,
	Input,
	InputGroup,
	NavbarBrand,
	Navbar,
	NavLink,
	Nav,
	Container,
	Modal,
} from "reactstrap";
import notify from "../../services/notify";
class TheNavbar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			collapseOpen: false,
			modalSearch: false,
			color: "navbar-transparent",
			user: this.props.user,
		};
	}
	componentDidMount() {
		window.addEventListener("resize", this.updateColor);
	}
	componentWillUnmount() {
		window.removeEventListener("resize", this.updateColor);
	}
	// function that adds color white/transparent to the navbar on resize (this is
	// for the collapse)
	updateColor = () => {
		if (window.innerWidth < 993 && this.state.collapseOpen) {
			this.setState({ color: "bg-white" });
		} else {
			this.setState({ color: "navbar-transparent" });
		}
	};
	// this function opens and closes the collapse on small devices
	toggleCollapse = () => {
		if (this.state.collapseOpen) {
			this.setState({ color: "navbar-transparent" });
		} else {
			this.setState({ color: "bg-white" });
		}
		this.setState({
			collapseOpen: !this.state.collapseOpen,
		});
	};
	// this function is to open the Search modal
	toggleModalSearch = () => {
		this.setState({
			modalSearch: !this.state.modalSearch,
		});
	};

	render() {
		const { logout, classroomname } = this.props;
		const updateuser = () => {
			UserService.getUser().then((response) => {
				this.setState({ user: response.data });
			});
		};
		window.Echo.channel("at_school_database_classes").listen(
			"UpdateUser",
			(e) => {
				updateuser();
			}
		);
		return (
			<div>
				<Navbar
					className={classNames("navbar-absolute", this.state.color)}
					expand="lg"
				>
					<Container fluid>
						<div className="navbar-wrapper">
							<div
								className={classNames("navbar-toggle d-inline", {
									toggled: this.props.sidebarOpened,
								})}
							>
								<button
									className="navbar-toggler"
									type="button"
									onClick={this.props.toggleSidebar}
								>
									<span className="navbar-toggler-bar bar1" />
									<span className="navbar-toggler-bar bar2" />
									<span className="navbar-toggler-bar bar3" />
								</button>
							</div>
							<NavbarBrand href="#" onClick={(e) => e.preventDefault()}>
								{/*notify.appname()*/}
								{classroomname?classroomname:notify.appname()}
							</NavbarBrand>
						</div>
						<button
							aria-expanded={false}
							aria-label="Toggle navigation"
							className="navbar-toggler"
							data-target="#navigation"
							data-toggle="collapse"
							id="navigation"
							type="button"
							onClick={this.toggleCollapse}
						>
							<span className="navbar-toggler-bar navbar-kebab" />
							<span className="navbar-toggler-bar navbar-kebab" />
							<span className="navbar-toggler-bar navbar-kebab" />
						</button>
						<Collapse navbar isOpen={this.state.collapseOpen}>
							<Nav className="ml-auto" navbar>
								<InputGroup className="search-bar">
									<Button color="link" id="search-button">
										{this.state.user.firstName + " " + this.state.user.lastName}
									</Button>
								</InputGroup>
								<UncontrolledDropdown nav>
									<DropdownToggle
										color="default"
										data-toggle="dropdown"
										nav
										onClick={(e) => e.preventDefault()}
									>
										<div className="photo">
											<img
												alt="..."
												src={
													notify.APP_URL() +
														"storage/images/" +
														this.state.user.profile_image ||
													require("assets/img/default-avatar.png")
												}
											/>
										</div>
										<b className="caret d-lg-block d-xl-block" />
									</DropdownToggle>
									<DropdownMenu className="dropdown-navbar" right tag="ul">
										<NavLink tag="li">
											<Link to={"/in/dashboard/profile-settings"}>
												<DropdownItem className="nav-item">
													Settings
												</DropdownItem>
											</Link>
										</NavLink>
										<DropdownItem divider tag="li" />
										<NavLink tag="li">
											<DropdownItem className="nav-item" onClick={logout}>
												Log out
											</DropdownItem>
										</NavLink>
									</DropdownMenu>
								</UncontrolledDropdown>
								{/*<UncontrolledDropdown nav>
                                    <DropdownToggle caret color="default" data-toggle="dropdown" nav>
                                        <div className="notification d-lg-block d-xl-block"/>
                                        <i className="icon-bell"/>
                                        <p className="d-lg-none">Notifications</p>
                                    </DropdownToggle>
                                    <DropdownMenu className="dropdown-navbar" right tag="ul">
                                        <NavLink tag="li">
                                            <DropdownItem className="nav-item">
                                                Mike John responded to your email
                                            </DropdownItem>
                                        </NavLink>
                                    </DropdownMenu>
                                </UncontrolledDropdown>*/}
								<li className="separator d-lg-none" />
							</Nav>
						</Collapse>
					</Container>
				</Navbar>
				<Modal
					modalClassName="modal-search"
					isOpen={this.state.modalSearch}
					toggle={this.toggleModalSearch}
				>
					<div className="modal-header">
						<Input id="inlineFormInputGroup" placeholder="SEARCH" type="text" />
						<button
							aria-label="Close"
							className="close"
							data-dismiss="modal"
							type="button"
							onClick={this.toggleModalSearch}
						>
							<i className="tim-icons icon-simple-remove" />
						</button>
					</div>
				</Modal>
			</div>
		);
	}
}

export default TheNavbar;
