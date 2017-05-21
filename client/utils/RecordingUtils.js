///////////////////////////////////////////
/// creates audioContext and audioNodes ///
///////////////////////////////////////////
export const CreateAudioContext = () => {
	if (!window.AudioContext) {
		if (!window.webkitAudioContext) {
			alert('no audiocontext found');
		}
		window.AudioContext = window.webkitAudioContext;
	}
	// create audio context and canvas
	let context = new AudioContext();

	// create filter nodes
	let hpFilter = context.createBiquadFilter();
	hpFilter.type = "highpass";
	hpFilter.frequency.value = 85;
	hpFilter.gain.value = 10;
	let lpFilter = context.createBiquadFilter();
	lpFilter.type = "lowpass";
	lpFilter.frequency.value = 900;
	lpFilter.gain.value = 10;

	// Create a compressor node
	let compressor = context.createDynamicsCompressor();
	compressor.threshold.value = -50;
	compressor.knee.value = 40;
	compressor.ratio.value = 12;
	compressor.attack.value = 0;
	compressor.release.value = 0.25;

	// create analyzer node
	let viz = context.createAnalyser();
	viz.fftSize = 2048;

	return [context, hpFilter, lpFilter, compressor, viz];

};

/////////////////////////////////////////////////////////////////////////////////
/// on stop helper that creates user audio element and returns the audio blob ///
/////////////////////////////////////////////////////////////////////////////////
// turn into a component
export const stopAndReturnMedia = (audioRecording) => {
	// create Blob for access by user audio element, set as src for playback
	let blob = new Blob(audioRecording, { 'type' : 'audio/ogg; codecs=opus' });
	// call URL.revokeObjectURL() whenever we create a new audio recording to delete the old
	// URL
	let audioURL = window.URL.createObjectURL(blob);
	//audio.src = audioURL;

	return {blob, audioURL};
};

// remove user audio URL and node
export const resetAudio = (url, cb) => {
	// delete audio node & remove the URL to prevent playback of multiple recordings
	window.URL.revokeObjectURL(url)
	cb('')
}
