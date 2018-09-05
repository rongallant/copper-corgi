import Parse from "parse/node";
import {isLoggedIn} from "./authentication";

export default class AuthService {

	// Initializing important variables
	constructor() {
		this.login = this.login.bind(this)
		this.getProfile = this.getProfile.bind(this)
	}

	login(username, password) {
		// Get a token from api server using the fetch api
		Parse.User.logIn(username, password).then(user => {
			console.log("Logged in", isLoggedIn());
			this.setToken(user.sessionToken) // Setting the token in localStorage
			return Promise.resolve(res);
		}).catch(e => {
			console.error(e);
			throw new Error("Could not login.");
		});
	}

	loggedIn() {
		if (Parse.User.current() === null) {
			console.log('authentication.isLoggedIn: authenticated', true);
			return false;
		}
		console.log('authentication.isLoggedIn: authenticated', Parse.User.current().authenticated());
		return Parse.User.current().authenticated();
	}

	logout() {
		// Clear user token and profile data from localStorage
		Parse.User.logOut();
		localStorage.removeItem('id_token');
	}

	getProfile() {
		return Parse.User;
	}
}