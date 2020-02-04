import React, { Component } from "react";
import { connect } from "react-redux";
import {
	Input,
	Radio,
	DatePicker,
	Icon,
	Button,
	Divider,
	Row,
	Col
} from "antd";
import { Link } from "react-router-dom";
import moment from "moment";

import * as NetworkManager from "../NetworkConfig/NetworkManager";

import { onAddNotification } from "../actions";
import "./Register.css";

class Register extends Component {
	constructor() {
		super();
		this.state = {
			isEmpty: true,
			username: "",
			password: "",
			firstName: "",
			lastName: "",
			gender: "male",
			hkid: "",
			phoneNumber: "",
			birthDate: "",
			isLoading: false
		};

		this.handleInput = this.handleInput.bind(this);
		this.handleBirthDateInput = this.handleBirthDateInput.bind(this);
		this.checkFormHasEmpty = this.checkFormHasEmpty.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleInput(e) {
		let newState = {};
		newState[e.target.name] = e.target.value.trim();
		this.setState(newState);
		this.checkFormHasEmpty();
	}

	handleBirthDateInput(value) {
		let tempBirthdateTimestamp = value
			? Math.round(value.valueOf() / 1000)
			: 0;
		this.setState({ birthDate: tempBirthdateTimestamp });
		this.checkFormHasEmpty();
	}

	checkFormHasEmpty() {
		const {
			username,
			password,
			firstName,
			lastName,
			gender,
			hkid,
			phoneNumber,
			birthDate
		} = this.state;

		let isEmpty =
			username === "" ||
			password === "" ||
			firstName === "" ||
			lastName === "" ||
			gender === "" ||
			hkid === "" ||
			phoneNumber === "" ||
			birthDate === "" ||
			birthDate === 0;

		this.setState({ isEmpty });
	}

	disabledDate(current) {
		return current > moment().endOf("day");
	}

	handleSubmit() {
		this.setState({ isLoading: true });
		const {
			username,
			password,
			firstName,
			lastName,
			gender,
			hkid,
			phoneNumber,
			birthDate
		} = this.state;

		NetworkManager.Register({
			username,
			password,
			first_name: firstName,
			last_name: lastName,
			gender,
			hkid,
			phone_number: phoneNumber,
			birth_date_ts: birthDate
		}).then(res => {
			if (res.success) {
				this.setState({
					isLoading: false,
					isEmpty: true,
					username: "",
					password: "",
					firstName: "",
					lastName: "",
					gender: "male",
					hkid: "",
					phoneNumber: "",
					birthDate: ""
				});
				this.props.addNotification("Resgister Success", res.message);

				this.props.history.push("/");
			} else {
				this.props.addNotification("Resgister Failed", res.message);
				this.setState({ isLoading: false });
			}
		});
	}

	render() {
		return (
			<div className="register-container">
				<div className="register-form global-border-radius global-box-shadow">
					<div className="register-title">Sign up</div>
					<Row
						className="register-row"
						type="flex"
						align="middle"
						gutter={8}
					>
						<Col span={6}>
							<Radio.Group
								name="gender"
								defaultValue="male"
								size="large"
								onChange={this.handleInput}
							>
								<Radio.Button value="male">Male</Radio.Button>
								<Radio.Button
									className="register-radio-female"
									value="female"
								>
									Female
								</Radio.Button>
							</Radio.Group>
						</Col>
						<Col span={9}>
							<Input
								name="firstName"
								size="large"
								placeholder="First Name"
								onChange={this.handleInput}
							/>
						</Col>
						<Col span={9}>
							<Input
								name="lastName"
								size="large"
								placeholder="Last Name"
								onChange={this.handleInput}
							/>
						</Col>
					</Row>

					<Row
						className="register-row"
						type="flex"
						align="middle"
						gutter={36}
					>
						<Col span={8}>
							<Input
								name="hkid"
								size="large"
								placeholder="HKID A1234567"
								onChange={this.handleInput}
							/>
						</Col>
						<Col span={8}>
							<Input
								name="phoneNumber"
								size="large"
								placeholder="Phone No."
								onChange={this.handleInput}
							/>
						</Col>
						<Col span={8}>
							<DatePicker
								name="birthDate"
								size="large"
								disabledDate={this.disabledDate}
								placeholder="Birth Date"
								onChange={this.handleBirthDateInput}
							/>
						</Col>
					</Row>

					<Row
						className="register-row"
						type="flex"
						align="middle"
						gutter={8}
					>
						<Col span={12}>
							<Input
								name="username"
								size="large"
								placeholder="Username"
								prefix={
									<Icon
										type="user"
										style={{ color: "rgba(0,0,0,.25)" }}
									/>
								}
								onChange={this.handleInput}
							/>
						</Col>
						<Col span={12}>
							<Input.Password
								name="password"
								size="large"
								prefix={
									<Icon
										type="lock"
										style={{ color: "rgba(0,0,0,.25)" }}
									/>
								}
								placeholder="Password"
								onChange={this.handleInput}
							/>
						</Col>
					</Row>
					<Row
						className="register-row"
						type="flex"
						align="middle"
						gutter={8}
					>
						<Col span={19} />
						<Col span={5}>
							<Button
								className="register-submit-button"
								size="large"
								icon="check"
								loading={this.state.isLoading}
								disabled={this.state.isEmpty}
								onClick={this.handleSubmit}
							>
								Register
							</Button>
						</Col>
					</Row>

					<Divider>OR</Divider>

					<p style={{ textAlign: "center" }}>
						Do have an account? <Link to="/login">Sign in</Link>.
					</p>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		isLoggedIn: state.appReducer.isLoggedIn,
		user: state.appReducer.user
	};
};

const mapDispatchToProps = dispatch => {
	return {
		addNotification: (title, content) => {
			dispatch(onAddNotification(title, content));
		}
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Register);
