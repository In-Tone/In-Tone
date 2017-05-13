'use strict'
import React, {Component} from 'react'
import {render} from 'react-dom'
import {connect} from 'react-redux'
import {Link, browserHistory} from 'react-router'
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';

class Navbar extends Component {
	constructor() {
		super()
	}

	render() {
		return (
			<AppBar
			style={styles.navbar}
			title={<h1 style={styles.header}>In-Tone</h1>}
			iconElementLeft={<Link to='/'><FlatButton label="Home" style={styles.button} /></Link>}
			iconElementRight={<Link to='/'><FlatButton label="Login" style={styles.button} /></Link>}
			/>
		)
	}

}

const styles = {
	navbar: {
		position: 'fixed',
		height: '100px',
	},
	header: {
		color: 'white',
		margin: '30px'
	},
	button: {
		color: 'white',
		margin: '30px'
	}

}

export default Navbar;
