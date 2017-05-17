import Pitchfinder from 'pitchfinder';
import toWav from 'audiobuffer-to-wav';

// export const generateBase64Data = blob => {
// 	let reader = new window.FileReader();
// 	let base64DataPromise = new Promise ((resolve, reject) => {
// 		reader.addEventListener('loadend', function() {
// 			let base64Data = reader.result;
// 			console.log(base64Data);
// 			resolve(base64Data);
// 		})
// 		reader.readAsDataURL(blob);
// 	return base64DataPromise;
// }

export const generateBase64Data = blob => {
	let dataPromise = new Promise ((resolve, reject) => {
		let reader = new window.FileReader();
		reader.readAsDataURL(blob);
		// let base64data;
		reader.onloadend = function() {
			let base64Data = reader.result;
			resolve(base64Data);
		}
	});
	return dataPromise;
}

export const processMedia = (audioBlob, audioContext) => {
	let blob = audioBlob;
	let context = audioContext;
	let reader = new FileReader();

	let frequencyPromise = new Promise ((resolve, reject) => {
		reader.addEventListener("loadend", function() {
			// const toWav = buffToWav
			return context.decodeAudioData(reader.result).then(data => {
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
				// const freqWavArray = [frequencies, float32Array];
				resolve(frequencies);
			})
		})
		reader.readAsArrayBuffer(blob);
	})

	return frequencyPromise;
};

export const pitchFiltering = frequencies => {

	// "original filter": replaces NaN's and frequencies greater than 1000 with 0's if none have been placed in yet;
	// if values have already been placed, this replaces such values ^^ with the previous number value less than 1000;
	let oldResults = [];
	frequencies.forEach(freq => {
		if (freq > 500 || freq < 70 || isNaN(freq) ) {
			if (!oldResults.length) {
					oldResults.push(0);
			} else {
					oldResults.push(oldResults[oldResults.length - 1]);
			}
		} else {
			oldResults.push(freq);
		}
	});

	return oldResults;
};

export const pitchSlicing = array => {
	for (let i = 0; i < array.length; i++) {
		let diff = Math.abs(array[i] - array[i - 1]);
		if (diff > 80) {
			return array.slice(i);
		}
	}
};


export const getXLabels = (duration, targetPitches) => {
	let pitchesLength = targetPitches.length;
	let increment = Math.floor(duration / pitchesLength);
	let ms = increment;
	let xLabels = [];

	for (let i = 0; i < pitchesLength; i++) {
		xLabels.push(ms + ' ms');
		ms += increment;
	}

	return xLabels
};

// throw out halves and doubles:
export const pitchFix = array => {
	let rejects = []

	for (let i = 1; i < array.length; i++) {
		var prev = rejects.indexOf(array[i-1]) >=0 ? prev : array[i-1]
		let curr = array[i]
		let half = prev/2;
		let double = prev*2;

		if ( half + 10 > curr && curr > half - 10 || double + 10 > curr && curr > double - 10 ) {
			rejects.push(array[i]);
		}
	}

	return array.map(freq => {
		if (rejects.indexOf(freq) >= 0) return NaN;
    else return freq;
 })
};
