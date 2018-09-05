import React, {Component} from "react";
import {withFormik} from "formik";
import {Button, Col, Row} from "reactstrap";
import Redirect from "react-router-dom/es/Redirect";
import Parse from "parse/node";

import {validateRequired} from "../../common/formValidationRules";
import UserNameField from "./fields/userNameField";
import PasswordField from "./fields/passwordField";
import {isLoggedIn} from "../../../services/authentication";
import {PAGE_LIST} from "../../../App";

const formConfig = {

	mapPropsToValues: (props) => {
		console.log('mapPropsToValues', props);
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
					console.log("handleSubmit: Logged in", username);
					localStorage.setItem("userAuth", "true");
					setStatus({success: true});
				} else {
					console.log("handleSubmit: Not logged in");
					localStorage.removeItem("userAuth");
					setStatus({success: false});
				}
				console.log("handleSubmit: Logged in", isLoggedIn());
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

	render() {
		const {
			values, status, touched, errors, isSubmitting, updateAuthenticated, handleChange, handleBlur, handleSubmit
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
				value={username}
				onChange={handleChange}
				onBlur={handleBlur}
				errors={errors}
				touched={touched}
			/>
			<PasswordField
				value={password}
				onChange={handleChange}
				onBlur={handleBlur}
				errors={errors}
				touched={touched}
			/>
			<Row>
				<Col sm={4}>
					<Button
						block
						className="mr-3"
						color="primary"
						type="submit"
						disabled={isSubmitting}>
						Login
					</Button>
				</Col>
			</Row>
		</form>);
	}
}

export const UserLoginForm = withFormik(formConfig)(Form);
