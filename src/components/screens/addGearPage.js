import React, {Component} from "react";

import {AddGearForm} from "../form/addGearForm";
import {db, PAGE_LIST} from "../../App";

export default class AddGearPage extends Component {

	handleCancel = () => {
		this.props.history.push(PAGE_LIST);
	};

	handleSubmit = (values) => {
		db.collection('gear-items').add(values);
		return this.props.history.push(PAGE_LIST);
	};

	render() {
		const {handleCancel, handleSubmit} = this;
		const {history} = this.props;
		const gearItem = {};

		return (<div>
			<h3>Add Gear</h3>
			<AddGearForm
				isEditForm={false}
				history={history}
				gearItem={gearItem}
				handleCancel={handleCancel}
				handleSubmit={handleSubmit}
			/>
		</div>);
	}
}
