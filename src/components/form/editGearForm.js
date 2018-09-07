import {withFormik} from "formik";

import {GearForm} from "./components/gearForm";

export const EditGearForm = withFormik({

	mapPropsToValues: (props) => {
		if (props.gearItem) {
			return props.gearItem;
		}
		return {};
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
		props.handleUpdateGear(values, props);
	},

	displayName: 'EditGearForm',

})(GearForm);
