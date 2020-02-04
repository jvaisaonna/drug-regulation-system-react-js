import React, { Component } from "react";
import { Icon } from "antd";

import "./LoadingPage.css";

class LoadingPage extends Component {
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
			<div className="loadingPage-container">
				<Icon className="loadingPage-loading-indicator" type="loading" />
				{this.props.title ? (
					<div className="loadingPage-title">{this.props.title}</div>
				) : null}
			</div>
		);
	}
}

export default LoadingPage;
