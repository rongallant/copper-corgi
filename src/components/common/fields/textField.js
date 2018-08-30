import React, {Component} from "react";
import {FormFeedback, FormGroup, FormText, Label, Input} from "reactstrap";

class TextField extends Component {

	render() {
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

export default TextField;
