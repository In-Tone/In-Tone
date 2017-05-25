'use strict';
// react
import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router';

// material-ui
import FlatButton from 'material-ui/FlatButton';

// bootstrap
import { Grid, Row, Col } from 'react-bootstrap';

// dispatchers
import {logout} from '../reducers/Auth';
import { fetchUserTones } from '../reducers/UserTone';
import { fetchUserBest } from '../reducers/UserBest';
import { setCompatibility } from '../reducers/CompatibilityFlag';

class Navbar extends Component {
	constructor(props) {
		super(props);

		this.onProfileClick = this.onProfileClick.bind(this);
		this.onInToneClick = this.onInToneClick.bind(this);
		this.onLogOutClick = this.onLogOutClick.bind(this);
		this.onLogInClick = this.onLogInClick.bind(this);
		this.onRegisterClick = this.onRegisterClick.bind(this);
	}

	onProfileClick () {
		const userId = this.props.user.id;
		this.props.fetchUserTones(userId);
		this.props.fetchUserBest(userId);
		this.props.setCompatibility();
	}

	onInToneClick () {
		this.props.setCompatibility();
	}

	onLogOutClick () {
		this.props.logout();
		this.props.setCompatibility();
	}

	onLogInClick () {
		this.props.setCompatibility();
	}

	onRegisterClick () {
		this.props.setCompatibility();
	}

	render() {

		return (
			<Col xs={12} style={styles.navbar}>

				<Col xs={4}>
				{
					this.props.user ?
					<Link to='/profile'><FlatButton hoverColor={'rgba(138, 135, 135, 0.7)'} style={styles.navElements} onClick={this.onProfileClick}> Profile </FlatButton></Link> :
					<Link to='/signup'><FlatButton hoverColor={'rgba(138, 135, 135, 0.7)'} style={styles.navElements} onClick={this.onRegisterClick}> Register </FlatButton></Link>
				}
				</Col>
				<Col xs={4}>
					<Link to='/'><FlatButton hoverColor={'rgba(138, 135, 135, 0.7)'} style={styles.navLogo} onClick={this.onInToneClick}> In-Tone </FlatButton></Link>
				</Col>
				<Col xs={4}>
				{
					this.props.user ?
					<Link to='/home'><FlatButton hoverColor={'rgba(138, 135, 135, 0.7)'} style={styles.navElements} onClick={this.onLogOutClick}>Logout</FlatButton></Link> :
					<Link to='/login'><FlatButton hoverColor={'rgba(138, 135, 135, 0.7)'} style={styles.navElements} onClick={this.onLogInClick}>Login</FlatButton></Link>
				}
				</Col>

			</Col>
		);
	}

}

export default connect(
  ({ user }) => ({ user: user }),
  {logout, fetchUserTones, fetchUserBest, setCompatibility}
)(Navbar);

const styles = {
	navbar: {
		backgroundColor: 'rgba(82, 0, 124, 1)',
		position: 'fixed',
		width: '100%',
		boxShadow: '0px 8px 10px -4px rgba(0,0,0,0.75)',
		zIndex: 500
	},
	navElements: {
		width: '100%',
		fontSize: '24px',
		color: 'white',
		height: '65px'
	},
	navLogo: {
		width: '100%',
		fontSize: '42px',
		color: 'white',
		fontWeight: 550,
		height: '65px'
	}
};
