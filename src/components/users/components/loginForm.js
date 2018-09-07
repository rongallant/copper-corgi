import React, {Component} from "react";
import {withFormik} from "formik";
import {Button, Col, Row} from "reactstrap";
import Parse from "parse/node";
import {Redirect} from "react-router-dom";
import PropTypes from "prop-types";
import _ from "lodash";
import {validateRequired} from "../../common/formValidationRules";
import UserNameField from "./fields/userNameField";
import PasswordField from "./fields/passwordField";
import {PAGE_LIST, PAGE_USER_SIGN_UP} from "../../../App";

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
	handleSubmit: (values, {resetForm, setErrors, setStatus, setSubmitting}) => {
		const {username, password} = values;
		Parse.User.logIn(username, password)
			.then(user => {
				if (!!user) {
					localStorage.setItem("userAuth", "true");
					setStatus({success: true});
				} else {
					console.log("handleSubmit: Not logged in");
					localStorage.removeItem("userAuth");
					setStatus({success: false});
				}
			})
			.catch(e => {
				localStorage.removeItem("userAuth");
				console.error(e);
				setStatus({success: false});
				throw new Error("Could not login.");
			});
		setSubmitting(false);
	},
	displayName: 'UserLoginForm',
};

class Form extends Component {

	handleSignUp = (e) => {
		e.preventDefault();
		return this.props.history.push(PAGE_USER_SIGN_UP);
	};

	render() {
		const {handleSignUp} = this;
		const {
			values, dirty, status, touched, errors, isSubmitting,
			updateAuthenticated, handleChange, handleBlur, handleSubmit
		} = this.props;
		const {username, password} = values;

		if (status) {
			updateAuthenticated(true);
			return <Redirect to={PAGE_LIST}/>
		}

		return (<form id="userLogin"
			onSubmit={handleSubmit}
			noValidate>
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
	dirty: PropTypes.bool
};

export const UserLoginForm = withFormik(formConfig)(Form);
