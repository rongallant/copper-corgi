import React, {Component} from "react";
import SelectField from '../../../common/fields/selectField'

export default class CategoryField extends Component {

	render() {
		const {errors, id, touched} = this.props;

		return (<SelectField
			{...this.props}
			id="category"
			invalid={errors[id] && touched[id]}
			label="Category"
			type="select">
			<option value=""></option>
			<option value="pack">Pack</option>
			<option value="shelter">Shelter</option>
			<option value="sleeping">Sleeping</option>
			<option value="clothes">Clothes</option>
		</SelectField>);
	}
}
