import React, { Component } from "react";
import { Icon } from "antd";

import "./InfoBlock.css";

class InfoBlock extends Component {
	render() {
		return (
			<div className="infoBlock-container">
				<Icon className="infoBlock-icon" type={this.props.iconType} />
				<div className="infoBlock-message">{this.props.message}</div>
			</div>
		);
	}
}

export default InfoBlock;
