import {AUTHENTICATE_USER, USER_AUTHENTICATED} from "./actions/authenticationActions";

export default (state = {}, action) => {
	switch (action.type) {
		case USER_AUTHENTICATED:
			state = {userAuthenticated: action.value};
			return state;
		case AUTHENTICATE_USER:
			state = {userAuthenticated: action.value};
			return state;
		default:
			return state
	}
}
