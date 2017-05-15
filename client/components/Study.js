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
import { deleteAudioNode } from '../utils/RecordingUtils';
import {fetchTargets} from '../reducers/Targets';
import SkyLight from 'react-skylight';
import { setCurrentTarget } from '../reducers/CurrentTarget';
import { setUserURL } from '../reducers/UserAudioURL';
import { resetAudio } from '../utils/RecordingUtils';

const styles = {
	footer: {
		height: '55px',
		backgroundColor: 'purple',
		position: 'fixed',
		bottom: '0',
		zIndex: 500
	},
	button: {
		fontSize: '24px',
		color: 'white',
		display: 'in-line',
		height: '100%',
	},
	middleButton: {
		fontSize: '24px',
		color: 'white',
		display: 'in-line',
		height: '100%',
		borderLeft: 'medium solid white',
		borderRight: 'medium solid white'
	},
	modalButton: {
		color: 'white',
		margin: '30px',
	},
	buttonSection: {
		marginTop: '40px',
	},
	myDialog: {
		backgroundColor: 'rgba(0, 137, 123, 1)',
		color: '#ffffff',
		width: '70%',
		height: '320px',
		fontSize: '20px',
		paddingTop: '50px',
		paddingLeft: '75px',
		paddingRight: '75px',
		position: 'fixed',
		zIndex: 999999999999999,
    lineHeight: '32px',
    // vertical alignment
    top:0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: 'auto',
	},
	overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 0,
    backgroundColor: 'rgba(0,0,0,0.7)'
  }
}

class Study extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			previousTargets: [],
			language: '',
			index: 0
		};

		this.randomReset = this.randomReset.bind(this);
		this.previousTarget = this.previousTarget.bind(this);
		this.languageDropDownChange = this.languageDropDownChange.bind(this);
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
		this.props.setCurrentTarget(currentTarget);
		this.setState({ currentTarget });

		// RESET AUDIO GOES HERE
		resetAudio(this.props.url, this.props.dispatchSetUserURL);
	}

	languageDropDownChange(event, index, value) {
		let language = event.target.innerHTML.toLowerCase();
		this.setState({language: value});
		this.props.fetchTargets(language);
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
			let languageDropDownChange = this.languageDropDownChange;

			const dropDownMenu = () => (
				<Paper zDepth={1} style={{marginTop:'10px'}}>
					<DropDownMenu
						value={1}
						style={{width:'100%'}}
						autoWidth={false}
						onChange={this.languageDropDownChange} >
						<MenuItem value={1} primaryText='Thai' />
						{/* <MenuItem value={2} primaryText='Chinese' />
						<MenuItem value={3} primaryText='Hmong' /> */}
					</DropDownMenu>
				</Paper>
			);
			return (
				<div className='studyDiv'>
					<Col lg={12}>
						<Col lg={4}>
							{this.props.currentTarget && targetWord(image, transliteration, englishTranslation, tone)}
							{dropDownMenu()}
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
						<Col lg={8} style={{paddingLeft:0}}>
							<Graph
								targetPitches={this.props.currentTarget && this.props.currentTarget.pitches}
								duration={this.props.currentTarget && this.props.currentTarget.duration}
							/>
						</Col>
					</Col>
				</div>
			);
		} else {
			return (
				<div>
					<Paper zDepth={1} style={{marginTop:'10px'}}>
						<div style={styles.buttonSection}>
							<h1>Choose a language:</h1>
							<RaisedButton label='Mandarin' labelStyle={{fontSize: '24px'}} style={styles.modalButton} disabled={true}/>
							<RaisedButton
								label='Thai'
								labelStyle={{fontSize: '24px'}}
								onClick={() => {
									this.onLanguageClick("thai")
								}} />
							<RaisedButton label='Hmong' labelStyle={{fontSize: '24px'}} style={styles.modalButton} disabled={true}/>
						</div>
					</Paper>
				</div>)
		}
	}
}

/////////////////////////////////
// grab all targets from store //
/////////////////////////////////
const mapStateToProps = state => ({
	allTargets: state.allTargets,
	currentTarget: state.currentTarget,
	url: state.url
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
