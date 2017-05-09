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
			title={<Link to='/study'><FlatButton
				style={{color:'white'}}>Train</FlatButton></Link>}
			iconElementLeft={<Link to='/'><FlatButton label="Home" style={{color:'white'}} /></Link>}
			iconElementRight={<FlatButton label="Login" />}
			/>
		)
	}

}

export default Navbar;
