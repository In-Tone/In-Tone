'use strict'
import React, {Component} from 'react'
import {render} from 'react-dom'
import {connect} from 'react-redux'
import {Link} from 'react-router'

// material-ui
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import Avatar from 'material-ui/Avatar';

// bootstrap
import { Row, Col } from 'react-bootstrap';

// our modules
import Graph from './Graph';


class Profile extends Component {
	constructor(props){
		super(props)
		this.state = {

		}
	}
	// methods

	render() {
		return(
			<div className='studyDiv'>
				<Row>
					<Col lg={4}>
						<Paper>
								<Avatar
									src='https://i.imgur.com/kP5Khh8.jpg'
									size={120}
									style={styles.avatarStyles}
								/>
								<div style={styles.userInfoStyles}>
									<h4 style={{paddingRight:'1%'}}>Name: </h4>
									<h4>Users Name</h4>
								</div>

								<div style={styles.userInfoStyles}>
									<h4 style={{paddingRight:'1%'}}>Rank: </h4>
									<h4> Users Rank </h4>
								</div>
						</Paper>
					</Col>

					<Col lg={8}>
						<Paper style={{display:'flex'}}>
							<h2> L1T1 </h2>
							<h2> L1T2 </h2>
							<h2> L1T3 </h2>
							<h2> L1T4 </h2>
							<h2> L1T5 </h2>
						</Paper>
						<Paper>
							<h1> Word </h1>
							<Row>
								<Col md={6}>
									{/*THIS CAN AND NEEDS TO BE MODULARIZED*/}
									<div style={{display:'flex', justifyContent:'center', paddingBottom:'1%'}}>
										<h4>Target Audio:</h4>
										<audio controls id='profileTarget' style={{width: '50%'}}/>
									</div>
									<div style={{display:'flex', justifyContent:'center', paddingBottom:'1%'}}>
										<h4>User Audio:</h4>
										<audio controls id='profileUser' style={{width: '50%'}}/>
									</div>
									<div style={{display:'flex', justifyContent:'center', paddingBottom:'1%'}}>
										<Link to='/'><h4>Re-Try</h4></Link>
									</div>
									<div style={{display:'flex', justifyContent:'center', paddingBottom:'1%'}}>
										<h4>Number of Attempts: </h4>
										<h4> 69 </h4>
									</div>
								</Col>
								<Col md={6}>
									<Graph 
										targetPitches={[1,2,3,4,5,6]}
										duration={34}
									/>
								</Col>
							</Row>
						</Paper>
					</Col>
				</Row>
			</div>
		)
	}
}

// modular...styles? I guess? 
const styles = {
	avatarStyles: {
		margin: 5,
		borderBottomStyle: 'solid'
	},
	userInfoStyles: {
		display: 'flex',
		justifyContent: 'center'
	}
}

const mapStateToProps = state => {
	return {

	}
}

const mapDispatchToProps = dispatch => {
	return {

	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)