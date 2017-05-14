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

class Navbar extends Component {
	constructor() {
		super()
	}
/*			<AppBar
			style={styles.navbar}
			title={<Link to='/'><FlatButton style={styles.elements}>In-Tone</FlatButton></Link>}
			iconElementRight={<Link to='/'><FlatButton label="Login" style={styles.elements}/></Link>}
			/>*/

	render() {
		return (
			<Grid style={styles.navbar}>
				<Row>

					<Col lg={4}>
						<Link to='/'><FlatButton hoverColor={'rgba(138, 135, 135, 0.7)'} style={styles.navElements}> Register </FlatButton></Link>
					</Col>

					<Col lg={4}>
						<Link to='/'><FlatButton hoverColor={'rgba(138, 135, 135, 0.7)'} style={styles.navLogo}> In-Tone </FlatButton></Link>
					</Col>

					<Col lg={4}>
						<Link to='/login'><FlatButton hoverColor={'rgba(138, 135, 135, 0.7)'} style={styles.navElements}> Login </FlatButton></Link>
					</Col>

				</Row>
			</Grid>
		)
	}

}

const styles = {
	navbar: {
		backgroundColor: 'rgba(82, 0, 124, 1)',
		position: 'fixed',
		width: '100%',
		boxShadow: '0px 8px 10px -4px rgba(0,0,0,0.75)'
	},
	navElements: {
		width: '100%',
		fontSize: '24px',
		color: 'white',	
		height: '65px'
	},
	navLogo: {
		width: '100%',
		height: '65px',
		fontSize: '42px',
		color: 'white',
		fontWeight: 550
	}
}

export default Navbar;
