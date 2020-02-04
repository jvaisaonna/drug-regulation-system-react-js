import React, { Component } from "react";
import { connect } from "react-redux";

import { onSetPageTitle } from "../../actions";

import "./Dashboard.css";

class Dashboard extends Component {
	constructor() {
		super();
		this.state = { title: "Dashboard" };
	}

	render() {
		this.props.setPageTitle(this.state.title);
		return (
			<div className="dashboard-container">
				<div>This is Dashboard page.</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		pageTitle: state.appReducer.pageTitle,
		user: state.appReducer.user
	};
};

const mapDispatchToProps = dispatch => {
	return {
		setPageTitle: pageTitle => {
			dispatch(onSetPageTitle(pageTitle));
		}
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Dashboard);
