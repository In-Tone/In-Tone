'use strict'
import React, {Component} from 'react'
import {render} from 'react-dom'
import {connect} from 'react-redux'
import {Link} from 'react-router'

// material-ui
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';

// bootstrap
import { Row, Col } from 'react-bootstrap';

// our modules
import Graph from './Graph';
import { targetToUserHashGenerator } from '../utils/TargetUserBestHash';

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

const Word = (props) => {
	const targetsArray = props.allTargets;
	const userBestArray = props.userBest;
	const targetUserHash = targetToUserHashGenerator(targetsArray, userBestArray);
	return (
		<div>
		{
		props.allTargets.map(target => {
			let audioSRC = targetUserHash[target.id];
			if (target.tone_type_id === props.currentTone) {
				return (
					<div>
						<h2>{target.transliteration}</h2>
						<Row>
							<Col md={6}>
								<div style={styles.wordInfo}>
									<h4 style={styles.infoBuffer}>Target Audio:</h4>
									<audio src={target.wav} controls id='profileTarget' style={{width: '50%'}}/>
								</div>
								<div style={styles.wordInfo}>
									<h4 style={styles.infoBuffer}>User Audio:</h4>
									<audio src={audioSRC}controls id='profileUser' style={{width: '50%'}}/>
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
									targetPitches={target.pitches}
									duration={target.duration}
								/>
							</Col>
						</Row>
					</div>
				)
			}
		})
	}
	</div>
)}

const mapStateToProps = state => ({
	userBest: state.userBest
});

export default connect(mapStateToProps, null)(Word);
