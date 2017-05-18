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
		let smoothResults = pitchFix(target)

		let chartCtx = this.refs[chartRef].getContext('2d')
		const graph = drawProfileGraph(chartCtx, xLabels, smoothResults, [])
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
