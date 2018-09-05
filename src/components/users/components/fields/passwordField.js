import React, {Component} from "react";
import TextField from "../../../common/fields/textField";

export default class PasswordField extends Component {

	render() {
		const {errors, id, touched} = this.props;

		return (<TextField
			{...this.props}
			id="password"
			invalid={errors[id] && touched[id]}
			label="Password"
			type="password"
			maxLength={128}
		/>);
	}
}
