import React, {Component} from "react";

import {UserLoginForm} from "../users/components/loginForm";

export default class HomePage extends Component {

	render() {
		return (<div>
			<h3>Welcome home!</h3>
			<UserLoginForm
				{...this.props}
			/>
		</div>)
	}
}