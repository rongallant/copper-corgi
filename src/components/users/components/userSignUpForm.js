import React from 'react';
import {withFormik} from "formik";
import {Button, Col, Row} from "reactstrap";
import PropTypes from "prop-types";
import _ from "lodash";

import UserNameField from "./fields/userNameField";
import EmailField from "./fields/emailField";
import PasswordField from "./fields/passwordField";
import VerifyPasswordField from "./fields/verifyPasswordField";
import {
	validateEmail, validatePassword, validateSamePassword, validateUsername
} from "../../common/formValidationRules";

const formikConfig = {

	mapPropsToValues: () => {
		return {username: "", email: "", password: "", verifyPassword: ""};
	},

	validate: values => {
		let errors = {};

		const userNameErrors = validateUsername(values.username, true);
		if (userNameErrors) {
			errors.username = userNameErrors;
		}

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

	handleSubmit: (values, {props}) => {
		props.handleAddUser(values, props);
	},

	displayName: 'UserSignUpForm',

};

const Form = props => {
	const {
		values, dirty, touched, errors, isSubmitting, handleChange,
		handleBlur, handleReset, handleSubmit,
	} = props;
	const {username, email, password, verifyPassword} = values;

	return (<form id="userSignUp" onSubmit={handleSubmit} noValidate>
		<UserNameField
			autoComplete="username"
			value={username}
			onChange={handleChange}
			onBlur={handleBlur}
			errors={errors}
			touched={touched}
		/>
		<EmailField
			value={email}
			onChange={handleChange}
			onBlur={handleBlur}
			errors={errors}
			touched={touched}
		/>
		<Row>
			<Col sm={6}>
				<PasswordField
					autoComplete="new-password"
					value={password}
					onChange={handleChange}
					onBlur={handleBlur}
					errors={errors}
					touched={touched}
				/>
			</Col>
			<Col sm={6}>
				<VerifyPasswordField
					autoComplete="new-password"
					value={verifyPassword}
					onChange={handleChange}
					onBlur={handleBlur}
					errors={errors}
					touched={touched}
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
	</form>);
};

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
	dirty: PropTypes.bool,
};

export const UserSignUpForm = withFormik(formikConfig)(Form);


