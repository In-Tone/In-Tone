export const processTargetData = res => {
	console.log('here is res: ', res);
	let data = [];
	for (let i = 0; i < res.data.length; i++) {
		console.log(res.data[i])
		// console.log(res.data[i].language);
		let targets = res.data[i].targets;
		// let dataPart1 = {};


		// dataPart1.tone_type_id = res.data[i].id;
		// console.log(res.data[i].language)
		// dataPart1.language = res.data[i].language;
		let dataPart1 = {
			tone_type_id: res.data[i].id,
			language: res.data[i].language,
			tone: res.data[i].tone
		};
		console.log('dataPart1: ', dataPart1, '\n\n\n')
		for (let j = 0; j < targets.length; j++) {
			console.log(targets);
			let dataPart2 = {
				englishTranslation: targets[j].englishTranslation,
				toneId: targets[j].id,
				pitches: targets[j].pitches,
				nativeSpelling: targets[j].thaiSpelling,
				transliteration: targets[j].transliteration,
				wav: targets[j].wav
			}
			let languageData = Object.assign(dataPart1, dataPart2);
			// console.log(languageData)
			data.push(languageData);
		}
	}
	return data;
}