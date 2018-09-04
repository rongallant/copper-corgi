import React, {Component} from 'react';
import {Container} from 'reactstrap';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {PrivateRoute} from './security/privateRoute';
import Parse from "parse/node";
import {connect} from 'react-redux';

import AddGearPage from './components/screens/addGearPage'
import Header from "./components/layout/header";
import Footer from "./components/layout/footer";
import EditGearPage from "./components/screens/editGearPage";
import HomePage from "./components/screens/homePage";
import GearListPage from "./components/screens/gearListPage";
import UserSignUpPage from "./components/screens/userSignUpPage";

import {checkUserAuthentication} from "./actions/authenticationActions";

const PARSE_APP_ID = 'BacPacTracApp';
const PARSE_JS_KEY = 'BacPacTracAppJs';
const PARSE_SERVER_URL = 'http://127.0.0.1:1337/parse';

export const PAGE_HOME = "/";
export const PAGE_LIST = "/list";
export const PAGE_ADD = "/add";
export const PAGE_EDIT_BASE = "/edit";
export const PAGE_EDIT_PATH = `${PAGE_EDIT_BASE}/:key`;
export const PAGE_USER_SIGN_UP = "/signup";

Parse.initialize(PARSE_APP_ID, PARSE_JS_KEY);
Parse.serverURL = PARSE_SERVER_URL;

class App extends Component {

	componentDidMount() {
		this.props.checkUserAuthentication();
	}

	render() {
		const {userAuthenticated} = this.props;

		return (<Router>
			<div id="gearApp">
				<Header isAuthenticated={userAuthenticated}/>
				<Container>
					<Switch>
						<Route path={PAGE_USER_SIGN_UP} component={UserSignUpPage}/>
						<Route exact path={PAGE_HOME} component={HomePage}/>
						<PrivateRoute path={PAGE_LIST} component={GearListPage}/>
						<PrivateRoute path={PAGE_ADD} component={AddGearPage}/>
						<PrivateRoute path={PAGE_EDIT_PATH} component={EditGearPage}/>
					</Switch>
				</Container>
				<Footer/>
			</div>
		</Router>);
	}
}

const mapStateToProps = state => {
	return {
		userAuthenticated: state.userAuthenticated
	};
};

const mapDispatchToProps = dispatch => {
	return {
		checkUserAuthentication: () => dispatch(checkUserAuthentication())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
