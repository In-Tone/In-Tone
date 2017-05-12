import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { CreateAudioContext, stopMedia } from '../utils/CreateAudioContext';
import Pitchfinder from 'pitchfinder';

export default class Record extends React.Component {

	constructor(props) {
		super(props);

		this.state = {};

		this.duration = this.props.duration;
		this.audioContext = this.props.audioContext;
	}

	componentDidMount() {

		const duration = this.props.duration;
		const targetPitches = this.props.targetPitches;
	
		// constraints object for getUserMedia stream (tells the getUserMedia what kind of data object it will receive)
		var constraints = { audio: true, video: false };
		// set up stream -- is a promise -- recording happens in .then off it
		navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {

			const contexts = CreateAudioContext();
			// create audioNode stream source with stream so we can route it through the audioContext
			var source = contexts[0].createMediaStreamSource(stream);
			// connect it to the nodes
			source.connect(contexts[4]);
			// lpFilter.connect(hpFilter);
			// hpFilter.connect(viz);
			contexts[4].connect(contexts[3]);

			// grab "record" button
			var record = document.getElementById("Record");
			// record button click handler;
			record.onclick = function() {
				var countdown = document.getElementById('countdown');
				var seconds = 3;
				countdown.innerHTML = seconds;
				var countdownTimer = setInterval(() => {
						seconds = seconds-1;
						countdown.innerHTML = (seconds > 0) ? seconds : "Go!";
				}, 1000);
				setTimeout(() => {
						clearInterval(countdownTimer);
						record.style.background = "red";
						record.style.color = "black";
						mediaRecorder.start();
				}, 3000);
				setTimeout(() => {
					record.style.background = "";
					record.style.color = "";
					mediaRecorder.stop();
				}, 3000+duration);
			};

			// create MediaRecorder instance
			var mediaRecorder = new MediaRecorder(stream);
			// holder for audio
			var recording = [];
			// when data is available, push available data to recording array
			// as written, data is available when 'stop' is clicked which calls .stop on the mediaRecorder instance
			mediaRecorder.ondataavailable = function(e) {
					recording.push(e.data);
					stopMedia(mediaRecorder, recording, contexts[0]);
			};
			// onstop handler for mediaRecorder -- when stopped, this says what to do with the recorded data

			// mediaRecorder.onstop = function(e) {
			// 	// create audio element to post to page
			// 	var clipContainer = document.createElement('article');
			// 	var clipLabel = document.createElement('p');
			// 	var audio = document.getElementById('soundSample');
			// 	var deleteButton = document.createElement('button');

			// 	// add created audio element to page
			// 	clipContainer.classList.add('clip');
			// 	audio.setAttribute('controls', '');
			// 	deleteButton.innerHTML = "Delete";
			// 	// EDITBRANCH: NO CLIPLABEL B/C NO CLIPNAME
			// 	//clipLabel.innerHTML = clipName;

			// 	// clipContainer.appendChild(audio);
			// 	// clipContainer.appendChild(clipLabel);
			// 	// clipContainer.appendChild(deleteButton);
			// 	// soundClips.appendChild(clipContainer);

			// 	// create Blob for access by audio element, set as src for playback
			// 	var blob = new Blob(recording, { 'type' : 'audio/ogg; codecs=opus' });
			// 	recording = [];
			// 	var audioURL = window.URL.createObjectURL(blob);
			// 	audio.src = audioURL;

			// 	// use FileReader to access the Blob data
			// 	var reader = new FileReader();
			// 	reader.addEventListener("loadend", function() {
			// 		// not sure yet if we need the raw reader.result or the Uint8Array version on state, and if it matters
			// 		// var buffer = new Uint8Array(reader.result);

			// 		contexts[0].decodeAudioData(reader.result).then(data => {

			// 			const detectPitch = new Pitchfinder.YIN();
			// 			const detectors = [detectPitch, Pitchfinder.AMDF()];

			// 			const float32Array = data.getChannelData(0); // get a single channel of sound
			// 			// const pitch = detectPitch(float32Array); // null if pitch cannot be identified

			// 			// 500 bpm = 8.33 beats per second
			// 			// quantization = 4 --> 33.32 samples per second
			// 			let frequencies = Pitchfinder.frequencies(detectors, float32Array, {
			// 			tempo: 500, // in BPM, defaults to 120
			// 			quantization: 8, // samples per beat, defaults to 4 (i.e. 16th notes)
			// 			}).map(freq => Math.round(freq));

			// 			let results = [];

			// 			/**************************************************************************/
			// 			/**************************************************************************/
			// 			/************************algo editing starts here**************************/
			// 			/**************************************************************************/
			// 			/**************************************************************************/
			// 			/**************************************************************************/

			// 			frequencies.forEach(freq => {
			// 				if (typeof freq !== 'number' || freq > 1000 || isNaN(freq) ) {
			// 					if (!results.length) {
			// 							results.push(0);
			// 					} else {
			// 							results.push(results[results.length - 1])
			// 					}
			// 				} else {
			// 					results.push(freq);
			// 				}
			// 			})

			// 			// EDITBRANCH: filter out the zeros
			// 			results = results.filter(freq => freq > 0)

			// 			const pitchesShiftedUp = targetPitches.map(pitch => pitch = pitch + 15)

			// 			var chartCtx = document.getElementById("studyChart").getContext("2d");

			// 			let myLineChart = new Chart(chartCtx, {
			// 				type: 'line',
			// 				data: {
			// 					labels: targetPitches,
			// 					datasets: [
			// 						{
			// 							label: 'Target Contour',
			// 							data: targetPitches,
			// 							borderCapStyle: 'butt',
			// 							borderColor: 'rgba(225, 225, 225, 0.6)',
			// 							fill: false,
			// 						}
			// 					]
			// 				},
			// 				options: {
			// 					title: {
			// 						display: 'true',
			// 						position: 'top',
			// 						text: 'PITCH CONTOUR SCORE',
			// 						fontSize: 20
			// 					}
			// 				}
			// 			});

			// 		// close the decode audio data promise 
			// 		});
			// // close the readFile function
			// 	});

			// 	// once read, fires "loadend" event, then above callback runs to set state
			// 	reader.readAsArrayBuffer(blob);

			// 	// delete button
			// 	deleteButton.onclick = function(e) {
			// 		var evtTgt = e.target;
			// 		evtTgt.parentNode.parentNode.removeChild(evtTgt.parentNode);
			// 	};
			// };

		}).catch(function(err) {
				console.log(err);
		});

	}

	render() {
		return (
			<RaisedButton id='Record'>
				<p id="countdown">Record</p>
			</RaisedButton>
		)
	}
}