import React, {Component} from 'react';
import AuthService from "./authService";

export default function withAuth(AuthComponent) {

	constructor() {
		super();
		this.state = {
			user: null
		}
	}

	componentWillMount()
	{
		if (!AuthService.loggedIn()) {
			this.props.history.replace('/login');
		} else {
			try {
				const profile = AuthService.getProfile();
				this.setState({
					user: profile
				})
			} catch (err) {
				AuthService.logout();
				this.props.history.replace('/login');
			}
		}
	}

	return class AuthWrapped extends Component {
		// Code here now
	}
}