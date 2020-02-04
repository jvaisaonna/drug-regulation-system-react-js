import React, { Component } from "react";
import { connect } from "react-redux";
import { Icon } from "antd";

import {
	onSetPageTitle,
	onAddNotification,
	onSetSelfRecord
} from "../../actions";
import * as NetworkManager from "../../NetworkConfig/NetworkManager";

import InputText from "../../Component/InputText/InputText";
import InfoBlock from "../../Component/InfoBlock/InfoBlock";
import DetailedDrugDeliveryInfo from "../../Component/DetailedDrugDeliveryInfo/DetailedDrugDeliveryInfo";

import "./MedicalHistory.css";

class MedicalHistory extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: "Medical History",
			searchKeyword: "",
			isLoading: false
		};

		props.setPageTitle(this.state.title);
	}

	componentDidMount() {
		this.updateDeliveryHistory();
	}

	updateDeliveryHistory = () => {
		this.setState({ isLoading: true });
		NetworkManager.GetPatientDeliveryRecord(this.props.user.uid).then(
			getResult => {
				this.setState({ isLoading: false });
				if (!getResult.success) {
					this.props.addNotification("System Info", getResult.message);
				} else {
					this.props.setSelfReocrd(getResult.deliveryRecordList);
				}
			}
		);
	};

	render() {
		let selfMedicalHistory = this.props.deliveryRecord;

		if (this.state.searchKeyword !== "") {
			selfMedicalHistory = selfMedicalHistory.filter(item => {
				let result = false;
				item.actions.forEach(action => {
					if (
						action.user.first_name.search(
							new RegExp(this.state.searchKeyword, "i")
						) >= 0 ||
						action.user.last_name.search(
							new RegExp(this.state.searchKeyword, "i")
						) >= 0 ||
						action.user.position.hospital.name.search(
							new RegExp(this.state.searchKeyword, "i")
						) >= 0 ||
						action.drugDetail.drug.type.search(
							new RegExp(this.state.searchKeyword, "i")
						) >= 0 ||
						action.drugDetail.drug.name.search(
							new RegExp(this.state.searchKeyword, "i")
						) >= 0
					) {
						result = true;
					}
				});
				return result;
			});
		}

		selfMedicalHistory = selfMedicalHistory.map((record, key) => (
			<DetailedDrugDeliveryInfo key={key} index={key + 1} {...record} />
		));

		return (
			<div className="medicalHistory-container">
				<div className="medicalHistory-section">
					<div className="medicalHistory-section-title">
						Medical History
					</div>
					<div className="staffManagement-section-search-field global-box-shadow">
						<InputText
							prefixComponent={<Icon type="search" />}
							placeholder="Search History by Drug Data or Medical Staff Data"
							onChange={e => {
								this.setState({ searchKeyword: e.target.value });
							}}
						/>
					</div>
					{this.state.isLoading ? (
						<div style={{ height: "100px" }}>
							<InfoBlock iconType="loading" message="Loading..." />
						</div>
					) : null}
					{selfMedicalHistory.length > 0 ? (
						<div className="medicalHistory-section-content">
							{selfMedicalHistory}
						</div>
					) : null}
					{!this.state.isLoading && selfMedicalHistory.length <= 0 ? (
						<InfoBlock
							iconType="check-circle"
							message="No Medical History"
						/>
					) : null}
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		user: state.appReducer.user,
		pageTitle: state.appReducer.pageTitle,
		deliveryRecord: state.appReducer.selfRecord
	};
};

const mapDispatchToProps = dispatch => {
	return {
		setPageTitle: pageTitle => {
			dispatch(onSetPageTitle(pageTitle));
		},
		setSelfReocrd: records => {
			dispatch(onSetSelfRecord(records));
		},
		addNotification: (title, message) => {
			dispatch(onAddNotification(title, message));
		}
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MedicalHistory);
