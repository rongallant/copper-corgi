import React, {Component} from "react";
import firebase from "firebase";

import {UserLoginForm} from "../users/components/loginForm";
import {PAGE_USER_SIGN_UP} from "../../App";
import {Container} from "reactstrap";

export default class LoginPage extends Component {

	handleUserLogin = (username, password, updateAuthenticated) => {
		return firebase.auth().signInWithEmailAndPassword(username, password)
			.then(result => {
				console.info("Logged in.");
				localStorage.setItem("userAuth", "true");
				updateAuthenticated(result.user.uid); // set state on App.js
			})
			.catch(function (error) {
				console.error("Error logging in.");
				localStorage.removeItem("userAuth");
				updateAuthenticated(null);
				throw error;
			});
	};

	handleSignUp = () => {
		return this.props.history.push(PAGE_USER_SIGN_UP);
	};

	render() {
		const {updateAuthenticated} = this.props;
		const {handleUserLogin, handleSignUp} = this;

		return (<Container>
			<h3>Login</h3>
			<UserLoginForm
				{...this.props}
				handleSignUp={handleSignUp}
				handleUserLogin={handleUserLogin}
				updateAuthenticated={updateAuthenticated}
			/>
		</Container>)
	}
}