'use strict';
// react
import React, { Component } from 'react';
import { connect } from 'react-redux';

// material-ui
import MenuItem from 'material-ui/MenuItem';
import { Card, CardActions, CardMedia, CardTitle } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

// bootstrap
import { Grid, Row, Col } from 'react-bootstrap';

// components
import Record from './Record';
import Graph from './Graph';
import AudioComponent from './AudioComponent';
import ChooseLanguage from './ChooseLanguage';
import { targetWord, button } from './StudyElements';

// dispatchers
import { setUserTone } from '../reducers/UserTone';
import { fetchTargets } from '../reducers/Targets';
import { setCurrentTarget } from '../reducers/CurrentTarget';
import { setUserURL } from '../reducers/UserAudioURL';
import { resetAudio } from '../utils/RecordingUtils';

// utilities
import { toneTypeIdToQuality } from '../utils/HashMaps';

export class Study extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			previousTargets: [],
			index: 0
		};

		this.next = this.next.bind(this);
		this.previousTarget = this.previousTarget.bind(this);
		this.onLanguageClick = this.onLanguageClick.bind(this);

	}

	// randomly selects a tone from this.state.targets and sets that target tone as the next tone to study
	next() {
		// modify previousTargets stack
		let previousTargets = this.state.previousTargets;
		previousTargets.push(this.props.currentTarget);
		if (previousTargets.length > 10) previousTargets.shift();

		// select new currentTarget
		let index = (this.state.index + 1) % this.props.allTargets.length;
		this.props.setCurrentTarget(this.props.allTargets[index]);

		// update state to reflect new previousTargets stack and currentTarget selection mechanims ('index');
		this.setState({index, previousTargets});

		// RESET AUDIO AND GRAPH HERE
		resetAudio(this.props.url, this.props.dispatchSetUserURL);
		this.props.dispatchUserTone([]);

	}

	// makes the next tone to study the tone that was just studied (i.e., studied prior to the current tone)
	previousTarget () {
		let previousTargets = this.state.previousTargets;

		// return if previous target stack is empty
		if (!previousTargets.length) return;

		// set previous target as new current target; update this.state.index accordingly (in order to keep forward direction through targets regular)
		let currentTarget = previousTargets.pop();
		this.props.setCurrentTarget(currentTarget);
		let index = this.state.index - 1;
		this.setState({ index, previousTargets });

		// RESET AUDIO AND GRAPH HERE
		resetAudio(this.props.url, this.props.dispatchSetUserURL);
		this.props.dispatchUserTone([]);
	}

	onLanguageClick(language) {
		this.props.fetchTargets(language);
	}

	////////////////////////////
	// render study component //
	////////////////////////////
	render() {
		// IF: if the redux store's currentTarget field is populated; i.e., IF a language has been selected
		// ELSE: select a language and cause the redux store's currentTarget field to be populated
		if (Object.keys(this.props.currentTarget).length) {

			let {
				transliteration,
				englishTranslation,
				nativeSpelling:image,
				wav,
				tone_type_id
			} = this.props.currentTarget;
			let tones = toneTypeIdToQuality();
			let previousTarget = this.previousTarget;
			let next = this.next;

			return (
				<div className='studyDiv'>
					<Col lg={12}>
						<Col lg={4}>
							{this.props.currentTarget && targetWord(image, transliteration, englishTranslation, tones[tone_type_id])}
							<Paper zDepth={1} style={{marginTop:'10px'}}>
								<AudioComponent wav={wav}/>
								{button('PREVIOUS', previousTarget)}
								<Record
									duration={this.props.currentTarget && this.props.currentTarget.duration}
									targetPitches={this.props.currentTarget && this.props.currentTarget.pitches}
									/>
								{button('NEXT', next)}
							</Paper>
						</Col>
						<Col lg={8} style={styles.graphStyle}>
							<Graph />
						</Col>
					</Col>
				</div>
			);
		} else {
			return <ChooseLanguage onLanguageClick={this.onLanguageClick} />
		}
	}
}

/////////////////////////////////
// grab all targets from store //
/////////////////////////////////
const mapStateToProps = state => ({
	allTargets: state.allTargets,
	currentTarget: state.currentTarget,
	url: state.url,
	graph: state.graph,
	userBest: state.userBest
});

///////////////////////////////////////////////////////////
// grab current userTone and dispatch methods from store //
///////////////////////////////////////////////////////////
const mapDispatchToProps = dispatch => {
	return {
		dispatchUserTone: userTone => {
			dispatch(setUserTone(userTone));
		},
		fetchTargets: language => {
			dispatch(fetchTargets(language));
		},
		setCurrentTarget: currentTarget => {
			dispatch(setCurrentTarget(currentTarget));
		},
		dispatchSetUserURL: userURL => {
			dispatch(setUserURL(userURL));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Study);

const styles = {
	modalButton: {
		margin: '30px',
	},
	buttonSection: {
		paddingTop: '80px',
	},
	graphStyle: {
	}
};
