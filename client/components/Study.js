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
			targetIMG: '',
			targetTranslation: '',
			// chart data
			pitchContour: [1,2,3,6,9,12,20],
			chartLabels: ['-','-','-','-','-','-','-']
		}
	}

	// play target audio 
	getTargetAudio(targetWord) {

	}

	// record audio input
	recordAudio() {

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
		return (
			<div className='studyDiv'>
				<Card>
					<CardMedia
						overlay={<CardTitle title='Transliteration Here' subtitle='English Translation Here'/>}
					>
						{/* REPLACE WITH PROPS.TARGET_IMAGE */}
						<img src='https://2.bp.blogspot.com/_Jjs-Zmd-bB8/TMw7Wn6VccI/AAAAAAAAACc/Zw4oEbOZgNA/s400/Sawasdee.png' />
					</CardMedia>
					<CardActions>
						<RaisedButton label='Language' />
						<RaisedButton label='Tone' />
						<RaisedButton label='Record' />
						<RaisedButton label='Next' />
						<RaisedButton label='Overlay' />
					</CardActions>
				</Card>		
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