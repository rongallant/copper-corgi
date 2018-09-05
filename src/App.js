import React, {Component} from 'react';
import {Container} from 'reactstrap';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {PrivateRoute} from './security/privateRoute';
import Parse from "parse/node";

import AddGearPage from './components/screens/addGearPage'
import Header from "./components/layout/header";
import Footer from "./components/layout/footer";
import EditGearPage from "./components/screens/editGearPage";
import HomePage from "./components/screens/homePage";
import GearListPage from "./components/screens/gearListPage";
import UserSignUpPage from "./components/screens/userSignUpPage";
import LoginPage from "./components/screens/loginPage";

const PARSE_APP_ID = 'BacPacTracApp';
const PARSE_JS_KEY = 'BacPacTracAppJs';
const PARSE_SERVER_URL = 'http://127.0.0.1:1337/parse';

export const PAGE_HOME = "/";
export const PAGE_LOGIN = "/login";
export const PAGE_LIST = "/list";
export const PAGE_ADD = "/add";
export const PAGE_EDIT_BASE = "/edit";
export const PAGE_EDIT_PATH = `${PAGE_EDIT_BASE}/:key`;
export const PAGE_USER_SIGN_UP = "/signup";

Parse.initialize(PARSE_APP_ID, PARSE_JS_KEY);
Parse.serverURL = PARSE_SERVER_URL;

Parse.localDatastoreEnabled = true;
Parse.User.enableRevocableSessionInBackground = true;

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isAuthenticated: false
		}
	}

	componentDidMount() {
		console.log('Component DID MOUNT!');
		const userAuth = localStorage.getItem("userAuth");
		this.setState({
			isAuthenticated: !!userAuth
		});
	}

	static getDerivedStateFromProps(props, state) {
		return null;
	}

	updateAuthenticated = (value) => {
		this.setState({
			isAuthenticated: value
		});
	};

	render() {
		const {handleLogin, updateAuthenticated} = this;
		const {isAuthenticated} = this.state;
		console.log("App: isAuthenticated", isAuthenticated);

		return (<Router>

			<div id="gearApp">
				<Header
					isAuthenticated={isAuthenticated}
					updateAuthenticated={updateAuthenticated}
				/>
				<Container>
					<Switch>
						<Route
							path={PAGE_USER_SIGN_UP}
							component={UserSignUpPage}/>
						<Route exact
							path={PAGE_HOME}
							component={HomePage}
						/>
						<Route
							path={PAGE_LOGIN}
							render={(props) => <LoginPage
								{...props}
								isAuthenticated={isAuthenticated}
								updateAuthenticated={updateAuthenticated}
								handleLogin={handleLogin}
							/>}
						/>
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

export default App;
