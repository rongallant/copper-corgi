import React, {Component} from "react";

import {UserLoginForm} from '../users/components/loginForm'

class HomePage extends Component {

	render() {
		const {handleUserLogin} = this.props;

		return (<div>
			<h3>Welcome home!</h3>
			<UserLoginForm handleSubmit={handleUserLogin}/>
		</div>)
	}
}

export default HomePage;
