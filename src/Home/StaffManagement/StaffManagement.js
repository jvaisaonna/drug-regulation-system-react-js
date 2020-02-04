import React, { Component } from "react";
import { connect } from "react-redux";
import { Icon } from "antd";

import {
	onSetPageTitle,
	onSetHospital,
	onAddNotification
} from "../../actions";
import * as NetworkManager from "../../NetworkConfig/NetworkManager";

import UserInfo from "../../Component/UserInfo/UserInfo";
import InputText from "../../Component/InputText/InputText";
import CustomButton from "../../Component/CustomButton/CustomButton";
import InfoBlock from "../../Component/InfoBlock/InfoBlock";

import "./StaffManagement.css";

class StaffManagement extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: "Staff Management",
			searchDoctor: "",
			searchPharmacist: "",
			newDoctorHKID: "",
			newPharmacistHKID: "",
			isAddingDoctor: false,
			isAddingPharmacist: false,
			isLoading: false,
			isLoadingAddDoctor: false,
			isLoadingAddPharmacist: false,
			isLoadingRemoveStaff: false
		};

		props.setPageTitle(this.state.title);

		this.onRemoveStaff = this.onRemoveStaff.bind(this);
		this.onChangeValue = this.onChangeValue.bind(this);
		this.updateHospitalInfo = this.updateHospitalInfo.bind(this);
	}

	componentDidMount() {
		this.updateHospitalInfo();
	}

	updateHospitalInfo() {
		this.setState({ isLoading: true });
		NetworkManager.GetHospitalInfo().then(res => {
			this.setState({ isLoading: false });

			if (!res.success) {
				this.props.addNotification(
					"Update Hospital Info Failed",
					res.message
				);
			} else {
				this.props.setHospital(res.hospital);
			}
		});
	}

	onChangeValue(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	onAddDoctor() {
		if (this.state.isLoadingAddDoctor) {
			return;
		}
		this.setState({ isLoadingAddDoctor: true });
		NetworkManager.AddHospitalDoctor(this.state.newDoctorHKID).then(
			addResult => {
				this.setState({
					isLoadingAddDoctor: false,
					isAddingDoctor: false,
					newDoctorHKID: ""
				});
				if (!addResult.success) {
					this.props.addNotification(
						"Add Doctor Failed",
						addResult.message
					);
				} else {
					this.props.addNotification("System Info", "Add Doctor Success");
					this.updateHospitalInfo();
				}
			}
		);
	}

	onAddPharmacist() {
		if (this.state.isLoadingAddPharmacist) {
			return;
		}
		this.setState({ isLoadingAddPharmacist: true });
		NetworkManager.AddHospitalPharmacist(this.state.newPharmacistHKID).then(
			addResult => {
				this.setState({
					isLoadingAddPharmacist: false,
					isAddingPharmacist: false,
					newPharmacistHKID: ""
				});
				if (!addResult.success) {
					this.props.addNotification(
						"Add Pharmacist Failed",
						addResult.message
					);
				} else {
					this.props.addNotification(
						"System Info",
						"Add Pharmacist Success"
					);
					this.updateHospitalInfo();
				}
			}
		);
	}

	onRemoveStaff(staff) {
		this.setState({ isLoadingRemoveStaff: true });
		if (staff.position[0].role === 1) {
			NetworkManager.RemoveHospitalDoctor(staff.uid).then(removeResult => {
				this.setState({ isLoadingRemoveStaff: false });
				if (!removeResult.success) {
					this.props.addNotification(
						"Remove Staff Failed",
						removeResult.message
					);
				} else {
					this.props.addNotification("System Info", "Removed Doctor");
					this.updateHospitalInfo();
				}
			});
		} else {
			NetworkManager.RemoveHospitalPharmacist(staff.uid).then(
				removeResult => {
					this.setState({ isLoadingRemoveStaff: false });
					if (!removeResult.success) {
						this.props.addNotification(
							"Remove Staff Failed",
							removeResult.message
						);
					} else {
						this.props.addNotification(
							"System Info",
							"Removed Pharmacist"
						);
						this.updateHospitalInfo();
					}
				}
			);
		}
	}

	render() {
		let hospitalInfo = this.props.hospital;
		hospitalInfo.doctor_list = hospitalInfo.doctor_list || [];
		hospitalInfo.pharmacist_list = hospitalInfo.pharmacist_list || [];

		hospitalInfo.doctor_list.forEach(element => {
			if (!Array.isArray(element.position)) {
				element.position = [{ ...element.position }];
			}
		});

		hospitalInfo.pharmacist_list.forEach(element => {
			if (!Array.isArray(element.position)) {
				element.position = [{ ...element.position }];
			}
		});

		let doctorInfoList = hospitalInfo.doctor_list
			.filter(item => {
				return (
					item.first_name.search(
						new RegExp(this.state.searchDoctor, "i")
					) >= 0 ||
					item.last_name.search(
						new RegExp(this.state.searchDoctor, "i")
					) >= 0 ||
					item.phone_number.search(
						new RegExp(this.state.searchDoctor, "i")
					) >= 0 ||
					item.hkid.search(new RegExp(this.state.searchDoctor, "i")) >= 0
				);
			})
			.map((doctor, key) => (
				<UserInfo
					key={key}
					{...doctor}
					isLoading={this.state.isLoadingRemoveStaff}
					onClickedRemove={() => this.onRemoveStaff(doctor)}
				/>
			));
		let pharmacistInfoList = hospitalInfo.pharmacist_list
			.filter(item => {
				return (
					item.first_name.search(
						new RegExp(this.state.searchPharmacist, "i")
					) >= 0 ||
					item.last_name.search(
						new RegExp(this.state.searchPharmacist, "i")
					) >= 0 ||
					item.phone_number.search(
						new RegExp(this.state.searchPharmacist, "i")
					) >= 0 ||
					item.hkid.search(new RegExp(this.state.searchPharmacist, "i")) >=
						0
				);
			})
			.map((pharmacist, key) => (
				<UserInfo
					key={key}
					{...pharmacist}
					isLoading={this.state.isLoadingRemoveStaff}
					onClickedRemove={() => this.onRemoveStaff(pharmacist)}
				/>
			));

		return (
			<div className="staffManagement-container">
				<div className="staffManagement-section">
					<div className="staffManagement-section-title">
						Doctors
						{!this.state.isAddingDoctor ? (
							<div
								className="staffManagement-section-title-add-button global-border-radius"
								onClick={() => {
									this.setState({ isAddingDoctor: true });
								}}
							>
								<Icon
									className="staffManagement-section-title-add-button-icon"
									type="plus"
								/>
								Add Doctor
							</div>
						) : (
							<div className="staffManagement-section-title-adding-staff">
								<div className="global-box-shadow">
									<InputText
										placeholder="Enter User HKID"
										name="newDoctorHKID"
										value={this.state.newDoctorHKID}
										onChange={this.onChangeValue}
									/>
								</div>
								<CustomButton
									className="global-box-shadow"
									buttonStyle="danger"
									iconType="close-circle"
									name="CANCEL"
									onClicked={() => {
										this.setState({ isAddingDoctor: false });
									}}
								/>
								<CustomButton
									className="global-box-shadow"
									buttonStyle="forest"
									iconType="plus-circle"
									name="ADD"
									onClicked={() => {
										this.onAddDoctor();
									}}
									isLoading={this.state.isLoadingAddDoctor}
								/>
							</div>
						)}
					</div>
					<div className="staffManagement-section-search-field global-box-shadow">
						<InputText
							prefixComponent={<Icon type="search" />}
							placeholder="Search Doctor Staff by Name, Phone No. or HKID"
							onChange={e => {
								this.setState({ searchDoctor: e.target.value });
							}}
						/>
					</div>
					{doctorInfoList.length > 0 ? (
						<div className="staffManagement-section-content">
							{doctorInfoList}
						</div>
					) : null}
					{this.state.isLoading ? (
						<InfoBlock iconType="loading" message="Loading..." />
					) : null}

					{!this.state.isLoading && doctorInfoList.length <= 0 ? (
						<InfoBlock iconType="info-circle" message="No Doctor Staff" />
					) : null}
				</div>
				<div className="staffManagement-section-divider" />
				<div className="staffManagement-section">
					<div className="staffManagement-section-title">
						Pharmacists
						{!this.state.isAddingPharmacist ? (
							<div
								className="staffManagement-section-title-add-button global-border-radius"
								onClick={() => {
									this.setState({ isAddingPharmacist: true });
								}}
							>
								<Icon
									className="staffManagement-section-title-add-button-icon"
									type="plus"
								/>
								Add Pharmacist
							</div>
						) : (
							<div className="staffManagement-section-title-adding-staff">
								<div className="global-box-shadow">
									<InputText
										placeholder="Enter User HKID"
										name="newPharmacistHKID"
										value={this.state.newPharmacistHKID}
										onChange={this.onChangeValue}
									/>
								</div>
								<CustomButton
									className="global-box-shadow"
									buttonStyle="danger"
									iconType="close-circle"
									name="CANCEL"
									onClicked={() => {
										this.setState({ isAddingPharmacist: false });
									}}
								/>
								<CustomButton
									className="global-box-shadow"
									buttonStyle="forest"
									iconType="plus-circle"
									name="ADD"
									onClicked={() => {
										this.onAddPharmacist();
									}}
									isLoading={this.state.isLoadingAddPharmacist}
								/>
							</div>
						)}
					</div>
					<div className="staffManagement-section-search-field global-box-shadow">
						<InputText
							prefixComponent={<Icon type="search" />}
							placeholder="Search Pharmacist Staff by Name, Phone No. or HKID"
							onChange={e => {
								this.setState({ searchPharmacist: e.target.value });
							}}
						/>
					</div>
					{pharmacistInfoList.length > 0 ? (
						<div className="staffManagement-section-content">
							{pharmacistInfoList}
						</div>
					) : null}
					{this.state.isLoading ? (
						<InfoBlock iconType="loading" message="Loading..." />
					) : null}

					{!this.state.isLoading && pharmacistInfoList.length <= 0 ? (
						<InfoBlock
							iconType="info-circle"
							message="No Pharmacist Staff"
						/>
					) : null}
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		pageTitle: state.appReducer.pageTitle,
		user: state.appReducer.user,
		hospital: state.appReducer.hospital
	};
};

const mapDispatchToProps = dispatch => {
	return {
		setPageTitle: pageTitle => {
			dispatch(onSetPageTitle(pageTitle));
		},
		setHospital: hospital => {
			dispatch(onSetHospital(hospital));
		},
		addNotification: (title, message) => {
			dispatch(onAddNotification(title, message));
		}
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(StaffManagement);
