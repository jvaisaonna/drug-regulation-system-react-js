import React, { Component } from "react";
import { connect } from "react-redux";

import {
	onSetUser,
	onSetToken,
	onSetDrugFormulary,
	onSetPatientList,
	onSetHospital,
	onSetSelfRecord,
	onSetDoctorDeliveryRecordList,
	onSetPharmacistDeliveryRecordList,
	onSetPharmacistProcessingRecord
} from "../../actions";

import SidebarFunctionButton from "./SidebarFunctionButton/SidebarFunctionButton";
import "./Sidebar.css";

const SLIDE_BAR_SETTING = {
	0: [{ iconType: "clock-circle", name: "History", linkTo: "/history" }],
	// For doctor
	1: [
		{ iconType: "monitor", name: "Patient Profile", linkTo: "/patient" },
		{ iconType: "history", name: "Delivery Record", linkTo: "/record" },
		{ iconType: "clock-circle", name: "History", linkTo: "/history" }
	],
	// For parmacist
	2: [
		{
			iconType: "cloud-download",
			name: "Drug Delivery",
			linkTo: "/delivery"
		},
		{ iconType: "clock-circle", name: "History", linkTo: "/history" }
	],
	// For HA
	10: [
		{
			iconType: "database",
			name: "Drug Formulary",
			linkTo: "/drug-formulary"
		}
	],
	// For hospital
	11: [{ iconType: "team", name: "Staff Management", linkTo: "/staff" }]

	// { iconType: "home", name: "Dashboard", linkTo: "/" },
};

class Sidebar extends Component {
	constructor() {
		super();
		this.state = {};
	}

	render() {
		let sidebarComponents = SLIDE_BAR_SETTING[
			this.props.user.position[this.props.user.position.length - 1].role
		].map((c, key) => (
			<SidebarFunctionButton
				key={key}
				iconType={c.iconType}
				name={c.name}
				linkTo={c.linkTo}
			/>
		));
		return (
			<div className="sidebar-container">
				{sidebarComponents}

				<SidebarFunctionButton isFilling={true} />
				<SidebarFunctionButton
					iconType="poweroff"
					name="Logout"
					atEnd={true}
					additionalStyle={{ color: "#d74339" }}
					linkTo="/"
					onClicked={() => {
						this.props.setUser({});
						this.props.setToken("");
						this.props.setDrugFormulary([]);
						this.props.setHospital({});
						this.props.setPatientList([]);
						this.props.setSelfRecord([]);
						this.props.setDoctorDeliveryRecordList([]);
						this.props.setPharmacistDeliveryRecordList([]);
						this.props.setPharmacistProcessingRecord({});
					}}
				/>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		user: state.appReducer.user
	};
};

const mapDispatchToProps = dispatch => {
	return {
		setToken: user => {
			dispatch(onSetToken(user));
		},
		setUser: user => {
			dispatch(onSetUser(user));
		},
		setDrugFormulary: df => {
			dispatch(onSetDrugFormulary(df));
		},
		setHospital: h => {
			dispatch(onSetHospital(h));
		},
		setPatientList: pl => {
			dispatch(onSetPatientList(pl));
		},
		setSelfRecord: sr => {
			dispatch(onSetSelfRecord(sr));
		},
		setDoctorDeliveryRecordList: list => {
			dispatch(onSetDoctorDeliveryRecordList(list));
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
)(Sidebar);
