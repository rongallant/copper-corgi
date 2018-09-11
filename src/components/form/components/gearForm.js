import React, {Component} from "react";
import PropTypes from "prop-types";
import {Alert, Button, Col, Row} from "reactstrap";
import {Redirect} from "react-router-dom";
import _ from "lodash";

import CategoryField from "./fields/categoryField";
import DescriptionField from "./fields/descriptionField";
import EditFormMenu from "./editFormMenu";
import NameField from "./fields/nameField";
import WeightField from "./fields/weightField";
import {PAGE_LIST} from "../../../App";
import GearTagsField from "./fields/gearTagsField";

class GearForm extends Component {

	showErrors = (errors) => {
		return errors.formError && <Alert color="warning">{errors.formError}</Alert>
	};

	render() {
		const {showErrors} = this;
		const {
			dirty, touched, errors, isSubmitting, handleCancel, handleDeleteGear,
			handleChange, handleBlur, handleSubmit, handleReset, success, values,
		} = this.props;
		const {name, category, description, id, weight} = values;

		if (success === true) {
			return <Redirect to={PAGE_LIST}/>
		}

		return (<form onSubmit={handleSubmit} noValidate>
			{id && <EditFormMenu
				gearId={id}
				handleDeleteGear={handleDeleteGear}
				handleReset={handleReset}
			/>}
			{showErrors(errors)}

			<GearTagsField
				id="tags"
				label="Tags"
				onChange={handleChange}
				onBlur={handleBlur}
				errors={errors}
				touched={touched}
			/>
			<CategoryField
				value={category}
				onChange={handleChange}
				onBlur={handleBlur}
				errors={errors}
				touched={touched}
			/>
			<NameField
				value={name}
				onChange={handleChange}
				onBlur={handleBlur}
				errors={errors}
				touched={touched}
			/>
			<WeightField
				value={weight}
				onChange={handleChange}
				onBlur={handleBlur}
				errors={errors}
				touched={touched}
			/>
			<DescriptionField
				value={description}
				onChange={handleChange}
				onBlur={handleBlur}
				errors={errors}
				touched={touched}
			/>
			<Row
				className="justify-content-end">
				<Col md={3}>
					<Button
						block
						className="mr-3 mb-3"
						color="link"
						type="button"
						onClick={handleCancel}>
						Cancel
					</Button>
				</Col>
				<Col md={3}>
					<Button
						block
						outline
						className="mr-3 mb-3"
						type="button"
						onClick={handleReset}
						disabled={!dirty || isSubmitting}>
						Reset
					</Button>
				</Col>
				<Col md={3}>
					<Button
						block
						className="mr-3"
						color="primary"
						type="submit"
						disabled={!dirty || !_.isEmpty(errors) || isSubmitting}>
						Submit
					</Button>
				</Col>
			</Row>
		</form>);
	}
}

GearForm.defaultProps = {
	handleDeleteGear: null
};

GearForm.propTypes = {
	dirty: PropTypes.bool,
	errors: PropTypes.object,
	handleBlur: PropTypes.func,
	handleCancel: PropTypes.func,
	handleChange: PropTypes.func,
	handleDeleteGear: PropTypes.func,
	handleSubmit: PropTypes.func,
	handleReset: PropTypes.func,
	isSubmitting: PropTypes.bool,
	success: PropTypes.bool,
	touched: PropTypes.object,
	values: PropTypes.object.isRequired,
};

export default GearForm;