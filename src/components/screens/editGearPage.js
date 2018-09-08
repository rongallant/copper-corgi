import React, {Component} from "react";
import {Container} from "reactstrap";
import confirm from 'reactstrap-confirm';

import {EditGearForm} from "../form/editGearForm";
import {db, PAGE_LIST} from "../../App";
import EditFormMenu from "../form/components/editFormMenu";

export default class EditGearPage extends Component {

	constructor(props) {
		super(props);
		this.handleDeleteGear = this.handleDeleteGear.bind(this);
		this.state = {
			gearItem: {},
			error: null,
			loading: true
		};
	}

	componentDidMount() {
		const gearId = this.props.match.params.key;
		db.collection('gear-items').doc(gearId).get()
			.then(snapshot => {
				// IMPORTANT: Add ID to GearItem
				const gearItem = snapshot.data();
				if (gearItem) {
					gearItem.id = snapshot.id;
					this.setState({
						error: null,
						gearItem,
						loading: false
					});
				} else {
					this.setState({
						error: "GearItem not found.",
						gearItem: null,
						loading: false
					});
				}
			})
			.catch((err) => {
				console.error(err);
				this.setState({
					error: "Error getting gear.",
					gearItem: null,
					loading: false
				});
			});
	}

	handleCancel = () => {
		this.props.history.push(PAGE_LIST);
	};

	async handleDeleteGear(id) {
		let result = await confirm({
			title: 'Warning',
			message: 'Are you sure you want to delete?',
			confirmText: 'Delete',
			confirmColor: 'danger',
			cancelColor: 'link'
		});
		if (result) {
			db.collection('gear-items').doc(id)
				.delete()
				.then(() => {
				})
				.catch(e => {
					console.error(e);
					this.setState({
						error: "Could not delete gear."
					});
				});
			this.props.history.push(PAGE_LIST);
		}
	};

	handleUpdateGear = (values) => {
		db.collection('gear-items').doc(values.id)
			.update(values).then(() => {
			console.info('Gear updated');
			return this.props.history.push(PAGE_LIST);
		}).catch(e => {
			console.error(e);
			this.state({
				error: "Could not update gear."
			});
		});
	};

	render() {
		const {handleCancel, handleDeleteGear, handleUpdateGear} = this;
		const {history} = this.props;
		const {gearItem, loading, error} = this.state;

		if (loading) return <Container>Loading...</Container>;
		if (!gearItem) throw new Error("Gear item does not exist");
		if (error) throw new Error(error);

		return (<Container>
			<EditFormMenu
				gearId={gearItem.id}
				handleDeleteGear={handleDeleteGear}/>
			<EditGearForm
				isEditForm={true}
				history={history}
				gearItem={gearItem}
				handleCancel={handleCancel}
				handleUpdateGear={handleUpdateGear}
			/>
		</Container>);
	}
}
