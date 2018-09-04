import Parse from "parse/node";

export const login = (username, password) => {
	Parse.User.logIn(username, password).then(user => {
		// console.log("Logged in", isLoggedIn());
		// TODO Do stuff after successful login.
	}).catch(e => {
		console.error(e);
		throw new Error("Could not login.");
	});
}, isLoggedIn = () => {
	if (Parse.User.current() === null) {
		// console.log('authentication.isLoggedIn: authenticated', true);
		return false;
	}
	// console.log('authentication.isLoggedIn: authenticated', Parse.User.current().authenticated());
	return Parse.User.current().authenticated();
}, logout = () => {
	// console.log('logout', Parse.User.logOut());
	return true;
};