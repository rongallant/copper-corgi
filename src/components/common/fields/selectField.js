import React, {Component} from "react";
import {FormFeedback, FormGroup, FormText, Label, CustomInput} from "reactstrap";

export default class SelectField extends Component {

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