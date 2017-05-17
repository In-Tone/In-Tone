// const { weighted, date } = require('chance');
const chance = require('chance')(123);


//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
/////						from client/utils/processingutils								 /////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
// console.log(chance.date());


// console.log(chance.weighted([1,2,3,4],[1,1,2,1]))


const pitchFiltering = pitches => {
	let oldResults = [];
	pitches.forEach(freq => {
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

const pitchSlicing = filteredPitches => {
	for (let i = 0; i < filteredPitches.length; i++) {
		let diff = Math.abs(filteredPitches[i] - filteredPitches[i - 1]);
		if (diff > 80) {
			return filteredPitches.slice(i);
		}
	}
};

const pitchFix = slicedPitches => {
	let rejects = []

	for (let i = 1; i < slicedPitches.length; i++) {
		var prev = rejects.indexOf(slicedPitches[i-1]) >=0 ? prev : slicedPitches[i-1]
		let curr = slicedPitches[i]
		let half = prev/2;
		let double = prev*2;

		if ( half + 10 > curr && curr > half - 10 || double + 10 > curr && curr > double - 10 ) {
			rejects.push(slicedPitches[i]);
		}
	}
}


//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
/////						from client/utils/calculatescore								 /////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

const scores = (target, results) => {

		let resultsDiff = [];
		let targetsDiff = [];

		let longest = results.length > target.length ? results : target

		longest.forEach((pitch, index) => {
			if(target[index + 1]){
				targetsDiff.push(target[index + 1] - target[index])
			}
			if(results[index + 1]){
				resultsDiff.push(results[index + 1] - results[index])
			}
		})

		let differenceScore = [];

		let shortestDiff = targetsDiff.length > resultsDiff.length ? resultsDiff : targetsDiff

		for(var i = 0; i < shortestDiff.length; i++){
			differenceScore.push(Math.abs(resultsDiff[i] - targetsDiff[i]))
		}

		let pitchGrade = 0;

		let failing = [];

		differenceScore.forEach((score, index) => {
			if(score <= 2){
				pitchGrade += 1
			}
			if(score <= 6 && score >= 3){
				pitchGrade += 0.5
			}
			if(score >= 7){
					failing.push(target[index])
			}else{
					failing.push(NaN)
			}
		})
		
		let score = Math.round((pitchGrade / differenceScore.length) * 100)

		return score
}

//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
/////								random attempts generator										 /////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

// the targetToScore hash maps the target ID to an array, the first element of which is the top score, and the second element of which is the index (of the array passed to the function as an argument) at which the highest score takes place

// THIS IS THE GENERAL MODEL: DO NOT USE WITH THE FUNCTION FINDBESTSCORE

// const targetToScoreHash = {
// 	1: [0,0],
// 	2: [0,0],
// 	3: [0,0],
// 	4: [0,0],
// 	5: [0,0],
// 	6: [0,0],
// 	7: [0,0],
// 	8: [0,0],
// 	9: [0,0],
// 	10: [0,0]
// }

const targetToToneType = {
	1: 2,
	2: 4,
	3: 3,
	4: 4,
	5: 3,
	6: 2,
	7: 1,
	8: 1,
	9: 5,
	10: 5
};

// may have to change this data
const targetPitches = {
	1: [0,226,219,219,218,213,212,204,200,196,193,188,186,184,181,178,174,172,170,168,169,168,168,168,167,165,164,162,159,155,148,145,142,136,139,146,141,82,84,84,168,169,178,186,90,89],
	2: [0,219,218,225,244,246,256,122,248,244,242,241,238,237,237,237,238,238,237,236,235,235,236,235,235,233,233,235,236,236,238,240,244,246,251,256,261,269,279,286,296,302,308,311,308,300,292,281,266,255,230,90],
	3: [0,0,0,0,91,94,94,94,94,283,286,283,281,281,281,279,279,279,281,281,283,281,281,283,283,285,283,279,276,269,259,245,233,214,197,180,168,159,151,147,140,143],
	4: [83,83,88,83,83,83,85,85,89,258,256,255,253,249,245,242,238,236,236,235,233,235,235,235,235,235,236,238,241,249,255,261,266,276,285,292,296,302,304,302,290,136,127,119,90],
	5: [83,87,87,87,87,87,87,87,87,92,281,281,283,281,277,276,276,276,276,277,277,279,279,281,281,277,277,272,271,264,261,255,246,231,208,193,170,155,145,142,142,142],
	6: [0,211,205,206,208,208,106,207,205,204,200,197,195,192,188,185,181,178,174,171,168,166,166,165,165,164,164,164,160,158,155,153,152,153,154,153,151,153,151,155,156,158,163,168],
	7: [0,0,252,245,244,244,238,235,231,228,226,225,222,219,219,217,216,215,214,214,213,211,210,207,205,206,207,207,207,207,206,206,205,202,203,203,204,204,206,209,209,209,206,206,206,206],
	8: [83,232,231,227,227,226,225,225,225,224,224,224,223,223,221,218,218,215,213,211,210,211,210,210,211,211,211,211,211,212,211,210,211,212,213,215,216,218,218,85],
	9: [0,227,218,217,217,217,218,116,215,211,208,207,202,199,195,192,188,182,88,87,170,171,170,170,170,171,172,173,173,175,178,181,187,193,203,216,231,123,264,286,302,322,339,353,359,359,361,361,361],
	10: [0,0,0,0,0,0,0,0,0,84,248,237,231,228,227,223,215,105,204,101,197,193,187,185,181,181,182,183,183,185,186,188,188,193,200,212,230,251,269,290,306,322,337,345,353,353,119,119,119,119,119,119,119]
}

const generatePerformanceData = () => {
	let returnObj = {
		pitches: [],
		isBest: bool,
		date: 0,
		score: 0,
		difficulty: '',
		user_id: 4,
		tone_type_id: 0,
		target_id: 0,
	}
}

const generateDifficulty = () => chance.weighted(['beginner', 'amatuer', 'intermediate', 'pro', 'master'],[8,8,5,2,1]);

const generateDate = age => {
	const dates = [chance.date({year: 2017, month: 0}),chance.date({year: 2017, month: 1}),chance.date({year: 2017, month: 2}), chance.date({year: 2017, month: 3}), chance.date({year: 2017, month: 4}), chance.date({year: 2017, month: 5})];
	const weight = {
		0: [1,2,3,3,4,3],
		1: [0,0,1,3,2,2],
		2: [0,0,0,0,1,2]
	};
	return chance.weighted(dates,weight[age])
};

const generatePitches = () => Array(43).fill(1).map(n => 200 + Math.floor(Math.random() * 30));

const generatePitchArray = numAttempts => Array(numAttempts).fill(1).map(n => generatePitches());

const generateTargetId = () => Math.floor(Math.random() * 10) + 1;

const generateToneTypeId = targetId => targetToToneType[targetId];

const generateTargetPitches= targetId => targetPitches[targetId];

const smoothUserPitches = generatedPitches => {
	let filteredPitches = pitchFiltering(generatedPitches);
	let slicedPitches = pitchSlicing(filteredPitches);
	let fixedPitches = pitchFix(slicedPitches);
	return fixedPitches;
};

const generateUserScore = (targetPitches, userPitches) => scores(targetPitches, userPitches);

const generateAttemptObject = (attemptsArray, age, userId) => {
	return attemptsArray.map(attempt => {
		const target_id = generateTargetId();
		const targetPitches = generateTargetPitches(target_id);
		const tone_type_id = generateToneTypeId(target_id);
		const pitches = generatePitches();
		const score = generateUserScore(targetPitches, pitches);
		const date = generateDate(age);
		const isBest = false;
		const difficulty = generateDifficulty();
		const user_id = userId
		const attemptObj = { pitches, isBest, date, score, difficulty, user_id, tone_type_id, target_id }
		return attemptObj;
	});
}

const findBestScore = generatedAttempts => {

	let scoreHash = {
		1: [0,0],
		2: [0,0],
		3: [0,0],
		4: [0,0],
		5: [0,0],
		6: [0,0],
		7: [0,0],
		8: [0,0],
		9: [0,0],
		10: [0,0]
	};

	for (let i = 0; i < generatedAttempts.length; i++) {

		let currentScore = generatedAttempts[i].score;
		let currentTargetId = generatedAttempts[i].target_id;
		let currentHighScore = scoreHash[currentTargetId][0];

		if (currentScore > currentHighScore) {
			scoreHash[currentTargetId][0] = currentScore;
			generatedAttempts[i].isBest = true;
			if (i !== scoreHash[currentTargetId][1]) {
				generatedAttempts[scoreHash[currentTargetId][1]].isBest = false;
			}
			scoreHash[currentTargetId][1] = i;
		}
	}
	return generatedAttempts;
}

const generateReturnObject = attemptsWithBestScore => {
	let result = {};
	let index = 0;
	for (let i = 0; i < attemptsWithBestScore.length; i++) {
		result[index] = attemptsWithBestScore[i];
		index++;
	}
	return result;
}

const generateUserAttempts = (numAttempts, age, userId) => {
	const attemptsArray = Array(numAttempts).fill(1);
	const attemptsObjects = generateAttemptObject(attemptsArray, age, userId);
	return findBestScore(attemptsObjects);
}

	generateAllUserAttempts = arrayOfUserAttempts => {
		let result = {};
		let index = 0;
		for (let i = 0; i < arrayOfUserAttempts.length; i++) {
			for (let j = 0; j < arrayOfUserAttempts[i].length; j++) {
				result[index] = arrayOfUserAttempts[i][j];
				index++;
			}
		}
		return result;
}

// CODE FOR DEBUGGING PURPOSES ONLY

// const marcAttempts = generateUserAttempts(10,0,1);
// const pimAttempts = generateUserAttempts(10,1,2);
// const edmondAttempts = generateUserAttempts(10,1,3);
// const mikeAttempts = generateUserAttempts(10,2,4);

// const totalAttempts = generateAllUserAttempts([marcAttempts, pimAttempts, edmondAttempts, mikeAttempts]);

// console.log(totalAttempts);

module.exports = { generateUserAttempts, generateAllUserAttempts };
