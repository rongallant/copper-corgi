import React from "react";
import Route from "react-router-dom/es/Route";
import PropTypes from "prop-types";

import {Redirect} from "react-router-dom";
import {isLoggedIn} from "../services/authentication";
import {PAGE_LOGIN} from "../App";

export const PrivateRoute = ({component: Component, rest}) => (
	<Route {...rest} render={(props) => (
		isLoggedIn()
			? <Component {...props} />
			: <Redirect to={PAGE_LOGIN}/>
	)}/>
);

PrivateRoute.propTypes = {
	component: PropTypes.func,
	rest: PropTypes.element
};