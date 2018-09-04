import React, {Component} from "react";
import {withFormik} from "formik";
import {Button, Col, Row} from "reactstrap";

import {validateRequired} from "../../common/formValidationRules";
import UserNameField from "./fields/userNameField";
import PasswordField from "./fields/passwordField";
import {login} from "../../../services/authentication";
import {PAGE_LIST} from "../../../App";
import connect from "react-redux/es/connect/connect";
import {authenticateUser} from "../../../actions/authenticationActions";

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

	handleSubmit: (values, {props}) => {
		props.handleUserLogin(values.username, values.password);
	},

	displayName: 'UserLoginForm',
};

class Form extends Component {

	render() {
		const {
			values, touched, errors, isSubmitting, handleCancel, handleChange,
			handleBlur, handleSubmit, handleUserLogin, dirty,
		} = this.props;
		const {username, password} = values;

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

const mapStateToProps = state => {
	return {
		userAuthenticated: state.userAuthenticated
	};
};

const mapDispatchToProps = dispatch => {
	return {
		handleUserLogin: () => dispatch(authenticateUser)
	};
};

const UserLoginForm = connect(
	mapStateToProps,
	mapDispatchToProps
)(withFormik(formConfig)(Form));

export default UserLoginForm;
