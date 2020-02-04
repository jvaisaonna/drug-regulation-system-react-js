import React, { Component } from "react";

import "./InfoTextView.css";

class InfoTextView extends Component {
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
		return (
			<div className="infoTextView-container">
				<div className="infoTextView-title">
					{this.props.title.toUpperCase()}
				</div>
				<div className="infoTextView-content">{this.props.content}</div>
				<div className="infoTextView-description">
					{this.props.description}
				</div>
			</div>
		);
	}
}

export default InfoTextView;
