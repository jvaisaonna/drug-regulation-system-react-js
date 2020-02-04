import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Input, Icon, Button, Divider } from "antd";

import * as NetworkManager from "../NetworkConfig/NetworkManager";

import { onSetToken, onSetUser, onAddNotification } from "../actions";
import "./Login.css";

class Login extends Component {
	constructor() {
		super();
		this.state = {
			username: "",
			password: "",
			isEmpty: true,
			isLoading: false
		};

		this.handleUsernameInput = this.handleUsernameInput.bind(this);
		this.handlePasswordInput = this.handlePasswordInput.bind(this);
		this.handleLoginClicked = this.handleLoginClicked.bind(this);
	}

	handleUsernameInput(e) {
		let isEmpty = e.target.value === "" || this.state.password === "";
		this.setState({ username: e.target.value, isEmpty });
	}

	handlePasswordInput(e) {
		let isEmpty = e.target.value === "" || this.state.username === "";
		this.setState({ password: e.target.value, isEmpty });
	}

	handleLoginClicked() {
		this.setState({ isLoading: true });
		let username = this.state.username.toLowerCase();
		let password = this.state.password;

		NetworkManager.Login({ username, password }).then(res => {
			if (res.success) {
				this.setState({
					username: "",
					password: "",
					isEmpty: true,
					isLoading: false
				});
				this.props.setToken(res.token);
				this.props.setUser(res.user);
				this.props.addNotification("Login Success", res.message);

				this.props.history.push("/");
			} else {
				this.props.addNotification("Login Failed", res.message);
				this.setState({ isLoading: false });
			}
		});
	}

	render() {
		return (
			<div className="login-container">
				<div className="login-form global-border-radius global-box-shadow">
					<div className="login-title">Drug Delivery System</div>
					<Input
						className="login-input-field"
						size="large"
						placeholder="Username"
						prefix={
							<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
						}
						value={this.state.username}
						onChange={this.handleUsernameInput}
					/>

					<Input.Password
						className="login-input-field"
						size="large"
						prefix={
							<Icon type="key" style={{ color: "rgba(0,0,0,.25)" }} />
						}
						placeholder="Password"
						value={this.state.password}
						onChange={this.handlePasswordInput}
					/>
					<Button
						className="login-button"
						size="large"
						type="primary"
						icon="poweroff"
						loading={this.state.isLoading}
						disabled={this.state.isEmpty}
						onClick={this.handleLoginClicked}
					>
						Login
					</Button>
					<Divider>OR</Divider>
					<p>
						Don't have an account? <Link to="/register">Sign up</Link>.
					</p>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {};
};

const mapDispatchToProps = dispatch => {
	return {
		setToken: token => {
			dispatch(onSetToken(token));
		},
		setUser: user => {
			dispatch(onSetUser(user));
		},
		addNotification: (title, content) => {
			dispatch(onAddNotification(title, content));
		}
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Login);
