import {withFormik} from "formik";

import {GearForm} from "./components/gearForm";
import {gearService} from "../../services/localStorageService";
import {PAGE_LIST} from "../../App";

export const AddGearForm = withFormik({

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
		// TODO Edit
		gearService.createGearItem({...values});
		props.history.push(PAGE_LIST); // Go to list
	},

	displayName: 'AddGearForm',

})(GearForm);
