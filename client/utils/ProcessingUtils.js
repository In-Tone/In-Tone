import Pitchfinder from 'pitchfinder';
import timeseries from 'timeseries-analysis';

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
	let newResults = frequencies.map( freq => {
		if (freq > 500 || freq < 70) return NaN;
		else return freq;
	});

	return [oldResults, newResults];
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

// pim's testing:
export const pitchSmoothing = array => {
	const t = new timeseries.main(timeseries.adapter.fromArray(array))
	const processed = t.ma({period: 6}).output();
	const chart = t.ma({period: 6}).chart({main: true});
	const results = processed.map(subArr => Math.round(subArr[1]))
	console.log('data pre smoothing: ', array)
	console.log('data post smoothing: ', results)
	console.log('chart', chart)
	return results;
};

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

	console.log('inside pitch fix!')
	return array.map(freq => {
		if (rejects.indexOf(freq) >= 0) return NaN;
    else return freq;
 })
};
