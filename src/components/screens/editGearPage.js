import React from "react";
import ParseReact from "parse-react";
import Parse from "parse/node";
import confirm from 'reactstrap-confirm';

import {EditGearForm} from "../form/editGearForm";
import {PAGE_EDIT_PATH, PAGE_LIST} from "../../App";
import EditFormMenu from "../form/components/editFormMenu";

export default class EditGearPage extends ParseReact.Component(React) {

	constructor(props) {
		super(props);
		this.handleDelete = this.handleDelete.bind(this);
		this.state = {
			loading: true, gearItem: null
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
					gearItem: result, loading: false
				});
			});
		} else {
			this.setState({
				loading: false
			});
		}
	}

	handleCancel = () => {
		this.props.history.push(PAGE_LIST);
	};

	async handleDelete(key) {
		let result = await confirm({
			title: 'Warning',
			message: 'Are you sure you want to delete?',
			confirmText: 'Delete',
			confirmColor: 'danger',
			cancelColor: 'link'
		});
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

		this.props.history.push(PAGE_LIST); // Go to list
	};

	render() {
		const {handleCancel, handleDelete, handleSubmit} = this;
		const {history} = this.props;
		const {gearItem, loading} = this.state;

		if (loading) return <div>Loading...</div>;

		return (<div>
			<EditFormMenu
				handleDelete={handleDelete}
			/>
			<EditGearForm
				isEditForm={true}
				history={history}
				gearItem={gearItem}
				handleCancel={handleCancel}
				handleSubmit={handleSubmit}
			/>
		</div>);
	}
}
