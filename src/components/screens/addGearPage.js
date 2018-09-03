import React from "react";
import ParseReact from "parse-react";
import Parse from "parse/node";

import {AddGearForm} from "../form/addGearForm";
import {PAGE_LIST} from "../../App";

export default class AddGearPage extends ParseReact.Component(React) {

	observe(nextProps, nextState) {
	}

	handleCancel = () => {
		this.props.history.push(PAGE_LIST);
	};

	handleSubmit = (values) => {
		const {category, name, description, weight} = values;
		const Gear = Parse.Object.extend("Gear");
		const gear = new Gear();
		gear.set("category", category);
		gear.set("name", name);
		gear.set("description", description);
		gear.set("weight", weight);
		gear.save()
			.then((gear) => {
				console.log('New great created with objectId: ' + gear.id);
			}, (e) => {
				console.error(e);
				throw new Error("Error creating gear.");
			});

		this.props.history.push(PAGE_LIST); // Go to list
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
