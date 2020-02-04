import React, { Component } from "react";
import { connect } from "react-redux";
import { Select } from "antd";

import InfoTextView from "../InfoTextView/InfoTextView";
import InputText from "../InputText/InputText";
import CustomButton from "../CustomButton/CustomButton";
import "./DrugDeliveryModifier.css";

const { Option } = Select;

class DrugDeliveryModifier extends Component {
	constructor(props) {
		super(props);
		this.state = {
			drug: props.drug || {},
			treatment_duration: props.treatment_duration || 0,
			daily_dosage: props.daily_dosage || 0,
			searchingType: "",
			searchingName: ""
		};

		this.onChangeDrug = this.onChangeDrug.bind(this);
	}

	onChangeDrug() {
		let drug = this.props.drugFormulary.find(
			drug => drug.name === this.state.searchingName
		);
		drug = drug === undefined ? {} : drug;
		this.setState({ drug });
	}

	render() {
		let containerClass = !this.props.isUpdating
			? "drugDeliveryModifier-container global-border-radius global-box-shadow"
			: "drugDeliveryModifier-container-update";

		let drugTypeList = this.props.drugFormulary.map(drug => drug.type);
		drugTypeList = drugTypeList
			.filter((value, index) => drugTypeList.indexOf(value) === index)
			.map((drugType, key) => (
				<Option key={key} value={drugType}>
					{drugType}
				</Option>
			));

		let drugNameList = this.props.drugFormulary
			.filter(drug => {
				if (this.state.searchingType !== "") {
					return drug.type === this.state.searchingType;
				}
				return true;
			})
			.map(drug => drug.name);

		drugNameList = drugNameList
			.filter((value, index) => drugNameList.indexOf(value) === index)
			.map((drugName, key) => (
				<Option key={key} value={drugName}>
					{drugName}
				</Option>
			));

		drugTypeList.unshift(
			<Option key={-1} value="">
				(Empty)
			</Option>
		);
		drugNameList.unshift(
			<Option key={-1} value="">
				(Empty)
			</Option>
		);

		return (
			<div className={containerClass}>
				{!this.props.isUpdating ? (
					<div className="drugDeliveryModifier-section drugDeliveryModifier-section-title drugDeliveryModifier-section-row">
						New Record
					</div>
				) : (
					<div className="drugDeliveryModifier-section drugDeliveryModifier-section-title drugDeliveryModifier-section-row">
						Update Record
					</div>
				)}

				<div
					style={{ marginTop: "10px" }}
					className="drugDeliveryModifier-section drugDeliveryModifier-section-row"
				>
					<InfoTextView
						title="Drug Type"
						content={
							<Select
								showSearch
								style={{ width: "100%" }}
								placeholder="Select a type"
								optionFilterProp="children"
								value={
									this.state.drug.type ||
									this.state.searchingType ||
									""
								}
								onChange={value => {
									this.setState({ searchingType: value, drug: {} });
								}}
								onFocus={() => {
									console.log("on Focus type");
								}}
								onBlur={() => {
									console.log("on Blur type");
								}}
								onSearch={() => {
									console.log("on Search type");
								}}
								filterOption={(input, option) =>
									option.props.children
										.toLowerCase()
										.indexOf(input.toLowerCase()) >= 0
								}
							>
								{drugTypeList}
							</Select>
						}
					/>

					<InfoTextView
						title="Drug Name"
						content={
							<Select
								showSearch
								style={{ width: "100%" }}
								placeholder="Select a drug"
								optionFilterProp="children"
								onChange={value => {
									this.setState({ searchingName: value }, () => {
										this.onChangeDrug();
									});
								}}
								value={this.state.drug.name || this.state.name || ""}
								onFocus={() => {
									console.log("on Focus name");
								}}
								onBlur={() => {
									console.log("on Blur name");
								}}
								onSearch={() => {
									console.log("on Search name");
								}}
								filterOption={(input, option) =>
									option.props.children
										.toLowerCase()
										.indexOf(input.toLowerCase()) >= 0
								}
							>
								{drugNameList}
							</Select>
						}
					/>
				</div>

				<div className="drugDeliveryModifier-section drugDeliveryModifier-section-row">
					<InfoTextView
						title="Treatment Duration"
						content={
							<InputText
								fieldType="number"
								placeholder="Enter number of days"
								value={this.state.treatment_duration}
								onChange={e =>
									this.setState({ treatment_duration: e.target.value })
								}
							/>
						}
					/>

					<InfoTextView
						title="Daily Dosage(mg)"
						content={
							<InputText
								fieldType="number"
								placeholder="Enter number of daily dosage"
								value={this.state.daily_dosage}
								onChange={e =>
									this.setState({ daily_dosage: e.target.value })
								}
							/>
						}
					/>
				</div>

				<div className="drugDeliveryModifier-section drugDeliveryModifier-section-row">
					<div className="drugDeliveryModifier-section-button">
						<CustomButton
							buttonStyle="danger"
							iconType="close-circle"
							name="CANCEL"
							onClicked={this.props.onCancelClicked}
						/>
					</div>
					{this.props.onCreateClicked ? (
						<div className="drugDeliveryModifier-section-button">
							<CustomButton
								className="drugDeliveryModifier-section-button"
								buttonStyle="forest"
								iconType={
									this.props.isLoading ? "loading" : "plus-circle"
								}
								name="CREATE"
								onClicked={() =>
									this.props.onCreateClicked({
										drug: this.state.drug,
										treatment_duration: this.state.treatment_duration,
										daily_dosage: this.state.daily_dosage
									})
								}
							/>
						</div>
					) : (
						<div className="drugDeliveryModifier-section-button">
							<CustomButton
								className="drugDeliveryModifier-section-button"
								buttonStyle="warning"
								iconType={this.props.isLoading ? "loading" : "edit"}
								name="UPDATE"
								onClicked={() =>
									this.props.onUpdateClicked({
										drug: this.state.drug,
										treatment_duration: this.state.treatment_duration,
										daily_dosage: this.state.daily_dosage
									})
								}
							/>
						</div>
					)}
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		drugFormulary: state.appReducer.drugFormulary
	};
};

const mapDispatchToProps = dispatch => {
	return {};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(DrugDeliveryModifier);
