import React, {Component} from "react";
import SelectField from "../../../common/fields/selectField";
import {db} from "../../../../App";
import PropTypes from "prop-types";

export default class CategoryField extends Component {

	constructor (props) {
		super(props);
		this.state = {
			gearCategories: []
		};
	}

	componentDidMount () {
		db.collection("gear-categories").get()
			.then((snapshot) => {
				const gearCategories = [];
				snapshot.forEach(doc => {
					const category = doc.data();
					category.id = doc.id;
					gearCategories.push(category);
				});
				this.setState({gearCategories});
			})
			.catch(error => {
				console.error("Error Code:", error.code);
				throw new Error("Error getting categories.");
			});
	}

	render () {
		const {errors, id, touched} = this.props;
		const {gearCategories} = this.state;

		return (<SelectField
			{...this.props}
			id="category"
			invalid={errors[id] && touched[id]}
			label="Category"
			type="select">
			<option value=""/>
			{gearCategories.map((category) => {
				return <option key={category.id} value={category.id}>
					{category.label}
				</option>;
			})}
		</SelectField>);
	}
}

CategoryField.propTypes = {
	errors: PropTypes.object,
	id: PropTypes.string,
	touched: PropTypes.object,
	value: PropTypes.string
};
