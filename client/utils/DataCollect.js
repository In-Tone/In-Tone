import axios from 'axios';

import { generateBase64Data } from './ProcessingUtils';

export const dataCollect = (pitches, wavblob, isBest, date, score, difficulty,user_id, tone_type_id,target_id,userBest) => {

	const reqBody = { 
		pitches, 
		wavblob, 
		isBest, 
		date, 
		score, 
		difficulty, 
		user_id, 
		tone_type_id, 
		target_id 
	};

	let bestPreviousScore = findPreviousBestScore(target_id, userBest);

	console.log('score: ', score)
	console.log('prevScore: ', bestPreviousScore)

	// if the attempt is the first attempt at the tone, or better than any previous attempt, process wavblob into array and send to DB
	if (!userBest.length || score >  bestPreviousScore) {
		reqBody.isBest = true;
		generateBase64Data(wavblob)
			.then(base64Data => {
				reqBody.wavblob = base64Data;
				return reqBody;
			})
			.then(reqBody => {
				makeAxiosRequest(reqBody);
			})
			.catch(err => console.err(err));
	} else {
		makeAxiosRequest(reqBody);
	}
};

export const findPreviousBestScore = (target_id, userBest) => {
	if (!userBest.length) return 0;
	return userBest.filter(best => best.target_id === target_id).score;
};

export const makeAxiosRequest = reqObj => {
	console.log('\n\n\n\n\n',reqObj,'\n\n\n\n\n\n\n\n\n');
	axios.post(`/api/users/usertones/${reqObj.user_id}/${reqObj.target_id}/${reqObj.isBest}`, reqObj)
		.then(()=> res.sendStatus(200))
		.catch(err => console.error(err));
};