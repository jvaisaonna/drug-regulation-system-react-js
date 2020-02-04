import React, { Component } from "react";
import { Icon } from "antd";

import "./CustomButton.css";

class CustomButton extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		let customButtonStyle = "";
		switch (this.props.buttonStyle) {
			case "sky":
				customButtonStyle = "customButton-style-sky";
				break;
			case "forest":
				customButtonStyle = "customButton-style-forest";
				break;
			case "warning":
				customButtonStyle = "customButton-style-warning";
				break;
			case "danger":
				customButtonStyle = "customButton-style-danger";
				break;
			default:
				customButtonStyle = "customButton-style-default";
		}

		return (
			<div
				className={`global-border-radius customButton-container ${customButtonStyle}`}
				onClick={this.props.onClicked}
			>
				{!this.props.isLoading ? (
					<Icon className="customButton-icon" type={this.props.iconType} />
				) : (
					<Icon className="customButton-icon" type="loading" />
				)}

				{this.props.name}
			</div>
		);
	}
}

export default CustomButton;
