import React, { Component } from "react";
import { connect } from "react-redux";
import { Spring, animated } from "react-spring/renderprops";

import { Icon } from "antd";

import { onRemoveNotification } from "../../actions";

import "./Notification.css";

class Notification extends Component {
	constructor(props) {
		super(props);
		this.state = { isShow: true, selfTimeout: null, removeTimeout: null };

		this.closeButtonClicked = this.closeButtonClicked.bind(this);
	}

	componentDidMount() {
		if (this.props.isPermanent) {
			return;
		}
		this.setState({
			selfTimeout: setTimeout(() => {
				this.setState({ isShow: false });
			}, 4500),
			removeTimeout: setTimeout(() => {
				this.props.removeNotification(this.props.time);
			}, 5000)
		});
	}

	closeButtonClicked() {
		clearTimeout(this.state.selfTimeout);
		clearTimeout(this.state.removeTimeout);
		this.setState({
			isShow: false,
			removeTimeout: setTimeout(() => {
				this.props.removeNotification(this.props.time);
			}, 500)
		});
	}

	render() {
		let notificationType = "";
		let iconType = "";

		switch (this.props.notiType) {
			case "info":
				notificationType = "notification-type-info";
				iconType = "info-circle";
				break;
			case "warning":
				notificationType = "notification-type-warning";
				iconType = "exclamation-circle";
				break;
			case "danger":
				notificationType = "notification-type-danger";
				iconType = "close-circle";
				break;
			default:
				notificationType = "notification-type-normal";
				// iconType = "notification";
				iconType = "info-circle";
		}
		return (
			<Spring
				from={{ opacity: 0, transform: "translateX(100%)" }}
				to={{
					opacity: this.state.isShow ? 1 : 0,
					transform: this.state.isShow
						? "translateX(0%)"
						: "translateX(100%)"
				}}
			>
				{props => (
					<animated.div style={props}>
						<div
							className={`global-border-radius global-box-shadow notification-container ${notificationType} ${
								this.state.isWillClose
									? "notification-container-will-close"
									: ""
							}`}
							onClick={() => this.closeButtonClicked()}
						>
							<div className="notification-title">
								<Icon
									className="notification-title-icon"
									type={iconType}
								/>
								{this.props.title}
								<div style={{ flex: 1 }} />
								<Icon
									className="notification-title-close"
									type="close"
								/>
							</div>
							<div className="notification-content">
								{this.props.content}
							</div>
						</div>
					</animated.div>
				)}
			</Spring>
		);
	}
}

const mapStateToProps = state => {
	return {
		notifications: state.appReducer.notifications
	};
};

const mapDispatchToProps = dispatch => {
	return {
		removeNotification: time => {
			dispatch(onRemoveNotification(time));
		}
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Notification);
