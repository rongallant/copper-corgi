import React, {Component} from "react";
import {Button, Table} from 'reactstrap';

import {gearService, displayUnit} from "../../services/localStorageService";
import {PAGE_EDIT} from "../../App";

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
		this.props.history.push(`${PAGE_EDIT}${key}`);
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
			<Table responsive hover>
				<thead>
					<tr>
						<th scope="col">#</th>
						<th scope="col">Name</th>
						<th scope="col">Weight</th>
						<th scope="col">Actions</th>
					</tr>
				</thead>
				<tbody>
					{gearList.map((gear, index) => <tr key={gear.key} onClick={() => handleEditItem(gear.key)}>
						<th scope="row">{index+ 1}</th>
						<td>{gear.name}</td>
						<td>{displayUnit(gear.weight)}</td>
						<td>
							{/*<Button*/}
								{/*color="link"*/}
								{/*size="sm"*/}
								{/*onClick={() => handleEditItem(gear.key)}>*/}
								{/*<i className="fas fa-edit"/>*/}
							{/*</Button>*/}
							<Button
								color="link"
								size="sm"
								onClick={() => handleDeleteItem(gear.key)}>
								<i className="far fa-trash-alt"/>
							</Button>
						</td>
					</tr>)}
				</tbody>
			</Table>
		</div>);
	}
}