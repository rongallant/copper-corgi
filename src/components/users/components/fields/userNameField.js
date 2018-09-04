import React, {Component} from "react";
import TextField from "../../../common/fields/textField";

export default class UserNameField extends Component {

	render() {
		const {errors, id, touched} = this.props;

		return (<TextField
			{...this.props}
			id="username"
			invalid={errors[id] && touched[id]}
			label="Username"
			maxLength={100}
		/>);
	}
}
