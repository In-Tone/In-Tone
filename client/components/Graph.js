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
		// grab chart element
		let chartCtx = document.getElementById('studyChart').getContext('2d');
		// create ms x-axis labels
		let xLabels = getXLabels(duration, targetTone);
		// draw graph
		drawGraph(chartCtx, xLabels, [], targetTone);
	}

	////////////////////////////////////////////////////////////
	// grab new pitches and duration from props, ///////////////
	// then redraw graph with current target AND user pitches //
	////////////////////////////////////////////////////////////
	componentDidUpdate() {
		const targetPitches = this.props.targetPitches;
		const duration = this.props.duration;
		const userPitches = this.props.userTones;
<<<<<<< HEAD
		const [oldResults, newResults] = pitchFiltering(userPitches);

		// const results = pitchSlicing(oldResults);
		// const targets = pitchSlicing(targetPitches);

		// pim's testing - fix halves and doubles:
		const results = pitchSlicing(oldResults);
		const targets = pitchSlicing(targetPitches);
		const smoothResults = pitchFix(results)
		const smoothTargets = pitchFix(targets)



		// pim's testing - fix by time series analysis:
		// const results = pitchSlicing(oldResults);
		// const targets = pitchSlicing(targetPitches);
		// const smoothResults = pitchSmoothing(results)
		// const smoothTargets = pitchSmoothing(targets)
=======
>>>>>>> master

		// filter user pitches and slice both target and user pitches
		// this processing returns the userTone and targetTone
		const [oldResults, newResults] = pitchFiltering(userPitches);
		const userTone = pitchSlicing(oldResults);
		const targetTone = pitchSlicing(targetPitches);
		// grab chart element
		let chartCtx = document.getElementById('studyChart').getContext('2d');
<<<<<<< HEAD
		let xLabels = getXLabels(duration, targets);

		// results = userResults post processing likewise for targets
		// graph is getting target data from Study.js and user data from the store
		// drawGraph(chartCtx, xLabels, results, targets);

		// pim's testing:
		drawGraph(chartCtx, xLabels, smoothResults, smoothTargets);
=======
		// create ms x-axis labels
		let xLabels = getXLabels(duration, targetTone);
		// draw graph
		drawGraph(chartCtx, xLabels, userTone, targetTone);
>>>>>>> master
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
