import React, {Component} from "react";
import {Collapse, Nav, Navbar, NavbarBrand, NavItem, NavbarToggler, NavLink as Link} from "reactstrap";
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";

import {PAGE_ADD, PAGE_HOME, PAGE_LIST} from "../../App";
import {logout} from "../../services/authentication";
import {checkUserAuthentication} from "../../actions/authenticationActions";

class Header extends Component {

	constructor(props) {
		super(props);
		this.state = {
			navIsOpen: false
		}
	}

	toggleNavBar = () => {
		this.setState({
			navIsOpen: !this.state.navIsOpen
		});
	};

	handleLogout = () => {
		logout();
		// this.props.history.push(PAGE_LIST);
	};

	render() {
		const {handleLogout, toggleNavBar} = this;
		const {navIsOpen} = this.state;
		const {userAuthenticated} = this.props;

		return (<header>
			<Navbar expand="md" color="dark" dark>
				<NavbarBrand href="/">
					<img
						src="/images/BacPacTrac-Title.svg"
						alt="BacPacTrac"
						width={300}
						height={55}
						className="img-fluid"/>
				</NavbarBrand>
				<NavbarToggler onClick={toggleNavBar}/>
				<Collapse isOpen={navIsOpen} navbar>

					{userAuthenticated && <Nav className="ml-auto" navbar>
						<NavItem>
							<NavLink
								className="nav-link"
								activeClassName="active"
								to={PAGE_LIST}>
								<i className="fas fa-list-ol"/>
								List</NavLink>
						</NavItem>
						<NavItem>
							<NavLink
								className="nav-link"
								activeClassName="active"
								to={PAGE_ADD}>
								<i className="far fa-plus-square"/>
								Add</NavLink>
						</NavItem>
						<NavItem>
							<Link
								onClick={handleLogout}>
								Logout
							</Link>
						</NavItem>
					</Nav>}

					{!userAuthenticated && <Nav className="ml-auto" navbar>
						<NavItem>
							<NavLink
								className="nav-link"
								activeClassName="active"
								to={PAGE_HOME}>
								Login</NavLink>
						</NavItem>
					</Nav>}

				</Collapse>
			</Navbar>
		</header>);
	}
}

const mapStateToProps = state => {
	console.log('Header.mapStateToProps', state);
	return {
		userAuthenticated: state.userAuthenticated, handleLogin: state.logOutUser
	};
};

export default connect(mapStateToProps)(Header);