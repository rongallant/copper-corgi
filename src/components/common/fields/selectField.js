import React, {Component} from "react";
import PropTypes from "prop-types";
import {FormFeedback, FormGroup, FormText, Label, CustomInput} from "reactstrap";

class SelectField extends Component {

	render() {
		const {errors, help, id, label, touched, value} = this.props;

		return (<FormGroup>
				<Label
					for={id}>
					{label}
				</Label>
				<CustomInput
					{...this.props}
					value={value}
					name={id}
					invalid={errors[id] && touched[id]}
				/>
				{errors[id] && <FormFeedback>{errors[id]}</FormFeedback>}
				{help && <FormText>{help}</FormText>}
			</FormGroup>);
	}
}

SelectField.propTypes = {
	errors: PropTypes.object,
	help: PropTypes.string,
	id: PropTypes.string,
	label: PropTypes.string,
	touched: PropTypes.object,
	value: PropTypes.string
};

export default SelectField;
