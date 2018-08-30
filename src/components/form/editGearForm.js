import {withFormik} from "formik";

import {GearForm} from "./components/gearForm";

export const EditGearForm = withFormik({

	mapPropsToValues: (props) => {
		return props.gearItem;
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
