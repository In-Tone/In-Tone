'use strict';
// react
import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router';

// bootstrap
import { Row, Col } from 'react-bootstrap';

// components
import ProfileGraphs from './ProfileGraphs';

// utilities
import { targetToUserAudio } from '../utils/HashMaps';

const AllWords = (props) => {
	const targetsArray = props.allTargets;
	const userBestArray = props.userBest;
	const targetUserHash = targetToUserAudio(targetsArray, userBestArray);
	return (
		<div style={styles.wordDiv}>
		{
		props.allTargets.map((target, index) => {
			let audioSRC = targetUserHash[target.id];
				return (
					<div key={index}>
						<h2 style={styles.transliterationStyles}>{target.transliteration} | {target.englishTranslation}</h2>
						<Row>
							<Col md={6} style={styles.columnLeft}>
								<div style={styles.wordInfo}>
									<h4 style={styles.infoBuffer}>Target Audio:</h4>
									<audio src={target.wav} controls id='profileTarget' style={{width: '50%'}}/>
								</div>
								<div style={styles.wordInfo}>
									<h4 style={styles.infoBuffer}>User Audio:</h4>
									<audio src={audioSRC > 0 ? audioSRC : null	}controls id='profileUser' style={{width: '50%'}}/>
								</div>
								<div style={styles.wordInfo}>
									<h4 style={styles.infoBuffer}>Number of Attempts: n/a</h4>
								</div>
							</Col>
							<Col md={6}>
								<ProfileGraphs
									targetPitches={target.pitches}
									duration={target.duration}
									targetId={target.id}
								/>
							</Col>
						</Row>
						<hr style={styles.hrStyles}/>
					</div>
				);
		})
	}
	</div>
)};

const mapStateToProps = state => ({
	userBest: state.userBest,
	allTargets: state.allTargets
});

export default connect(mapStateToProps, null)(AllWords);

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
		paddingBottom:'7%'
	},
	bottomBorders: {
		borderBottom:'thin solid black'
	},
	infoBuffer: {
		paddingRight: '2%'
	},
	wordDiv: {
		paddingBottom: '5%'
	},
	columnLeft: {
		paddingTop: '1%'
	},
	transliterationStyles: {
		paddingTop: '1%',
		paddingBottom: '2%'
	},
	hrStyles: {
		border: 'solid 1px grey'
	},
	span: {
		lineHeight: '40px'
	}
};
