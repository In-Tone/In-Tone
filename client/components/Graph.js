'use strict';
// react
import React, { Component } from 'react';
import { connect } from 'react-redux';

// material-ui
import Paper from 'material-ui/Paper';

// utilities
import { pitchFiltering, pitchSlicing, getXLabels, pitchSmoothing, pitchFix } from '../utils/ProcessingUtils';
import { drawGraph, resetGraph } from '../utils/GraphingUtils';
import { scores } from '../utils/CalculateScore';
import { dataCollect } from '../utils/DataCollect';


//////////////////////////////////////////
// this component draws the pitch graph //
//////////////////////////////////////////
class Graph extends React.Component {

	constructor(props) {
		super(props)
		this.currGraph = [];
	}

	////////////////////////////////////////////////////
	// grab pitches and duration from props on mount, //
	// then draw the current target graph ONLY /////////
	////////////////////////////////////////////////////

	componentDidMount() {

		const targetPitches = this.props.currentTarget.pitches;
		const duration = this.props.currentTarget.duration;

		// slice target pitch array
		const targetTone = pitchSlicing(targetPitches);
		// smooth target pitch array
		const smoothTargets = pitchFix(targetTone);
		// grab chart element
		let chartCtx = document.getElementById('studyChart').getContext('2d');
		// create ms x-axis labels
		let xLabels = getXLabels(smoothTargets);
		// draw graph
		drawGraph(chartCtx, xLabels, [], smoothTargets);
	}

	////////////////////////////////////////////////////////////
	// grab new pitches and duration from props, ///////////////
	// then redraw graph with current target AND user pitches //
	////////////////////////////////////////////////////////////
	componentWillReceiveProps(nextProps) {
		const targetPitches = nextProps.currentTarget.pitches;
		const duration = nextProps.currentTarget.duration;
		const userPitches = nextProps.userTones;


		// info required for sending user attempt data to database
		let target_id, blob, user_id, tone_type_id, isBest, date, difficulty, userBest;
		if (nextProps.user) {
			target_id = nextProps.currentTarget.id;
			blob = nextProps.blob;
			user_id = nextProps.user.id;
			tone_type_id = nextProps.currentTarget.tone_type_id;
			isBest = false;
			date = null;
			difficulty = "beginner";
			userBest = nextProps.userBest;
		}

		// target slicing + smoothing
		const targetTone = pitchSlicing(targetPitches);
		const smoothTargets = pitchFix(targetTone);

		let chartCtx = this.refs._canvasNode.getContext('2d');
		let xLabels = getXLabels(smoothTargets);

		if (this.currGraph.length) {
			this.currGraph[0].destroy();
			this.currGraph.shift();
		}

		if (nextProps.userTones.length) {
			const oldResults = pitchFiltering(userPitches);
			const userTone = pitchSlicing(oldResults);
			const smoothResults = pitchFix(userTone);

			// score is the user score, failing is the array of points where the
			// user really needs to focus on fixing their inflection ***Integration TBD
			let {score, failing} = scores(smoothTargets, smoothResults);

			const graph = drawGraph(chartCtx, xLabels, smoothResults, smoothTargets, score);
			this.currGraph.push(graph);
			if (nextProps.user) dataCollect(smoothResults, blob, isBest, date, score, difficulty, user_id, tone_type_id, target_id, userBest);
		}
		else {
			const graph = drawGraph(chartCtx, xLabels, [], smoothTargets);
			this.currGraph.push(graph);
		}
	}

	//////////////////////////
	// render the component //
	//////////////////////////
	render() {
		return (
			<Paper zDepth={1}>
				<canvas id='studyChart' ref='_canvasNode' style={styles.chart}></canvas>
			</Paper>
		);
	}
}

////////////////////////////////////////
// get userTones from the store state //
////////////////////////////////////////
const mapStateToProps = state => ({
	userTones: state.userTones,
	currentTarget: state.currentTarget,
	user: state.user,
	blob: state.blob,
	userBest: state.userBest
});

export default connect(mapStateToProps, null)(Graph);

const styles = {
	chart: {
		padding: '24px',
	}
};
