import React, { Component } from "react";
import Moment from "moment";
import { Divider, Icon } from "antd";

import { DELIVERY_STATUS } from "../../global";
import DetailedDrugDeliveryRecord from "./DetailedDrugDeliveryRecord/DetailedDrugDeliveryRecord";
import DrugDeliveryModifier from "../DrugDeliveryModifier/DrugDeliveryModifier";
import InfoTextView from "../InfoTextView/InfoTextView";

import "./DetailedDrugDeliveryInfo.css";

class DetailedDrugDeliveryInfo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isExpand: props.isExpand || false,
			isUpdating: false
		};
	}

	render() {
		let badgeStateClass = {
			0: "detailedDrugDeliveryInfo-badge-pending",
			1: "detailedDrugDeliveryInfo-badge-process",
			2: "detailedDrugDeliveryInfo-badge-update",
			3: "detailedDrugDeliveryInfo-badge-reject",
			4: "detailedDrugDeliveryInfo-badge-complete"
		};

		let latestAction = this.props.actions[this.props.actions.length - 1];
		let latestDrugDetail = latestAction.drugDetail;

		let deliveryRecords = this.props.actions.map((record, key) => (
			<DetailedDrugDeliveryRecord key={key} index={key + 1} {...record} />
		));

		return (
			<div className="detailedDrugDeliveryInfo-container global-border-radius global-box-shadow">
				<div className="detailedDrugDeliveryInfo-section-row">
					<div
						style={
							this.isExpand
								? { paddingTop: "15px", flex: 1 }
								: { paddingTop: "15px", paddingBottom: "15px", flex: 1 }
						}
					>
						<div className="detailedDrugDeliveryInfo-section detailedDrugDeliveryInfo-section-row">
							<InfoTextView
								title="No."
								content={`${this.props.index}`}
							/>
							<InfoTextView
								title="Last Update"
								// content={Moment.unix(firstAction.time).format("YYYY-MM-DD HH:mm")}
								content={Moment.unix(latestAction.time).format("LLLL")}
							/>

							<InfoTextView
								title="Drug"
								content={latestDrugDetail.drug.name}
								description={latestDrugDetail.drug.type}
							/>
							<InfoTextView
								title="Duration"
								content={`${latestDrugDetail.treatment_duration} Days`}
							/>
							<InfoTextView
								title="Daily Dosage"
								content={latestDrugDetail.daily_dosage + " mg"}
							/>

							<div className="detailedDrugDeliveryInfo-section-stuffing" />
							<div
								style={{ marginTop: "10px", marginRight: "15px" }}
								className={`global-box-shadow global-border-radius detailedDrugDeliveryInfo-badge ${
									badgeStateClass[latestAction.state]
								}`}
							>
								{DELIVERY_STATUS[latestAction.state]}
							</div>
						</div>
					</div>
					<div className="detailedDrugDeliveryInfo-button-container">
						{!this.state.isExpand ? (
							<div
								className="detailedDrugDeliveryInfo-button detailedDrugDeliveryInfo-button-expand"
								onClick={() => this.setState({ isExpand: true })}
							>
								<Icon
									className="detailedDrugDeliveryInfo-button-icon"
									type="down-circle"
								/>
								Expand
							</div>
						) : (
							<div
								className="detailedDrugDeliveryInfo-button detailedDrugDeliveryInfo-button-expand"
								onClick={() => this.setState({ isExpand: false })}
							>
								<Icon
									className="detailedDrugDeliveryInfo-button-icon"
									type="up-circle"
								/>
								Collapse
							</div>
						)}
					</div>
				</div>

				{this.state.isExpand ? (
					<div style={{ paddingBottom: "15px" }}>
						{this.state.isUpdating ? (
							<DrugDeliveryModifier
								{...latestAction.drugDetail}
								isUpdating={true}
								onUpdateClicked={this.props.onClickedUpdate}
								onCancelClicked={() =>
									this.setState({ isUpdating: false })
								}
							/>
						) : (
							<Divider
								style={{ marginTop: "0px", marginBottom: "15px" }}
							/>
						)}

						<div className="detailedDrugDeliveryInfo-section detailedDrugDeliveryInfo-section-column">
							<div className="detailedDrugDeliveryInfo-section-title">
								Changed Record
							</div>
							<div className="detailedDrugDeliveryInfo-section-record">
								{deliveryRecords}
							</div>
						</div>
					</div>
				) : null}
			</div>
		);
	}
}

export default DetailedDrugDeliveryInfo;
