import Parse from "parse/node";

export const USER_AUTHENTICATED = 'USER_AUTHENTICATED';
export const AUTHENTICATE_USER = 'AUTHENTICATE_USER';

export const checkUserAuthentication = () => {
	return {
		type: USER_AUTHENTICATED, value: !!Parse.User.current()
	}
};

export const authenticateUser = (username, password) => {
	console.log("authenticateUser", username, password);
	Parse.User.logIn(username, password).then(user => {
		return {type: AUTHENTICATE_USER, value: !!user};
	}).catch(e => {
		console.error(e);
		throw new Error("Could not login.");
	});
};
