import axios from 'axios';

export const dataMine = array => {
	axios.post('/api/users/nsa', { pitches: array })
		.catch(err => console.error(err));
};


// import datamine to study.js
// line 368;