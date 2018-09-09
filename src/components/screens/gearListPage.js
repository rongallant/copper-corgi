import React from "react";
import PropTypes from "prop-types";
import {Container, Table} from 'reactstrap';

import {db, PAGE_EDIT_BASE} from "../../App";
import {displayUnit} from "../../services/displayUtils";
import Loading from "../common/loadingComponent";

class GearListPage extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			gearList: [], loading: true, redirect: true
		};
	}

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
				console.error('Error getting documents', err);
				throw new Error("Error getting gear.");
			});
	}

	handleEditGearLink = (gearItem) => {
		this.props.history.push(`${PAGE_EDIT_BASE}/${gearItem.id}`);
	};

	render() {
		const {handleEditGearLink} = this;
		const {gearList, loading} = this.state;
		const hasResults = gearList.length > 0;

		return (<Loading
			loading={loading}
			preventLoadingChildren={true}>
			<Container>
				<h3>Gear</h3>
			</Container>
			<Table responsive hover>
				<thead>
					<tr>
						<th scope="col">#</th>
						<th scope="col">Name</th>
						<th scope="col">Weight</th>
						<th scope="col">Category</th>
					</tr>
				</thead>
				<tbody>
					{!hasResults && (<tr>
						<th colSpan={5} className="text-center">You have no gear!</th>
					</tr>)}
					{hasResults && gearList.map((gear, index) => {
						const {id, name, category, weight} = gear;
						return (<tr key={id} onClick={() => handleEditGearLink(gear)}>
							<th scope="row">{index + 1}</th>
							<td>{name}</td>
							<td>{displayUnit(weight)}</td>
							<td>{category}</td>
						</tr>)
					})}

				</tbody>
			</Table>
		</Loading>);
	}
}

GearListPage.propTypes = {
	history: PropTypes.object.isRequired
};

export default GearListPage;
