import React, { Component } from "react";

import "./InputText.css";

class InputText extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: props.value,
			isFocus: false
		};
	}

	componentWillReceiveProps(props) {
		this.setState({ value: props.value });
	}

	render() {
		let additionalClass = this.state.isFocus
			? "inputText-container global-border-radius inputText-container-foucs"
			: "inputText-container global-border-radius";
		return (
			<div className={additionalClass}>
				{this.props.prefixComponent ? (
					<div className="inputText-prefixComponent">
						{this.props.prefixComponent}
					</div>
				) : null}
				<input
					className="inputText-field global-border-radius"
					type={this.props.fieldType || "text"}
					min="0"
					name={this.props.name}
					value={this.state.value}
					placeholder={this.props.placeholder}
					onChange={this.props.onChange}
					autoComplete="off"
					onFocus={() => {
						this.setState({ isFocus: true });
					}}
					onBlur={() => {
						this.setState({ isFocus: false });
					}}
				/>

				{this.props.suffixComponent ? (
					<div className="inputText-suffixComponent">
						{this.props.suffixComponent}
					</div>
				) : null}
			</div>
		);
	}
}

export default InputText;
