import React from "react";
import {Table} from 'reactstrap';
import Parse from "parse/node";
import ParseReact from "parse-react";

import {PAGE_EDIT_BASE} from "../../App";
import {displayUnit} from "../../utilities/displayUtils";

export default class GearListPage extends ParseReact.Component(React) {

	constructor(props) {
		super(props);
		this.state = {
			gearList: [], gearItem: {}, loading: true, redirect: true
		};
	}

	observe() {
		const query = new Parse.Query('Gear');
		query.find().then(results => {
			this.setState({
				loading: false,
				gearList: results
			});
		});
	}

	handleEditItem = (gearItem) => {
		this.props.history.push(`${PAGE_EDIT_BASE}/${gearItem.id}`);
	};

	render() {
		const {handleEditItem} = this;
		const {gearList, loading} = this.state;
		const hasResults = gearList.length > 0;

		if (loading) return <div>Loading...</div>;

		return (<div>
			<h3>Gear</h3>
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
					{hasResults && gearList.map((gear, index) => {
						const {id, attributes: {name, category, weight}} = gear;
						return (<tr key={id} onClick={() => handleEditItem(gear)}>
							<th scope="row">{index + 1}</th>
							<td>{category}</td>
							<td>{name}</td>
							<td>{displayUnit(weight)}</td>
						</tr>)
					})}

					{!hasResults && (<tr>
						<th colSpan={5} className="text-center">You have no gear!</th>
					</tr>)}
				</tbody>
			</Table>
		</div>);
	}
}