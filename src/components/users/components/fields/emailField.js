import React, {Component} from "react";
import TextField from "../../../common/fields/textField";

export default class EmailField extends Component {

	render() {
		const {errors, id, touched} = this.props;

		return (<TextField
			{...this.props}
			id="email"
			invalid={errors[id] && touched[id]}
			label="Email Address"
			maxLength={254}
		/>);
	}
}
