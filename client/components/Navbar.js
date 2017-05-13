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
			style={{position: 'fixed'}}
			title={<h1 style={{color:'white'}}>In-Tone</h1>}
			iconElementLeft={<Link to='/'><FlatButton label="Home" style={{color:'white'}} /></Link>}
			iconElementRight={<Link to='/'><FlatButton label="Login" style={{color:'white'}} /></Link>}
			/>
		)
	}

}

export default Navbar;
