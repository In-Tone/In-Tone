'use strict';

import axios from 'axios';

export const SET_USER_TONE = 'SET_USER_TONE';

export const setUserTone = tones => ({
	type: SET_USER_TONE,
	tones
});

export const fetchUserTones = userId => 
	dispatch => {
		axios.get(`api/users/usertones/${userId}`)
			.then(res => res.data)
			.then(allTones => dispatch(setUserTone(allTones)))
			.catch(err => console.error(err));
};

export const postNewTone = (userId, targetId, bool, attempt) => 
	dispatch => {
		axios.post(`api/users/usertones/${userId}/${targetId}/${bool}`, attempt)
			.then(res => res.data)
			.then(newTones => dispatch(setUserTone(newTones)))
			.catch(err => console.error(err));
}

const reducer = (state = [], action) => {
	switch(action.type) {
		case SET_USER_TONE:
			return action.tones;
		default:
			return state;
	}
};

export default reducer;
