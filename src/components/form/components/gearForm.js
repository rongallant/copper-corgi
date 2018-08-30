import React from "react";
import PropTypes from "prop-types";
import {Button, Col, Row} from 'reactstrap';
import _ from 'lodash';

import CategoryField from "../fields/categoryField";
import DescriptionField from "../fields/descriptionField";
import NameField from "../fields/nameField";
import WeightField from "../fields/weightField";

export const GearForm = props => {
	const {
		values, touched, errors, isSubmitting, handleCancel, handleChange, handleBlur, handleSubmit, handleReset, dirty,
	} = props;
	return (<form
			onSubmit={handleSubmit}
			noValidate>
			<CategoryField
				value={values.category}
				onChange={handleChange}
				onBlur={handleBlur}
				errors={errors}
				touched={touched}
			/>
			<NameField
				value={values.name}
				onChange={handleChange}
				onBlur={handleBlur}
				errors={errors}
				touched={touched}
			/>
			<WeightField
				value={values.weight}
				onChange={handleChange}
				onBlur={handleBlur}
				errors={errors}
				touched={touched}
			/>
			<DescriptionField
				value={values.description}
				onChange={handleChange}
				onBlur={handleBlur}
				errors={errors}
				touched={touched}
			/>
			<Row
				className="justify-content-end">
				<Col xs="auto"/>
				<Col md={3}>
					<Button
						block
						className="mr-3 mb-3"
						type="button"
						onClick={handleCancel}
						outline>
						Cancel
					</Button>
				</Col>
				<Col md={3}>
					<Button
						block
						className="mr-3 mb-3"
						color="secondary"
						type="button"
						onClick={handleReset}
						disabled={(!dirty && _.isEmpty(errors)) || isSubmitting}>
						Reset
					</Button>
				</Col>
				<Col md={3}>
					<Button
						block
						className="mr-3"
						color="primary"
						type="submit"
						disabled={isSubmitting}>
						Submit
					</Button>
				</Col>
			</Row>
		</form>);
};

GearForm.propTypes = {
	values: PropTypes.object.isRequired,
	touched: PropTypes.object,
	errors: PropTypes.object,
	isSubmitting: PropTypes.bool,
	handleCancel: PropTypes.func,
	handleChange: PropTypes.func,
	handleBlur: PropTypes.func,
	handleSubmit: PropTypes.func,
	handleReset: PropTypes.func,
	dirty: PropTypes.bool,
};