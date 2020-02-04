import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch, Route, Link, Redirect } from "react-router-dom";

// Home Page Component
import Sidebar from "./Sidebar/Sidebar";
import HeaderBar from "./HeaderBar/HeaderBar";

// Route Component
import Dashboard from "./Dashboard/Dashboard";
import DrugFormulary from "./DrugFormulary/DrugFormulary";
import StaffManagement from "./StaffManagement/StaffManagement";
import PatientProfile from "./PatientProfile/PatientProfile";
import DeliveryRecord from "./DeliveryRecord/DeliveryRecord";
import DrugDelivery from "./DrugDelivery/DrugDelivery";
import MedicalHistory from "./MedicalHistory/MedicalHistory";

import "./Home.css";

class Home extends Component {
	constructor() {
		super();
		this.state = {};
	}

	render() {
		let routeSetting = [];
		switch (
			this.props.user.position[this.props.user.position.length - 1].role
		) {
			case 0:
				routeSetting.push(
					<Route
						key={0}
						path={`${this.props.match.path}history`}
						component={MedicalHistory}
					/>
				);
				routeSetting.push(<Redirect from="/" to="/history" />);
				break;
			case 1: // Doctor
				routeSetting.push(
					<Route
						key={1}
						path={`${this.props.match.path}patient`}
						component={PatientProfile}
					/>
				);
				routeSetting.push(
					<Route
						key={2}
						path={`${this.props.match.path}record`}
						component={DeliveryRecord}
					/>
				);
				routeSetting.push(
					<Route
						key={0}
						path={`${this.props.match.path}history`}
						component={MedicalHistory}
					/>
				);
				routeSetting.push(<Redirect key={9} from="/" to="/patient" />);
				break;
			case 2: // Pharmacist
				routeSetting.push(
					<Route
						key={3}
						path={`${this.props.match.path}delivery`}
						component={DrugDelivery}
					/>
				);
				routeSetting.push(
					<Route
						key={0}
						path={`${this.props.match.path}history`}
						component={MedicalHistory}
					/>
				);
				routeSetting.push(<Redirect key={9} from="/" to="/delivery" />);
				break;
			case 10: // HA
				routeSetting.push(
					<Route
						key={4}
						path={`${this.props.match.path}drug-formulary`}
						component={DrugFormulary}
					/>
				);
				routeSetting.push(<Redirect from="/" to="/drug-formulary" />);
				break;
			case 11: // Hospital
				routeSetting.push(
					<Route
						key={5}
						path={`${this.props.match.path}staff`}
						component={StaffManagement}
					/>
				);
				routeSetting.push(<Redirect key={9} from="/" to="/staff" />);
				break;
			default:
		}

		return (
			<div className="home-container">
				<Sidebar />
				<div className="home-main">
					<div className="home-main-title">
						<HeaderBar />
					</div>
					<div className="home-main-content">
						<Switch>
							{/* <Route
								exact
								path={`${this.props.match.path}`}
								component={Dashboard}
							/> */}
							{routeSetting}

							<Route
								component={() => (
									<div
										className="home-main-content"
										style={{
											display: "flex",
											alignItems: "center",
											justifyContent: "center",
											flexDirection: "column",
											textAlign: "center",
											fontSize: "24px"
										}}
									>
										<div style={{ fontSize: "76px" }}>404</div>
										Page Not found
										<br />
										<Link to="/">Back to home</Link>
									</div>
								)}
							/>
						</Switch>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return { user: state.appReducer.user };
};

const mapDispatchToProps = dispatch => {
	return {};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Home);
