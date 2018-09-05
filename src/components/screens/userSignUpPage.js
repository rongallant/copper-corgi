import React from "react";
import ParseReact from "parse-react";

import {UserSignUpForm} from '../users/components/userSignUpForm';
import Parse from "parse/node";
import {PAGE_LIST} from "../../App";

export default class UserSignUpPage extends ParseReact.Component(React) {

	observe() {
	}

	handleAddUser = (values) => {
		console.log('handleAddUser: values', values);


		// var role = new Parse.Role(roleName, roleACL);
		// role.getUsers().add(usersToAddToRole);
		// role.getRoles().add(rolesToAddToRole);
		// role.save();


		const {username, email, password} = values;
		const User = Parse.Object.extend("User");
		const user = new User();

		user.set("username", username);
		user.set("email", email);
		user.set("password", password);

		user.save()
			.then((user) => {
				console.log('New user created with objectId: ' + user.id);
			}, (e) => {
				console.error(e);
				throw new Error("Error creating user.");
			});

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