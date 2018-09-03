import React, {Component} from 'react';
import {Container} from 'reactstrap';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Parse from "parse/node";

import AddGearPage from './components/screens/addGearPage'
import Header from "./components/layout/header";
import Footer from "./components/layout/footer";
import EditGearPage from "./components/screens/editGearPage";
import HomePage from "./components/screens/homePage";
import GearListPage from "./components/screens/gearListPage";

const PARSE_APP_ID = 'Ls7oRMes2ZDHIx85GtVOeVdx1x67atOaQ07qVNZH';
const PARSE_JS_KEY = 'pl3Vx4tVNYIu4jmuAwZHXgObP0L8OjBt1rBOEbvz';
const PARSE_SERVER_URL = 'https://parseapi.back4app.com';

export const PAGE_HOME = "/";
export const PAGE_LIST = "/list";
export const PAGE_ADD = "/add";
export const PAGE_EDIT_BASE = "/edit";
export const PAGE_EDIT_PATH = `${PAGE_EDIT_BASE}/:key`;

Parse.initialize(PARSE_APP_ID, PARSE_JS_KEY);
Parse.serverURL = PARSE_SERVER_URL;

class App extends Component {

	render() {

		return (<Router>
			<div id="gearApp">
				<Header/>
				<Container>
					<Switch>
						<Route exact path={PAGE_HOME} component={HomePage}/>
						<Route path={PAGE_LIST} component={GearListPage}/>
						<Route path={PAGE_ADD} component={AddGearPage}/>
						<Route path={PAGE_EDIT_PATH} component={EditGearPage}/>
					</Switch>
				</Container>
				<Footer/>
			</div>
		</Router>);
	}
}

export default App;
