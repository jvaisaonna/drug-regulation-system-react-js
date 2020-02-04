import React, { Component } from "react";
import { connect } from "react-redux";
import {
	onSetPageTitle,
	onAddNotification,
	onSetDrugFormulary
} from "../../actions";

import * as NetworkManager from "../../NetworkConfig/NetworkManager";
import DrugInfo from "./DrugInfo/DrugInfo";
import DrugModifier from "./DrugModifier/DrugModifier";
import InfoBlock from "../../Component/InfoBlock/InfoBlock";

import "./DrugFormulary.css";

class DrugFormulary extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: "Drug Formulary",
			isLoading: false,
			editingDrug: {},
			drugFormulary: []
		};

		props.setPageTitle(this.state.title);

		this.onEditDrug = this.onEditDrug.bind(this);
		this.onCancelEdit = this.onCancelEdit.bind(this);
		this.onDrugUpdated = this.onDrugUpdated.bind(this);
		this.updateDrugList = this.updateDrugList.bind(this);
	}

	componentDidMount() {
		this.updateDrugList();
	}

	updateDrugList() {
		this.setState({ isLoading: true });
		NetworkManager.GetDrugFormulary().then(result => {
			this.setState({ isLoading: false });
			if (!result.success) {
				this.props.addNotification("System Info", result.message);
			} else {
				this.props.setDrugFormulary(result.drugList);
			}
		});
	}

	onEditDrug(drugInfo) {
		this.setState({ editingDrug: drugInfo });
	}

	onCancelEdit() {
		this.setState({ editingDrug: {} });
	}

	onDrugUpdated() {
		this.onCancelEdit();
		this.updateDrugList();
	}

	render() {
		console.log(this.props.drugFormulary);
		let drugList = this.props.drugFormulary.map((d, key) => (
			<DrugInfo key={key} {...d} onClickedEdit={() => this.onEditDrug(d)} />
		));

		return (
			<div className="drugFormulary-container">
				<div className="drugFormulary-section">
					<div className="drugFormulary-section-title">Existing Drugs</div>
					{drugList.length > 0 ? (
						<div className="drugFormulary-section-content">
							{drugList}
						</div>
					) : null}
					{this.state.isLoading ? (
						<div className="drugFormulary-section-content-flex">
							<InfoBlock iconType="loading" message="Loading..." />
						</div>
					) : null}
					{!this.state.isLoading && drugList.length <= 0 ? (
						<div className="drugFormulary-section-content-flex">
							<InfoBlock
								iconType="info-circle"
								message="Do not have any drug yet"
							/>
						</div>
					) : null}
				</div>
				<div className="drugFromulary-section-divider" />
				<div className="drugFormulary-section">
					<div className="drugFormulary-section-title">Add Drug</div>
					<div className="drugFormulary-section-content">
						<DrugModifier onDrugUpdated={this.updateDrugList} />
					</div>
					{JSON.stringify(this.state.editingDrug).replace(/"/g, "") !==
					"{}" ? (
						<div>
							<div className="drugFormulary-section-title">
								Drug Editing
							</div>
							<div className="drugFormulary-section-content">
								<DrugModifier
									isEditMode={true}
									onCancelEdit={this.onCancelEdit}
									onDrugUpdated={this.onDrugUpdated}
									{...this.state.editingDrug}
								/>
							</div>
						</div>
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
		drugFormulary: state.appReducer.drugFormulary
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
		setDrugFormulary: drugFormulary => {
			dispatch(onSetDrugFormulary(drugFormulary));
		}
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(DrugFormulary);
