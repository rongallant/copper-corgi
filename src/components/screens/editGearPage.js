import React, {Component} from "react";
import {Container} from "reactstrap";
import confirm from 'reactstrap-confirm';

import {EditGearForm} from "../form/editGearForm";
import {db, PAGE_EDIT_PATH, PAGE_LIST} from "../../App";
import EditFormMenu from "../form/components/editFormMenu";

export default class EditGearPage extends Component {

	constructor(props) {
		super(props);
		this.handleDeleteGear = this.handleDeleteGear.bind(this);
		this.state = {
			loading: false, gearItem: null, error: null
		};
	}

	componentDidMount() {
		const {match: {path, params: {key}}} = this.props;
		// TODO Handle doc not found.
		if (PAGE_EDIT_PATH === path) {
			db.collection('gear-items').doc(key).get()
				.then((snapshot) => {
					// IMPORTANT: Add ID to GearItem
					if (snapshot.data()) {
						const gearItem = snapshot.data();
						gearItem.id = snapshot.id;
						this.setState({gearItem: gearItem, loading: false});
					} else {
						console.info('GearItem not found');
						this.state({
							error: "GearItem not found."
						});
					}
				})
				.catch((err) => {
					console.error(err);
					this.state({
						error: "Error getting gear."
					});
				});
		} else {
			this.setState({gearItem: null, loading: false});
		}
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
					this.state({
						error: "Could not delete gear."
					});
				});
			this.props.history.push(PAGE_LIST);
		}
	};

	handleUpdateGear = (values) => {
		db.collection('gear-items').doc(values.id)
			.update(values).then(response => {
			console.log('response', response);
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
