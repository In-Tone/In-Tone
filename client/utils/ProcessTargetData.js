export const processTargetData = res => {
	// console.log('here is res: ', res);
	let data = [];

	for (let i = 0; i < res.data.length; i++) {
		// console.log(res.data[i])
		let targets = res.data[i].targets;

		let dataPart1 = {
			tone_type_id: res.data[i].id,
			language: res.data[i].language,
			tone: res.data[i].tone
		};

		// console.log('dataPart1: ', dataPart1, '\n\n\n')
		for (let j = 0; j < targets.length; j++) {
			// console.log(targets);
			let dataPart2 = {
				duration: targets[j].duration,
				englishTranslation: targets[j].englishTranslation,
				toneId: targets[j].id,
				pitches: targets[j].pitches,
				nativeSpelling: targets[j].nativeSpelling,
				transliteration: targets[j].transliteration,
				wav: targets[j].wav
			};

			let languageData = Object.assign(dataPart1, dataPart2);
			data.push(languageData);
		}
	}
	return data;

};