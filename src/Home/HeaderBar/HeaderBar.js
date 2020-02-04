import React, { Component } from "react";
import { connect } from "react-redux";

import { USER_ROLE } from "../../global";
import icUser from "../../images/user.png";
import icFemale from "../../images/female.png";
import "./HeaderBar.css";

class HeaderBar extends Component {
	constructor() {
		super();
		this.state = {};
	}

	render() {
		let user = this.props.user;
		let firstName = user.first_name;
		let lastName = user.last_name.toUpperCase();
		let role = USER_ROLE[user.position[user.position.length - 1].role];
		let hospital = "";
		if (
			user.position[user.position.length - 1].role !== 0 &&
			user.position[user.position.length - 1].role !== 10
		) {
			hospital = user.position[user.position.length - 1].hospital.name;
		}

		return (
			<div className="headerBar-container">
				<div>
					<div className="headerBar-title">Hello {firstName}!</div>
					{hospital !== "" ? (
						<div className="headerBar-subtitle">
							{role} | {hospital}
						</div>
					) : (
						<div className="headerBar-subtitle">{role}</div>
					)}
				</div>
				<div className="headerBar-divider" />
				<div className="headerBar-page-title">{this.props.pageTitle}</div>
				<div className="headerBar-profile-card">
					<img
						className="headerBar-profile-card-icon"
						src={user.gender === "male" ? icUser : icFemale}
						alt="user"
					/>
					<div className="headerBar-profile-card-info">
						<div className="headerBar-profile-card-info-name">
							{lastName} {firstName}
						</div>
						<div className="headerBar-profile-card-info-status">
							• online
						</div>
					</div>
				</div>
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
	return {};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(HeaderBar);
