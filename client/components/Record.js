import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { CreateAudioContext, stopAndReturnMedia, resetAudio } from '../utils/RecordingUtils';
import { processMedia } from '../utils/ProcessingUtils';
import { connect } from 'react-redux';
import { setUserTone } from '../reducers/UserTone';
import { setUserURL } from '../reducers/UserAudioURL';

class Record extends React.Component {

	constructor(props) {
		super(props);

		this.duration = this.props.duration;
		this.dispatchUserTone = this.props.dispatchUserTone;
		this.dispatchSetUserURL = this.props.dispatchSetUserURL;
		this.url = this.props.url;
	}

	componentDidMount() {

		// get duration from props
		const duration = this.props.duration;
		// get dispatchUserTone from props
		const dispatchUserTone = this.dispatchUserTone;
		// get dispatchSetUserURL from props
		const dispatchSetUserURL = this.dispatchSetUserURL;
		// get url from props
		const url = this.url;

		///////////////////////////////////////
		//////////// SET UP STREAM ////////////
		///////////////////////////////////////
		// constraints object for getUserMedia stream
		// i.e., tells the getUserMedia what kind of data object it will receive)
		var constraints = { audio: true, video: false };
		// set up stream -- is a promise -- recording happens in .then off it
		navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
			// create AudioContext and audioNodes by calling helper function CreateAudioContext();
			const [context, hpFilter, lpFilter, compressor, viz] = CreateAudioContext();
			// pass stream to CreateAudioContext -- connect there -- return only context??
			// create audioNode stream source with stream to route it through the audioContext and nodes
			const source = context.createMediaStreamSource(stream);
			source.connect(compressor);
			compressor.connect(hpFilter);
			hpFilter.connect(lpFilter);
			lpFilter.connect(viz);

			////////////////////////////////////
			/////// SET UP RECORD BUTTON ///////
			////////////////////////////////////
			// grab "record" button
			var record = document.getElementById("Record");
			// record button click handler
			// ** make this onClick on react component
			record.onclick = function() {
				// remove existing user audio (so when you hit next it resets)
				resetAudio(this.url, dispatchSetUserURL)

				// grab countdown element
				var countdown = document.getElementById('countdown');
				// initialize seconds variable for countdown
				var seconds = 3;
				// set innerHTML of countdown element to seconds
				countdown.innerHTML = seconds;
				// create countdown timer
				var countdownTimer = setInterval(() => {
						seconds = seconds-1;
						countdown.innerHTML = (seconds > 0) ? seconds : "GO!";
				}, 1000);
				// create record initializer to fire at same time as setInterval reaches 3 seconds
				// also clear that interval
				// start recording
				setTimeout(() => {
						clearInterval(countdownTimer);
						record.style.background = "red";
						record.style.color = "black";
						mediaRecorder.start();
				}, 3000);
				// create recording stop, which fires exactly 1 second + duration of target after start
				setTimeout(() => {
					record.style.background = "";
					record.style.color = "";
					mediaRecorder.stop();
				}, 4000+duration);
			};

			//////////////////////////////////////
			/////// SET UP MEDIA RECORDER ////////
			//////////////////////////////////////
			var mediaRecorder = new MediaRecorder(stream);
			// when data is available, push available data to recording array
			var recording = [];
			let userTones;

			// .ondataavailable event precedes .on stop, grabs blob from recording array
			mediaRecorder.ondataavailable = function(e) {
				recording.push(e.data);
			};

			// .onstop event fires after .stop is called and after .ondatavailable fires
			mediaRecorder.onstop = function(e) {
				// stopAndReturnMedia helper function that sets url of user audio element to the new blob
				// and returns the blob and the audioURL
				let {blob, audioURL} = stopAndReturnMedia(recording, context)

				// setUserURL in store ldkfjsdlkj
				dispatchSetUserURL(audioURL)
				// processMedia helper function that reads blob, runs through Pitchfinder, and returns array of pitches
				processMedia(blob, context) // second promise for blob
					// set currentUserTone in store to the returned array of pitches
					.then(frequencies => dispatchUserTone(frequencies));  // store holds raw frequency info. that stuff gets filtered in graphing component
			};
			
		// END OF .getUserMedia PROMISE
		}).catch(function(err) {
				console.log(err);
		});

	}

	//////////////////////////////////////
	/////// render record component //////
	//////////////////////////////////////
	render() {
		return (
			<RaisedButton id='Record' className='studyButtons'>
				<p id="countdown">RECORD</p>
			</RaisedButton>
		)
	}
}

//////////////////////////////////////
// grab current userTone from store //
//////////////////////////////////////
const mapStateToProps = state => ({
	url: state.url
})

const mapDispatchToProps = dispatch => {
	return {
		dispatchUserTone: userTone => {
			dispatch(setUserTone(userTone));
		},
		dispatchSetUserURL: userURL => {
			dispatch(setUserURL(userURL));
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(Record);
