'use strict';
// react
import React, { Component } from 'react';

// utilities
import { draw } from '../utils/HomeUtils';
import { CreateAudioContext } from '../utils/RecordingUtils';

class Home extends Component {

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		// for edge case browser compatibility
		const [context, hpFilter, lpFilter, compressor, viz] = CreateAudioContext();
		const canvas = document.getElementById("homeCanvas");
		const ctx = canvas.getContext("2d");
		const waveArray = new Uint8Array(viz.frequencyBinCount);

		draw(viz, canvas, ctx, waveArray);

		// constraints object for getUserMedia stream (tells the getUserMedia what kind of data object it will receive)
		const constraints = { audio: true, video: false };
		// set up stream -- is a promise -- recording happens in .then off it
		navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
			// create audioNode stream source with stream so we can route it through the audioContext
			const source = context.createMediaStreamSource(stream);
			// connect it to the nodes
			source.connect(viz);

			// declare setInterval variable outside so we can kill the interval in a separate function
			const repeatDraw = setInterval(() => {
					viz.getByteTimeDomainData(waveArray);
					draw(viz, canvas, ctx, waveArray);
				}, 100);
		});
	}

	render() {
		return (
		<div id='canvasContainer'>
			<canvas id='homeCanvas' width='1050' height='500' style={styles.waveform}></canvas>
		</div>
	)};
}

export default Home;

const styles = {
	waveform: { 
		width: '100%',
		height: '95vh'
	}
};