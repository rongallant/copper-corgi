import React, {Component} from "react";
import {Button, Table} from 'reactstrap';
import {gearService} from "../../services/localStorageService";

export default class GearListPage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			gearList: []
		};
	}

	componentDidMount() {
		if (gearService.gearListExists()) {
			const gearList = gearService.readGearList();
			this.setState({
				gearList: gearList
			});
		}
	}

	handleEditItem = (key) => {
		this.props.history.push(`/edit:${key}`);
	};

	handleDeleteItem = (key) => {
		gearService.deleteGearItem(key);
		const gearList = gearService.readGearList();
		this.setState({
			gearList: gearList
		});
	};

	render() {
		const {handleEditItem, handleDeleteItem} = this;
		const {gearList} = this.state;

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
					{gearList.map((gear, index) => <tr key={gear.key}>
						<th scope="row">{index+ 1}</th>
						<td>{gear.name}</td>
						<td>{gear.weight}</td>
						<td>
							<Button
								onClick={() => handleEditItem(gear.key)}>
								X
							</Button>
							<Button
								onClick={() => handleDeleteItem(gear.key)}>
								X
							</Button>
						</td>
					</tr>)}
				</tbody>
			</Table>
		</div>);
	}
}