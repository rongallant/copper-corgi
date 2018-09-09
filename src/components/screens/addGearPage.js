import React, {Component} from "react";
import {Container} from "reactstrap";
import PropTypes from "prop-types";

import {db, PAGE_LIST, USER_AUTH_KEY} from "../../App";
import {AddGearForm} from "../form/addGearForm";
import {UserLoginForm} from "../users/components/loginForm";

class AddGearPage extends Component {

	handleCancel = () => {
		this.props.history.push(PAGE_LIST);
	};

	handleAddGear = (values) => {
		const userId = localStorage.getItem(USER_AUTH_KEY);
		db.collection('user-gear')
			.doc(userId)
			.collection('gear-items').add(values)
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
