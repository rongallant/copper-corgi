import React, {Component} from "react";
import PropTypes from "prop-types";

import {PAGE_LIST} from "../../App";
import {UserSignUpForm} from '../users/components/userSignUpForm';

class UserSignUpPage extends Component {

	handleAddUser = (values) => {
		console.log('handleAddUser: values', values);
		// TODO Implement firebase
		this.props.history.push(PAGE_LIST); // Go to list
	};

	render() {
		const {handleAddUser} = this;

		return (<div>
			<h3>User Sign Up</h3>
			<UserSignUpForm
				handleAddUser={handleAddUser}
			/></div>)
	}
}

UserSignUpPage.propTypes = {
	history: PropTypes.object.isRequired
};

export default UserSignUpPage;
