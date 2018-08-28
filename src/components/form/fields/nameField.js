import React, {Component} from "react";
import TextField from "../../common/fields/textField";

export default class NameField extends Component {

	render() {
		const {errors, id, touched} = this.props;

		return (<TextField
			{...this.props}
			id="name"
			invalid={errors[id] && touched[id]}
			label="Name"
			type="text"
		/>);
	}
}
