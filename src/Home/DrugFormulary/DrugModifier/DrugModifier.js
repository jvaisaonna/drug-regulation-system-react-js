import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch, Icon } from "antd";

import * as NetworkManager from "../../../NetworkConfig/NetworkManager";
import InputText from "../../../Component/InputText/InputText";

import { onAddNotification } from "../../../actions";
import "./DrugModifier.css";

class DrugModifier extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: props.did || "",
			name: props.name || "",
			type: props.type || "",
			isValid: props.isValid || false,
			isEditMode: props.isEditMode || false,
			isEmpty: true,
			isLoading: false
		};

		this.handleInput = this.handleInput.bind(this);
		this.handleSwitch = this.handleSwitch.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentDidMount() {
		this.checkIsEmpty();
	}

	componentWillReceiveProps(props) {
		this.setState({ ...props });
	}

	handleInput(e) {
		this.setState({ [e.target.name]: e.target.value });
		this.checkIsEmpty();
	}

	handleSwitch(value) {
		this.setState({ isValid: value });
	}

	checkIsEmpty() {
		this.setState({
			isEmpty: this.state.name.trim() === "" || this.state.type.trim() === ""
		});
	}

	onSubmit() {
		if (this.state.isEmpty) {
			console.log(this.state.name, this.state.type);
			this.props.addNotification("System Info", "Please insert all fields");
			return;
		}
		if (this.state.isLoading) {
			return;
		}

		this.setState({ isLoading: true });
		if (!this.state.isEditMode) {
			NetworkManager.AddDrug({
				type: this.state.type,
				name: this.state.name
			}).then(res => {
				this.props.addNotification("System Info", res.message);
				if (!res.success) {
					this.setState({ isLoading: false });
				} else {
					this.setState({
						type: "",
						name: "",
						isEmpty: true,
						isLoading: false
					});
					this.props.onDrugUpdated();
				}
			});
		} else {
			NetworkManager.UpdateDrug({
				did: this.state.id,
				type: this.state.type,
				name: this.state.name,
				isValid: this.state.isValid
			}).then(res => {
				this.props.addNotification("System Info", res.message);
				if (!res.success) {
					this.setState({ isLoading: false });
				} else {
					this.props.onDrugUpdated();
				}
			});
		}
	}

	render() {
		return (
			<div className="drugModifier-container global-border-radius global-box-shadow">
				<div className="drugModifier-details">
					<div className="drugModifier-details-input-field">
						<div className="drugModifier-details-input-field-name">
							Type
						</div>
						<InputText
							name="type"
							value={this.state.type}
							onChange={this.handleInput}
						/>
					</div>

					<div className="drugModifier-details-input-field">
						<div className="drugModifier-details-input-field-name">
							Name
						</div>
						<InputText
							name="name"
							value={this.state.name}
							onChange={this.handleInput}
						/>
					</div>
				</div>
				{this.state.isEditMode ? (
					<div
						style={{
							display: "flex",
							flexDirection: "row",
							justifyContent: "space-between"
						}}
					>
						<div>
							<span className="drugModifier-details-input-field-name">
								Valid?
							</span>
							<Switch
								style={{ marginLeft: "10px" }}
								checkedChildren={<Icon type="check" />}
								unCheckedChildren={<Icon type="close" />}
								checked={this.state.isValid}
								size="default"
								onChange={this.handleSwitch}
							/>
						</div>
						<div>
							<div
								className={`global-border-radius drugModifier-button drugModifier-button-cancel ${
									this.state.isLoading
										? "drugModifier-button-disable"
										: ""
								}`}
								onClick={this.props.onCancelEdit}
							>
								<Icon
									className="drugModifier-button-icon"
									type="close-circle"
								/>
								CANCEL
							</div>
							<div
								className={`global-border-radius drugModifier-button drugModifier-button-edit ${
									this.state.isLoading
										? "drugModifier-button-disable"
										: ""
								}`}
								onClick={this.onSubmit}
							>
								<Icon
									className="drugModifier-button-icon"
									type={this.state.isLoading ? "loading" : "edit"}
								/>
								EDIT
							</div>
						</div>
					</div>
				) : (
					<div
						style={{
							display: "flex",
							flexDirection: "row",
							justifyContent: "flex-end"
						}}
					>
						<div
							style={{ flex: 1 }}
							className={`global-border-radius drugModifier-button drugModifier-button-add ${
								this.state.isLoading
									? "drugModifier-button-disable"
									: ""
							}`}
							onClick={this.onSubmit}
						>
							<Icon
								className="drugModifier-button-icon"
								type={this.state.isLoading ? "loading" : "plus-circle"}
							/>
							ADD
						</div>
					</div>
				)}
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return {
		addNotification: (title, content) => {
			dispatch(onAddNotification(title, content));
		}
	};
};

export default connect(
	null,
	mapDispatchToProps
)(DrugModifier);
