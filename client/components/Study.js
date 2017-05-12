import React, { Component } from 'react';
import { connect } from 'react-redux'
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import {Card, CardActions, CardMedia, CardTitle} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
const Chart = require('chart.js');
// import Pitchfinder from 'pitchfinder';
import { Grid, Row, Col } from 'react-bootstrap';
import { targetWord, button } from '../utils/StudyDivs.js';
import Record from '../utils/Record';


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
	randomReset() {
		let allTargets = this.state.allTargets;
		let currentTarget = this.state.currentTarget;

		let previousTargets = this.state.previousTargets;

		previousTargets.push(currentTarget);
		this.setState({ previousTargets });

		let currentToneId = currentTarget.toneId;
		let randNum = Math.floor(Math.random()*allTargets.length);
		if (currentToneId === randNum) randNum = (randNum + 1) % allTargets.length;
		currentTarget = allTargets[randNum];
		this.setState({ currentTarget });
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
							
							<RaisedButton id='Record'>
								<p id="countdown">Record</p>
							</RaisedButton>
							{button('NEXT', randomReset)}
							<audio controls id='soundSample' src={wav}/>
							<div id='soundClips'></div>
						</Paper>å
					</Col>
				</Row>

				<br />

				<Paper zDepth={1}>
					<canvas id='studyChart' ></canvas>
				</Paper>
			</div>
		);
	}
}


const mapStateToProps = state => ({
	allTargets: state.allTargets
});

const mapDispatchToProps = dispatch => {
	return {
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(Study);
