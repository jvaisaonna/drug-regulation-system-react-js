import React, { Component } from "react";
import { Icon } from "antd";

import "./DrugInfo.css";

class DrugInfo extends Component {
	render() {
		const IS_VALID_CLASS = this.props.isValid
			? "drugInfo-container drugInfo-container-valid global-border-radius global-box-shadow"
			: "drugInfo-container drugInfo-container-invalid global-border-radius global-box-shadow";
		return (
			<div className={IS_VALID_CLASS}>
				<div className="drugInfo-details">
					<div className="drugInfo-details-id">#{this.props.did}</div>
					<div className="drugInfo-details-name">{this.props.name}</div>
					<div className="drugInfo-details-type">{this.props.type}</div>
				</div>
				<div
					className="drugInfo-edit-button"
					onClick={this.props.onClickedEdit}
				>
					<Icon style={{ marginRight: "5px" }} type="edit" />
					EDIT
				</div>
			</div>
		);
	}
}

export default DrugInfo;
