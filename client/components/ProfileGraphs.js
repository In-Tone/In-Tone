import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import { pitchFiltering, pitchSlicing, getXLabels, pitchSmoothing, pitchFix } from '../utils/ProcessingUtils';
import { drawProfileGraph } from '../utils/GraphingUtils';
import { scores } from '../utils/CalculateScore';

// ProfileGraphs: a *smart* component to access canvas refs
class ProfileGraphs extends React.Component {
	constructor(props){
		super(props)
		this.chartDuration = Math.round(this.props.duration).toString()
	}

	componentDidMount(){
		let smoothUser;
		let duration = this.props.duration;
		// each canvas has to have a unique ref so they don't just rewrite the previous
		let chartRef = this.chartDuration;
		let chartCtx = this.refs[chartRef].getContext('2d');

		// set up the target pitch contours
		let target = this.props.targetPitches;
		let slicedTarget = pitchSlicing(target);
		let smoothTargets = pitchFix(slicedTarget);

		// set up the user pitch contours. Handle race conditions/empty user arrays
		if(this.props.userPitches){
			smoothUser = this.props.userPitches;
		}else{
			smoothUser = [];
		}

		// axes markers
		let xLabels = getXLabels(duration, target);

		const graph = drawProfileGraph(chartCtx, xLabels, smoothUser, smoothTargets)
	}

	render() {
		return(
			<Paper zDepth={1} style={styles.profileGraphs}>
				<canvas ref={this.chartDuration}></canvas>
			</Paper>
		)
	}
}

const styles = {
	profileGraphs: {
		padding: '2%',
		marginRight: '2%'
	}
}

export default ProfileGraphs;