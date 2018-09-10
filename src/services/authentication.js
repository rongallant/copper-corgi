import { USER_AUTH_KEY } from "../App";

export const login = (username, password) => {
	}, isLoggedIn = () => {
		const userAuth = localStorage.getItem(USER_AUTH_KEY);
		return !!userAuth;
	}, logout = () => {
		localStorage.removeItem(USER_AUTH_KEY);
		return false;
	};