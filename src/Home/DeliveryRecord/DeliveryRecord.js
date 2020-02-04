import React, { Component } from "react";
import { connect } from "react-redux";
import { Icon } from "antd";

import {
	onSetPageTitle,
	onAddNotification,
	onSetDoctorDeliveryRecordList
} from "../../actions";
import * as NetworkManager from "../../NetworkConfig/NetworkManager";

import DrugDeliveryInfo from "../../Component/DrugDeliveryInfo/DrugDeliveryInfo";
import UserInfo from "../../Component/UserInfo/UserInfo";
import InfoBlock from "../../Component/InfoBlock/InfoBlock";

import "./DeliveryRecord.css";

class DeliveryRecord extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: "Delivery Record",
			isLoading: false,
			isLoadingUpdateRecord: false,
			isLoadingRejectRecord: false,
			selectedRecord: {}
		};
		props.setPageTitle(this.state.title);
	}

	componentDidMount() {
		this.updateDoctorDeliveryRecord();
	}

	updateDoctorDeliveryRecord = () => {
		this.setState({ isLoading: true });
		NetworkManager.GetDoctorDeliveryRecord().then(getResult => {
			this.setState({ isLoading: false });

			if (!getResult.success) {
				this.props.addNotification("System Info", getResult.message);
			} else {
				this.props.setDoctorDeliveryRecordList(
					getResult.deliveryRecordList
				);
			}
		});
	};

	onUpdateDeliveryRecord = updateDetails => {
		this.setState({ isLoadingUpdateRecord: true });
		NetworkManager.UpdateDeliveryRecord(this.state.selectedRecord.rid, {
			patientId: this.state.selectedRecord.patient.uid,
			...updateDetails
		}).then(result => {
			this.setState({ isLoadingUpdateRecord: false });
			result.isPermanent = result.isPermanent || false;
			this.props.addNotification(
				"System Info",
				result.message,
				result.isPermanent
			);
			if (result.success) {
				this.setState({ selectedRecord: {} });
				this.updateDoctorDeliveryRecord();
			}
		});
	};

	onReturnDeliveryRecord = recordId => {
		this.setState({ isLoadingRejectRecord: true });
		NetworkManager.RejectDeliveryRecord(recordId).then(result => {
			this.setState({ isLoadingRejectRecord: false });
			this.props.addNotification("System Info", result.message);
			if (result.success) {
				this.setState({ selectedRecord: {} });
				this.updateDoctorDeliveryRecord();
			}
		});
	};

	render() {
		let deliveredRecord = this.props.deliveredRecord.map((record, key) => (
			<DrugDeliveryInfo
				key={key}
				{...record}
				onClickedSelect={() => this.setState({ selectedRecord: record })}
			/>
		));

		return (
			<div className="deliveryRecord-container">
				<div className="deliveryRecord-section">
					<div className="deliveryRecord-section-title">
						Your Delivery Record
						{this.state.isLoading ? (
							<Icon style={{ marginRight: "10px" }} type="loading" />
						) : null}
					</div>
					{deliveredRecord.length > 0 ? (
						<div className="deliveryRecord-section-content">
							{deliveredRecord}
						</div>
					) : (
						<InfoBlock
							iconType="check-circle"
							message="No Pending Delivery"
						/>
					)}
				</div>
				<div className="deliveryRecord-section-divider" />
				{JSON.stringify(this.state.selectedRecord).replace(/"/g, "") !==
				"{}" ? (
					<div className="deliveryRecord-section">
						<div className="deliveryRecord-section-title">Patient</div>
						<UserInfo {...this.state.selectedRecord.patient} />
						<div className="deliveryRecord-section-title">
							Delivery Record
						</div>
						<div className="deliveryRecord-section-content">
							<DrugDeliveryInfo
								{...this.state.selectedRecord}
								isExpand={true}
								onClickedUpdate={this.onUpdateDeliveryRecord}
								isLoading={
									this.state.isLoadingUpdateRecord ||
									this.state.isLoadingRejectRecord
								}
								onClickedReturn={() =>
									this.onReturnDeliveryRecord(
										this.state.selectedRecord.rid
									)
								}
							/>
						</div>
					</div>
				) : (
					<div className="deliveryRecord-section" />
				)}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		pageTitle: state.appReducer.pageTitle,
		deliveredRecord: state.appReducer.doctorDeliveryRecordList
	};
};

const mapDispatchToProps = dispatch => {
	return {
		setPageTitle: pageTitle => {
			dispatch(onSetPageTitle(pageTitle));
		},
		addNotification: (title, message, isPermanent) => {
			dispatch(onAddNotification(title, message, isPermanent));
		},
		setDoctorDeliveryRecordList: list => {
			dispatch(onSetDoctorDeliveryRecordList(list));
		}
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(DeliveryRecord);
