import React, {Component} from "react";
import {Collapse, Nav, Navbar, NavbarBrand, NavItem, NavbarToggler} from "reactstrap";
import {NavLink} from "react-router-dom";

import {PAGE_ADD, PAGE_LIST} from "../../App";

export default class Header extends Component {

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

	render() {

		const {toggleNavBar} = this;
		const {navIsOpen} = this.state;

		return (<header>
			<Navbar expand="md" color="dark" dark>
				<NavbarBrand href="/">Gear Tracker</NavbarBrand>
				<NavbarToggler onClick={toggleNavBar}/>
				<Collapse isOpen={navIsOpen} navbar>
					<Nav className="ml-auto" navbar>
						<NavItem>
							<NavLink
								className="nav-link"
								activeClassName="active"
								to={PAGE_LIST}>List</NavLink>
						</NavItem>
						<NavItem>
							<NavLink
								className="nav-link"
								activeClassName="active"
								to={PAGE_ADD}>Add</NavLink>
						</NavItem>
					</Nav>
				</Collapse>
			</Navbar>
		</header>);
	}
}