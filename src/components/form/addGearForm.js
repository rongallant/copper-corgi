import {withFormik} from "formik";

import GearForm from "./components/gearForm";

export const AddGearForm = withFormik({
	mapPropsToValues: () => {
		return {};
	},

	validate: values => {
		let errors = {};
		if (!values.category) {
			errors.category = "Required";
		}
		if (!values.name) {
			errors.name = "Required";
		}
		if (!values.weight) {
			errors.weight = "Required";
		}
		return errors;
	},

	handleSubmit: async (values, {props, setFormikState, setSubmitting, setErrors}) => {
		try {
			setFormikState({loading: true});
			await props.handleAddGear(values);
			setFormikState({success: true});
		} catch (error) {
			setFormikState({success: false, loading: false});
			setErrors({formError: error.message});
		}
		setSubmitting(false);
	},

	displayName: "AddGearForm",
})(GearForm);


