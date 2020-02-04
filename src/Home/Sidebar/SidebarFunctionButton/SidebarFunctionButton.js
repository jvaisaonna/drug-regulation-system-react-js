import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Icon } from "antd";

import "./SidebarFunctionButton.css";

class SidebarFunctionButton extends Component {
	render() {
		if (this.props.isFilling) {
			return <div className="sidebarFunctionButton-container-filling" />;
		}

		return (
			<Link to={this.props.linkTo}>
				<div
					className="sidebarFunctionButton-container global-border-radius"
					onClick={this.props.onClicked}
					style={this.props.additionalStyle}
				>
					<Icon
						className="sidebarFunctionButton-icon"
						type={this.props.iconType}
					/>
					<div className="sidebarFunctionButton-name">
						{this.props.name}
					</div>
				</div>
			</Link>
		);
	}
}

export default SidebarFunctionButton;
