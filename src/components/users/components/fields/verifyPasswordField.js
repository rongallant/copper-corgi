import React, {Component} from "react";
import TextField from "../../../common/fields/textField";

export default class VerifyPasswordField extends Component {

	render() {
		const {errors, id, touched} = this.props;

		return (<TextField
			{...this.props}
			id="verifyPassword"
			invalid={errors[id] && touched[id]}
			label="Verify Password"
			maxLength={128}
		/>);
	}
}
