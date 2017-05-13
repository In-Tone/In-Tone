import Pitchfinder from 'pitchfinder';

export const deleteAudioNode = (parentId, childClassName) => {
	let parent = document.getElementById(parentId);
	let child = document.getElementsByClassName(childClassName);
	child.length && parent.removeChild(child[0]);
};

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
	// compressor.reduction.value = -20;
	compressor.attack.value = 0;
	compressor.release.value = 0.25;

	// create analyzer node
	let viz = context.createAnalyser();
	viz.fftSize = 2048;

	return [context, hpFilter, lpFilter, compressor, viz];

};

export const stopAndReturnMedia = (audioRecording) => {
	// create user audio element to post to page
	let soundClips = document.getElementById('soundClips');
	let clipContainer = document.createElement('article');
	let clipLabel = document.createElement('h4');
	let audio = document.createElement('audio');

	// add created user audio element to page
	clipContainer.classList.add('clip');
	audio.setAttribute('controls', '');
	clipLabel.innerHTML = "YOUR AUDIO";

	clipContainer.appendChild(clipLabel);
	clipContainer.appendChild(audio);
	soundClips.appendChild(clipContainer);

	// create Blob for access by user audio element, set as src for playback
	let blob = new Blob(audioRecording, { 'type' : 'audio/ogg; codecs=opus' });
	let audioURL = window.URL.createObjectURL(blob);
	audio.src = audioURL;

	return blob;

};