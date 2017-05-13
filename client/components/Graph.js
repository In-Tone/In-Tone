import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import { connect } from 'react-redux';
import { pitchFiltering, pitchSlicing, getXLabels } from '../utils/ProcessingUtils';
import { drawGraph } from '../utils/GraphingUtils';

class Graph extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			targetPitches: [],
			userPitches: [],
			duration: 0
		}

	}

	componentDidMount() {
		const targetPitches = this.props.targetPitches;
		const userPitches = this.props.userTones;
		const duration = this.props.duration;

		this.setState({ targetPitches, userPitches, duration });
		let chartCtx = document.getElementById('studyChart').getContext('2d');
		let xLabels = getXLabels(duration, targetPitches);
		drawGraph(chartCtx, xLabels, [], targetPitches);
	}

	componentDidUpdate() {
		const targetPitches = this.props.targetPitches;
		const duration = this.props.duration;

		const userPitches = this.props.userTones;
		const [oldResults, newResults] = pitchFiltering(userPitches);
		const results = pitchSlicing(oldResults);

		let chartCtx = document.getElementById('studyChart').getContext('2d');
		let xLabels = getXLabels(duration, targetPitches);
		drawGraph(chartCtx, xLabels, results, targetPitches);
	}

	render() {
		const graph = () => (
			<canvas id='studyChart' ></canvas>
		);

		return (
			<Paper zDepth={1}>
				<canvas id='studyChart' ></canvas>
			</Paper>
		);
	}
}

const mapStateToProps = state => ({
	userTones: state.userTones
});

export default connect(mapStateToProps, null)(Graph);

// tried componentWilLReceiveProps; componentWillUpdate