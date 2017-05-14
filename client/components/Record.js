import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { CreateAudioContext, stopAndReturnMedia, deleteAudioNode } from '../utils/RecordingUtils';
import { processMedia } from '../utils/ProcessingUtils';
import { connect } from 'react-redux';
import { setUserTone } from '../reducers/UserTone';

class Record extends React.Component {

	constructor(props) {
		super(props);

		this.state = {};

		this.duration = this.props.duration;
		this.dispatchUserTones = this.props.dispatchUserTones;
	}

	componentDidMount() {

		const duration = this.props.duration;
		// constraints object for getUserMedia stream (tells the getUserMedia what kind of data object it will receive)
		//////////////////////////////////////
		//////////// SET UP STREAM ////////////
		///////////////////////////////////////
		var constraints = { audio: true, video: false };
		const dispatchUserTones = this.dispatchUserTones;
		// set up stream -- is a promise -- recording happens in .then off it
		navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
			// create audioNode stream source with stream so we can route it through the audioContext then connect it to the nodes
			const [context, hpFilter, lpFilter, compressor, viz] = CreateAudioContext();
			const source = context.createMediaStreamSource(stream);
			source.connect(viz);
			viz.connect(compressor);
			// hpFilter.connect(viz);
			// lpFilter.connect(hpFilter);

			////////////////////////////////////
			/////// RECORD BUTTON //////////////
			////////////////////////////////////
			// grab "record" button
			var record = document.getElementById("Record");
			// record button click handler;
			record.onclick = function() {
				deleteAudioNode('soundClips', 'clip');
				var countdown = document.getElementById('countdown');
				var seconds = 3;
				countdown.innerHTML = seconds;
				var countdownTimer = setInterval(() => {
						seconds = seconds-1;
						countdown.innerHTML = (seconds > 0) ? seconds : "GO!";
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
				}, 4000+duration);
			};

			///////////////////////////////////////
			////////// MEDIA RECORD //////////////
			//////////////////////////////////////
			var mediaRecorder = new MediaRecorder(stream);
			// when data is available, push available data to recording array
			var recording = [];
			let blob, userTones;
			mediaRecorder.ondataavailable = function(e) {
				recording.push(e.data);
			};
			mediaRecorder.onstop = function(e) {
				blob = stopAndReturnMedia(recording, context);
				processMedia(blob, context)
					.then(frequencies => dispatchUserTones(frequencies));  // store holds raw frequency info. that stuff gets filtered in graphing component
			}
		}).catch(function(err) {
				console.log(err);
		});

	}

	render() {
		return (
			<RaisedButton id='Record' className='studyButtons'>
				<p id="countdown">RECORD</p>
			</RaisedButton>
		)
	}
}

const mapDispatchToProps = dispatch => {
	return {
		dispatchUserTones: userTones => {
			dispatch(setUserTone(userTones));
		}
	}
};

export default connect(null, mapDispatchToProps)(Record);
