import Pitchfinder from 'pitchfinder';

///////////////////////////////////////////////////////
/// deletes audio node when Next or Prev is clicked ///
///////////////////////////////////////////////////////
export const deleteAudioNode = (parentId, childClassName) => {
	let parent = document.getElementById(parentId);
	let child = document.getElementsByClassName(childClassName);
	child.length && parent.removeChild(child[0]);
};

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
export const stopAndReturnMedia = (audioRecording) => {
	// create user audio element to post to page
	let soundClips = document.getElementById('soundClips');
	// clipContainer is now a div to fit w/target audio in study component
	let clipContainer = document.createElement('div');
	let clipLabel = document.createElement('h4');
	let audio = document.createElement('audio');

	// add created user audio element to page
	clipContainer.classList.add('clip');

	// style clipContainer to display correctly underneath the target audio
	clipContainer.style.display = 'flex';
	clipContainer.style.justifyContent = 'center';

	audio.setAttribute('controls', '');
	// set audio width to match target audio width
	audio.style.width = '50%';
	clipLabel.innerHTML = "Your Audio:";

	clipContainer.appendChild(clipLabel);
	clipContainer.appendChild(audio);

	// add the user audio to the existing audio div
	soundClips.appendChild(clipContainer);

	// create Blob for access by user audio element, set as src for playback
	let blob = new Blob(audioRecording, { 'type' : 'audio/ogg; codecs=opus' });
	let audioURL = window.URL.createObjectURL(blob);
	audio.src = audioURL;

	return blob;

};