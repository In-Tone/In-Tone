'use strict';
// react
import React, { Component } from 'react';

// material-ui
import Paper from 'material-ui/Paper';

// utilities
import { pitchFiltering, pitchSlicing, getXLabels, pitchSmoothing, pitchFix } from '../utils/ProcessingUtils';
import { drawGraph } from '../utils/GraphingUtils';
import { scores } from '../utils/CalculateScore';

// ProfileGraphs: a *smart* component to access canvas refs
class ProfileGraphs extends Component {
/*	constructor(props){
		super(props)
		this.chartDuration = Math.round(this.props.duration).toString();
	}*/

	componentDidMount(){
		console.log('profile graph props', this.props)
		let smoothUser;
		let duration = this.props.duration;
		// each canvas has to have a unique ref so they don't just rewrite the previous
		let chartRef = this.props.targetId;
		let chartCtx = this.refs[chartRef].getContext('2d');

		// set up the target pitch contours
		let target = this.props.targetPitches;
		let slicedTarget = pitchSlicing(target);
		let smoothTargets = pitchFix(slicedTarget);

		// set up the user pitch contours. Handle race conditions/empty user arrays
		if(this.props.userPitches) smoothUser = this.props.userPitches;
		else smoothUser = [];

		// axes markers
		let xLabels = getXLabels(smoothTargets);

		const graph = drawGraph(chartCtx, xLabels, smoothUser, smoothTargets);
	}

	render() {
		return(
			<Paper zDepth={1} style={styles.profileGraphs}>
				<canvas ref={this.props.targetId}></canvas>
			</Paper>
		);
	}
}

export default ProfileGraphs;

const styles = {
	profileGraphs: {
		padding: '2%',
		marginRight: '2%'
	}
};