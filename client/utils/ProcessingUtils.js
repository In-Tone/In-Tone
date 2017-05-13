import Pitchfinder from 'pitchfinder';

export const processMedia = (audioBlob, audioContext) => {
	let blob = audioBlob;
	let context = audioContext;
	let reader = new FileReader();

	let frequencyPromise = new Promise ((resolve, reject) => {
		reader.addEventListener("loadend", function() {
			return context.decodeAudioData(reader.result).then(data => {
				const detectPitch = new Pitchfinder.YIN();
				const detectors = [detectPitch, Pitchfinder.AMDF()];
				const float32Array = data.getChannelData(0); // get a single channel of sound
				// const pitch = detectPitch(float32Array); // null if pitch cannot be identified
				console.log(reader);

				// 500 bpm = 8.33 beats per second
				// quantization = 4 --> 33.32 samples per second
				let frequencies = Pitchfinder.frequencies(detectors, float32Array, {
					tempo: 500, // in BPM, defaults to 120
					quantization: 8, // samples per beat, defaults to 4 (i.e. 16th notes)
				}).map(freq => Math.round(freq));
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
		if (typeof freq !== 'number' || freq > 1000 || isNaN(freq) ) {
			if (!oldResults.length) {
					oldResults.push(0);
			} else {
					oldResults.push(oldResults[oldResults.length - 1]);
			}
		} else {
			oldResults.push(freq);
		}
	});

	// "Pim's voice filter": filters any frequencies outside human voice range; replaces them with NaN's. 
	let results = frequencies.map( freq => {
		if (freq > 500 || freq < 70) return NaN;
		else return freq;
	});

	return [oldResults, results];
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
