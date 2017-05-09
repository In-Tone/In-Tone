import React, { Component } from 'react';
import { connect } from 'react-redux'
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import {Card, CardActions, CardMedia, CardTitle} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
const Chart = require('chart.js');
import { Grid } from 'react-bootstrap';


class Study extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			languageValue: 1,
			targetIMG: '',
			targetTranslation: '',
			// chart data
			pitchContour: [1,2,3,6,9,12,20],
			chartLabels: ['-','-','-','-','-','-','-']
		}
		this.selectLanguage = this.selectLanguage.bind(this);
	}

	selectLanguage(event, index, value) {
		console.log('selectLanguage event', event)
		this.setState({languageValue: value})
		// mapDispatchToProps to get the right information for that language
	}

	// play target audio 
	getTargetAudio(targetWord) {

	}

	// record audio input
	recordAudio() {
		// import and invoke the record audio function extracted from
		// audioinput.js
	}

	// select next word
	nextWord() {

	}

	// go back to the previous word
	previousWord() {

	}

	// toggle pitch contour graph (own, target, combined)
	toggleOverlay() {

	}

	render() {
		console.log('state', this.state)
		return (
			<div className='studyDiv'>
				<Card>
					<CardMedia
						overlay={<CardTitle title='Transliteration Here' subtitle='English Translation Here'/>}
					>
						{/* REPLACE WITH PROPS.TARGET_IMAGE */}
						<img src='https://2.bp.blogspot.com/_Jjs-Zmd-bB8/TMw7Wn6VccI/AAAAAAAAACc/Zw4oEbOZgNA/s400/Sawasdee.png' />
					</CardMedia>
					<CardActions style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
						<RaisedButton label='Tone' />
						<RaisedButton label='Record' />
						<DropDownMenu 
							value={this.state.languageValue}
							style={{width:'15%'}}
							autoWidth={false}
							onTouchTap={this.selectLanguage}
						>
							<MenuItem value={1} primaryText='Language' />
							<MenuItem value={2} primaryText='Thai' />
							<MenuItem value={3} primaryText='Chinese' />
							<MenuItem value={4} primaryText='Hmong' />
						</DropDownMenu>
						<RaisedButton label='Next' />
						<RaisedButton label='Overlay' />
					</CardActions>
				</Card>
				<br />
				<Paper zDepth={1}>
					<canvas ref='chartCanvas' ></canvas>
				</Paper>
			</div>
		)
	}

	componentDidMount(){
		let context = this.refs.chartCanvas;
		let myLineChart = new Chart(context, {
		type: 'line',
		labels: this.state.chartLabels,
		datasets: {
			label: 'dummy data',
			data: this.state.pitchContour,
			borderCapStyle: 'butt'
		}
		});
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

export default connect(mapStateToProps, mapDispatchToProps)(Study)