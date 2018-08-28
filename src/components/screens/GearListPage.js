import React, {Component} from "react";
import {Table} from 'reactstrap';
import {GEAR_LIST_KEY} from "./gearFormPage";

export default class GearListPage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			gearList: []
		}
	}

	componentDidMount() {
		if (localStorage.hasOwnProperty(GEAR_LIST_KEY)) {
			const gearList = JSON.parse(localStorage.getItem(GEAR_LIST_KEY));
			this.setState({
				gearList: gearList
			});
		}
	}

	render() {
		const {gearList} = this.state;
		console.log('render:gearList', gearList);

		return (<div>
			<h1>Gear</h1>
			<Table responsive>
				<thead>
					<tr>
						<th scope="col">#</th>
						<th scope="col">Name</th>
						<th scope="col">Weight</th>
					</tr>
				</thead>
				<tbody>
					{gearList.map((gear, index) => <tr key={gear.gearId}>
						<th scope="row">{index+ 1}</th>
						<td>{gear.name}</td>
						<td>{gear.weight}</td>
					</tr>)}
				</tbody>
			</Table>
		</div>);
	}
}