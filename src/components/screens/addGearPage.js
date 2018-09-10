import React, {Component} from "react";
import {Container} from "reactstrap";
import PropTypes from "prop-types";

import {
	COLLECTION_GEAR_ITEMS,
	COLLECTION_USER_GEAR, db, PAGE_LIST, USER_AUTH_KEY
} from "../../App";
import {AddGearForm} from "../form/addGearForm";

class AddGearPage extends Component {

	handleCancel = () => {
		this.props.history.push(PAGE_LIST);
	};

	handleAddGear = (values) => {
		const userId = localStorage.getItem(USER_AUTH_KEY);
		db.collection(COLLECTION_USER_GEAR)
			.doc(userId)
			.collection(COLLECTION_GEAR_ITEMS).add(values)
			.catch(error => {
				console.error('Error Code:', error.code);
				throw new Error("Error adding gear.");
			});
	};

	render() {
		const {handleCancel, handleAddGear} = this;
		const {history} = this.props;
		const gearItem = {};

		return (<Container>
			<h3>Add Gear</h3>
			<AddGearForm
				{...this.props}
				gearItem={gearItem}
				handleAddGear={handleAddGear}
				handleCancel={handleCancel}
				history={history}
				isEditForm={false}
			/>
		</Container>);
	}
}

AddGearPage.propTypes = {
	history: PropTypes.object.isRequired
};

export default AddGearPage;
