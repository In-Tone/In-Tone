import Pitchfinder from 'pitchfinder';

export const CreateAudioContext = () => {

		if (!window.AudioContext) {
			if (!window.webkitAudioContext) {
				alert('no audiocontext found');
			}
			window.AudioContext = window.webkitAudioContext;
		}
		// create audio context and canvas
		var context = new AudioContext();

		// create filter nodes
		var hpFilter = context.createBiquadFilter();
		hpFilter.type = "highpass";
		hpFilter.frequency.value = 85;
		hpFilter.gain.value = 10;

		var lpFilter = context.createBiquadFilter();
		lpFilter.type = "lowpass";
		lpFilter.frequency.value = 900;
		lpFilter.gain.value = 10;

		// Create a compressor node
		var compressor = context.createDynamicsCompressor();
		compressor.threshold.value = -50;
		compressor.knee.value = 40;
		compressor.ratio.value = 12;
		// compressor.reduction.value = -20;
		compressor.attack.value = 0;
		compressor.release.value = 0.25;

		// create analyzer node
		var viz = context.createAnalyser();
		viz.fftSize = 2048;

		return [context, hpFilter, lpFilter, compressor, viz];

}

export const stopMedia = (mediaRecorder, recording, audioContext) => {

		console.log(recording);
			const context = audioContext;

			mediaRecorder.onstop = function(e) {
				// create audio element to post to page
				var clipContainer = document.createElement('article');
				var clipLabel = document.createElement('p');
				var audio = document.getElementById('soundSample');
				var deleteButton = document.createElement('button');

				// add created audio element to page
				clipContainer.classList.add('clip');
				audio.setAttribute('controls', '');
				deleteButton.innerHTML = "Delete";
				// EDITBRANCH: NO CLIPLABEL B/C NO CLIPNAME
				//clipLabel.innerHTML = clipName;

				// clipContainer.appendChild(audio);
				// clipContainer.appendChild(clipLabel);
				// clipContainer.appendChild(deleteButton);
				// soundClips.appendChild(clipContainer);

				// create Blob for access by audio element, set as src for playback
				var blob = new Blob(recording, { 'type' : 'audio/ogg; codecs=opus' });
				var audioURL = window.URL.createObjectURL(blob);
				audio.src = audioURL;

				// use FileReader to access the Blob data
				var reader = new FileReader();
				reader.addEventListener("loadend", function() {
					// not sure yet if we need the raw reader.result or the Uint8Array version on state, and if it matters
					// var buffer = new Uint8Array(reader.result);

					context.decodeAudioData(reader.result).then(data => {

						const detectPitch = new Pitchfinder.YIN();
						const detectors = [detectPitch, Pitchfinder.AMDF()];

						const float32Array = data.getChannelData(0); // get a single channel of sound
						// const pitch = detectPitch(float32Array); // null if pitch cannot be identified

						// 500 bpm = 8.33 beats per second
						// quantization = 4 --> 33.32 samples per second
						let frequencies = Pitchfinder.frequencies(detectors, float32Array, {
						tempo: 500, // in BPM, defaults to 120
						quantization: 8, // samples per beat, defaults to 4 (i.e. 16th notes)
						}).map(freq => Math.round(freq));

						let results = [];

						frequencies.forEach(freq => {
							if (typeof freq !== 'number' || freq > 1000 || isNaN(freq) ) {
								if (!results.length) {
										results.push(0);
								} else {
										results.push(results[results.length - 1])
								}
							} else {
								results.push(freq);
							}
						})

						// EDITBRANCH: filter out the zeros
						// results = results.filter(freq => freq > 0)

						// const pitchesShiftedUp = targetPitches.map(pitch => pitch = pitch + 15)

						// var chartCtx = document.getElementById("studyChart").getContext("2d");

						// let myLineChart = new Chart(chartCtx, {
						// 	type: 'line',
						// 	data: {
						// 		labels: targetPitches,
						// 		datasets: [
						// 			{
						// 				label: 'Target Contour',
						// 				data: targetPitches,
						// 				borderCapStyle: 'butt',
						// 				borderColor: 'rgba(225, 225, 225, 0.6)',
						// 				fill: false,
						// 			}
						// 		]
						// 	},
						// 	options: {
						// 		title: {
						// 			display: 'true',
						// 			position: 'top',
						// 			text: 'PITCH CONTOUR SCORE',
						// 			fontSize: 20
						// 		}
						// 	}
						// });

					// close the decode audio data promise 
					});
			// close the readFile function
				});

				// once read, fires "loadend" event, then above callback runs to set state
				reader.readAsArrayBuffer(blob);

				// delete button
				deleteButton.onclick = function(e) {
					var evtTgt = e.target;
					evtTgt.parentNode.parentNode.removeChild(evtTgt.parentNode);
				};
			};

			return mediaRecorder.onstop;

}