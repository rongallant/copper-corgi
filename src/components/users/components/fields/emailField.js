import React, {Component} from "react";
import PropTypes from "prop-types";

import TextField from "../../../common/fields/textField";

class EmailField extends Component {

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

EmailField.propTypes = {
	errors: PropTypes.object,
	id: PropTypes.string.isRequired,
	touched: PropTypes.object
};

export default EmailField;
