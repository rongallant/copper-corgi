import React, {Component} from "react";
import {
	Navbar, Nav, UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle
} from "reactstrap";

export default class EditFormMenu extends Component {

	render() {
		const {handleDelete, gearItemKey} = this.props;

		return (<Navbar light className="px-0">
			<h2>Edit</h2>
			<Nav className="ml-auto">
				<UncontrolledDropdown nav>
					<DropdownToggle nav>
						<i className="fas fa-ellipsis-v"/>
					</DropdownToggle>
					<DropdownMenu right>
						<DropdownItem
							onClick={() => handleDelete(gearItemKey)}>
							<i className="far fa-trash-alt"/>
							Delete
						</DropdownItem>
					</DropdownMenu>
				</UncontrolledDropdown>
			</Nav>
			<
			/Navbar>);
			}
			}