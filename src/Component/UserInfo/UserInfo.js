import React, { Component } from "react";
import Moment from "moment";
import { Icon } from "antd";

import InfoTextView from "../InfoTextView/InfoTextView";
import "./UserInfo.css";

class UserInfo extends Component {
	render() {
		return (
			<div className="userInfo-container global-border-radius global-box-shadow">
				<div className="userInfo-details">
					<div className="userInfo-details-row">
						{this.props.gender === "male" ? (
							<div className="userInfo-details-gender userInfo-details-gender-male">
								<Icon type="man" />
							</div>
						) : (
							<div className="userInfo-details-gender userInfo-details-gender-female">
								<Icon type="woman" />
							</div>
						)}
						<InfoTextView
							title="Last Name"
							content={this.props.last_name}
						/>
						<InfoTextView
							title="First Name"
							content={this.props.first_name}
						/>
						<InfoTextView
							title="Birth Date"
							content={Moment.unix(this.props.birth_date_ts).format(
								"YYYY-MM-DD"
							)}
							description={`${Moment().diff(
								Moment.unix(this.props.birth_date_ts).format(
									"YYYY-MM-DD"
								),
								"year"
							)} Years Old`}
						/>
					</div>
					<div className="userInfo-details-space" />
					<div className="userInfo-details-row">
						<InfoTextView
							title="HKID"
							content={
								this.props.isMask
									? hkidMasked(this.props.hkid)
									: hkidRephrase(this.props.hkid)
							}
						/>
						<InfoTextView
							title="Phone No."
							content={this.props.phone_number}
						/>
						{this.props.position ? (
							<InfoTextView
								title="Join Date"
								content={Moment.unix(
									this.props.position[this.props.position.length - 1]
										.time + ""
								).format("YYYY-MM-DD")}
							/>
						) : null}
					</div>
				</div>
				{!this.props.isLoading && this.props.onClickedRemove ? (
					<div
						className="userInfo-button userInfo-remove-button"
						onClick={this.props.onClickedRemove}
					>
						<Icon
							style={{ marginBottom: "5px", fontSize: "20px" }}
							type="close-circle"
						/>
						REMOVE
					</div>
				) : null}
				{!this.props.isLoading && this.props.onClickedSelect ? (
					<div
						className="userInfo-button userInfo-select-button"
						onClick={this.props.onClickedSelect}
					>
						<Icon
							style={{ marginBottom: "5px", fontSize: "20px" }}
							type="select"
						/>
						SELECT
					</div>
				) : null}
				{!this.props.isLoading && this.props.onClickedCreate ? (
					<div
						className={`userInfo-button userInfo-create-button ${
							this.props.isDisable ? "userInfo-disable-button" : ""
						}`}
						onClick={this.props.onClickedCreate}
					>
						<Icon
							style={{ marginBottom: "5px", fontSize: "20px" }}
							type="plus-circle"
						/>
						CREATE
					</div>
				) : null}
				{this.props.isLoading ? (
					<div className="userInfo-button userInfo-disable-button">
						<Icon
							style={{ marginBottom: "5px", fontSize: "20px" }}
							type="loading"
						/>
						LOADING
					</div>
				) : null}
			</div>
		);
	}
}

function hkidRephrase(hkid) {
	return hkid.substring(0, 7) + "(" + hkid.substring(7) + ")";
}

function hkidMasked(hkid) {
	return hkid.substring(0, 5) + "**(*)";
}

export default UserInfo;
