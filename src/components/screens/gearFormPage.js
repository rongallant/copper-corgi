import React, {Component} from "react";

import {AddGearForm} from "../form/addGearForm";
import {gearService} from "../../services/localStorageService";
import {EditGearForm} from "../form/editGearForm";
import {PAGE_LIST} from "../../App";

export default class GearFormPage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isNew: true,
			gearItem: gearService.newGearItem
		};
	}

	static getDerivedStateFromProps(props, state) {
		if (props.match && state.gearItem) {
			const {key} = props.match.params;
			let isNew = true;
			let gearItem = gearService.newGearItem;
			if (props.match.params !== undefined && key !== undefined) {
				gearItem = gearService.readGearItem(key);
				isNew = false;
			}
			return {
				isNew: isNew,
				gearItem: gearItem
			};
		}
		return null;
	}

	handleCancel = () => {
		this.props.history.push(PAGE_LIST);
	}

	handleSubmit = (values, {props}) => {
		if (this.state.isNew) {
			gearService.createGearItem({...values});
		} else {
			gearService.updateGearItem({...values});
		}
		this.props.history.push(PAGE_LIST); // Go to list
	};

	render() {
		const {handleCancel, handleSubmit} = this;
		const {history} = this.props;
		const {gearItem} = this.state;

		let form;
		if (this.state.isNew) {
			form = <div>
				<h2>Add Gear</h2>
				<AddGearForm
					history={history}
					gearItem={gearItem}
					handleSubmit={handleSubmit}
				/>
			</div>;
		} else {
			form = <div>
				<h2>Edit Gear</h2>
				<EditGearForm
					history={history}
					gearItem={gearItem}
					handleCancel={handleCancel}
					handleSubmit={handleSubmit}
				/>
			</div>;
		}
		return (form);
	}
}
