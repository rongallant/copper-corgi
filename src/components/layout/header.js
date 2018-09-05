import React, {Component} from "react";
import {Collapse, Nav, Navbar, NavbarBrand, NavItem, NavbarToggler, NavLink as Link} from "reactstrap";
import {NavLink} from "react-router-dom";

import {PAGE_ADD, PAGE_HOME, PAGE_LIST, PAGE_LOGIN} from "../../App";
import {logout} from "../../services/authentication";

export default class Header extends Component {

	constructor(props) {
		super(props);
		this.state = {
			navIsOpen: false,
		}
	}

	handleLogout = (e) => {
		console.log('App.handleLogout');
		e.preventDefault();
		this.props.updateAuthenticated(logout())
	};

	toggleNavBar = () => {
		this.setState({
			navIsOpen: !this.state.navIsOpen
		});
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
						to={PAGE_LOGIN}>
						Login
					</NavLink>
				</NavItem>
			</Nav>
		}
	};

	render() {
		const {renderMenu, toggleNavBar} = this;
		const {isAuthenticated} = this.props;
		const {navIsOpen} = this.state;

		return (<header>
			<Navbar expand="md" color="dark" dark>
				<NavbarBrand href={PAGE_HOME}>
					<img
						src="/images/BacPacTrac-Title.svg"
						alt="BacPacTrac"
						width={300}
						height={55}
						className="img-fluid"/>
				</NavbarBrand>
				<NavbarToggler onClick={toggleNavBar}/>
				<Collapse isOpen={navIsOpen} navbar>
					{renderMenu(isAuthenticated)}
				</Collapse>
			</Navbar>
		</header>);
	}
}