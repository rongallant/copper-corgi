import React, {Component} from 'react';
import {Container, Navbar, NavbarBrand} from 'reactstrap';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import './App.css';
import GearFormPage from './components/screens/gearFormPage'
import GearListPage from "./components/screens/GearListPage";
import MainMenu from "./components/menus/mainMenu";
import {EditGearForm} from "./components/form/editGearForm";

export const PAGE_LIST = "/";
export const PAGE_ADD = "/add";
export const PAGE_EDIT = "/edit/";

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
						<Route path={`${PAGE_EDIT}:key`} component={EditGearForm}/>
					</Switch>
				</Container>
			</div>
		</Router>);
	}
}

export default App;
