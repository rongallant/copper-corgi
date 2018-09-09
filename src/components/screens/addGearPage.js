import React, {Component} from "react";
import {Container} from "reactstrap";
import PropTypes from "prop-types";

import {db, PAGE_LIST} from "../../App";
import {AddGearForm} from "../form/addGearForm";

class AddGearPage extends Component {

	handleCancel = () => {
		this.props.history.push(PAGE_LIST);
	};

	handleAddGear = (values) => {
		db.collection('gear-items').add(values).then(() => {
			return this.props.history.push(PAGE_LIST);
		}).catch(e => {
			console.error(e);
			throw new Error("Could not add gear.");
		});
	};

	render() {
		const {handleCancel, handleAddGear} = this;
		const {history} = this.props;
		const gearItem = {};

		return (<Container>
			<h3>Add Gear</h3>
			<AddGearForm
				isEditForm={false}
				history={history}
				gearItem={gearItem}
				handleCancel={handleCancel}
				handleAddGear={handleAddGear}
			/>
		</Container>);
	}
}

AddGearPage.propTypes = {
	history: PropTypes.object.isRequired
};

export default AddGearPage;
