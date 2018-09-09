import React, {Component} from "react";
import PropTypes from "prop-types";

import {PAGE_LIST} from "../../App";
import {UserSignUpForm} from '../users/components/userSignUpForm';

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

UserSignUpPage.propTypes = {
	history: PropTypes.object.isRequired
};

export default UserSignUpPage;
