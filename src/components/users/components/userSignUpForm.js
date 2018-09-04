import React from 'react';
import {withFormik} from "formik";
import {Button, Col, Row} from "reactstrap";

import UserNameField from "./fields/userNameField";
import EmailField from "./fields/emailField";
import PasswordField from "./fields/passwordField";
import VerifyPasswordField from "./fields/verifyPasswordField";
import {validateEmail, validatePassword, validateSamePassword, validateUsername} from "../../common/formValidationRules";

const Form = props => {
	const {
		values, touched, errors, isSubmitting, handleChange, handleBlur, handleSubmit,
	} = props;
	const {username, email, password, verifyPassword} = values;

	return (<form id="userSignUp" onSubmit={handleSubmit} noValidate>
		<UserNameField
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
					value={password}
					onChange={handleChange}
					onBlur={handleBlur}
					errors={errors}
					touched={touched}
				/>
			</Col>
			<Col sm={6}>
				<VerifyPasswordField
					value={verifyPassword}
					onChange={handleChange}
					onBlur={handleBlur}
					errors={errors}
					touched={touched}
				/>
			</Col>
		</Row>
		<Row>
			<Col sm={4}>
				<Button
					block
					className="mr-3"
					color="primary"
					type="submit"
					disabled={isSubmitting}>
					Sign up!
				</Button>
			</Col>
		</Row>
	</form>);
};


export const UserSignUpForm = withFormik({

	mapPropsToValues: (props) => {
		return {username: "", email: "", password: "", verifyPassword: ""};
	},

	validate: values => {
		let errors = {};

		const isUsername = validateUsername(values.username, true);
		if (isUsername) {
			errors.username = isUsername;
		}

		const isEmail = validateEmail(values.email, true);
		if (isEmail) {
			errors.email = isEmail;
		}

		const isPassword = validatePassword(values.password, true);
		if (isPassword) {
			errors.password = isPassword;
		}

		const isSamePassword = validateSamePassword(values.password, values.verifyPassword);
		if (isSamePassword) {
			errors.verifyPassword = isSamePassword;
		}

		return errors;
	},

	handleSubmit: (values, {props}) => {
		props.handleAddUser(values, props);
	},

	displayName: 'UserSignUpForm',

})(Form);


