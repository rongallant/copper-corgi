export const login = (username, password) => {
}, isLoggedIn = () => {
	const userAuth = localStorage.getItem("userAuth");
	return !!userAuth;
}, logout = () => {
	localStorage.removeItem("userAuth");
	return false;
};