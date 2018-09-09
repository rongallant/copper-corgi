import React, {Component} from "react";
import firebase from "firebase";

import {UserSignUpForm} from '../users/components/userSignUpForm';
import {Container} from "reactstrap";

export default class UserSignUpPage extends Component {

	handleAddUser = (email, password, updateAuthenticated) => {
		console.log('handleAddUser: email', email);
		console.log('handleAddUser: password', password);

		firebase.auth().createUserWithEmailAndPassword(email, password)
			.then(result => {
				console.info("Signed up user.");
				localStorage.setItem("userAuth", "true");
				updateAuthenticated(result.user.uid); // set state on App.js
			})
			.catch(function (error) {
				console.error("Error signing up user.");
				localStorage.removeItem("userAuth");
				updateAuthenticated(null);
				throw error;
			});
	};

	render() {
		const {handleAddUser} = this;
		const {updateAuthenticated} = this.props;

		console.log('props', this.props);

		return (<Container>
			<h3>User Sign Up</h3>
			<UserSignUpForm
				{...this.props}
				handleAddUser={handleAddUser}
				updateAuthenticated={updateAuthenticated}
			/>
		</Container>);
	}
}