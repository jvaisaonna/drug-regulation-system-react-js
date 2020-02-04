import React, { Component } from "react";
import Moment from "moment";

import { USER_ROLE, DELIVERY_STATE } from "../../../global";
import InfoTextView from "../../InfoTextView/InfoTextView";
import "./DetailedDrugDeliveryRecord.css";

class DetailedDrugDeliveryRecord extends Component {
	constructor() {
		super();
		this.state = {};
	}

	render() {
		let badgeStateClass = {
			0: "detailedDrugDeliveryRecord-badge-pending",
			1: "detailedDrugDeliveryRecord-badge-process",
			2: "detailedDrugDeliveryRecord-badge-update",
			3: "detailedDrugDeliveryRecord-badge-reject",
			4: "detailedDrugDeliveryRecord-badge-complete"
		};

		let user = this.props.user;
		let name = user.last_name;
		name = name.toUpperCase() + " " + user.first_name;

		let drug = this.props.drugDetail.drug;

		return (
			<div className="detailedDrugDeliveryRecord-container detailedDrugDeliveryRecord-row">
				<div className="detailedDrugDeliveryRecord-index">
					#{this.props.index}
				</div>
				<div className="detailedDrugDeliveryRecord-column detailedDrugDeliveryRecord-stuffing">
					<div className="detailedDrugDeliveryRecord-row">
						<div className="detailedDrugDeliveryRecord-time">
							{Moment.unix(this.props.time).format("LLLL")}
						</div>
						<div className="detailedDrugDeliveryRecord-stuffing" />
						<div
							className={`global-box-shadow global-border-radius detailedDrugDeliveryRecord-badge ${
								badgeStateClass[this.props.state]
							}`}
						>
							{DELIVERY_STATE[this.props.state]}
						</div>
					</div>

					<div className="detailedDrugDeliveryRecord-row">
						<InfoTextView
							title="Hospital"
							content={user.position.hospital.name}
							description={user.position.hospital.address}
						/>
						<InfoTextView title="Name" content={name} />
						<InfoTextView
							title="Role"
							content={USER_ROLE[user.position.role]}
						/>
					</div>
					<div className="detailedDrugDeliveryRecord-row">
						<InfoTextView title="Drug Type" content={drug.type} />
						<InfoTextView title="Drug Name" content={drug.name} />
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

export default DetailedDrugDeliveryRecord;
