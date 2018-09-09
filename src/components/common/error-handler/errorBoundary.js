import React, {Component} from "react";
import {Container} from "reactstrap";
import PropTypes from "prop-types";

class ErrorBoundary extends Component {
	constructor(props) {
		super(props);
		this.state = {hasError: false, errorMessage: null};
	}

	componentDidCatch(error) {
		console.error("****************************************");
		console.error(`ErrorBoundary ${error.message}`);
		console.error("****************************************");

		// Display fallback UI
		this.setState({
			hasError: true, errorMessage: error.message
		});
	}

	render() {
		const {hasError, errorMessage} = this.state;

		if (hasError) {
			return <Container>
				<h1>{errorMessage}</h1>
			</Container>;
		}
		return this.props.children;
	}
}

ErrorBoundary.propTypes = {
	children: PropTypes.node.isRequired
};

export default ErrorBoundary;
