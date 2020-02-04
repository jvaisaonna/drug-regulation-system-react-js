import React, { Component } from "react";
import { connect } from "react-redux";
import { Icon } from "antd";

import {
	onSetPageTitle,
	onSetPatientList,
	onSetDrugFormulary,
	onAddNotification
} from "../../actions";
import * as NetworkManager from "../../NetworkConfig/NetworkManager";

import InfoBlock from "../../Component/InfoBlock/InfoBlock";
import UserInfo from "../../Component/UserInfo/UserInfo";
import DrugDeliveryInfo from "../../Component/DrugDeliveryInfo/DrugDeliveryInfo";
import DrugDeliveryModifier from "../../Component/DrugDeliveryModifier/DrugDeliveryModifier";
import InputText from "../../Component/InputText/InputText";

import "./PatientProfile.css";

class PatientProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: "Patient Profile",
			searchPatient: "",
			selectedPatient: {},
			selectedPatientDeliveryRecord: [],
			isLoading: false,
			isShowCreateRecord: false,
			isLoadingSelectedPatientMedicalHistory: false,
			isLoadingCreateRecord: false
		};

		props.setPageTitle(this.state.title);

		this.onSelectPatient = this.onSelectPatient.bind(this);
		this.updatePatientList = this.updatePatientList.bind(this);
		this.updateDrugList = this.updateDrugList.bind(this);
		this.updateSelectedPatientMedicalRecord = this.updateSelectedPatientMedicalRecord.bind(
			this
		);
		this.onCreateRecord = this.onCreateRecord.bind(this);
	}

	componentDidMount() {
		this.updatePatientList();
		this.updateDrugList();
	}

	updatePatientList() {
		this.setState({ isLoading: true });
		NetworkManager.GetPatientList().then(result => {
			this.setState({ isLoading: false });
			if (!result.success) {
				this.props.addNotification("System Info", result.message);
			} else {
				this.props.setPatientList(result.patientList);
			}
		});
	}

	updateDrugList() {
		NetworkManager.GetAvailableDrugFormulary().then(result => {
			if (!result.success) {
				this.props.addNotification("System Info", result.message);
			} else {
				this.props.setDrugFormulary(result.drugList);
			}
		});
	}

	updateSelectedPatientMedicalRecord() {
		if (
			JSON.stringify(this.state.selectedPatient).replace(/"/g, "") === "{}"
		) {
			return;
		}
		this.setState({ isLoadingSelectedPatientMedicalHistory: true });
		NetworkManager.GetPatientDeliveryRecord(
			this.state.selectedPatient.uid
		).then(result => {
			this.setState({ isLoadingSelectedPatientMedicalHistory: false });
			if (!result.success) {
				this.props.addNotification("System Info", result.message);
			} else {
				this.setState({
					selectedPatientDeliveryRecord: result.deliveryRecordList
				});
			}
		});
	}

	onSelectPatient(patient) {
		this.setState({ selectedPatient: patient }, () => {
			this.updateSelectedPatientMedicalRecord();
		});
	}

	onCreateRecord(drugDetail) {
		if (this.state.isLoadingCreateRecord) {
			return;
		}
		this.setState({ isLoadingCreateRecord: true });
		NetworkManager.CreateDeliveryRecord(
			this.state.selectedPatient,
			drugDetail
		).then(createResult => {
			createResult.isPermanent = createResult.isPermanent || false;
			this.props.addNotification(
				"System Info",
				createResult.message,
				createResult.isPermanent
			);

			if (createResult.success) {
				this.updateSelectedPatientMedicalRecord();
				this.setState({
					isLoadingCreateRecord: false,
					isShowCreateRecord: false
				});
			} else {
				this.setState({ isLoadingCreateRecord: false });
			}
		});
	}

	render() {
		let patientInfoList = this.props.patients
			.filter(item => {
				return (
					item.first_name.search(
						new RegExp(this.state.searchPatient, "i")
					) >= 0 ||
					item.last_name.search(
						new RegExp(this.state.searchPatient, "i")
					) >= 0 ||
					item.phone_number.search(
						new RegExp(this.state.searchPatient, "i")
					) >= 0 ||
					item.hkid.search(new RegExp(this.state.searchPatient, "i")) >= 0
				);
			})
			.map((patient, key) => (
				<UserInfo
					key={key}
					{...patient}
					isMask={true}
					onClickedSelect={() => this.onSelectPatient(patient)}
				/>
			));

		let isSelectedPatient =
			JSON.stringify(this.state.selectedPatient).replace(/"/g) !== "{}";
		let selectedPatient = this.state.selectedPatient;
		// let selectedPatientMedicalHistory = this.props.deliveryRecord.map(
		// 	(record, key) => (
		// 		<DrugDeliveryInfo key={key} {...record} isForExpand={true} />
		// 	)
		// );
		let selectedPatientMedicalHistory = this.state.selectedPatientDeliveryRecord.map(
			(record, key) => (
				<DrugDeliveryInfo key={key} {...record} isForExpand={true} />
			)
		);

		return (
			<div className="patientProfile-container">
				<div className="patientProfile-section">
					<div className="patientProfile-section-title">
						Patients
						{this.state.isLoading ? (
							<Icon style={{ marginRight: "10px" }} type="loading" />
						) : null}
					</div>
					<div className="patientProfile-section-search-field global-box-shadow">
						<InputText
							prefixComponent={<Icon type="search" />}
							placeholder="Search Patient by Name, Phone No. or HKID"
							onChange={e => {
								this.setState({ searchPatient: e.target.value });
							}}
						/>
					</div>

					{patientInfoList.length > 0 ? (
						<div className="patientProfile-section-content">
							{patientInfoList}
						</div>
					) : (
						<InfoBlock iconType="info-circle" message="No Doctor Staff" />
					)}
				</div>
				<div className="patientProfile-section-divider" />
				{isSelectedPatient ? (
					<div className="patientProfile-section">
						<div className="patientProfile-section-title">
							Selected Patient
						</div>
						<UserInfo
							{...selectedPatient}
							isDisable={this.state.isShowCreateRecord}
							onClickedCreate={() =>
								this.setState({ isShowCreateRecord: true })
							}
						/>
						<div className="patientProfile-section-title">
							Medical History
						</div>
						<div className="patientProfile-section-content">
							{this.state.isShowCreateRecord ? (
								<DrugDeliveryModifier
									onCancelClicked={() =>
										this.setState({ isShowCreateRecord: false })
									}
									onCreateClicked={this.onCreateRecord}
									isLoading={this.state.isLoadingCreateRecord}
								/>
							) : null}

							{!this.state.isLoadingSelectedPatientMedicalHistory &&
							this.state.selectedPatientDeliveryRecord.length > 0 ? (
								<div>{selectedPatientMedicalHistory}</div>
							) : null}
							{this.state.isLoadingSelectedPatientMedicalHistory ? (
								<InfoBlock
									iconType="loading"
									message="Loading Patient Medical History..."
								/>
							) : null}
							{!this.state.isLoadingSelectedPatientMedicalHistory &&
							this.state.selectedPatientDeliveryRecord.length <= 0 ? (
								<InfoBlock
									iconType="info-circle"
									message="No Medical History"
								/>
							) : null}
						</div>
					</div>
				) : (
					<div className="patientProfile-section" />
				)}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		pageTitle: state.appReducer.pageTitle,
		user: state.appReducer.user,
		patients: state.appReducer.patientList,
		deliveryRecord: state.appReducer.DeliveryRecord
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
		setPatientList: patientList => {
			dispatch(onSetPatientList(patientList));
		},
		setDrugFormulary: drugFormulary => {
			dispatch(onSetDrugFormulary(drugFormulary));
		}
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PatientProfile);
