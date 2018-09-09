import {withFormik} from "formik";

import GearForm from "./components/gearForm";

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

	handleSubmit: async (values, {props, setFormikState, setSubmitting, setErrors}) => {
		try {
			setFormikState({loading: true});
			await props.handleUpdateGear(values);
			setFormikState({success: true});
		} catch (error) {
			setFormikState({success: false, loading: false});
			setErrors({formError: error.message});
		}
		setSubmitting(false);
	},

	displayName: 'EditGearForm',
})(GearForm);
