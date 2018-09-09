import React, {Component} from "react";
import {NavLink} from "react-router-dom";
import PropTypes from "prop-types";
import {Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink as Link, UncontrolledCollapse} from "reactstrap";

import {PAGE_ADD, PAGE_HOME, PAGE_LIST, PAGE_LOGIN} from "../../App";
import {logout} from "../../services/authentication";

class Header extends Component {

	handleLogout = () => {
		this.props.updateAuthenticated(logout())
	};

	renderMenu = (authenticated) => {
		const {handleLogout} = this;
		if (authenticated) {
			return <Nav className="ml-auto" navbar>
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
						href="#"
						onClick={handleLogout}>
						Logout
					</Link>
				</NavItem>
			</Nav>
		} else {
			return <Nav className="ml-auto" navbar>
				<NavItem>
					<NavLink
						className="nav-link"
						activeClassName="active"
						to={PAGE_LOGIN}>
						Login
					</NavLink>
				</NavItem>
			</Nav>
		}
	};

	render() {
		const {renderMenu} = this;
		const {isAuthenticated} = this.props;

		return (<header>
			<Navbar
				expand="md"
				className="mb-3"
				color="dark" dark>
				<NavbarBrand href={PAGE_HOME}>
					<img
						src="/images/BacPacTrac-Title.svg"
						alt="BacPacTrac"
						width={300}
						height={55}
						className="img-fluid"/>
				</NavbarBrand>
				<NavbarToggler id="headerToggler"/>
				<UncontrolledCollapse toggler="#headerToggler" navbar>
					{renderMenu(isAuthenticated)}
				</UncontrolledCollapse>
			</Navbar>
		</header>);
	}
}

Header.defaultProps = {
	isAuthenticated: false
};

Header.propTypes = {
	isAuthenticated: PropTypes.bool,
	updateAuthenticated: PropTypes.func.isRequired
};

export default Header;
