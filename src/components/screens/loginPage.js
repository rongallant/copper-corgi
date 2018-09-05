import React, {Component} from "react";

import {UserLoginForm} from "../users/components/loginForm";

export default class LoginPage extends Component {

	render() {
		return (<div>
			<h3>Login</h3>
			<UserLoginForm
				{...this.props}
			/>
		</div>)
	}
}