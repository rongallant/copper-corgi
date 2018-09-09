import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {PrivateRoute} from './security/privateRoute';
import Parse from "parse/node";
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
import {removeAuthToken} from "./services/authentication";

const PARSE_APP_ID = 'BacPacTracApp';
const PARSE_JS_KEY = 'BacPacTracAppJs';
const PARSE_SERVER_URL = 'http://127.0.0.1:1337/parse';
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

// 
firebase.auth().onAuthStateChanged(function(user) {
	console.log('onAuthStateChanged', user);
	if (user) {

	} else {
		// No user is signed in.
	}
});

Parse.initialize(PARSE_APP_ID, PARSE_JS_KEY);
Parse.serverURL = PARSE_SERVER_URL;

Parse.localDatastoreEnabled = true;
Parse.User.enableRevocableSessionInBackground = true;

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isAuthenticated: false
		};
	}

	updateAuthenticated = (login) => {
		if (login) {
			console.log('updateAuthenticated', firebase.auth());
		} else {
			firebase.auth().signOut().then(() => {
				// Sign-out successful.
				removeAuthToken();
			}).catch(function (error) {
				// An error happened.
				console.error('Could not log user out.');
				console.error(error);
				this.setState({
					isAuthenticated: null
				});
			});
		}
	};

	componentDidMount() {

		console.log('currentUser;', firebase.auth().currentUser);
		firebase.auth().onAuthStateChanged(function(user) {
			console.log('user', user);
			if (user) {

			} else {
				// No user is signed in.
			}
		});


		const userAuth = localStorage.getItem(USER_AUTH_KEY);
		this.setState({
			isAuthenticated: !!userAuth
		});
	}

	render() {
		const {updateAuthenticated} = this;
		const {isAuthenticated} = this.state;

		return (<Router>
			<div id="gearApp">
				<Header
					isAuthenticated={isAuthenticated}
					updateAuthenticated={updateAuthenticated}
				/>
				<ErrorBoundary>
					<Switch>
						<Route exact
							path={PAGE_HOME}
							component={HomePage}
						/>
						<Route
							path={PAGE_USER_SIGN_UP}
							render={props => <UserSignUpPage
								{...props}
								isAuthenticated={isAuthenticated}
								updateAuthenticated={updateAuthenticated}
							/>}
						/>
						<Route
							path={PAGE_LOGIN}
							render={props => <LoginPage
								{...props}
								isAuthenticated={isAuthenticated}
								updateAuthenticated={updateAuthenticated}
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
