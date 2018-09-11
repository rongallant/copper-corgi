import React, {Component} from "react";
import firebase from "firebase";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import Header from "./components/layout/header";
import Footer from "./components/layout/footer";
import {PrivateRoute} from "./security/privateRoute";
import HomePage from "./components/screens/homePage";
import UserSignUpPage from "./components/screens/userSignUpPage";
import LoginPage from "./components/screens/loginPage";
import GearListPage from "./components/screens/gearListPage";
import AddGearPage from "./components/screens/addGearPage";
import EditGearPage from "./components/screens/editGearPage";
import ErrorBoundary from "./components/common/error-handler/errorBoundary";
import {firebaseConfig} from "./firebaseConfig";

export const USER_AUTH_KEY = "userAuth";
export const COLLECTION_USER_GEAR = "user-gear";
export const COLLECTION_GEAR_ITEMS = "gear-items";
export const COLLECTION_GEAR_TAGS = "gear-tags";

export const PAGE_HOME = "/";
export const PAGE_LOGIN = "/login";
export const PAGE_LIST = "/list";
export const PAGE_ADD = "/add";
export const PAGE_EDIT_BASE = "/edit";
export const PAGE_EDIT_PATH = `${PAGE_EDIT_BASE}/:key`;
export const PAGE_USER_SIGN_UP = "/signup";

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();
const settings = {timestampsInSnapshots: true};
firestore.settings(settings);
export const db = firestore;

class App extends Component {

	constructor (props) {
		super(props);
		this.state = {
			isAuthenticated: false
		};
	}

	componentDidMount () {
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

	render () {
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
						<Route exact
							path={PAGE_HOME}
							component={HomePage}
						/>
						<Route
							path={PAGE_USER_SIGN_UP}
							render={(props) => <UserSignUpPage
								{...props}
								isAuthenticated={isAuthenticated}
								updateAuthenticated={updateAuthenticated}
							/>}
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
