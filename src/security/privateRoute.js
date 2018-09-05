import Route from "react-router-dom/es/Route";
import {isLoggedIn} from "../services/authentication";
import React from "react";
import Redirect from "react-router-dom/es/Redirect";
import {PAGE_LOGIN} from "../App";

export const PrivateRoute = ({ component: Component, ...rest }) => (
	<Route {...rest} render={(props) => (
		isLoggedIn()
			? <Component {...props} />
			: <Redirect to={PAGE_LOGIN} />
	)} />
);