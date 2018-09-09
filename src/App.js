import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {PrivateRoute} from './security/privateRoute';
import firebase from "firebase";

import AddGearPage from './components/screens/addGearPage'
import Header from "./components/layout/header";
import Footer from "./components/layout/footer";
import EditGearPage from "./components/screens/editGearPage";
import HomePage from "./components/screens/homePage";
import GearListPage from "./components/screens/gearListPage";
import UserSignUpPage from "./components/screens/userSignUpPage";
import LoginPage from "./components/screens/loginPage";
import ErrorBoundary from './components/common/error-handler/errorBoundary';

const USER_AUTH_KEY = "userAuth";

export const PAGE_HOME = "/";
export const PAGE_LOGIN = "/login";
export const PAGE_LIST = "/list";
export const PAGE_ADD = "/add";
export const PAGE_EDIT_BASE = "/edit";
export const PAGE_EDIT_PATH = `${PAGE_EDIT_BASE}/:key`;
export const PAGE_USER_SIGN_UP = "/signup";

// Initialize Firebase
const config = {
	apiKey: "AIzaSyB3w1N8ycr7kql3UvICypsEk2ZF7aAymdo",
	authDomain: "bacpactrac.firebaseapp.com",
	databaseURL: "https://bacpactrac.firebaseio.com",
	projectId: "bacpactrac",
	storageBucket: "bacpactrac.appspot.com",
	messagingSenderId: "373362418095"
};
firebase.initializeApp(config);
console.log("Initialized Firebase app", firebase);

const firestore = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true};
firestore.settings(settings);
export const db = firestore;

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isAuthenticated: false
		}
	}

	componentDidMount() {
		const userAuth = localStorage.getItem(USER_AUTH_KEY);
		this.setState({
			isAuthenticated: !!userAuth
		});
	}

	updateAuthenticated = (value) => {
		this.setState({
			isAuthenticated: value
		});
	};

	render() {
		const {handleLogin, updateAuthenticated} = this;
		const {isAuthenticated} = this.state;

		return (<Router>

			<div id="gearApp">
				<Header
					isAuthenticated={isAuthenticated}
					updateAuthenticated={updateAuthenticated}
				/>
				<ErrorBoundary>
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
				</ErrorBoundary>
				<Footer/>
			</div>
		</Router>);
	}
}

export default App;
