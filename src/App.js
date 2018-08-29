import React, {Component} from 'react';
import {Container, Navbar, NavbarBrand} from 'reactstrap';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import './App.css';
import GearFormPage from './components/screens/gearFormPage'
import GearListPage from "./components/screens/GearListPage";
import MainMenu from "./components/menus/mainMenu";

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
						<Route exact path="/" component={GearListPage}/>
						<Route path="/add" component={GearFormPage}/>
						<Route path="/add:key" component={GearFormPage}/>
					</Switch>
				</Container>
			</div>
		</Router>);
	}
}

export default App;
