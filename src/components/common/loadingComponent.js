import React, {Component} from "react";
import {Modal} from "reactstrap";
import PropTypes from "prop-types";

class Loading extends Component {

	render() {
		const {children, loading, preventLoadingChildren} = this.props;
		const isOpen = preventLoadingChildren ? loading : true;

		if ((!preventLoadingChildren && !loading) || !loading) {
			return children;
		}

		if (loading) {
			return (<div>
				{!preventLoadingChildren && children}
				<Modal
					isOpen={isOpen}
					style={{width: 48}}
					autoFocus
					centered
					contentClassName="modal-content-loading"
					fade={false}>
					<div>
						<i className="fas fa-spinner fa-spin fa-3x"
							style={{color: '#fff'}}/>
					</div>
				</Modal>
			</div>);
		}
	}
}

Loading.propTypes = {
	children: PropTypes.node,
	loading: PropTypes.bool,
	preventLoadingChildren: PropTypes.bool
};

export default Loading;
