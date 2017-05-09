'use strict'
import React, {Component} from 'react'
import {render} from 'react-dom'
import {connect} from 'react-redux'
import {Link, browserHistory} from 'react-router'
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';


class Navbar extends Component {
	constructor() {
		super()
	}

	render() {
		return (
			<AppBar
			title={<FlatButton style={{color:'white'}}>Train</FlatButton>}
			iconElementRight={<FlatButton label="Login" />}
			/>
		)
	}

}

export default Navbar;
