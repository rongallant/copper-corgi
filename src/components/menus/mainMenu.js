import React, {Component} from "react";
import {Nav, NavItem} from "reactstrap";
import {NavLink} from "react-router-dom";

export default class MainMenu extends Component {

	render() {

		return (<Nav>
			<NavItem>
				<NavLink
					className="nav-link"
					activeClassName="active"
					to="/">List</NavLink>
			</NavItem>
			<NavItem>
				<NavLink
					className="nav-link"
					to="/add">Add</NavLink>
			</NavItem>
		</Nav>);
	}
}