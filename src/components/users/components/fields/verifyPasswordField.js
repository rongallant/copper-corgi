import React, {Component} from "react";
import PropTypes from "prop-types";

import TextField from "../../../common/fields/textField";

class VerifyPasswordField extends Component {

	render() {
		const {errors, id, touched} = this.props;

		return (<TextField
			{...this.props}
			id={id}
			invalid={errors[id] && touched[id]}
			label="Verify Password"
			type="password"
			maxLength={128}
		/>);
	}
}

VerifyPasswordField.propTypes = {
	errors: PropTypes.object,
	id: PropTypes.string.isRequired,
	touched: PropTypes.object
};

export default VerifyPasswordField;
