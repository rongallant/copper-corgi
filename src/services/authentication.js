export const AUTHENTICATION_KEY = "05799a26-00d0-4c43-bd00-e51d68e4369a";

export const persistAuthToken = (userToken) => {
	localStorage.setItem(AUTHENTICATION_KEY, userToken);
};

export const removeAuthToken = () => {
	localStorage.removeItem(AUTHENTICATION_KEY);
};

export const getAuthToken = () => {
	return localStorage.getItem(AUTHENTICATION_KEY);
};

// TODO Should use verifyLogin??  Maybe only use verifyLogin on app init?
export const hasLoginToken = () => {
	const localToken = localStorage.getItem(AUTHENTICATION_KEY);
	return !!localToken;
};

export const verifyAuthToken = (userToken) => {
	const localToken = localStorage.getItem(AUTHENTICATION_KEY);
	return localToken && localToken.value === userToken;
}