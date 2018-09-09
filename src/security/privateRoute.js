import React from "react";
import {Redirect, Route} from "react-router-dom";

import {PAGE_LOGIN} from "../App";
import {hasLoginToken} from "../services/authentication";

export const PrivateRoute = ({ component: Component, ...rest }) => (
	<Route {...rest} render={(props) => (
		hasLoginToken()
			? <Component {...props} />
			: <Redirect to={PAGE_LOGIN} />
	)} />
);