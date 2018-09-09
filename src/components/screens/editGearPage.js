import React, {Component} from "react";
import PropTypes from "prop-types";
import {Container} from "reactstrap";
import confirm from 'reactstrap-confirm';

import {db, PAGE_LIST} from "../../App";
import {EditGearForm} from "../form/editGearForm";
import Loading from "../common/loadingComponent";

class EditGearPage extends Component {

	constructor(props) {
		super(props);
		this.handleDeleteGear = this.handleDeleteGear.bind(this);
		this.state = {
			gearItem: {}, error: null, loading: true
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
						error: null, gearItem, loading: false
					});
				} else {
					this.setState({
						error: "GearItem not found.", gearItem: null, loading: false
					});
				}
			})
			.catch((err) => {
				console.error(err);
				this.setState({
					error: "Error getting gear.", gearItem: null, loading: false
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
		const {gearItem, loading, error} = this.state;

		if (!gearItem) throw new Error("Gear item does not exist");
		if (error) throw new Error(error);

		return (<Loading loading={loading}>
			<Container>
				<EditGearForm
					gearItem={gearItem}
					handleCancel={handleCancel}
					handleDeleteGear={handleDeleteGear}
					handleUpdateGear={handleUpdateGear}
				/>
			</Container>
		</Loading>);
	}
}

EditGearPage.propTypes = {
	history: PropTypes.object.isRequired,
	props: PropTypes.shape({
		match: PropTypes.shape({
			params: PropTypes.shape({
				key: PropTypes.string.isRequired
			})
		})
	})
};

export default EditGearPage;

