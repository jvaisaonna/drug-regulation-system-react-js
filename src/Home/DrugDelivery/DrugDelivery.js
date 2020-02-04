import React, { Component } from "react";
import { connect } from "react-redux";
import Moment from "moment";
import { Icon } from "antd";

import {
	onSetPageTitle,
	onAddNotification,
	onSetPharmacistDeliveryRecordList,
	onSetPharmacistProcessingRecord
} from "../../actions";
import * as NetworkManager from "../../NetworkConfig/NetworkManager";

import InfoTextView from "../../Component/InfoTextView/InfoTextView";
import DrugDeliveryInfo from "../../Component/DrugDeliveryInfo/DrugDeliveryInfo";
import UserInfo from "../../Component/UserInfo/UserInfo";
import InfoBlock from "../../Component/InfoBlock/InfoBlock";

import "./DrugDelivery.css";

class DrugDelivery extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: "Drug Delivery",
			isLoading: false,
			isLoadingProcessingRecord: false,
			isLoadingCompletingRecord: false,
			selectedRecord: {}
		};

		props.setPageTitle(this.state.title);

		this.onCompleteDelivery = this.onCompleteDelivery.bind(this);
	}

	componentDidMount() {
		this.updatePharmacistDeliveryRecord();
	}

	updatePharmacistDeliveryRecord = () => {
		this.setState({ isLoading: true });
		NetworkManager.GetPharmacistDeliveryRecord().then(getResult => {
			if (!getResult.success) {
				this.props.addNotification("System Info", getResult.message);
			} else {
				this.props.setPharmacistDeliveryRecordList(
					getResult.deliveryRecordList
				);
			}
		});

		NetworkManager.GetPharmacistProcessingDeliveryRecord(
			this.props.user.uid
		).then(getRecordResult => {
			console.log(getRecordResult);
			this.setState({ isLoading: false });
			if (!getRecordResult.success) {
				this.props.addNotification("System Info", getRecordResult.message);
			} else {
				this.setState({
					selectedRecord: getRecordResult.deliveryRecord
				});
				this.props.setPharmacistProcessingRecord(
					getRecordResult.deliveryRecord
				);
			}
		});
	};

	onSelectDeliveryRecord = () => {
		this.setState({ isLoadingProcessingRecord: true });
		NetworkManager.ProcessDeliveryRecord(this.state.selectedRecord.rid).then(
			result => {
				this.setState({ isLoadingProcessingRecord: false });
				if (!result.success) {
					this.props.addNotification("System Info", result.message);
				} else {
					this.updatePharmacistDeliveryRecord();
				}
			}
		);
	};

	onCompleteDelivery() {
		this.setState({ isLoadingCompletingRecord: true });
		NetworkManager.CompleteDeliveryRecord(this.state.selectedRecord.rid).then(
			result => {
				this.setState({ isLoadingCompletingRecord: false });
				if (!result.success) {
					this.props.addNotification("System Info", result.message);
				} else {
					this.updatePharmacistDeliveryRecord();
				}
			}
		);
	}

	render() {
		let isDisableSelectNewDelivery =
			JSON.stringify(this.state.selectedRecord).replace(/"/g, "") !== "{}";
		let pendingDelivery = this.props.pendingDelivery.map((delivery, key) => (
			<DrugDeliveryInfo
				key={key}
				{...delivery}
				isDisable={isDisableSelectNewDelivery}
				isLoading={this.state.isLoadingProcessingRecord}
				onClickedSelect={() => {
					if (!isDisableSelectNewDelivery) {
						this.setState({ selectedRecord: delivery }, () => {
							this.onSelectDeliveryRecord();
						});
					}
				}}
			/>
		));

		return (
			<div className="drugDelivery-container">
				<div className="drugDelivery-section">
					<div
						style={{ marginBottom: "0px" }}
						className="drugDelivery-section-title"
					>
						Pending Delivery
						<InfoTextView
							title="Last Update"
							content={
								this.state.isLoading ? (
									<Icon type="loading" />
								) : (
									Moment().format("YYYY-MM-DD HH:mm:ss")
								)
							}
						/>
					</div>
					{pendingDelivery.length > 0 ? (
						<div className="drugDelivery-section-content">
							{pendingDelivery}
						</div>
					) : (
						<InfoBlock
							iconType="check-circle"
							message="No Pending Delivery"
						/>
					)}
				</div>
				<div className="drugDelivery-section-divider" />
				{!this.state.isLoadingProcessingRecord &&
				JSON.stringify(this.state.selectedRecord).replace(/"/g, "") !==
					"{}" ? (
					<div className="drugDelivery-section">
						<div className="drugDelivery-section-title">Patient</div>
						<UserInfo {...this.state.selectedRecord.patient} />
						<div className="drugDelivery-section-title">
							Delivery Record
						</div>
						<div className="drugDelivery-section-content">
							<DrugDeliveryInfo
								{...this.state.selectedRecord}
								isExpand={true}
								isLoading={this.state.isLoadingCompletingRecord}
								onClickedComplete={this.onCompleteDelivery}
							/>
						</div>
					</div>
				) : (
					<div className="drugDelivery-section" />
				)}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		user: state.appReducer.user,
		pageTitle: state.appReducer.pageTitle,
		pendingDelivery: state.appReducer.pharmacistDeliveryRecordList,
		processingDelivery: state.appReducer.pharmacistProcessingRecord
	};
};

const mapDispatchToProps = dispatch => {
	return {
		setPageTitle: pageTitle => {
			dispatch(onSetPageTitle(pageTitle));
		},
		addNotification: (title, message) => {
			dispatch(onAddNotification(title, message));
		},
		setPharmacistDeliveryRecordList: list => {
			dispatch(onSetPharmacistDeliveryRecordList(list));
		},
		setPharmacistProcessingRecord: pr => {
			dispatch(onSetPharmacistProcessingRecord(pr));
		}
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(DrugDelivery);
