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
import AudioComponent from './AudioComponent';
import { setUserTone } from '../reducers/UserTone';
import { setUserURL } from '../reducers/UserAudioURL';
import { resetAudio } from '../utils/RecordingUtils';


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
		let dispatchUserTone = this.props.dispatchUserTone;
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
		dispatchUserTone([]);

		// REST AUDIO GOES HERE
		resetAudio(this.props.url, this.props.dispatchSetUserURL);
	}

	// BETA VERSION ONLY
	// makes the next tone to study the tone that was just studied (i.e., studied prior to the current tone)
	previousTarget () {
		let previousTargets = this.state.previousTargets;
		if (!previousTargets.length) return;
		let currentTarget = previousTargets.pop();
		this.setState({ previousTargets });
		this.setState({ currentTarget });

		// RESET AUDIO GOES HERE
		resetAudio(this.props.url, this.props.dispatchSetUserURL);
	}

	// loads local state with all targets from the store; also sets current target
	componentWillMount() {
		const allTargets = this.props.allTargets;
		this.setState({ allTargets });

		const currentTarget = allTargets[Math.floor(Math.random()*allTargets.length)];
		this.setState({ currentTarget });
	}

	////////////////////////////
	// render study component //
	////////////////////////////
	render() {

		const {
			transliteration,
			englishTranslation,
			nativeSpelling:image,
			wav,
			tone
		} = this.state.currentTarget;

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
				<Col lg={12}>
					<Col lg={4}>
						{targetWord(image, transliteration, englishTranslation, tone)}
						<Paper zDepth={1} style={{marginTop:'10px'}}>
							<AudioComponent wav={wav}/>
							{button('PREVIOUS', previousTarget)}
							<Record 
								duration={this.state.currentTarget.duration}
								targetPitches={this.state.currentTarget.pitches}
								/>
							{button('NEXT', randomReset)}
						</Paper>
					</Col>
					<Col lg={8} style={{paddingLeft:0}}>
						<Graph
							targetPitches={this.state.currentTarget.pitches}
							duration={this.state.currentTarget.duration}
						/>
					</Col>
				</Col>
			</div>
		);
	}
}

/////////////////////////////////
// grab all targets from store //
/////////////////////////////////
const mapStateToProps = state => ({
	allTargets: state.allTargets,
	url: state.url
});

//////////////////////////////////////
// grab current userTone from store //
//////////////////////////////////////
const mapDispatchToProps = dispatch => {
	return {
		dispatchUserTone: userTone => {
			dispatch(setUserTone(userTone));
		},
		dispatchSetUserURL: userURL => {
			dispatch(setUserURL(userURL));
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(Study);