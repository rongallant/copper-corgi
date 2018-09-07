import {withFormik} from "formik";

import {GearForm} from "./components/gearForm";

export const AddGearForm = withFormik({

	mapPropsToValues: () => {
		return {category: "", name: "", description: "", weight: ""};
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

	handleSubmit: (values, {props, setStatus}) => {
		props.handleSubmit(values, setStatus);
	},

	displayName: 'AddGearForm',

})(GearForm);


