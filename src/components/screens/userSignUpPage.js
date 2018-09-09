import React, {Component} from "react";
import PropTypes from "prop-types";
import firebase from "firebase";
import {Container} from "reactstrap";

import {UserSignUpForm} from '../users/components/userSignUpForm';
import {USER_AUTH_KEY} from "../../App";

class UserSignUpPage extends Component {

	handleAddUser = (email, password, updateAuthenticated) => {
		return firebase.auth().createUserWithEmailAndPassword(email, password)
			.then(() => {
				localStorage.setItem("userAuth", "true");
				updateAuthenticated(true); // set state on App.js
			})
			.catch(function (error) {
				localStorage.removeItem("userAuth");
				updateAuthenticated(null);
				throw error;
			});
	};

	render() {
		const {handleAddUser} = this;
		const {updateAuthenticated} = this.props;

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

UserSignUpPage.propTypes = {
	updateAuthenticated: PropTypes.func.isRequired
};

export default UserSignUpPage;
