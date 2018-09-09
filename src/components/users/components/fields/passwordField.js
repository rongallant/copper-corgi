import React, {Component} from "react";
import PropTypes from "prop-types";

import TextField from "../../../common/fields/textField";

class PasswordField extends Component {

	render() {
		const {errors, id, touched} = this.props;

		return (<TextField
			{...this.props}
			id={id}
			invalid={errors[id] && touched[id]}
			label="Password"
			type="password"
			maxLength={128}
		/>);
	}
}

PasswordField.propTypes = {
	errors: PropTypes.object,
	id: PropTypes.string.isRequired,
	touched: PropTypes.object
};

export default PasswordField;
