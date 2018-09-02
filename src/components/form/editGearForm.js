import {withFormik} from "formik";

import {GearForm} from "./components/gearForm";
// import Parse from "parse/node";

export const EditGearForm = withFormik({

	mapPropsToValues: (props) => {
		if (props.gearItem) {
			const {id, attributes} = props.gearItem;
			return {id, ...attributes};
		}
		return {id: "", category: "", name: "", description: "", weight: ""};
	},

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
		props.handleSubmit(values, props);
	},

	displayName: 'EditGearForm',

})(GearForm);
