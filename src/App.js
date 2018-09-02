import React, {Component} from 'react';
import {Container, Navbar, NavbarBrand} from 'reactstrap';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Parse from "parse/node";

import './App.css';
import GearFormPage from './components/screens/gearFormPage'
import GearListPage from "./components/screens/GearListPage";
import MainMenu from "./components/menus/mainMenu";

const PARSE_APP_ID = 'Ls7oRMes2ZDHIx85GtVOeVdx1x67atOaQ07qVNZH';
const PARSE_JS_KEY = 'pl3Vx4tVNYIu4jmuAwZHXgObP0L8OjBt1rBOEbvz';
const PARSE_SERVER_URL = 'https://parseapi.back4app.com';

export const PAGE_LIST = "/";
export const PAGE_ADD = "/add";
export const PAGE_EDIT_BASE = "/edit";
export const PAGE_EDIT_PATH = `${PAGE_EDIT_BASE}/:key`;

Parse.initialize(PARSE_APP_ID, PARSE_JS_KEY);
Parse.serverURL = PARSE_SERVER_URL;

class App extends Component {

	render() {

		return (<Router>
			<div id="gearApp">
				<Navbar className="mb-3" color="dark" dark>
					<NavbarBrand href="/">Gear Tracker</NavbarBrand>
					<MainMenu/>
				</Navbar>
				<Container>
					<Switch>
						<Route exact path={PAGE_LIST} component={GearListPage}/>
						<Route path={PAGE_ADD} component={GearFormPage}/>
						<Route path={PAGE_EDIT_PATH} component={GearFormPage}/>
					</Switch>
				</Container>
			</div>
		</Router>);
	}
}

export default App;
