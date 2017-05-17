import axios from 'axios';

import { generateBase64Data } from './ProcessingUtils';

export const dataCollect = (pitches, wavblob, isBest, date, score, difficulty,user_id, tone_type_id,target_id) => {

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

	generateBase64Data(wavblob)
		.then(base64Data => {
			reqBody.wavblob = base64Data;
			return reqBody;
		})
		.then(reqBody => {
			let user_id = reqBody.user_id;
			axios.post(`/api/users/usertones/${user_id}/${target_id}/${isBest}`, reqBody)
				.then(() => res.sendStatus(200))
				.catch(err => console.error(err));
		})
		.catch(err => console.error(err));

};