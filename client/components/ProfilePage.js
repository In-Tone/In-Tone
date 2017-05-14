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
import UserLanguageList from './LanguageList'


class Profile extends Component {
	constructor(props){
		super(props)
		this.state = {

		}
		this.selectTone = this.selectTone.bind(this)
	}
	// methods
	selectTone(event) {
		console.log('tone button clicked')
		console.log(event);
	}

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
									<h4 style={styles.infoBuffer}>Name: </h4>
									<h4>Users Name</h4>
								</div>

								<div style={styles.userInfoStyles}>
									<h4 style={styles.infoBuffer}>Rank: </h4>
									<h4> Users Rank </h4>
								</div>

								<UserLanguageList />
						</Paper>
					</Col>

					<Col lg={8}>
						<Paper>
							{/* this can definitely be refactored into a loop */}
							<div style={styles.bottomBorders}>
								<FlatButton style={styles.tones} onClick={this.selectTone}> L1T1 </FlatButton>
								<FlatButton style={styles.tones} onClick={this.selectTone}> L1T2 </FlatButton>
								<FlatButton style={styles.tones} onClick={this.selectTone}> L1T3 </FlatButton>
								<FlatButton style={styles.tones} onClick={this.selectTone}> L1T4 </FlatButton>
								<FlatButton style={styles.tones} onClick={this.selectTone}> L1T5 </FlatButton>
							</div>
							<h2> L1T1Word1 </h2>
							<Row>
								<Col md={6}>
									{/*THIS CAN AND NEEDS TO BE MODULARIZED*/}
									<div style={styles.wordInfo}>
										<h4 style={styles.infoBuffer}>Target Audio:</h4>
										<audio controls id='profileTarget' style={{width: '50%'}}/>
									</div>
									<div style={styles.wordInfo}>
										<h4 style={styles.infoBuffer}>User Audio:</h4>
										<audio controls id='profileUser' style={{width: '50%'}}/>
									</div>
									<div style={styles.wordInfo}>
										<Link to='/'><h4>Retry</h4></Link>
									</div>
									<div style={styles.wordInfo}>
										<h4 style={styles.infoBuffer}>Number of Attempts: </h4>
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
	},
	userInfoStyles: {
		display: 'flex',
		justifyContent: 'center'
	},
	tones: {
		paddingRight: '4%',
		paddingLeft: '4%',
		fontSize: '24px'
	},
	wordInfo: {
		display:'flex', 
		justifyContent:'center', 
		paddingBottom:'1%'
	},
	bottomBorders: {
		borderBottom:'thin solid black'
	},
	infoBuffer: {
		paddingRight: '2%'
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