import Parse from "parse/node";

export const USER_AUTHENTICATED = 'USER_AUTHENTICATED';
export const AUTHENTICATE_USER = 'AUTHENTICATE_USER';

export const checkUserAuthentication = () => {
	return {
		type: USER_AUTHENTICATED, value: !!Parse.User.current()
	}
};

export const authenticateUser = (dispatch, username, password) => {
	console.log("authenticateUser", username, password);
	return dispatch => {
		Parse.User.logIn(username, password).then(user => {
			console.log('authenticateUser: value', user);
			return {type: AUTHENTICATE_USER, value: !!user};
		}).catch(e => {
			console.error(e);
			throw e;
		})
	};
};
