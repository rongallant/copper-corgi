import React, {Component} from "react";

import {AddGearForm} from "../form/addGearForm";
import {gearService} from "../../services/localStorageService";
import {EditGearForm} from "../form/editGearForm";

export default class GearFormPage extends Component {

	constructor(props) {
		super(props);
		const {params} = this.props.match;
		let isNew = true;
		let gearItem = gearService.newGearItem;
		if (params && params.key) {
			gearItem = gearService.readGearItem(params.key);
			isNew = false;
		}
		this.state = {
			isNew: isNew, gearItem: gearItem
		};
	}

	addForm = (history, gearItem) => <div>
		<h1>Add Gear</h1>
		<AddGearForm
			history={history}
			gearItem={gearItem}
		/>
	</div>;

	// TODO Edit Title not showing.
	editForm = (history, gearItem) => <div>
		<h1>Edit Gear</h1>
		<EditGearForm
			history={history}
			gearItem={gearItem}
		/>
	</div>;

	render() {
		const {addForm, editForm} = this;
		const {history} = this.props;
		const {gearItem} = this.state;
		let form;
		if (this.state.isNew) {
			form = addForm(history, gearItem)
		} else {
			form = editForm(history, gearItem)
		}

		return (form);
	}
}
