import React from "react";
import ParseReact from "parse-react";
import Parse from "parse/node";
import confirm from 'reactstrap-confirm';

import {AddGearForm} from "../form/addGearForm";
import {EditGearForm} from "../form/editGearForm";
import {PAGE_EDIT_PATH, PAGE_LIST} from "../../App";

export default class GearFormPage extends ParseReact.Component(React) {

	constructor(props) {
		super(props);
		this.handleDelete = this.handleDelete.bind(this);
		this.state = {
			loading: true, isNew: true, gearItem: null
		};
	}

	observe(nextProps, nextState) {
	}

	componentDidMount() {
		const {match: {path, params: {key}}} = this.props;

		if (PAGE_EDIT_PATH === path) {
			const query = new Parse.Query('Gear');
			query.equalTo("objectId", key);
			query.first().then(result => {
				this.setState({
					gearItem: result, isNew: false, loading: false
				});
			});
		} else {
			this.setState({
				// gearItem: result,
				isNew: true, loading: false
			});
		}
	}

	handleCancel = () => {
		this.props.history.push(PAGE_LIST);
	};

	async handleDelete(key) {
		let result = await confirm();
		if (result) {
			const query = new Parse.Query('Gear');
			query.find("objectId", key);
			query.first().then(gear => {
				gear.destroy();
				this.props.history.push(PAGE_LIST); // Go to list
			}).catch(e => {
				console.error(e);
				throw new Error(`Error deleting: ${key}`);
			});
		}
	};

	handleSubmit = (values, {props}) => {
		const {id, category, name, description, weight} = values;

		if (this.state.isNew) {
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
		} else {
			const query = new Parse.Query('Gear');
			query.equalTo("objectId", id);
			query.first().then(gear => {
				gear.set("category", category);
				gear.set("name", name);
				gear.set("description", description);
				gear.set("weight", weight);
				gear.save();
			}).catch(e => {
				console.error(e);
				throw new Error("Error updating gear.");
			});
		}
		this.props.history.push(PAGE_LIST); // Go to list
	};

	render() {
		const {handleCancel, handleDelete, handleSubmit} = this;
		const {history} = this.props;
		const {isNew, gearItem, loading} = this.state;

		if (loading) return <div>Loading...</div>;

		let form = null;
		if (isNew && gearItem) {
			form = <div>
				<h2>Add Gear</h2>
				<AddGearForm
					history={history}
					gearItem={gearItem}
					handleCancel={handleCancel}
					handleDelete={handleDelete}
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
					handleDelete={handleDelete}
					handleSubmit={handleSubmit}
				/>
			</div>;
		}
		return form;
	}
}
