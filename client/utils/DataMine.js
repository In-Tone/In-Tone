import axios from 'axios';

export const dataMine = array => {
	axios.post('/api/users/nsa', { pitches: array })
		.then(() => res.sendStatus(200))
		.catch(err => console.error(err));
};


// import datamine to study.js
// line 368;