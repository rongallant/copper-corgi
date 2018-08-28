import React from "react";
import {Button, Col, Row} from 'reactstrap';
import _ from 'lodash';

import CategoryField from "./fields/categoryField";
import NameField from "./fields/nameField";
import WeightField from "./fields/weightField";
import DescriptionField from "./fields/descriptionField";

export const GearForm = props => {
    const {
        values,
        touched,
        errors,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit,
        handleReset,
        dirty,
    } = props;
    return (
        <form
            onSubmit={handleSubmit}
            noValidate>
	        <CategoryField
		        value={values.email}
		        onChange={handleChange}
		        onBlur={handleBlur}
		        errors={errors}
		        touched={touched}
	        />
	        <NameField
		        value={values.email}
		        onChange={handleChange}
		        onBlur={handleBlur}
		        errors={errors}
		        touched={touched}
	        />
	        <WeightField
		        value={values.username}
		        onChange={handleChange}
		        onBlur={handleBlur}
		        errors={errors}
		        touched={touched}
	        />
	        <DescriptionField
		        value={values.email}
		        onChange={handleChange}
		        onBlur={handleBlur}
		        errors={errors}
		        touched={touched}
	        />
            <Row
                className="justify-content-end">
                <Col xs="auto"/>
                <Col md={4} >
                    <Button
                        block
                        className="mr-3 mb-3"
                        type="button"
                        onClick={handleReset}
                        disabled={(!dirty && _.isEmpty(errors)) || isSubmitting}>
                        Reset
                    </Button>
                </Col>
                <Col md={4}>
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
        </form>
    );
};
