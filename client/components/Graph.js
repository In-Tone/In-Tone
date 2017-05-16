import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import { connect } from 'react-redux';
import { pitchFiltering, pitchSlicing, getXLabels, pitchSmoothing, pitchFix } from '../utils/ProcessingUtils';
import { drawGraph, resetGraph } from '../utils/GraphingUtils';
import { setUserGraph } from '../reducers/UserGraph';

//////////////////////////////////////////
// this component draws the pitch graph //
//////////////////////////////////////////
class Graph extends React.Component {

	constructor(props) {
		super(props)

		this.currGraph = []
		this.dispatchSetUserGraph = this.props.dispatchSetUserGraph
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

		// filter out halves and doubles:
		const oldResults = pitchFiltering(userPitches);
		const userTone = pitchSlicing(oldResults);
		const targetTone = pitchSlicing(targetPitches);
		const smoothResults = pitchFix(userTone)
		const smoothTargets = pitchFix(targetTone)

		let chartCtx = this.refs._canvasNode.getContext('2d');
		let xLabels = getXLabels(duration, targetTone);

		if (this.currGraph.length) {
			this.currGraph[0].destroy();
			this.currGraph.shift();
		}

		const graph = drawGraph(chartCtx, xLabels, smoothResults, smoothTargets);
		this.currGraph.push(graph);

		// set graph on store
		this.dispatchSetUserGraph(this.currGraph)

	}

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
});

const mapDispatchToProps = dispatch => {
	return {
		dispatchSetUserGraph: graph => {
			dispatch(setUserGraph(graph));
		}
	}
};


export default connect(mapStateToProps, mapDispatchToProps)(Graph);
