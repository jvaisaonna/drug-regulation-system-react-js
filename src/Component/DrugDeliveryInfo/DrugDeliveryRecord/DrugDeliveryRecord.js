import React, { Component } from "react";
import Moment from "moment";

import { USER_ROLE, DELIVERY_STATE } from "../../../global";
import InfoTextView from "../../InfoTextView/InfoTextView";
import "./DrugDeliveryRecord.css";

class DrugDeliveryRecord extends Component {
	constructor() {
		super();
		this.state = {};
	}

	render() {
		let badgeStateClass = {
			0: "drugDeliveryRecord-badge-pending",
			1: "drugDeliveryRecord-badge-process",
			2: "drugDeliveryRecord-badge-update",
			3: "drugDeliveryRecord-badge-reject",
			4: "drugDeliveryRecord-badge-complete"
		};

		let user = this.props.user;
		let name = user.last_name;
		name = name.toUpperCase() + " " + user.first_name;

		let drug = this.props.drugDetail.drug;

		return (
			<div className="drugDeliveryRecord-container drugDeliveryRecord-row">
				<div className="drugDeliveryRecord-index">#{this.props.index}</div>
				<div className="drugDeliveryRecord-column drugDeliveryRecord-stuffing">
					<div className="drugDeliveryRecord-row">
						<div className="drugDeliveryRecord-time">
							{Moment.unix(this.props.time).format("LLLL")}
						</div>
						<div className="drugDeliveryRecord-stuffing" />
						<div
							className={`global-box-shadow global-border-radius drugDeliveryRecord-badge ${
								badgeStateClass[this.props.state]
							}`}
						>
							{DELIVERY_STATE[this.props.state]}
						</div>
					</div>

					<div className="drugDeliveryRecord-row">
						<InfoTextView
							title="Name"
							content={name}
							description={user.position.hospital.name}
						/>
						<InfoTextView
							title="Role"
							content={USER_ROLE[user.position.role]}
						/>
					</div>
					<div className="drugDeliveryRecord-row">
						<InfoTextView
							title="Drug"
							content={drug.name}
							description={drug.type}
						/>
						<InfoTextView
							title="Treatment Duration"
							content={
								this.props.drugDetail.treatment_duration + " Days"
							}
						/>
						<InfoTextView
							title="Daily Dosage"
							content={this.props.drugDetail.daily_dosage + " mg"}
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default DrugDeliveryRecord;
