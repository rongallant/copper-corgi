import React, {Component} from "react";
import PropTypes from "prop-types";
import firebase from "firebase";
import {Container} from "reactstrap";

import {PAGE_USER_SIGN_UP, USER_AUTH_KEY} from "../../App";
import {UserLoginForm} from "../users/components/loginForm";

class LoginPage extends Component {

	handleSignUp = () => {
		return this.props.history.push(PAGE_USER_SIGN_UP);
	};

	handleUserLogin = (username, password, updateAuthenticated) => {
		return firebase.auth().signInWithEmailAndPassword(username, password)
			.then(result => {
				console.info("Logged in.");
				localStorage.setItem(USER_AUTH_KEY, result.user.uid);
				updateAuthenticated(result.user.uid); // set state on App.js
			})
			.catch(error => {
				console.error('Error Code:', error.code);
				localStorage.removeItem(USER_AUTH_KEY);
				updateAuthenticated(null);
				throw error;
			});
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

LoginPage.propTypes = {
	history: PropTypes.object.isRequired, updateAuthenticated: PropTypes.func.isRequired
};

export default LoginPage;
