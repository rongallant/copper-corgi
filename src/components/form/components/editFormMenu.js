// editFormMenu.js
import React, {Component} from "react";
import {
	Navbar,
	Nav,
	UncontrolledDropdown,
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
	NavLink
} from "reactstrap";

export default class EditFormMenu extends Component {

	render() {
		const {gearId, handleDeleteGear, handleReset} = this.props;

		return (<Navbar light className="px-0">
			<h3>Edit Gear</h3>
			<Nav className="ml-auto">
				<UncontrolledDropdown nav>
					<DropdownToggle nav>
						<i className="fas fa-ellipsis-v"/>
					</DropdownToggle>
					<DropdownMenu right>
						<DropdownItem>
							<NavLink
							onClick={() => handleDeleteGear(gearId)}>
								<i className="far fa-trash-alt"/>
							Delete
							</NavLink>
						</DropdownItem>
						<DropdownItem>
							<NavLink
								onClick={handleReset}>
								<i className="far fa-trash-alt"/>
								Reset
							</NavLink>
						</DropdownItem>
					</DropdownMenu>
				</UncontrolledDropdown>
			</Nav>
		</Navbar>);
	}
}