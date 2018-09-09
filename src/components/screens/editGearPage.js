import React, {Component} from "react";
import PropTypes from "prop-types";
import {Alert, Container} from "reactstrap";
import confirm from 'reactstrap-confirm';

import {db, PAGE_LIST, USER_AUTH_KEY} from "../../App";
import {EditGearForm} from "../form/editGearForm";
import Loading from "../common/loadingComponent";
import {Redirect} from "react-router-dom";
import {UserLoginForm} from "../users/components/loginForm";
import Header from "../layout/header";
import * as firebase from "firebase";

class EditGearPage extends Component {

	constructor(props) {
		super(props);
		this.handleDeleteGear = this.handleDeleteGear.bind(this);
		this.state = {
			gearItem: {}, error: null, loading: true
		};
	}

	componentDidMount() {
		const userId = localStorage.getItem(USER_AUTH_KEY);
		const gearId = this.props.match.params.key;
		// TODO Handle errors
		db.collection('user-gear')
			.doc(userId)
			.collection('gear-items').doc(gearId).get()
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
			.catch(error => {
				console.error('Error Code:', error.code);
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
			const userId = localStorage.getItem(USER_AUTH_KEY);
			db.collection('user-gear')
				.doc(userId)
				.collection('gear-items').doc(id)
				.delete()
				.catch(error => {
					console.error('Error Code:', error.code);
					throw new Error("Error deleting gear.");
				});
		}
	};

	handleUpdateGear = (values) => {
		const userId = localStorage.getItem(USER_AUTH_KEY);
		return db.collection('user-gear')
			.doc(userId)
			.collection('gear-items').doc(values.id)
			.update(values)
			.catch(error => {
				console.log ("Error Code:", error.code);
				let errorMessage = "Error updating gear.";
				switch (error.code) {
					case 'not-found': {
						errorMessage = "Gear not found."
					}
				}
				throw new Error(errorMessage);
			});
	};

	render() {
		const {handleCancel, handleDeleteGear, handleUpdateGear} = this;
		const {gearItem, loading} = this.state;

		if (!gearItem) return <Container>
			<Alert color="danger">Could not find Gear!</Alert>
		</Container>;

		return (<Loading loading={loading}>
			<Container>
				<EditGearForm
					{...this.props}
					gearItem={gearItem}
					handleCancel={handleCancel}
					handleDeleteGear={handleDeleteGear}
					handleUpdateGear={handleUpdateGear}
				/>
			</Container>
		</Loading>);
	}
}

EditGearPage.defaultProps = {
	success: false
};

EditGearPage.propTypes = {
	history: PropTypes.object.isRequired, props: PropTypes.shape({
		match: PropTypes.shape({
			params: PropTypes.shape({
				key: PropTypes.string.isRequired
			})
		})
	}),
	success: PropTypes.bool.isRequired
};

export default EditGearPage;
