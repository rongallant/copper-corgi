import React, {Component} from "react";
import TextField from '../../common/fields/textField'

export default class DescriptionField extends Component {

	render() {
		const {errors, id, touched} = this.props;

		return (<TextField
			{...this.props}
			id="description"
			invalid={errors[id] && touched[id]}
			label="Description"
			type="textarea"
		/>);
	}
}
