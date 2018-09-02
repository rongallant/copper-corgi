import React from "react";
import {Table} from 'reactstrap';
import Parse from "parse/node";
import ParseReact from "parse-react";

import {displayUnit} from "../../services/localStorageService";
import {PAGE_EDIT_BASE} from "../../App";

export default class GearListPage extends ParseReact.Component(React) {

	constructor(props) {
		super(props);
		this.state = {
			gearList: [], gearItem: {}, redirect: true
		};
	}

	observe() {
		const query = new Parse.Query('Gear');
		query.find().then(results => {
			this.setState({
				gearList: results
			});
		});
	}

	handleEditItem = (gearItem) => {
		this.props.history.push(`${PAGE_EDIT_BASE}/${gearItem.id}`);
	};

	render() {
		const {handleEditItem} = this;
		const {gearList} = this.state;

		return (<div>
			<h1>Gear</h1>
			<Table responsive hover>
				<thead>
					<tr>
						<th scope="col">#</th>
						<th scope="col">Category</th>
						<th scope="col">Name</th>
						<th scope="col">Weight</th>
					</tr>
				</thead>
				<tbody>
					{gearList.map((gear, index) => {
						const {id, attributes: {name, category, weight}} = gear;

						return (<tr key={id} onClick={() => handleEditItem(gear)}>
							<th scope="row">{index + 1}</th>
							<td>{category}</td>
							<td>{name}</td>
							<td>{displayUnit(weight)}</td>
						</tr>)
					})}
				</tbody>
			</Table>
		</div>);
	}
}