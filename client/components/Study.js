import React, { Component } from 'react';
import { connect } from 'react-redux'
import MenuItem from 'material-ui/MenuItem';
import { Card, CardActions, CardMedia, CardTitle } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import { Grid, Row, Col } from 'react-bootstrap';
import { targetWord, button } from './StudyElements';
import Record from './Record';
import Graph from './Graph';
import AudioComponent from './AudioComponent';
import { setUserTone } from '../reducers/UserTone';
import { deleteAudioNode } from '../utils/RecordingUtils';
import {fetchTargets} from '../reducers/Targets';
import { setCurrentTarget } from '../reducers/CurrentTarget';
import { setUserURL } from '../reducers/UserAudioURL';
import { resetAudio } from '../utils/RecordingUtils';
import ChooseLanguage from './ChooseLanguage';

const styles = {
	modalButton: {
		margin: '30px',
	},
	buttonSection: {
		paddingTop: '80px',
	},
	graphStyle: {
	}
}

class Study extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			allTargets: [],
			currentTarget: {},
			previousTargets: [],
			language: '',
			index: 0
		};

		this.randomReset = this.randomReset.bind(this);
		this.previousTarget = this.previousTarget.bind(this);
		this.onLanguageClick = this.onLanguageClick.bind(this);

		// TESTING ONLY
		this.logState = this.logState.bind(this);
	}

	logState() {
		console.log(this.state);
	}

	// randomly selects a tone from this.state.targets and sets that target tone as the next tone to study
	randomReset(e) {
		let allTargets = this.props.allTargets;
		let previousTargets = this.state.previousTargets;
		let currentTarget = this.props.currentTarget;

		previousTargets.push(currentTarget);
		if (previousTargets.length > 10) previousTargets.shift();

		let index = (this.state.index + 1) % this.props.allTargets.length;
		this.props.setCurrentTarget(this.props.allTargets[index]);
		this.setState({index, previousTargets});

		// RESET AUDIO AND GRAPH HERE
		resetAudio(this.props.url, this.props.dispatchSetUserURL);
		this.props.dispatchUserTone([])

	}

	// BETA VERSION ONLY
	// makes the next tone to study the tone that was just studied (i.e., studied prior to the current tone)
	previousTarget () {
		let previousTargets = this.state.previousTargets;
		if (!previousTargets.length) return;
		let currentTarget = previousTargets.pop();
		this.setState({ previousTargets });
		this.props.setCurrentTarget(currentTarget);
		this.setState({ currentTarget });

		// RESET AUDIO AND GRAPH HERE
		resetAudio(this.props.url, this.props.dispatchSetUserURL);
		this.props.dispatchUserTone([])
	}

	onLanguageClick(language) {
		this.props.fetchTargets(language)
		this.setState({language});
	}

	////////////////////////////
	// render study component //
	////////////////////////////
	render() {
		if (Object.keys(this.props.currentTarget).length) {
			let {
				transliteration,
				englishTranslation,
				nativeSpelling:image,
				wav,
				tone
			} = this.props.currentTarget;

			let logState = this.logState;
			let previousTarget = this.previousTarget;
			let randomReset = this.randomReset;

			return (
				<div className='studyDiv'>
					<Col lg={12}>
						<Col lg={4}>
							{this.props.currentTarget && targetWord(image, transliteration, englishTranslation, tone)}
							<Paper zDepth={1} style={{marginTop:'10px'}}>
								<AudioComponent wav={wav}/>
								{button('PREVIOUS', previousTarget)}
								<Record
									duration={this.props.currentTarget && this.props.currentTarget.duration}
									targetPitches={this.props.currentTarget && this.props.currentTarget.pitches}
									/>
								{button('NEXT', randomReset)}
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
			dispatch(fetchTargets(language))
		},
		setCurrentTarget: currentTarget => {
			dispatch(setCurrentTarget(currentTarget))
		},
		dispatchSetUserURL: userURL => {
			dispatch(setUserURL(userURL));
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(Study);
