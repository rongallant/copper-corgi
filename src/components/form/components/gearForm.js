import React from "react";
import PropTypes from "prop-types";
import {Button, Col, Row} from 'reactstrap';
import _ from 'lodash';

import CategoryField from "./fields/categoryField";
import DescriptionField from "./fields/descriptionField";
import EditFormMenu from "./editFormMenu";
import NameField from "./fields/nameField";
import WeightField from "./fields/weightField";

export const GearForm = props => {
	const {
		values, touched, errors, isSubmitting, handleCancel, handleDeleteGear,
		handleChange, handleBlur, handleSubmit, handleReset, dirty,
	} = props;
	const {name, category, description, id, weight} = values;

	return (<form onSubmit={handleSubmit} noValidate>
		{id && <EditFormMenu
			gearId={id}
			handleDeleteGear={handleDeleteGear}
			handleReset={handleReset}
		/>}
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
};

GearForm.defaultProps = {
	handleDeleteGear: null
};

GearForm.propTypes = {
	values: PropTypes.object.isRequired,
	touched: PropTypes.object,
	errors: PropTypes.object,
	isSubmitting: PropTypes.bool,
	handleCancel: PropTypes.func,
	handleChange: PropTypes.func,
	handleDeleteGear: PropTypes.func,
	handleBlur: PropTypes.func,
	handleSubmit: PropTypes.func,
	handleReset: PropTypes.func,
	dirty: PropTypes.bool,
};