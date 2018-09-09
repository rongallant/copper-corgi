import React, {Component} from "react";

import {UserSignUpForm} from '../users/components/userSignUpForm';
import {PAGE_LIST} from "../../App";

export default class UserSignUpPage extends Component {

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