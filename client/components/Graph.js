import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import { connect } from 'react-redux';
import { pitchFiltering, pitchSlicing, getXLabels, pitchSmoothing, pitchFix } from '../utils/ProcessingUtils';
import { drawGraph } from '../utils/GraphingUtils';

//////////////////////////////////////////
// this component draws the pitch graph //
//////////////////////////////////////////
class Graph extends React.Component {

	constructor(props) {
		super(props);
	}

	////////////////////////////////////////////////////
	// grab pitches and duration from props on mount, //
	// then draw the current target graph ONLY /////////
	////////////////////////////////////////////////////
	componentDidMount() {
		const targetPitches = this.props.targetPitches;
		const duration = this.props.duration;

		// slice target pitch array
		const targetTone = pitchSlicing(targetPitches);
		// smooth target pitch array
		const smoothTargets = pitchFix(targetTone)
		// grab chart element
		let chartCtx = document.getElementById('studyChart').getContext('2d');
		// create ms x-axis labels
		let xLabels = getXLabels(duration, smoothTargets);
		// draw graph
		drawGraph(chartCtx, xLabels, [], smoothTargets);
	}

	////////////////////////////////////////////////////////////
	// grab new pitches and duration from props, ///////////////
	// then redraw graph with current target AND user pitches //
	////////////////////////////////////////////////////////////
	componentDidUpdate() {
		const targetPitches = this.props.targetPitches;
		const duration = this.props.duration;
		const userPitches = this.props.userTones;

		// // filter user pitches and slice both target and user pitches
		// // this processing returns the userTone and targetTone
		// const [oldResults, newResults] = pitchFiltering(userPitches);
		// const userTone = pitchSlicing(oldResults);
		// const targetTone = pitchSlicing(targetPitches);
		// // grab chart element
		// let chartCtx = document.getElementById('studyChart').getContext('2d');
		// // create ms x-axis labels
		// let xLabels = getXLabels(duration, targetTone);
		// // draw graph
		// drawGraph(chartCtx, xLabels, userTone, targetTone);

			// pim's testing - fix halves and doubles:
		const [oldResults, newResults] = pitchFiltering(userPitches);
		const userTone = pitchSlicing(oldResults);
		const targetTone = pitchSlicing(targetPitches);
		const smoothResults = pitchFix(userTone)
		const smoothTargets = pitchFix(targetTone)

		// pim's testing - fix by time series analysis:
		// const results = pitchSlicing(oldResults);
		// const targets = pitchSlicing(targetPitches);
		// const smoothResults = pitchSmoothing(results)
		// const smoothTargets = pitchSmoothing(targets)

		let chartCtx = document.getElementById('studyChart').getContext('2d');
		let xLabels = getXLabels(duration, targetTone);
		drawGraph(chartCtx, xLabels, smoothResults, smoothTargets);

	}

	//////////////////////////
	// render the component //
	//////////////////////////
	render() {
		return (
			<Paper zDepth={1}>
				<canvas id='studyChart' ></canvas>
			</Paper>
		);
	}
}

////////////////////////////////////////
// get userTones from the store state //
////////////////////////////////////////
const mapStateToProps = state => ({
	userTones: state.userTones
});

export default connect(mapStateToProps, null)(Graph);
