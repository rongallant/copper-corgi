import React, {Component} from "react";
import {withFormik} from "formik";

import {GearForm} from "../form/gearForm";
import {gearService} from "../../services/localStorageService";

const MyEnhancedForm = withFormik({
	mapPropsToValues: () => {
		const newGearItem = gearService.newGearItem;
		console.log(newGearItem);
		return newGearItem;
	},

	// Custom sync validation
	validate: values => {
		let errors = {};

		if (!values.category) {
			errors.category = 'Required';
		}

		if (!values.name) {
			errors.name = 'Required';
		}

		if (!values.weight) {
			errors.weight = 'Required';
		}

		return errors;
	},

	handleSubmit: (values, {props}) => {
		console.debug('props', props);
		const gearList = gearService.readGearList();
		console.debug('readGearList', gearList);
		console.debug('values', {...values});
		gearService.createGearItem({...values});
		console.debug('createGearItem', gearList);
		props.history.push("/"); // Go to list
	}, displayName: 'GearForm', // helps with React DevTools
})(GearForm);

class GearFormPage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			gearList: []
		};
	}

	componentDidMount() {
		if (gearService.gearListExists()) {
			const gearList = gearService.readGearList();
			this.setState({
				gearList: gearList
			});
		}
	}

	render() {
		const {history} = this.props;
		const {gearList} = this.state;

		return (<div>
				<h1>Add Gear</h1>
				<MyEnhancedForm
					history={history}
					gearList={gearList}
				/>
			</div>);
	}
}

export default GearFormPage;