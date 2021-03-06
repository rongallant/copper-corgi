import React, {Component} from "react";
import PropTypes from "prop-types";
import {AsyncTypeahead} from "react-bootstrap-typeahead";
import {FormFeedback, FormGroup, FormText, Label} from "reactstrap";

import {
	COLLECTION_GEAR_TAGS,
	COLLECTION_USER_GEAR,
	db,
	USER_AUTH_KEY
} from "../../../../App";
import "react-bootstrap-typeahead/css/Typeahead.min.css";
import "react-bootstrap-typeahead/css/Typeahead-bs4.min.css";

export default class GearTagsField extends Component {

	constructor (props) {
		super(props);
		this.state = {
			isLoading: false,
			options: []
		};
	}

	handleSearch = (strSearch) => {
		if (!strSearch) {
			return Promise.resolve({options: []});
		}
		this.setState({isLoading: true});
		const strlength = strSearch.length;
		const strFrontCode = strSearch.slice(0, strlength - 1);
		const strEndCode = strSearch.slice(strlength - 1, strSearch.length);
		const startcode = strSearch;
		const endcode = strFrontCode + String.fromCharCode(strEndCode.charCodeAt(0) + 1);
		const userId = localStorage.getItem(USER_AUTH_KEY);

		return db.collection(COLLECTION_USER_GEAR).doc(userId)
			.collection(COLLECTION_GEAR_TAGS)
			.where("tag", ">=", startcode)
			.where("tag", "<", endcode).get()
			.then(snapshot => {
				if (snapshot) {
					const options = [];
					snapshot.forEach(doc => {
						const newItem = doc.data();
						newItem.id = doc.id;
						options.push(newItem);
					});
					this.setState({options, loading: false});
				}
			});
	};

	render () {
		const {handleSearch} = this;
		const {handleBlur, handleChange, help, id, label, errors, touched} = this.props;

		return (
			<FormGroup>
				<Label
					for={id}>
					{label}
				</Label>
				<AsyncTypeahead
					{...this.state}
					allowNew={true}
					errors={errors}
					id={id}
					invalid={errors[id] && touched[id]}
					labelKey="tag"
					label={label}
					multiple
					name={id}
					onBlur={handleBlur}
					onChange={handleChange}
					onSearch={handleSearch}
					touched={touched}
				/>
				{errors[id] && <FormFeedback>{errors[id]}</FormFeedback>}
				{help && <FormText>{help}</FormText>}
			</FormGroup>
		);
	}
}

GearTagsField.propTypes = {
	errors: PropTypes.object,
	handleBlur: PropTypes.func,
	handleChange: PropTypes.func,
	help: PropTypes.string,
	id: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	onBlur: PropTypes.func,
	onChange: PropTypes.func,
	touched: PropTypes.object
};