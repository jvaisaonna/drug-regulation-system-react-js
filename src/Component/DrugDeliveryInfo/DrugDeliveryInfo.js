import React, { Component } from "react";
import Moment from "moment";
import { Divider, Icon } from "antd";

import { DELIVERY_STATUS } from "../../global";
import DrugDeliveryRecord from "./DrugDeliveryRecord/DrugDeliveryRecord";
import DrugDeliveryModifier from "../DrugDeliveryModifier/DrugDeliveryModifier";
import InfoTextView from "../InfoTextView/InfoTextView";

import "./DrugDeliveryInfo.css";

class DrugDeliveryInfo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isExpand: props.isExpand || false,
			isUpdating: false
		};
	}

	render() {
		let badgeStateClass = {
			0: "drugDeliveryInfo-badge-pending",
			1: "drugDeliveryInfo-badge-process",
			2: "drugDeliveryInfo-badge-update",
			3: "drugDeliveryInfo-badge-reject",
			4: "drugDeliveryInfo-badge-complete"
		};

		let latestAction = this.props.actions[this.props.actions.length - 1];
		let latestDrugDetail = latestAction.drugDetail;

		let deliveryRecords = this.props.actions.map((record, key) => (
			<DrugDeliveryRecord key={key} index={key + 1} {...record} />
		));

		return (
			<div className="drugDeliveryInfo-container global-border-radius global-box-shadow">
				<div className="drugDeliveryInfo-section-row">
					<div
						style={
							this.isExpand
								? { paddingTop: "15px", flex: 1 }
								: { paddingTop: "15px", paddingBottom: "15px", flex: 1 }
						}
					>
						<div className="drugDeliveryInfo-section drugDeliveryInfo-section-row">
							<InfoTextView
								title="Last Update"
								// content={Moment.unix(firstAction.time).format("YYYY-MM-DD HH:mm")}
								content={Moment.unix(latestAction.time).format("LLLL")}
							/>
							<div className="drugDeliveryInfo-section-stuffing" />
							<div
								style={{ marginTop: "10px", marginRight: "15px" }}
								className={`global-box-shadow global-border-radius drugDeliveryInfo-badge ${
									badgeStateClass[latestAction.state]
								}`}
							>
								{DELIVERY_STATUS[latestAction.state]}
							</div>
						</div>

						<div className="drugDeliveryInfo-section drugDeliveryInfo-section-row">
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
						</div>
					</div>
					<div
						className={
							this.props.isForExpand ||
							this.props.onClickedSelect ||
							this.props.onClickedComplete ||
							(this.props.onClickedUpdate && latestAction.state <= 1) ||
							(this.props.onClickedReturn && latestAction.state <= 1)
								? "drugDeliveryInfo-button-container"
								: ""
						}
					>
						{this.props.isForExpand ? (
							!this.state.isExpand ? (
								<div
									className="drugDeliveryInfo-button drugDeliveryInfo-button-expand"
									onClick={() => this.setState({ isExpand: true })}
								>
									<Icon
										className="drugDeliveryInfo-button-icon"
										type="down-circle"
									/>
									Expand
								</div>
							) : (
								<div
									className="drugDeliveryInfo-button drugDeliveryInfo-button-expand"
									onClick={() => this.setState({ isExpand: false })}
								>
									<Icon
										className="drugDeliveryInfo-button-icon"
										type="up-circle"
									/>
									Collapse
								</div>
							)
						) : null}

						{this.props.isLoading ? (
							<div className="drugDeliveryInfo-button drugDeliveryInfo-button-disable">
								<Icon
									className="drugDeliveryInfo-button-icon"
									type="loading"
								/>
								LOADING...
							</div>
						) : null}
						{!this.props.isLoading && this.props.onClickedSelect ? (
							<div
								className={`drugDeliveryInfo-button drugDeliveryInfo-button-select ${
									this.props.isDisable
										? "drugDeliveryInfo-button-disable"
										: ""
								}`}
								onClick={this.props.onClickedSelect}
							>
								<Icon
									className="drugDeliveryInfo-button-icon"
									type="select"
								/>
								SELECT
							</div>
						) : null}
						{!this.props.isLoading &&
						this.props.onClickedUpdate &&
						latestAction.state <= 1 ? (
							<div
								className={`drugDeliveryInfo-button drugDeliveryInfo-button-update ${
									this.state.isUpdating
										? "drugDeliveryInfo-button-disable"
										: ""
								}`}
								onClick={() => this.setState({ isUpdating: true })}
							>
								<Icon
									className="drugDeliveryInfo-button-icon"
									type="edit"
								/>
								UPDATE
							</div>
						) : null}
						{!this.props.isLoading &&
						this.props.onClickedReturn &&
						latestAction.state <= 1 ? (
							<div
								className="drugDeliveryInfo-button drugDeliveryInfo-button-return"
								onClick={this.props.onClickedReturn}
							>
								<Icon
									className="drugDeliveryInfo-button-icon"
									type="delete"
								/>
								RETURN
							</div>
						) : null}
						{!this.props.isLoading && this.props.onClickedComplete ? (
							<div
								className="drugDeliveryInfo-button drugDeliveryInfo-button-complete"
								onClick={this.props.onClickedComplete}
							>
								<Icon
									className="drugDeliveryInfo-button-icon"
									type="check-circle"
								/>
								COMPLETE
							</div>
						) : null}
					</div>
				</div>

				{this.state.isExpand ? (
					<div style={{ paddingBottom: "15px" }}>
						{this.state.isUpdating && latestAction.state <= 1 ? (
							<DrugDeliveryModifier
								{...latestAction.drugDetail}
								isUpdating={true}
								isLoading={this.props.isLoading}
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

						<div className="drugDeliveryInfo-section drugDeliveryInfo-section-column">
							<div className="drugDeliveryInfo-section-title">
								Changed Record
							</div>
							<div className="drugDeliveryInfo-section-record">
								{deliveryRecords}
							</div>
						</div>
					</div>
				) : null}
			</div>
		);
	}
}

export default DrugDeliveryInfo;
