import React from "react";
import {Table} from 'reactstrap';

import {displayUnit} from "../../services/localStorageService";
import {db, PAGE_EDIT_BASE} from "../../App";


export default class GearListPage extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			gearList: [], gearItem: {}, loading: true, redirect: true
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
				const gearList = [];
				snapshot.forEach(doc => {
					const newItem = doc.data();
					newItem.id = doc.id;
					gearList.push(newItem);
				});
				this.setState({gearList, loading: false});
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
		console.log('gearList', gearList);

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

					{!hasResults && (<tr>
						<th colSpan={5} className="text-center">You have no gear!</th>
					</tr>)}

					{hasResults && gearList.forEach((gear, index) => {
						const {id, name, category, weight} = gear;
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