import React, {Component} from "react";
import {withFormik} from "formik";
import {Alert, Button, Col, Row} from "reactstrap";
import {Redirect} from "react-router-dom";
import PropTypes from "prop-types";
import _ from "lodash";

import EmailField from "./fields/emailField";
import PasswordField from "./fields/passwordField";
import VerifyPasswordField from "./fields/verifyPasswordField";
import Loading from "../../common/loadingComponent";
import {PAGE_LIST} from "../../../App";
import {
	validateEmail, validatePassword, validateSamePassword
} from "../../common/formValidationRules";

const formikConfig = {

	validate: values => {
		let errors = {};
		const emailErrors = validateEmail(values.email, true);
		if (emailErrors) {
			errors.email = emailErrors;
		}
		const passwordErrors = validatePassword(values.password, true);
		if (passwordErrors) {
			errors.password = passwordErrors;
		}
		const samePasswordErrors = validateSamePassword(values.password, values.verifyPassword);
		if (samePasswordErrors) {
			errors.verifyPassword = samePasswordErrors;
		}
		return errors;
	},

	handleSubmit: async (values, {props, setSubmitting, setErrors, setFormikState}) => {
		try {
			setFormikState({loading: true});
			const {email, password} = values;
			await props.handleAddUser(email, password, props.updateAuthenticated);
			setFormikState({success: true});
		} catch (error) {
			setFormikState({success: false, loading: false});
			setErrors({formError: error.message});
		}
		setSubmitting(false);
	},

	displayName: 'UserSignUpForm',
};

class Form extends Component {

	showErrors = (errors) => {
		return errors.formError && <Alert color="warning">{errors.formError}</Alert>
	};

	render() {
		const {
			values: {email, password, verifyPassword}, dirty, touched, errors, isSubmitting, handleChange, handleBlur, handleReset, handleSubmit, loading, success
		} = this.props;

		if (success === true) {
			return <Redirect to={PAGE_LIST}/>
		}

		return (<Loading loading={loading}>
			<form id="userSignUp" onSubmit={handleSubmit} noValidate>
				{this.showErrors(errors)}
				<EmailField
					autoComplete="username"
					errors={errors}
					id="email"
					onBlur={handleBlur}
					onChange={handleChange}
					touched={touched}
					value={email}
				/>
				<Row>
					<Col sm={6}>
						<PasswordField
							autoComplete="new-password"
							errors={errors}
							id="password"
							onBlur={handleBlur}
							onChange={handleChange}
							touched={touched}
							value={password}
						/>
					</Col>
					<Col sm={6}>
						<VerifyPasswordField
							autoComplete="new-password"
							errors={errors}
							id="verifyPassword"
							onBlur={handleBlur}
							onChange={handleChange}
							touched={touched}
							value={verifyPassword}
						/>
					</Col>
				</Row>
				<Row className="justify-content-end">
					<Col sm={3}>
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
					<Col sm={3}>
						<Button
							block
							className="mr-3 mb-3"
							color="primary"
							type="submit"
							disabled={!dirty || !_.isEmpty(errors) || isSubmitting}>
							Sign up!
						</Button>
					</Col>
				</Row>
			</form>
		</Loading>);
	}
}

Form.propTypes = {
	values: PropTypes.object.isRequired,
	touched: PropTypes.object,
	errors: PropTypes.object,
	isSubmitting: PropTypes.bool,
	handleCancel: PropTypes.func,
	handleChange: PropTypes.func,
	handleBlur: PropTypes.func,
	handleSubmit: PropTypes.func,
	handleReset: PropTypes.func,
	handleAddUser: PropTypes.func.isRequired,
	dirty: PropTypes.bool,
};

export const UserSignUpForm = withFormik(formikConfig)(Form);
