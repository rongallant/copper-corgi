import React from "react";
import {Table} from 'reactstrap';

import {displayUnit} from "../../services/localStorageService";
import {db, PAGE_EDIT_BASE} from "../../App";


export default class GearListPage extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			gearList: null, gearItem: {}, loading: true, redirect: true
		};
	}

	// observe() {
	// 	const query = new Parse.Query('Gear');
	// 	query.find().then(results => {
	// 		this.setState({
	// 			loading: false,
	// 			gearList: results
	// 		});
	// 	});
	// }

	componentDidMount() {
		db.collection('gear-items').get()
			.then((snapshot) => {
				this.setState({
					loading: false, gearList: snapshot
				});
			})
			.catch((err) => {
				console.log('Error getting documents', err);
			});
	}

	handleEditItem = (gearItem) => {
		this.props.history.push(`${PAGE_EDIT_BASE}/${gearItem.id}`);
	};

	render() {
		const {handleEditItem} = this;
		const {gearList, loading} = this.state;

		if (loading) return <div>Loading...</div>;

		const hasResults = gearList.length > 0;
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
					{gearList.forEach((gear) => {
						const {name, category, weight} = gear.data();
						return (<tr key={name} onClick={() => handleEditItem(gear)}>
							<th scope="row"> </th>
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