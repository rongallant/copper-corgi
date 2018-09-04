import Route from "react-router-dom/es/Route";
import {isLoggedIn} from "../services/authentication";
import React from "react";
import Redirect from "react-router-dom/es/Redirect";

export const PrivateRoute = ({ component: Component, ...rest }) => (
	<Route {...rest} render={(props) => (
		isLoggedIn()
			? <Component {...props} />
			: <Redirect to='/login' />
	)} />
);