import React, {Component} from "react";
import PropTypes from "prop-types";
import {
	Navbar, Nav, UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle
} from "reactstrap";

class EditFormMenu extends Component {

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
						<DropdownItem
							onClick={() => handleDeleteGear(gearId)}>
							<i className="far fa-trash-alt text-danger"/>
							Delete
						</DropdownItem>
						<DropdownItem
							onClick={handleReset}>
							<i className="fas fa-undo"/>
							Reset
						</DropdownItem>
					</DropdownMenu>
				</UncontrolledDropdown>
			</Nav>
		</Navbar>);
	}
}

EditFormMenu.propTypes = {
	gearId: PropTypes.string.isRequired,
	handleDeleteGear: PropTypes.func.isRequired,
	handleReset: PropTypes.func.isRequired
};

export default EditFormMenu;