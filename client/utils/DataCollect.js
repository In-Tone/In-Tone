import axios from 'axios';

export const dataCollect = (pitches, blob, isBest, date, score, difficulty='beginner',user_id, tone_type_id,target_id) => {
	const reqBody = { 
		pitches, 
		blob, 
		isBest, 
		date, 
		score, 
		difficulty, 
		user_id, 
		tone_type_id, 
		target_id 
	};
	console.log("\n\n\n\n\n\n\nHERE\n\n\n\n\n\n\n");
	axios.post(`/api/users/usertones/${user_id}/${target_id}/${isBest}`, reqBody)
		.then(() => res.sendStatus(200))
		.catch(err => console.error(err));
};


// import datamine to study.js
// line 368;