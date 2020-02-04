import React, { Component } from "react";
import { connect } from "react-redux";

import Notification from "./Notification/Notification";

import "./NotificationCenter.css";

class NotificationCenter extends Component {
	constructor() {
		super();
		this.state = {};
	}

	render() {
		let notifications = this.props.notifications
			.sort((a, b) => b.time - a.time)
			.map(noti => (
				<Notification
					key={noti.time}
					time={noti.time}
					title={noti.title}
					content={noti.content}
					isPermanent={noti.isPermanent}
					onClickedClose={() => {
						this.onClickedClose(noti.time);
					}}
				/>
			));

		return (
			<div className="notificationCenter-container">{notifications}</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		notifications: state.appReducer.notifications
	};
};

export default connect(
	mapStateToProps,
	null
)(NotificationCenter);
