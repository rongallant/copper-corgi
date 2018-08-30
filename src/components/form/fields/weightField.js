import React, {Component} from "react";
import TextField from "../../common/fields/textField";

export default class WeightField extends Component {

	render() {
		const {errors, id, touched} = this.props;

		return (<TextField
			{...this.props}
			id="weight"
			invalid={errors[id] && touched[id]}
			label="Weight (Grams)"
			type="number"
		/>);
	}
}
