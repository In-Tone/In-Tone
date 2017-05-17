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

import Word from './Word';


class Profile extends Component {
	constructor(props){
		super(props)
		this.state = {
			selectedTone: 0
		}
		this.selectTone = this.selectTone.bind(this);
	}
	// methods
	selectTone(button) {
		console.log("button", button.props.label);
		this.setState({
			selectedTone: button.props.label
		})
	}

	componentDidMount() {

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
									<h4>{this.props.user.username}</h4>
								</div>

								<div style={styles.userInfoStyles}>
									<h4 style={styles.infoBuffer}>Rank: </h4>
									<h4>{this.props.user.rank}</h4>
								</div>

								<div style={styles.userInfoStyles}>
									<h4 style={styles.infoBuffer}>User Since:</h4>
									<h4>{this.props.user.userSince.slice(0,10)}</h4>
								</div>

								<UserLanguageList />
						</Paper>
					</Col>

					<Col lg={8} style={{paddingLeft:0}}>
						<div>
						<Paper>
							{/* this can definitely be refactored into a loop */}
							<div style={styles.bottomBorders}>
							{
								this.props.toneTypes && this.props.toneTypes.map(toneType => (
									<FlatButton ref={(button) => {toneType.button = button}} label={toneType.id} style={styles.tones} onClick={() => this.selectTone(toneType.button)}>{toneType.tone}</FlatButton>
								))
							}
							</div>
							{
								this.state.selectedTone ? (<Word
								allTargets={this.props.allTargets}
								currentTone={this.state.selectedTone}
								/>) : (<h4>SELECT A LANGUAGE</h4>)
							}
						</Paper>
						</div>
					</Col>
				</Row>
			</div>
		)
	}
}

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
		user: state.user,
		toneTypes: state.toneTypes,
		allTargets: state.allTargets,
		userBest: state.userBest
	}
}

const mapDispatchToProps = dispatch => {
	return {

	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)