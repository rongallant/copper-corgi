import React, {Component} from "react";
import firebase from "firebase";

import {UserLoginForm} from "../users/components/loginForm";
import {PAGE_USER_SIGN_UP} from "../../App";
import {Alert, Container} from "reactstrap";

export default class LoginPage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			error: null
		}
	};

	_handleUserLogin = (username, password, updateAuthenticated, setErrors, setFormikState) => {
		firebase.auth().signInWithEmailAndPassword(username, password)
			.then(result => {
				console.debug("signInWithEmailAndPassword", result.user.uid);
				localStorage.setItem("userAuth", "true");
				updateAuthenticated(result.user.uid);
				setFormikState({success: true});
			})
			.catch(function (error) {
				localStorage.removeItem("userAuth");
				updateAuthenticated(null);
				setFormikState({success: false});
				setErrors({formError: error.message});
			});
	};

	_handleSignUp = (e) => {
		e.preventDefault();
		return this.props.history.push(PAGE_USER_SIGN_UP);
	};

	render() {
		const {updateAuthenticated} = this.props;
		const {_handleUserLogin, _handleSignUp} = this;

		return (<Container>
			<h3>Login</h3>
			<UserLoginForm
				{...this.props}
				handleSignUp={_handleSignUp}
				handleUserLogin={_handleUserLogin}
				updateAuthenticated={updateAuthenticated}
			/>
		</Container>)
	}
}