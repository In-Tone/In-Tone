'use strict'
import React, {Component} from 'react'
import {render} from 'react-dom'
import {connect} from 'react-redux'
import {Link, browserHistory} from 'react-router'
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import { Grid, Row, Col } from 'react-bootstrap';
import {logout} from '../reducers/Auth';
import { fetchUserTones } from '../reducers/UserTone';

class Navbar extends Component {
	constructor(props) {
		super(props)

		this.logout = this.props.logout.bind(this);
		this.onProfileClick = this.onProfileClick.bind(this);
	}

	onProfileClick () {
		const userId = this.props.user.id;
		console.log(userId)
		// this.props.fetchUserTones(userId);
		// this.props.fetchToneTypes(language);
	}

	render() {

		return (
			<Col xs={12} style={styles.navbar}>

				<Col xs={4}>
				{
					this.props.user ? 
					<Link to='/profile'><FlatButton hoverColor={'rgba(138, 135, 135, 0.7)'} style={styles.navElements} onClick={this.onProfileClick}> Profile </FlatButton></Link> :
					<Link to='/signup'><FlatButton hoverColor={'rgba(138, 135, 135, 0.7)'} style={styles.navElements}> Register </FlatButton></Link>
				}
				</Col>
				<Col xs={4}>
					<Link to='/'><FlatButton hoverColor={'rgba(138, 135, 135, 0.7)'} style={styles.navLogo}> In-Tone </FlatButton></Link>
				</Col>
				<Col xs={4}>
				{
					this.props.user ? 
					<Link to='/home'><FlatButton hoverColor={'rgba(138, 135, 135, 0.7)'} style={styles.navElements} onClick={this.logout}>Logout</FlatButton></Link> :
					<Link to='/login'><FlatButton hoverColor={'rgba(138, 135, 135, 0.7)'} style={styles.navElements}>Login</FlatButton></Link>
				}
				</Col>

			</Col>
		)
	}

}

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
}

export default connect(
  ({ user }) => ({ user: user }),
  {logout, fetchUserTones}
)(Navbar);
