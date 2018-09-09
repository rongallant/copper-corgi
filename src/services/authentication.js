import Parse from "parse/node";

export const login = (username, password) => {
	Parse.User.logIn(username, password)
		.then(user => {
			if (!!user) {
				console.info("Logged in", username);
				localStorage.setItem("userAuth", "true");
			} else {
				console.info("Not logged in");
				localStorage.removeItem("userAuth");
			}
			console.log("Logged in", isLoggedIn());
		}).catch(e => {
		localStorage.removeItem("userAuth");
		console.error(e);
		throw new Error("Could not login.");
	});
}, isLoggedIn = () => {
	const userAuth = localStorage.getItem("userAuth");
	return !!userAuth;
	// if (Parse.User.current() === null) {
	// 	console.log('authentication.isLoggedIn: authenticated', true);
	// 	return false;
	// }
	// console.log('authentication.isLoggedIn: authenticated', Parse.User.current().authenticated());
	// return Parse.User.current().authenticated();
}, logout = () => {
	const logoutPromise = Parse.User.logOut();
	localStorage.removeItem("userAuth");
	console.info("logout promise", logoutPromise);
	return false;
};