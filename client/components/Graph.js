import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import { connect } from 'react-redux';
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

		this.currGraph = []
	}


	////////////////////////////////////////////////////
	// grab pitches and duration from props on mount, //
	// then draw the current target graph ONLY /////////
	////////////////////////////////////////////////////

	componentDidMount() {

		const targetPitches = this.props.currentTarget.pitches
		const duration = this.props.currentTarget.duration;

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
	componentWillReceiveProps(nextProps) {
		console.log('nextProps', nextProps)
		const targetPitches = nextProps.currentTarget.pitches
		const duration = nextProps.currentTarget.duration;
		const userPitches = nextProps.userTones;

		// for sending blob to database
		const target_id = nextProps.currentTarget.toneId;
		const blob = nextProps.blob;
		const user_id = nextProps.user.id;
		const tone_type_id = nextProps.currentTarget.tone_type_id;
		const isBest = false;
		const date = null;
		const difficulty = "beginner";

		// target slicing + smoothing
		const targetTone = pitchSlicing(targetPitches);
		const smoothTargets = pitchFix(targetTone)

		let chartCtx = this.refs._canvasNode.getContext('2d');
		let xLabels = getXLabels(duration, targetTone);

		if (this.currGraph.length) {
			this.currGraph[0].destroy();
			this.currGraph.shift();
		}

		if (nextProps.userTones.length) {
			const oldResults = pitchFiltering(userPitches);
			const userTone = pitchSlicing(oldResults);
			const smoothResults = pitchFix(userTone)
			// score is the user score, failing is the array of points where the
			// user really needs to focus on fixing their inflection ***Integration TBD
			let {score, failing} = scores(smoothTargets, smoothResults)

			const graph = drawGraph(chartCtx, xLabels, smoothResults, smoothTargets, score);
			this.currGraph.push(graph);
			console.log('BLOB DATA: ', blob);
			dataCollect(userPitches, blob, isBest, date, score, difficulty, user_id, tone_type_id, target_id);
		}
		else {
			console.log("NO USER DATA");
			const graph = drawGraph(chartCtx, xLabels, [], smoothTargets);
			this.currGraph.push(graph);
		}


	}

//NEED THAT SHIT
				// 	score: score, HERE
				// difficulty: difficulty, HARD CODE
				// date: date, NULL
				// user_id: userId, USER
				// tone_type_id: toneTypeId, PROPS
				// target_id: targetId PROPS

	//////////////////////////
	// render the component //
	//////////////////////////
	render() {
		return (
			<Paper zDepth={1}>
				<canvas id='studyChart' ref='_canvasNode'></canvas>
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
	blob: state.blob
});


export default connect(mapStateToProps, null)(Graph);
