import React, { Component } from 'react';
import { connect } from 'react-redux'
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { Card, CardActions, CardMedia, CardTitle } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import { Grid, Row, Col } from 'react-bootstrap';
import { targetWord, button } from './StudyElements';
import Record from './Record';
import Graph from './Graph';
import { setUserTone } from '../reducers/UserTone';
import { deleteAudioNode } from '../utils/RecordingUtils';

class Study extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			allTargets: [], 
			currentTarget: {},
			previousTargets: [],
		};

		this.randomReset = this.randomReset.bind(this);
		this.previousTarget = this.previousTarget.bind(this);

		// TESTING ONLY
		this.logState = this.logState.bind(this);
	}

	logState() {
		console.log(this.state);
	}

	// randomly selects a tone from this.state.targets and sets that target tone as the next tone to study
	randomReset(e) {
		let dispatchUserTones = this.props.dispatchUserTones;
		let allTargets = this.state.allTargets;
		let currentTarget = this.state.currentTarget;

		let previousTargets = this.state.previousTargets;

		previousTargets.push(currentTarget);
		if (previousTargets.length > 10) previousTargets.shift();
		this.setState({ previousTargets });

		let currentToneId = currentTarget.toneId;
		let randNum = Math.floor(Math.random()*allTargets.length);
		if (currentToneId === randNum) randNum = (randNum + 1) % allTargets.length;
		currentTarget = allTargets[randNum];
		this.setState({ currentTarget });
		dispatchUserTones([]);

		deleteAudioNode('soundClips', 'clip');
	}

	// BETA VERSION ONLY
	// makes the next tone to study the tone that was just studied (i.e., studied prior to the current tone)
	previousTarget () {
		console.log('here');
		let previousTargets = this.state.previousTargets;
		if (!previousTargets.length) return;
		let currentTarget = previousTargets.pop();
		this.setState({ previousTargets });
		this.setState({ currentTarget });
	}

	// loads local state with all targets from the store; also sets current target
	componentWillMount() {
		const allTargets = this.props.allTargets;
		this.setState({ allTargets });

		const currentTarget = allTargets[Math.floor(Math.random()*allTargets.length)];
		this.setState({ currentTarget });
	}

	render() {

		const transliteration = this.state.currentTarget.transliteration;
		const englishTranslation = this.state.currentTarget.englishTranslation;
		const image = this.state.currentTarget.nativeSpelling;
		const wav = this.state.currentTarget.wav;
		const tone = this.state.currentTarget.tone;

		const logState = this.logState;
		const previousTarget = this.previousTarget;
		const randomReset = this.randomReset;

		const dropDownMenu = () => (
			<DropDownMenu
				value={this.state.languageValue}
				style={{width:'15%'}}
				autoWidth={false}
				onChange={this.selectLanguage} >
				<MenuItem value={1} primaryText='Language' />
				<MenuItem value={2} primaryText='Thai' />
				<MenuItem value={3} primaryText='Chinese' />
				<MenuItem value={4} primaryText='Hmong' />
			</DropDownMenu>
		);

		return (
			<div className='studyDiv'>
				<Row className='show-grid'>
					<Col lg={6}>
						{targetWord(image, transliteration, englishTranslation, tone)}
					</Col>
					<Col lg={6}>
						<Paper zDepth={1}>
							{button('LOG STATE', logState)}
							{button('PREVIOUS', previousTarget)}
							<Record 
								duration={this.state.currentTarget.duration}
								targetPitches={this.state.currentTarget.pitches}
								/>
							{button('NEXT', randomReset)}
							<h4>TARGET AUDIO</h4>
							<audio controls id='soundSample' src={wav}/>
							<div id='soundClips'></div>
						</Paper>
					</Col>
				</Row>

				<br />
				<Graph
					targetPitches={this.state.currentTarget.pitches}
					duration={this.state.currentTarget.duration}
				/>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	allTargets: state.allTargets
});

const mapDispatchToProps = dispatch => {
	return {
		dispatchUserTones: userTones => {
			dispatch(setUserTone(userTones));
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(Study);
