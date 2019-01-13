import React from "react";
import PropTypes from "prop-types";
import {Redirect, Route} from "react-router-dom";
import {isLoggedIn} from "../services/authentication";
import {withRouter} from "react-router";
import {PAGE_LOGIN} from "../App";

class PrivateRoute extends React.Component {

	render() {
		const {path, component: Component} = this.props;
		if (isLoggedIn()) {
			return <Route path={path} component={Component}/>
		}
		return <Redirect to={PAGE_LOGIN}/>
	}
}

PrivateRoute.propTypes = {
	component: PropTypes.func
};

export default withRouter(PrivateRoute);
