import React, {Component} from "react";
import {Nav, NavItem} from "reactstrap";
import {NavLink} from "react-router-dom";
import {PAGE_ADD, PAGE_LIST} from "../../App";

export default class MainMenu extends Component {

	render() {

		return (<Nav className="ml-auto" navbar>
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
		</Nav>);
	}
}