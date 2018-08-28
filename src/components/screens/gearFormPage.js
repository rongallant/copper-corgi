import React, {Component} from "react";
import {withFormik} from "formik";
import uniqid from "uniqid";

import {GearForm} from "../form/gearForm";

export const GEAR_LIST_KEY = "gear";

const MyEnhancedForm = withFormik({
    mapPropsToValues: () => ({
	    gearId: uniqid.time(),
	    category: null,
	    name: null,
	    description: null,
	    weight: null
    }),

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
	    let gearList = [];
    	if (localStorage.hasOwnProperty(GEAR_LIST_KEY)) {
    		gearList = JSON.parse(localStorage.getItem(GEAR_LIST_KEY));
	    }
	    gearList.push(values);
		localStorage.setItem(GEAR_LIST_KEY, JSON.stringify(gearList));

	    props.history.push("/"); // Go to list

    },
    displayName: 'GearForm', // helps with React DevTools
})(GearForm);

class GearFormPage extends Component {

    render() {
		const {history} = this.props;

		return (
            <div>
                <h1>Add Gear</h1>
                <MyEnhancedForm
                history={history}/>
            </div>
        );
    }
}

export default GearFormPage;