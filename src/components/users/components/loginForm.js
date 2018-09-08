import React, {Component} from "react";
import {withFormik} from "formik";
import {Alert, Button, Col, Row} from "reactstrap";
import {Redirect} from "react-router-dom";
import PropTypes from "prop-types";
import _ from "lodash";

import {validateRequired} from "../../common/formValidationRules";
import UserNameField from "./fields/userNameField";
import PasswordField from "./fields/passwordField";
import {PAGE_LIST} from "../../../App";

const formConfig = {
	mapPropsToValues: () => {
		return {username: "", password: ""};
	},
	validate: values => {
		let errors = {};
		const isUsername = validateRequired(values.username);
		if (isUsername) {
			errors.username = isUsername;
		}
		const isPassword = validateRequired(values.password);
		if (isPassword) {
			errors.password = isPassword;
		}
		return errors;
	},
	handleSubmit: (values, {props, setFormikState, setSubmitting, setErrors}) => {
		// INFO How to deal with error messages.
		const {username, password} = values;
		// TODO const success = handleUserLogin
		props.handleUserLogin(username, password, props.updateAuthenticated, setFormikState, setErrors);
		setSubmitting(false);
	}, displayName: 'UserLoginForm',
};

class Form extends Component {

	showErrors = (errors) => {
		return errors.formError && <Alert color="warning">{errors.formError}</Alert>
	};

	render() {
		const {
			values, dirty, status, touched, errors, isSubmitting, updateAuthenticated, handleChange, handleBlur, handleSignUp, handleSubmit, success
		} = this.props;
		const {username, password} = values;

		console.log('props', this.props);

		console.log('status', status);
		console.log('success', success);
		console.log('errors.success', errors.success);

		if (errors.success) {
			updateAuthenticated(true);
			return <Redirect to={PAGE_LIST}/>
		}

		return (<form id="userLogin" onSubmit={handleSubmit} noValidate>

			{this.showErrors(errors)}

			<UserNameField
				autoComplete="username"
				value={username}
				onChange={handleChange}
				onBlur={handleBlur}
				errors={errors}
				touched={touched}
			/>
			<PasswordField
				autoComplete="current-password"
				value={password}
				onChange={handleChange}
				onBlur={handleBlur}
				errors={errors}
				touched={touched}
			/>
			<Row className="justify-content-end">
				<Col sm={3}>
					<Button
						block
						className="mr-3 mb-3"
						color="link"
						disabled={isSubmitting}
						onClick={handleSignUp}>
						Create Account
					</Button>
				</Col>
				<Col sm={3}>
					<Button
						block
						className="mr-3 mb-3"
						color="primary"
						type="submit"
						disabled={!dirty || !_.isEmpty(errors) || isSubmitting}>
						Login
					</Button>
				</Col>
			</Row>
		</form>);
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
	handleUserLogin: PropTypes.func.isRequired,
	dirty: PropTypes.bool
};

export const UserLoginForm = withFormik(formConfig)(Form);
