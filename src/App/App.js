import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { Icon } from "antd";

import Login from "../Login/Login";
import Register from "../Register/Register";
import Home from "../Home/Home";
import NotificationCenter from "../NotificationCenter/NotificationCenter";

import "./App.css";

class App extends Component {
	constructor() {
		super();
		this.state = {
			isLoading: false
		};
		setTimeout(() => {
			this.setState({ isLoading: false });
		}, 3000);
	}

	render() {
		let isLoggedIn = this.props.isLoggedIn;

		if (this.state.isLoading) {
			return (
				<div className="App">
					<Icon type="loading" spin style={{ fontSize: "50px" }} />
					<p>Loading...</p>
				</div>
			);
		}

		let routerSetting = [];
		if (isLoggedIn) {
			routerSetting.push(<Route key={0} path="/" component={Home} />);
			// routerSetting.push(<Redirect from="/" to="/home" />);
		} else {
			routerSetting.push(<Route key={0} path="/login" component={Login} />);
			routerSetting.push(
				<Route key={1} path="/register" component={Register} />
			);
			routerSetting.push(<Redirect key={1} from="/" to="/login" />);
		}

		return (
			<div className="App">
				<BrowserRouter>
					<Switch>
						{routerSetting}
						<Route
							component={() => (
								<h1 style={{ margin: "0" }}>
									404 <br />
									Sorry, Page Not found
								</h1>
							)}
						/>
					</Switch>
				</BrowserRouter>
				<NotificationCenter />
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
	return {};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);
