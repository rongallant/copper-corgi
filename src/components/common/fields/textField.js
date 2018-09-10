import React, {Component} from "react";
import PropTypes from "prop-types";
import {FormFeedback, FormGroup, FormText, Input, Label} from "reactstrap";

class TextField extends Component {

	render () {
		const {errors, help, id, label, touched, value} = this.props;

		return (<FormGroup>
			<Label
				for={id}>
				{label}
			</Label>
			<Input
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

TextField.propTypes = {
	errors: PropTypes.object,
	help: PropTypes.string,
	id: PropTypes.string,
	label: PropTypes.string,
	touched: PropTypes.object,
	value: PropTypes.any
};

export default TextField;
