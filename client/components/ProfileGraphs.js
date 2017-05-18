import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import { pitchFiltering, pitchSlicing, getXLabels, pitchSmoothing, pitchFix } from '../utils/ProcessingUtils';
import { drawProfileGraph } from '../utils/GraphingUtils';
import { scores } from '../utils/CalculateScore';

const styles = {
	profileGraphs: {
		padding: '2%',
		marginRight: '2%'
	}
}

// ProfileGraphs: a *smart* component because canvas ID's are bullshit
class ProfileGraphs extends React.Component {
	constructor(props){
		super(props)
		this.chartDuration = Math.round(this.props.duration).toString()
	}

	componentDidMount(){
		// each canvas has to have a unique ID so they don't just rewrite the previous
		let duration = this.props.duration;
		let chartRef = this.chartDuration

		let target = this.props.targetPitches;
		let xLabels = getXLabels(duration, target)


		let userPitches = this.props.userPitches;
		// console.log('this.props: ', this.props)
		// console.log('USER PITCHES: ', userPitches)
		// let slicedUser = pitchSlicing(userPitches);
		// let smoothResults = pitchFix(sliced);

		let slicedTarget = pitchSlicing(target);
		let smoothTargets = pitchFix(slicedTarget);

		let chartCtx = this.refs[chartRef].getContext('2d')
		const graph = drawProfileGraph(chartCtx, xLabels, smoothTargets, userPitches)
	}

	render() {
		return(
			<Paper zDepth={1} style={styles.profileGraphs}>
				<canvas ref={this.chartDuration}></canvas>
			</Paper>
		)
	}
}

export default ProfileGraphs;
