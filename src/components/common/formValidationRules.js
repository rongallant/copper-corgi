/*
* Form Validation Rule Library
* */

const email_pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const username_pattern = /^\w+\d*$/; // Only numbers and letters.
const password_pattern = /^([\D])\w+([\d])$/; // Must have upper/lower/number

export const validateRequired = value => {
	if (!value) {
		return 'Required.';
	}
	return null;
};

export const validateUsername = (value, required) => {
	if (required && validateRequired(value)) {
		return validateRequired(value); // No value
	} else if (!value) {
		return null;
	}
	if (value.length < 8) {
		return 'Must be more than 8 characters.';  // Length
	}
	if (value.length > 128) {
		return 'Must be less than 128 characters.';  // Length
	}
	const expression = new RegExp(username_pattern);
	if (!expression.exec(value)) {
		return 'Can only contain letters and numbers .'; // Pattern
	}
	return null;
};

export const validatePassword = (value, required) => {
	if (required && validateRequired(value)) {
		return validateRequired(value); // No value
	} else if (!value) {
		return null;
	}
	if (value.length < 8) {
		return 'Must be more than 8 characters.';  // Length
	}
	if (value.length > 128) {
		return 'Must be less than 128 characters.';  // Length
	}
	const expression = new RegExp(password_pattern);
	if (!expression.exec(value)) {
		return 'Must contain letters and numbers.'; // Pattern
	}
	return null;
};

export const validateSamePassword = (pass1, pass2) => {
	if (pass1 !== pass2) {
		return 'Passwords do not match.'
	}
	return null;
};

export const validateEmail = (value, required) => {
	if (required && validateRequired(value)) {
		return validateRequired(value); // No value
	} else if (!value) {
		return false;
	}
	if (value.length > 254) {
		return 'Must be less than 256 characters.';  // Length
	}
	const expression = new RegExp(email_pattern);
	if (!expression.exec(value)) {
		return 'Must be a valid email.'; // Pattern
	}
	return null;
};
