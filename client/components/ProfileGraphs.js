import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import { pitchFiltering, pitchSlicing, getXLabels, pitchSmoothing, pitchFix } from '../utils/ProcessingUtils';
import { drawGraph } from '../utils/GraphingUtils';
import { scores } from '../utils/CalculateScore';

const styles = {
	profileGraphs: {
		paddingTop: '5%',
		paddingBottom: '15%',
		marginBottom: '15%'
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
		console.log('profileGraph this.props', this.props)

		let duration = this.props.duration;
		let derp = this.chartDuration

		console.log('chart duration as derp', derp)

		let target = this.props.targetPitches;
		let xLabels = getXLabels(duration, target)
		let smoothResults = pitchFix(target)

		console.log('what the fuck is refs', this.refs)
		console.log('this is horseshit', this.refs[derp])

		let chartCtx = this.refs[derp].getContext('2d')
		const graph = drawGraph(chartCtx, xLabels, smoothResults, [])
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